const hook = require('./hook');
const hookCreateObjectURL = require('./url');
const hookCustoms = require('./customs');
const hookOpen = require('./open');
const hookEventListenersSetters = require('./listeners');
const hookDOMInserters = require('./inserters');
const {hookShadowDOM} = require('./shadow');
const {Object, addEventListener, getFrameElement} = require('./natives');
const {isMarked, mark} = require('./mark');
const {error, ERR_PROVIDED_CB_IS_NOT_A_FUNCTION, ERR_MARK_NEW_WINDOW_FAILED} = require('./log');

function setTopUtil(prop, val) {
    const desc = Object.create(null);
    desc.value = val;
    Object.defineProperty(top, prop, desc);
}

function shouldRun(win) {
    try {
        const run = !isMarked(win);
        if (run) {
            mark(win);
        }
        return run;
    } catch (err) {
        error(ERR_MARK_NEW_WINDOW_FAILED, win, err);
    }
    return shouldRun(win);
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
    hookEventListenersSetters(win, 'load');
    hookDOMInserters(win);
    hookShadowDOM(win);
}

function onWin(win) {
    if (shouldRun(win)) {
        applyHooks(win);
        callback(win);
    }
}

let callback;

module.exports = function snow(cb, win) {
    if (!callback) {
        if (typeof cb !== 'function') {
            const bail = error(ERR_PROVIDED_CB_IS_NOT_A_FUNCTION, cb);
            if (bail) {
                return;
            }
        }
        setTopUtil('SNOW_WINDOW', function(win) {
            onWin(win);
        });
        setTopUtil('SNOW_FRAME', function(frame) {
            hook(frame);
        });
        callback = cb;
    }

    onWin(win || top);
}
