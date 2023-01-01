const {getFramesArray} = require('./utils');
const {removeAttribute, getAttribute, getTemplateContent, getChildElementCount, createElement, getInnerHTML, setInnerHTML} = require('./natives');
const {warn, WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED} = require('./log');

function dropOnLoadAttributes(frames) {
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        const onload = getAttribute(frame, 'onload');
        if (onload) {
            warn(WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED, frame, onload);
            removeAttribute(frame, 'onload');
        }
    }
}

function handleHTML(args) {
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
            dropOnLoadAttributes(frames);
            args[i] = getInnerHTML(template);
        }
        args[i] = '<script>top.SNOW_CB(null, window);document.currentScript.remove();</script>' + args[i];
    }
}

module.exports = {handleHTML};