const hook = require('./hook');
const hookCreateObjectURL = require('./url');
const hookCustoms = require('./customs');
const hookOpen = require('./open');
const hookRequest = require('./request');
const hookEventListenersSetters = require('./listeners');
const hookDOMInserters = require('./inserters');
const {hookShadowDOM} = require('./shadow');
const {Object, Array, push, addEventListener, getFrameElement} = require('./natives');
const {isMarked, mark} = require('./mark');
const {error, warn, WARN_SNOW_FAILED_ON_TOP, ERR_PROVIDED_CB_IS_NOT_A_FUNCTION, ERR_MARK_NEW_WINDOW_FAILED} = require('./log');

function setTopUtil(prop, val) {
    const desc = Object.create(null);
    desc.value = val;
    Object.defineProperty(top, prop, desc);
}

function shouldHook(win) {
    try {
        const run = !isMarked(win);
        if (run) {
            mark(win);
        }
        return run;
    } catch (err) {
        if (win === top) {
            warn(WARN_SNOW_FAILED_ON_TOP, win);
            return false;
        }
        error(ERR_MARK_NEW_WINDOW_FAILED, win, err);
    }
    return shouldHook(win);
}

function onLoad(win) {
    const frame = getFrameElement(win);
    const onload = function() { hook(frame) };
    addEventListener(frame, 'load', onload);
}

function applyHooks(win) {
    onLoad(win);
    hookCreateObjectURL(win);
    hookCustoms(win);
    hookOpen(win);
    hookRequest(win);
    hookEventListenersSetters(win, 'load');
    hookDOMInserters(win);
    hookShadowDOM(win);
}

function onWin(win, cb) {
    const hook = shouldHook(win);
    if (hook) {
        applyHooks(win);
        for (let i = 0; i < callbacks.length; i++) {
            const stop = callbacks[i](win);
            if (stop) {
                return;
            }
        }
    }
    if (cb) {
        cb(win);
    }
}

const callbacks = new Array();

module.exports = function snow(cb, win = window) {
    if (win !== top) {
        return;
    }
    if (typeof cb !== 'function') {
        const bail = error(ERR_PROVIDED_CB_IS_NOT_A_FUNCTION, cb);
        if (bail) {
            return;
        }
    }
    if (!callbacks.length) {
        setTopUtil('SNOW_WINDOW', function(win) {
            onWin(win);
        });
        setTopUtil('SNOW_FRAME', function(frame) {
            hook(frame);
        });
    }
    push(callbacks, cb);
    onWin(top, cb);
}
