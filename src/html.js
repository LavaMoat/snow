const {securely} = require('./securely');
const {getFramesArray} = require('./utils');

const WARN_OF_ONLOAD_ATTRIBUTES = false; // DEBUG MODE ONLY!
const WARN_OF_ONLOAD_ATTRIBUTES_MSG = 'WARN: Glazier: Removing html string iframe onload attribute:';

function dropOnLoadAttributes(frames) {
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        if (WARN_OF_ONLOAD_ATTRIBUTES) {
            const onload = securely(() => frame.getAttributeS('onload'));
            if (onload) {
                console.warn(WARN_OF_ONLOAD_ATTRIBUTES_MSG, frame, onload);
            }
        }
        securely(() => frame.removeAttributeS('onload'));
    }
}

function handleHTML(win, args) {
    for (let i = 0; i < args.length; i++) {
        const html = args[i];
        if (typeof html !== 'string') {
            continue;
        }
        const template = securely(() => document.createElementS('template'));
        securely(() => template.innerHTMLS = html);
        const frames = getFramesArray(template.content, false);
        dropOnLoadAttributes(frames)
        args[i] = securely(() => template.innerHTMLS);
    }
}

module.exports = handleHTML;