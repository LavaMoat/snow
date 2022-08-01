const hook = require('./hook');
const {securely} = require('./securely');
const {getArguments} = require('./utils');
const {addEventListener} = require('./natives');

function callOnload(that, onload, args) {
    if (onload) {
        if (onload.handleEvent) {
            return onload.handleEvent.apply(onload, args);
        }
        else {
            return onload.apply(that, args);
        }
    }
}

function getHook(win, cb) {
    return function(type, listener, options) {
        let onload = listener;
        if (type === 'load') {
            onload = function () {
                hook(win, [this], cb);
                const args = getArguments(arguments);
                callOnload(this, listener, args);
            };
        }
        return addEventListener(this, type, onload, options);
    }
}

function hookLoadSetters(win, cb) {
    securely(() => {
        ObjectS.defineProperty(win.EventTarget.prototype, 'addEventListener', { value: getHook(win, cb) });
    });
}

module.exports = hookLoadSetters;