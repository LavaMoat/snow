const isCrossOrigin = require('is-cross-origin');
const workaroundChromiumBug = require('./chromium_bug_workaround');
const {shadows, getFramesArray, getFrameTag} = require('./utils');
const {getContentWindow, Object, getFrameElement} = require('./natives');

function findWin(win, frameElement) {
    let i = -1;
    while (win[++i]) {
        const cross = isCrossOrigin(win[i], win, Object);
        if (!cross) {
            if (getFrameElement(win[i]) === frameElement) {
                return win[i];
            }
        }
    }
    for (let i = 0; i < shadows.length; i++) {
        const shadow = shadows[i];
        const frames = getFramesArray(shadow, false);
        for (let j = 0; j < frames.length; j++) {
            if (frames[j] === frameElement) {
                return getContentWindow(frames[j], getFrameTag(frames[j]));
            }
        }
    }
    return null;
}

function hook(win, frames, cb) {
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        workaroundChromiumBug(frame);
        const contentWindow = findWin(win, frame);
        if (contentWindow) {
            cb(contentWindow);
        }
    }
}

module.exports = hook;