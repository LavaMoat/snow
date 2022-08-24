const {securely, secureNewWin} = require('./securely');
const hook = require('./hook');
const hookOpen = require('./open');
const hookLoadSetters = require('./listeners');
const hookDOMInserters = require('./inserters');
const {hookShadowDOM} = require('./shadow');
const {addEventListener} = require('./natives');

let callback;

function onWin(cb, win) {
    function hookWin(contentWindow) {
        onWin(cb, contentWindow);
        addEventListener(contentWindow.frameElement, 'load', function() {
            hook(win, [this], function() {
                onWin(cb, contentWindow);
            });
        });
    }

    callback = callback || cb;
    if (callback !== cb) {
        return;
    }

    secureNewWin(win);

    hookOpen(win, hookWin);
    hookLoadSetters(win, hookWin);
    hookDOMInserters(win, hookWin);
    hookShadowDOM(win, hookWin);

    cb(win, securely);
}

module.exports = function(cb, win = window) {
    onWin(cb, win);
}
