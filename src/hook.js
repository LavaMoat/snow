const workaroundChromiumBug = require('./chromium_bug_workaround');
const {shadows, toArray, getFramesArray, getContentWindowOfFrame, getOwnerWindowOfNode} = require('./utils');
const {Object, getFrameElement} = require('./natives');
const {forEachOpened} = require('./proxy');

function isWindow(obj) {
    const o = Object(obj);
    return o === o.window;
}

function isCrossOrigin(dst, src) {
    return Object.getPrototypeOf.call(src, dst) === null;
}

function findWin(win, frameElement) {
    let i = -1;
    while (win[++i]) {
        if (!isWindow(win[i])) {
            continue;
        }
        if (isCrossOrigin(win[i], win)) {
            continue;
        }
        if (getFrameElement(win[i]) === frameElement) {
            return win[i];
        }
        const found = findWin(win[i], frameElement);
        if (found) {
            return found;
        }
    }
    for (let i = 0; i < shadows.length; i++) {
        const shadow = shadows[i];
        const owner = getOwnerWindowOfNode(shadow);
        if (owner !== win) {
            continue;
        }
        const frames = getFramesArray(shadow, false);
        for (let j = 0; j < frames.length; j++) {
            const frame = frames[j];
            const win = getContentWindowOfFrame(frame);
            if (frame === frameElement) {
                return win;
            }
            const found = findWin(win, frameElement);
            if (found) {
                return found;
            }
        }
    }
    return null;
}

function hookWin(win) {
    top['SNOW_WINDOW'](win);
}

function findAndHookWin(win, frame) {
    const contentWindow = findWin(win, frame);
    if (contentWindow) {
        hookWin(contentWindow);
    }
    return !!contentWindow;
}

function hook(frames) {
    frames = toArray(frames);
    for (let i = 0; i < frames.length; i++) {
        const frame = frames[i];
        if (typeof frame === 'object' && frame !== null) {
            workaroundChromiumBug(frame);
            findAndHookWin(top, frame) || forEachOpened(findAndHookWin, frame);
        }
    }
}

module.exports = hook;