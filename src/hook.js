const workaroundChromiumBug = require('./chromium_bug_workaround');
const {getLength} = require('./common');
const {shadows, toArray, getFramesArray, getContentWindowOfFrame, getOwnerWindowOfNode} = require('./utils');
const {Object, getFrameElement, Function, isConnected} = require('./natives');
const {forEachOpened} = require('./proxy');

function isCrossOrigin(dst, src) {
    return Object.getPrototypeOf.call(src, dst) === null;
}

function findWin(win, frameElement) {
    const length = Function.prototype.call.call(getLength, win);
    for (let i = 0; i < length; i++) {
        // match the frame element first, before the cross-origin check: this is spec-safe
        // regardless of origin (it just returns null for genuinely cross-origin frames, it
        // doesn't throw), and it avoids skipping frames that isCrossOrigin misclassifies as
        // cross-origin (observed on Firefox for blob:/file: URL iframes, which are really
        // same-origin but the prototype-null heuristic below flags them as cross-origin).
        if (getFrameElement(win[i]) === frameElement) {
            return win[i];
        }
        if (isCrossOrigin(win[i], win)) {
            continue;
        }
        const found = findWin(win[i], frameElement);
        if (found) {
            return found;
        }
    }
    for (let i = 0; i < shadows.length; i++) {
        const shadow = shadows[i];
        if (!isConnected(shadow)) {
            continue;
        }
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