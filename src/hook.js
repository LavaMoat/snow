const isCrossOrigin = require('is-cross-origin');
const {securely} = require('./securely');
const workaroundChromiumBug = require('./chromium_bug_workaround');
const {shadows, getFramesArray} = require('./utils');

function findWin(win, frameElement) {
    let i = -1;
    while (win[++i]) {
        const cross = securely(() => isCrossOrigin(win[i], win, win.ObjectS));
        if (!cross) {
            if (win[i].frameElement === frameElement) {
                return win[i];
            }
        }
    }
    for (let i = 0; i < shadows.length; i++) {
        const shadow = shadows[i];
        const frames = getFramesArray(shadow, false);
        for (let j = 0; j < frames.length; j++) {
            if (frames[j] === frameElement) {
                return frames[j].contentWindow;
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