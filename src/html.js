const {getFramesArray} = require('./utils');
const {Array, stringToLowerCase, split, getAttribute, setAttribute, getTemplateContent, getChildElementCount, createElement, getInnerHTML, setInnerHTML, remove, DocumentFragment} = require('./natives');
const {warn, WARN_DECLARATIVE_SHADOWS} = require('./log');

const querySelectorAll = DocumentFragment.prototype.querySelectorAll;

function applyHookByString(str, argument, asHtml) {
    let hook = `top.SNOW_CB(null, ${argument});`;
    if (asHtml) {
        hook = '<script>' + hook + 'document.currentScript.remove();' + '</script>';
    }
    return hook + str;
}

function dropDeclarativeShadows(shadow, html) {
    warn(WARN_DECLARATIVE_SHADOWS, shadow, html);
    remove(shadow);
}

function hookOnLoadAttributes(frame) {
    let onload = getAttribute(frame, 'onload');
    if (onload) {
        onload = applyHookByString(onload, 'top.SNOW_FRAME_TO_WINDOW(this)', false);
        setAttribute(frame, 'onload', onload);
    }
}

function hookJavaScriptURI(frame) {
    let src = getAttribute(frame, 'src') || '';
    const [scheme, js] = split(src, ':');
    if (stringToLowerCase(scheme) === 'javascript') {
        src = 'javascript:' + applyHookByString(js, 'window', false);
        setAttribute(frame, 'src', src);
    }
}

function hookSrcDoc(frame) {
    let srcdoc = getAttribute(frame, 'srcdoc');
    if (srcdoc) {
        srcdoc = applyHookByString(srcdoc, 'window', true);
        const html = new Array(srcdoc);
        handleHTML(html, true);
        setAttribute(frame, 'srcdoc', html[0]);
    }
}

function handleHTML(args, callHook) {
    for (let i = 0; i < args.length; i++) {
        const template = createElement(document, 'template');
        setInnerHTML(template, args[i]);
        const content = getTemplateContent(template);
        if (!getChildElementCount(content)) {
            continue;
        }
        const declarativeShadows = querySelectorAll.call(content, 'template[shadowroot]');
        for (let j = 0; j < declarativeShadows.length; j++) {
            const shadow = declarativeShadows[j];
            dropDeclarativeShadows(shadow, args[i]);
        }
        const frames = getFramesArray(content, false);
        for (let j = 0; j < frames.length; j++) {
            const frame = frames[j];
            hookOnLoadAttributes(frame);
            hookJavaScriptURI(frame);
            hookSrcDoc(frame);
        }
        args[i] = getInnerHTML(template);
        if (callHook) {
            args[i] = applyHookByString(args[i], 'window', true);
        }
    }
}

module.exports = {handleHTML};