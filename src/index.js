const natives = require('./natives')();
const hook = require('./hook');
const hookOpen = require('./open');
const hookLoadSetters = require('./listeners');
const hookDOMInserters = require('./inserters');

export default function onWin(cb, win = window) {
    function hookWin(contentWindow) {
        onWin(cb, contentWindow);
        const frame = contentWindow.frameElement;
        natives['addEventListener'].call(frame, 'load', function() {
            hook(win, [this], function() {
                onWin(cb, contentWindow);
            });
        });
    }

    hookOpen(win, hookWin);
    hookLoadSetters(win, hookWin);
    hookDOMInserters(win, hookWin);

    cb(win);
}
