const hook = require('./hook');
const {removeEventListener, addEventListener, slice, WeakMap, Object} = require('./natives');

const handlers = new WeakMap();

function isValidWeakMapKey(value) {
    return value && (typeof value === 'object' || typeof value === 'function');
}

function fire(that, listener, args) {
    if (listener) {
        if (listener.handleEvent) {
            return listener.handleEvent.apply(listener, args);
        }
        else {
            return listener.apply(that, args);
        }
    }
}

function getAddEventListener(win, event) {
    return function(type, handler, options) {
        let listener = handler;
        if (type === event && isValidWeakMapKey(handler)) {
            if (!handlers.has(handler)) {
                handlers.set(handler, function () {
                    hook(this);
                    const args = slice(arguments);
                    fire(this, handler, args);
                });
            }
            listener = handlers.get(handler);
        }
        return addEventListener(this || win, type, listener, options);
    }
}

function getRemoveEventListener(win, event) {
    return function(type, handler, options) {
        let listener = handler;
        if (type === event && isValidWeakMapKey(handler)) {
            listener = handlers.get(handler);
            handlers.delete(handler);
        }
        return removeEventListener(this || win, type, listener, options);
    }
}

function hookEventListenersSetters(win, event) {
    Object.defineProperty(win.EventTarget.prototype, 'addEventListener', {
        configurable: true, writable: true,
        value: getAddEventListener(win, event),
    });
    Object.defineProperty(win.EventTarget.prototype, 'removeEventListener', {
        configurable: true, writable: true,
        value: getRemoveEventListener(win, event),
    });
}

module.exports = hookEventListenersSetters;
