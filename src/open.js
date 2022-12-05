const {stringToLowerCase, stringStartsWith, slice, Function, Object, Reflect, Proxy} = require('./natives');
const {warn, WARN_OPEN_API_LIMITED, WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME} = require('./log');

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

function hook(win, realOpen, cb) {
    return function open() {
        const args = slice(arguments);
        const url = args[0] + '', target = args[1], windowFeatures = args[2];

        if (stringStartsWith(stringToLowerCase(url), 'javascript')) {
            const blocked = warn(WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME, url, win);
            if (blocked) {
                return null;
            }
        }

        const opened = Function.prototype.call.call(realOpen, this, url, target, windowFeatures);
        cb(opened);
        return proxy(win, opened);
    };
}

function hookOpen(win, cb) {
    const realOpen = win.open;
    win.open = hook(win, realOpen, cb);
}

module.exports = hookOpen;