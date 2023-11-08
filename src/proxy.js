const {Object, Proxy, Reflect, Map} = require('./natives');
const {error, ERR_OPENED_PROP_ACCESS_BLOCKED} = require('./log');

const openeds = new Map();

function getProxyByOpened(opened) {
    return openeds.get(opened);
}

function forEachOpened(cb, arg1) {
    for (const opened of openeds.keys()) {
        cb(opened, arg1);
    }
}

function proxy(opened) {
    const target = Object.create(null);

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

    if (!openeds.has(opened)) {
        top['SNOW_WINDOW'](opened);
        const p = new Proxy(target, {
            get: function (target, property) {
                let ret = Reflect.get(target, property);
                if (Reflect.has(target, property)) {
                    return ret;
                }
                if (Reflect.has(opened, property)) {
                    throw error(ERR_OPENED_PROP_ACCESS_BLOCKED, property, opened);
                }
                return ret;
            },
            set: function () {},
        });
        openeds.set(opened, p);
    }

    return getProxyByOpened(opened);
}

module.exports = {proxy, getProxyByOpened, forEachOpened};