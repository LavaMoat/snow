const {applyHookByString} = require('./utils');
const {Array, getTemplateContent, getChildElementCount, createElement, getInnerHTML, setInnerHTML, remove, DocumentFragment} = require('./natives');
const {hookAttributes} = require('./attributes');
const {warn, WARN_DECLARATIVE_SHADOWS} = require('./log');

const querySelectorAll = DocumentFragment.prototype.querySelectorAll;

function dropDeclarativeShadows(content, html) {
    const declarativeShadows = querySelectorAll.call(content, 'template[shadowroot]');
    for (let j = 0; j < declarativeShadows.length; j++) {
        const shadow = declarativeShadows[j];
        warn(WARN_DECLARATIVE_SHADOWS, shadow, html);
        remove(shadow);
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
        dropDeclarativeShadows(content, args[i]);
        hookAttributes(new Array(content), false, function(html) { handleHTML(html, true) });
        args[i] = getInnerHTML(template);
        if (callHook) {
            args[i] = applyHookByString(args[i], 'window', true);
        }
    }
}

module.exports = {handleHTML};