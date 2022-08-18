const {securely} = require('./securely');
const isCrossOrigin = require('is-cross-origin');
const workaroundChromiumBug = require('./chromium_bug_workaround');
const {iterate} = require('./utils');

function findWin(win, frameElement) {
    let frame = null, i = -1;
    while (win[++i]) {
        const cross = securely(() => isCrossOrigin(win[i], win, win.ObjectS));
        if (!cross) {
            if (win[i].frameElement === frameElement) {
                frame = win[i];
                break;
            }
        }
    }
    return frame;
}

function hook(win, frames, cb) {
    iterate(frames, frame => {
        workaroundChromiumBug(frame);
        const contentWindow = findWin(win, frame);
        if (contentWindow) {
            cb(contentWindow);
        }
    });
}

module.exports = hook;