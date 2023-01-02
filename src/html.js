const {getFramesArray} = require('./utils');
const {Array, stringToLowerCase, split, getAttribute, setAttribute, getTemplateContent, getChildElementCount, createElement, getInnerHTML, setInnerHTML} = require('./natives');

function applyHookByString(str, argument, asHtml) {
    let hook = `top.SNOW_CB(null, ${argument});`;
    if (asHtml) {
        hook = '<script>' + hook + 'document.currentScript.remove();' + '</script>';
    }
    return hook + str;
}

function hookOnLoadAttributes(frames) {
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        let onload = getAttribute(frame, 'onload');
        if (onload) {
            onload = applyHookByString(onload, 'top.SNOW_FRAME_TO_WINDOW(this)', false);
            setAttribute(frame, 'onload', onload);
        }
    }
}

function hookJavaScriptURI(frames) {
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        let src = getAttribute(frame, 'src') || '';
        const [scheme, js] = split(src, ':');
        if (stringToLowerCase(scheme) === 'javascript') {
            src = 'javascript:' + applyHookByString(js, 'window', false);
            setAttribute(frame, 'src', src);
        }
    }
}

function hookSrcDoc(frames) {
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        let srcdoc = getAttribute(frame, 'srcdoc');
        if (srcdoc) {
            srcdoc = applyHookByString(srcdoc, 'window', true);
            const html = new Array(srcdoc);
            handleHTML(html, true);
            setAttribute(frame, 'srcdoc', html[0]);
        }
    }
}

function handleHTML(args, callHook) {
    for (let i = 0; i < args.length; i++) {
        const html = args[i];
        const template = createElement(document, 'template');
        setInnerHTML(template, html);
        const content = getTemplateContent(template);
        if (!getChildElementCount(content)) {
            continue;
        }
        const frames = getFramesArray(content, false);
        if (frames.length) {
            hookOnLoadAttributes(frames);
            hookJavaScriptURI(frames);
            hookSrcDoc(frames);
            args[i] = getInnerHTML(template);
        }
        if (callHook) {
            args[i] = applyHookByString(args[i], 'window', true);
        }
    }
}

module.exports = {handleHTML};