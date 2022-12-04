const {stringToLowerCase, stringStartsWith, slice, Function, Object, Reflect, Proxy} = require('./natives');
const {warn, WARN_OPEN_API_LIMITED, WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME} = require('./log');

function hookOpen(win, cb) {
    const realOpen = win.open;
    win.open = function () {
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

        const proxy = {};
        Object.defineProperty(proxy, 'closed', {
            get: function () {
                return opened.closed;
            }
        });
        Object.defineProperty(proxy, 'close', {
            value: function () {
                return opened.close();
            }
        });
        Object.defineProperty(proxy, 'focus', {
            value: function () {
                return opened.focus();
            }
        });
        Object.defineProperty(proxy, 'postMessage', {
            value: function (message, targetOrigin, transfer) {
                return opened.postMessage(message, targetOrigin, transfer);
            }
        });

        return new Proxy(proxy, {
            get: function (target, property) {
                let ret = Reflect.get(proxy, property);
                if (Reflect.has(proxy, property)) {
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
}

module.exports = hookOpen;