const {getFramesArray, makeWindowUtilSetter} = require('./utils');
const {document, getPreviousElementSibling, Array, stringToLowerCase, split, getAttribute, setAttribute, getChildElementCount, getInnerHTML, setInnerHTML, remove, Element} = require('./natives');
const {warn, WARN_DECLARATIVE_SHADOWS, WARN_HTML_FRAMES} = require('./log');

const querySelectorAll = Element.prototype.querySelectorAll;

function makeStringHook(asFrame, asHtml, arg) {
    let hook = 'top.' + (asFrame ? 'SNOW_FRAME' : 'SNOW_WINDOW') + '(' + arg + ');';
    if (asHtml) {
        hook = '<script>' + hook + 'document.currentScript.remove();' + '</script>';
    }
    return hook;
}

function dropDeclarativeShadow(shadow, html) {
    warn(WARN_DECLARATIVE_SHADOWS, shadow, html);
    remove(shadow);
    return true;
}

function dropFrame(frame, html) {
    warn(WARN_HTML_FRAMES, frame, html);
    remove(frame);
    return true;
}

function handleHTML(args, isSrcDoc) {
    for (let i = 0; i < args.length; i++) {
        let modified = false;
        if (isSrcDoc) {
            args[i] = makeStringHook(false, true, 'this') + args[i];
            modified = true;
        }
        const template = document.createElement('html');
        setInnerHTML(template, args[i]);
        if (!getChildElementCount(template)) {
            continue;
        }
        if (querySelectorAll.call(template, 'malignmark,mglyph').length > 0) {
            throw new Error('NOPE');
        }
        const declarativeShadows = querySelectorAll.call(template, 'template[shadowroot]');
        for (let j = 0; j < declarativeShadows.length; j++) {
            const shadow = declarativeShadows[j];
            modified = dropDeclarativeShadow(shadow, args[i]) || modified;
        }
        const frames = getFramesArray(template, false);
        for (let j = 0; j < frames.length; j++) {
            const frame = frames[j];
            modified = dropFrame(frame, args[i]) || modified;
        }
        if (modified) {
            args[i] = getInnerHTML(template);
        }
    }
}

module.exports = {handleHTML};