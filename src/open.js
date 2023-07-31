const {stringToLowerCase, stringStartsWith, slice, Function, Object} = require('./natives');
const {error, ERR_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME} = require('./log');
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

function hook(win, native, cb, isWindowProxy) {
    cb(win);
    return function open() {
        const args = slice(arguments);

        const url = args[0];
        if (stringStartsWith(stringToLowerCase(url + ''), 'javascript')) {
            throw error(ERR_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME, url + '', win);
        }

        const opened = Function.prototype.apply.call(native, this, args);
        if (!opened) {
            return null;
        }

        if (!isWindowProxy && args.length < 3) {
            return opened;
        }

        return proxy(opened);
    };
}

function hookOpen(win) {
    win.open = hook(win, win.open, hookMessageEvent, true);
    win.document.open = hook(win, win.document.open, hookMessageEvent, false);
}

module.exports = hookOpen;