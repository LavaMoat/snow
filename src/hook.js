const isCrossOrigin = require('is-cross-origin');
const natives = require('./natives')();
const workaroundChromiumBug = require('./chromium_bug_workaround');

function findWin(win, frameElement) {
    let frame = null, i = -1;
    while (win[++i]) {
        if (!isCrossOrigin(win[i], win, natives['Object'])) {
            if (win[i].frameElement === frameElement) {
                frame = win[i];
                break;
            }
        }
    }
    return frame;
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