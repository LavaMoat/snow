const {getFramesArray} = require('./utils');
const {remove, removeAttribute, getAttribute, getTemplateContent, getChildElementCount, createElement, getInnerHTML, setInnerHTML, DocumentFragment} = require('./natives');
const {warn, WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED, WARN_DECLARATIVE_SHADOWS} = require('./log');

const querySelectorAll = DocumentFragment.prototype.querySelectorAll;

function dropDeclarativeShadows(declarativeShadows, html) {
    for (let i = 0; i < declarativeShadows.length; i++) {
        const shadow = declarativeShadows[i];
        warn(WARN_DECLARATIVE_SHADOWS, shadow, html);
        remove(shadow);
    }
}

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

function handleHTML(args, callHook) {
    for (let i = 0; i < args.length; i++) {
        const html = args[i];
        const template = createElement(document, 'template');
        setInnerHTML(template, html);
        const content = getTemplateContent(template);
        if (!getChildElementCount(content)) {
            continue;
        }
        const declarativeShadows = querySelectorAll.call(content, 'template[shadowroot]');
        if (declarativeShadows.length) {
            dropDeclarativeShadows(declarativeShadows, html);
            args[i] = getInnerHTML(template);
        }
        const frames = getFramesArray(content, false);
        if (frames.length) {
            dropOnLoadAttributes(frames);
            args[i] = getInnerHTML(template);
        }
        if (callHook) {
            args[i] = '<script>top.SNOW_CB(null, window)</script>' + args[i];
        }
    }
}

module.exports = {handleHTML};