const isCrossOrigin = require('is-cross-origin');
const workaroundChromiumBug = require('./chromium_bug_workaround');
const {shadows, toArray, getFramesArray, getContentWindowOfFrame, getOwnerWindowOfFrame} = require('./utils');
const {Object, getFrameElement} = require('./natives');

function findWin(frameElement) {
    workaroundChromiumBug(frameElement);
    const win = getOwnerWindowOfFrame(frameElement);
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
                return getContentWindowOfFrame(frames[j]);
            }
        }
    }
    return null;
}

function hook(frames) {
    frames = toArray(frames);
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        if (typeof frame !== 'object') {
            continue;
        }
        const contentWindow = findWin(frame);
        if (!contentWindow) {
            continue;
        }
        top['SNOW_WINDOW'](contentWindow);
    }
}

module.exports = hook;