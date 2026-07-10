const {Object, slice, Function} = require('./natives');
const {proxy} = require('./proxy');

function hookDocumentPictureInPicture(win, prop) {
    const desc = Object.getOwnPropertyDescriptor(win[prop].prototype, 'window');
    const get = desc.get;
    desc.get = function() {
        return proxy(get.call(this));
    };
    Object.defineProperty(win[prop].prototype, 'window', desc);
}

function hook(win, native, cb) {
    cb(win, 'DocumentPictureInPictureEvent');
    cb(win, 'DocumentPictureInPicture');
    return async function open() {
        const args = slice(arguments);

        const opened = await Function.prototype.apply.call(native, this, args);
        if (!opened) {
            return null;
        }

        return proxy(opened);
    };
}

function hookRequest(win) {
    // Reach requestWindow through the interface object's prototype rather
    // than win.documentPictureInPicture: the attribute getter lazily
    // instantiates a per-window DocumentPictureInPicture, and on Firefox
    // (which shipped the API in 151) the instance's preserved wrapper pins
    // the entire window realm after the window closes, leaking every
    // protected window's document. Prototype access does not instantiate,
    // and instance method lookup falls through to the patched prototype.
    const proto = win?.DocumentPictureInPicture?.prototype;
    if (!proto?.requestWindow) {
        return;
    }
    proto.requestWindow = hook(win, proto.requestWindow, hookDocumentPictureInPicture);
}

module.exports = hookRequest;