const {getFramesArray, makeWindowUtilSetter} = require('./utils');
const {getPreviousElementSibling, Array, stringToLowerCase, split, getAttribute, setAttribute, getChildElementCount, createElement, getInnerHTML, setInnerHTML, remove, Element} = require('./natives');
const {warn, WARN_DECLARATIVE_SHADOWS} = require('./log');

const querySelectorAll = Element.prototype.querySelectorAll;

makeWindowUtilSetter('SNOW_GET_PREVIOUS_ELEMENT_SIBLING', getPreviousElementSibling)(top);

const getDocumentCurrentScriptHelper = `
Object.defineProperty(window, 'SNOW_DOCUMENT_CURRENT_SCRIPT', {value: Object.getOwnPropertyDescriptor(Document.prototype, 'currentScript').get.bind(document)});
document.currentScript.remove();
`;

function makeStringHook(asFrame, asHtml, arg) {
    let hook = 'top.' + (asFrame ? 'SNOW_FRAME' : 'SNOW_WINDOW') + '(' + arg + ');';
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
        onload = makeStringHook(true, false, 'this') + onload;
        setAttribute(frame, 'onload', onload);
        return true;
    }
    return false;
}

function hookJavaScriptURI(frame) {
    let src = getAttribute(frame, 'src') || '';
    const [scheme, js] = split(src, ':');
    if (stringToLowerCase(scheme) === 'javascript') {
        src = 'javascript:' + makeStringHook(false, false, 'this') + js;
        setAttribute(frame, 'src', src);
        return true;
    }
    return false;
}

function hookSrcDoc(frame) {
    let srcdoc = getAttribute(frame, 'srcdoc');
    if (srcdoc) {
        srcdoc = makeStringHook(false, true, 'this') + srcdoc;
        const html = new Array(srcdoc);
        handleHTML(html, true);
        setAttribute(frame, 'srcdoc', html[0]);
        return true;
    }
    return false;
}

function hookInlineWindow(parent) {
    const script = createElement(document, 'script');
    script.textContent = getDocumentCurrentScriptHelper + makeStringHook(false, false, 'this');
    parent.insertBefore(script, parent.firstChild);
    return true;
}

function hookInlineFrame(frame) {
    const script = createElement(document, 'script');
    script.textContent = makeStringHook(true, false, 'top.SNOW_GET_PREVIOUS_ELEMENT_SIBLING(SNOW_DOCUMENT_CURRENT_SCRIPT())');
    frame.after(script);
    return true;
}

function handleHTML(args, isSrcDoc) {
    for (let i = 0; i < args.length; i++) {
        const template = createElement(document, 'html');
        setInnerHTML(template, args[i]);
        if (!getChildElementCount(template)) {
            continue;
        }
        let modified = false;
        if (isSrcDoc) {
            modified = hookInlineWindow(template);
        }
        const declarativeShadows = querySelectorAll.call(template, 'template[shadowroot]');
        for (let j = 0; j < declarativeShadows.length; j++) {
            const shadow = declarativeShadows[j];
            modified = dropDeclarativeShadows(shadow, args[i]) || modified;
        }
        const frames = getFramesArray(template, false);
        for (let j = 0; j < frames.length; j++) {
            const frame = frames[j];
            modified = (isSrcDoc && hookInlineFrame(frame)) || modified;
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