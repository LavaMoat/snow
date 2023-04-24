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
    if (!win?.documentPictureInPicture?.requestWindow) {
        return;
    }
    win.documentPictureInPicture.requestWindow = hook(win, win.documentPictureInPicture.requestWindow, hookDocumentPictureInPicture);
}

module.exports = hookRequest;