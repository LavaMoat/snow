const {getFramesArray} = require('./utils');
const {Array, stringToLowerCase, split, getAttribute, setAttribute, getChildElementCount, createElement, getInnerHTML, setInnerHTML, remove, Element} = require('./natives');
const {warn, WARN_DECLARATIVE_SHADOWS} = require('./log');

const querySelectorAll = Element.prototype.querySelectorAll;

function makeStringHook(asFrame, asHtml) {
    let hook = 'top.' + (asFrame ? 'SNOW_FRAME' : 'SNOW_WINDOW') + '(this);';
    if (asHtml) {
        hook = '<script>' + hook + 'document.currentScript.remove();' + '</script>';
    }
    return hook;
}

function dropDeclarativeShadows(shadow, html) {
    warn(WARN_DECLARATIVE_SHADOWS, shadow, html);
    remove(shadow);
    return true;
}

function hookOnLoadAttributes(frame) {
    let onload = getAttribute(frame, 'onload');
    if (onload) {
        onload = makeStringHook(true, false) + onload;
        setAttribute(frame, 'onload', onload);
        return true;
    }
    return false;
}

function hookJavaScriptURI(frame) {
    let src = getAttribute(frame, 'src') || '';
    const [scheme, js] = split(src, ':');
    if (stringToLowerCase(scheme) === 'javascript') {
        src = 'javascript:' + makeStringHook(false, false) + js;
        setAttribute(frame, 'src', src);
        return true;
    }
    return false;
}

function hookSrcDoc(frame) {
    let srcdoc = getAttribute(frame, 'srcdoc');
    if (srcdoc) {
        srcdoc = makeStringHook(false, true) + srcdoc;
        const html = new Array(srcdoc);
        handleHTML(html, true);
        setAttribute(frame, 'srcdoc', html[0]);
        return true;
    }
    return false;
}

function handleHTML(args, callHook) {
    for (let i = 0; i < args.length; i++) {
        const template = createElement(document, 'html');
        setInnerHTML(template, args[i]);
        if (!getChildElementCount(template)) {
            continue;
        }
        let modified = false;
        if (callHook) {
            const script = createElement(document, 'script');
            script.textContent = makeStringHook(false, false);
            template.insertBefore(script, template.firstChild);
            modified = true;
        }
        const declarativeShadows = querySelectorAll.call(template, 'template[shadowroot]');
        for (let j = 0; j < declarativeShadows.length; j++) {
            const shadow = declarativeShadows[j];
            modified = dropDeclarativeShadows(shadow, args[i]) || modified;
        }
        const frames = getFramesArray(template, false);
        for (let j = 0; j < frames.length; j++) {
            const frame = frames[j];
            modified = hookOnLoadAttributes(frame) || modified;
            modified = hookJavaScriptURI(frame) || modified;
            modified = hookSrcDoc(frame) || modified;
        }
        if (modified) {
            args[i] = getInnerHTML(template);
        }
    }
}

module.exports = {handleHTML};