const hook = require('./hook');
const hookCreateObjectURL = require('./url');
const hookCustoms = require('./customs');
const hookOpen = require('./open');
const hookRequest = require('./request');
const hookEventListenersSetters = require('./listeners');
const hookDOMInserters = require('./inserters');
const hookWorker = require('./worker');
const hookTrustedHTMLs = require('./trusteds');
const {hookShadowDOM} = require('./shadow');
const {Array, push, addEventListener, getFrameElement} = require('./natives');
const {makeWindowUtilSetter} = require('./utils');
const {isMarked, mark} = require('./mark');
const {error, ERR_CB_MUST_BE_FUNCTION, ERR_MARK_NEW_WINDOW_FAILED} = require('./log');

const setSnowWindowUtil = makeWindowUtilSetter('SNOW_WINDOW', function(win) { onWin(win) });
const setSnowFrameUtil = makeWindowUtilSetter('SNOW_FRAME', function(frame) { hook(frame); });
const setSnowUtil = makeWindowUtilSetter('SNOW', snow);

function shouldHook(win) {
    try {
        const run = !isMarked(win);
        if (run) {
            mark(win);
        }
        return run;
    } catch (err) {
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
    setSnowUtil(win);
    onLoad(win);
    hookCreateObjectURL(win);
    hookCustoms(win);
    hookOpen(win);
    hookRequest(win);
    hookEventListenersSetters(win, 'load');
    hookDOMInserters(win);
    hookShadowDOM(win);
    hookTrustedHTMLs(win);
    hookWorker(win);
}

function onWin(win, cb, skip) {
    if (!skip && shouldHook(win)) {
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

function snow(cb, win) {
    if (typeof cb !== 'function') {
        const bail = error(ERR_CB_MUST_BE_FUNCTION, cb);
        if (bail) {
            return;
        }
    }
    setSnowWindowUtil(top);
    setSnowFrameUtil(top);
    const first = push(callbacks, cb) === 1;
    const w = win || window;
    onWin(w, cb, !first && w === top);
}

module.exports = snow;