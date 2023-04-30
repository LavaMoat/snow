const {stringToLowerCase, stringStartsWith, slice, Function, Object} = require('./natives');
const {warn, WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME} = require('./log');
const {proxy, getProxyByOpened} = require('./proxy');

function hookMessageEvent(win) {
    const desc = Object.getOwnPropertyDescriptor(win.MessageEvent.prototype, 'source');
    const get = desc.get;
    desc.get = function() {
        const source = get.call(this);
        return getProxyByOpened(source) || source;
    };
    Object.defineProperty(win.MessageEvent.prototype, 'source', desc);
}

function hook(win, native, cb) {
    cb(win);
    return function open() {
        const args = slice(arguments);
        const url = args[0] + '', // open accepts non strings too
            target = args[1], windowFeatures = args[2];

        if (stringStartsWith(stringToLowerCase(url), 'javascript')) {
            const blocked = warn(WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME, url, win);
            if (blocked) {
                return null;
            }
        }

        const opened = Function.prototype.call.call(native, this, url, target, windowFeatures);
        if (!opened) {
            return null;
        }

        return proxy(opened);
    };
}

function hookOpen(win) {
    win.open = hook(win, win.open, hookMessageEvent);
    win.document.open = hook(win, win.document.open, hookMessageEvent);
}

module.exports = hookOpen;