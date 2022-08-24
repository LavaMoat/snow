const {getFramesArray} = require('./utils');
const {removeAttribute, getAttribute, getTemplateContent, createElement, getInnerHTML, setInnerHTML} = require('./natives');

const WARN_OF_ONLOAD_ATTRIBUTES = false; // DEBUG MODE ONLY!
const WARN_OF_ONLOAD_ATTRIBUTES_MSG = 'WARN: Snow: Removing html string iframe onload attribute:';

function dropOnLoadAttributes(frames) {
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        if (WARN_OF_ONLOAD_ATTRIBUTES) {
            const onload = getAttribute(frame, 'onload');
            if (onload) {
                console.warn(WARN_OF_ONLOAD_ATTRIBUTES_MSG, frame, onload);
            }
        }
        removeAttribute(frame, 'onload');
    }
}

function handleHTML(win, args) {
    for (let i = 0; i < args.length; i++) {
        const html = args[i];
        const template = createElement(document, 'template');
        setInnerHTML(template, html);
        const frames = getFramesArray(getTemplateContent(template), false);
        if (frames.length) {
            dropOnLoadAttributes(frames);
            args[i] = getInnerHTML(template);
        }
    }
}

module.exports = handleHTML;