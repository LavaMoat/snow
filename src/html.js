const {getFramesArray} = require('./utils');
const {getAttribute, setAttribute, getTemplateContent, getChildElementCount, createElement, getInnerHTML, setInnerHTML} = require('./natives');

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
            args[i] = getInnerHTML(template);
        }
        if (callHook) {
            args[i] = applyHookByString(args[i], 'window', true);
        }
    }
}

module.exports = {handleHTML};