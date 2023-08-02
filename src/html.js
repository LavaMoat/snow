const {getFramesArray, getDeclarativeShadows} = require('./utils');
const {document, getChildElementCount, setInnerHTML} = require('./natives');
const {error, ERR_DECLARATIVE_SHADOWS, ERR_HTML_FRAMES_WITH_SRCDOC} = require('./log');

function makeStringHook(asFrame, asHtml, arg) {
    let hook = 'top.' + (asFrame ? 'SNOW_FRAME' : 'SNOW_WINDOW') + '(' + arg + ');';
    if (asHtml) {
        hook = '<script>' + hook + 'document.currentScript.remove();' + '</script>';
    }
    return hook;
}

function assertHTML(args, isSrcDoc) {
    for (let i = 0; i < args.length; i++) {
        const template = document.createElement('html');
        if (isSrcDoc) {
            args[i] = makeStringHook(false, true, 'this') + args[i];
        }
        setInnerHTML(template, args[i]);
        if (getChildElementCount(template)) {
            if (getDeclarativeShadows(template).length > 0) {
                throw error(ERR_DECLARATIVE_SHADOWS, args[i]);
            }
            const frames = getFramesArray(template, false);
            for (let j = 0; j < frames.length; j++) {
                const frame = frames[j];
                if (template.getAttribute.call(frame, 'srcdoc')) {
                    throw error(ERR_HTML_FRAMES_WITH_SRCDOC, args[i]);
                }
            }
        }
    }
}

module.exports = {assertHTML};