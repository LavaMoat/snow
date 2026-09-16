const hook = require('./hook');
const {removeEventListener, addEventListener, slice, WeakMap, Object} = require('./natives');

// A listener can hold references to DOM nodes. Use weak keys so this cache
// does not keep the listener and those nodes alive after they are no longer used.
const handlers = new WeakMap();

function isListenerObject(listener) {
    // The pristine Object constructor returns objects unchanged, including
    // functions, bound functions, proxies, and objects from other windows.
    // It also handles document.all, which is an object even though typeof
    // reports 'undefined'. Null, undefined, and other primitives produce a
    // different object, so they pass through to the browser unchanged.
    // Symbols must pass through too: some are valid WeakMap keys, but none
    // are valid listener arguments.
    return Object(listener) === listener;
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
        // Only functions and objects can be listener keys in this WeakMap. Pass
        // null, undefined, and primitives through so the browser handles them:
        // null/undefined are ignored; invalid primitives throw a TypeError.
        if (type === event && isListenerObject(handler)) {
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
        // Pass non-object handlers through unchanged. Looking them up would
        // replace them with undefined and hide the browser's TypeError for
        // invalid primitives.
        if (type === event && isListenerObject(handler)) {
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