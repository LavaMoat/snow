const {securely} = require('./securely');
const {getFramesArray, iterate} = require('./utils');
const {removeAttribute, getAttribute} = require('./natives');

const WARN_OF_ONLOAD_ATTRIBUTES = false; // DEBUG MODE ONLY!
const WARN_OF_ONLOAD_ATTRIBUTES_MSG = 'WARN: Snow: Removing html string iframe onload attribute:';

function dropOnLoadAttributes(frames) {
    iterate(frames, frame => {
        if (WARN_OF_ONLOAD_ATTRIBUTES) {
            const onload = getAttribute(frame, 'onload');
            if (onload) {
                console.warn(WARN_OF_ONLOAD_ATTRIBUTES_MSG, frame, onload);
            }
        }
        removeAttribute(frame, 'onload');
    });
}

function handleHTML(win, args) {
    iterate(args, (html, i) => {
        if (typeof html !== 'string') {
            return;
        }
        securely(() => {
            const template = document.createElementS('template');
            template.innerHTMLS = html;
            const frames = getFramesArray(template.contentS, false);
            dropOnLoadAttributes(frames);
            args[i] = template.innerHTMLS;
        });
    });
}

module.exports = handleHTML;