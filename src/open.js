const {stringToLowerCase, stringStartsWith, slice, Function, Object, Reflect, Proxy, Map} = require('./natives');
const {warn, WARN_OPEN_API_LIMITED, WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME} = require('./log');

const openeds = new Map();

function patchMessageEvent(win) {
    const desc = Object.getOwnPropertyDescriptor(win.MessageEvent.prototype, 'source');
    const get = desc.get;
    desc.get = function() {
        const source = get.call(this);
        return openeds.get(source) || source;
    };
    Object.defineProperty(win.MessageEvent.prototype, 'source', desc);
}

function proxy(win, opened) {
    const target = {};

    Object.defineProperty(target, 'closed', {
        get: function () {
            return opened.closed;
        }
    });
    Object.defineProperty(target, 'close', {
        value: function () {
            return opened.close();
        }
    });
    Object.defineProperty(target, 'focus', {
        value: function () {
            return opened.focus();
        }
    });
    Object.defineProperty(target, 'postMessage', {
        value: function (message, targetOrigin, transfer) {
            return opened.postMessage(message, targetOrigin, transfer);
        }
    });

    return new Proxy(target, {
        get: function (target, property) {
            let ret = Reflect.get(target, property);
            if (Reflect.has(target, property)) {
                return ret;
            }
            if (Reflect.has(opened, property)) {
                const blocked = warn(WARN_OPEN_API_LIMITED, property, win);
                if (!blocked) {
                    ret = Reflect.get(opened, property);
                }
            }
            return ret;
        },
        set: function () {},
    });
}

function hook(win, native, cb) {
    return function open() {
        const args = slice(arguments);
        const url = args[0] + '', target = args[1], windowFeatures = args[2];

        if (stringStartsWith(stringToLowerCase(url), 'javascript')) {
            const blocked = warn(WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME, url, win);
            if (blocked) {
                return null;
            }
        }

        const opened = Function.prototype.call.call(native, this, url, target, windowFeatures);
        cb(opened);
        const p = proxy(win, opened);
        openeds.set(opened, p);
        return p;
    };
}

function hookOpen(win, cb) {
    patchMessageEvent(win);
    const native = win.open;
    win.open = hook(win, native, cb);
}

module.exports = hookOpen;