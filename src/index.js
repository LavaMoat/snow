const hook = require('./hook');
const hookOpen = require('./open');
const hookLoadSetters = require('./listeners');
const hookDOMInserters = require('./inserters');
const {hookShadowDOM} = require('./shadow');
const {securely, addEventListener, getFrameElement} = require('./natives');
const {isMarked, mark} = require('./mark');
const {error, ERR_MARK_NEW_WINDOW_FAILED} = require('./log');

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

function applyHooks(win, hookWin, securely, cb) {
    hookOpen(win, hookWin);
    hookLoadSetters(win, hookWin);
    hookDOMInserters(win, hookWin);
    hookShadowDOM(win, hookWin);
    cb(win, securely);
}

function onWin(cb, win) {
    function hookWin(contentWindow) {
        onWin(cb, contentWindow);
        addEventListener(getFrameElement(contentWindow), 'load', function() {
            hook(win, [this], function() {
                onWin(cb, contentWindow);
            });
        });
    }

    if (shouldRun(win)) {
        applyHooks(win, hookWin, securely, cb);
    }
}

let used = false;

module.exports = function(cb, win) {
    if (!used) {
        used = true;
        onWin(cb, win || window);
    }
}
