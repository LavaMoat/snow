const hook = require('./hook');
const {securely} = require('./securely');
const {removeEventListener, addEventListener, slice, Map} = require('./natives');

const handlers = new Map();

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

function getAddEventListener(win, cb) {
    return function(type, handler, options) {
        let listener = handler;
        if (type === 'load') {
            if (!handlers.has(handler)) {
                handlers.set(handler, function () {
                    hook(win, [this], cb);
                    const args = slice(arguments);
                    callOnload(this, handler, args);
                });
            }
            listener = handlers.get(handler);
        }
        return addEventListener(this, type, listener, options);
    }
}

function getRemoveEventListener() {
    return function(type, handler, options) {
        let listener = handler;
        if (type === 'load') {
            listener = handlers.get(handler);
            handlers.delete(handler);
        }
        return removeEventListener(this, type, listener, options);
    }
}

function hookLoadSetters(win, cb) {
    securely(() => {
        ObjectS.defineProperty(win.EventTarget.prototype, 'addEventListener', { value: getAddEventListener(win, cb) });
        ObjectS.defineProperty(win.EventTarget.prototype, 'removeEventListener', { value: getRemoveEventListener() });
    });
}

module.exports = hookLoadSetters;