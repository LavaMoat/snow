const {securely} = require('./securely');
const {Array} = require('./natives');
const hook = require('./hook');
const {getFramesArray} = require('./utils');

const shadows = new Array();

function protectShadows(win, cb, connectedOnly = false) {
    for (let i = 0; i < shadows.length; i++) {
        const shadow = shadows[i];
        if (connectedOnly && !shadow.isConnected) {
            continue;
        }
        const frames = getFramesArray(shadow, false);
        hook(win, frames, cb); // this doesn't work for elements under shadow!
        cb(win);
    }
}

function getHook(win, native, cb) {
    return function(options) {
        const ret = securely(() => FunctionS.prototype.call).call(native, this, options);
        shadows.push(ret);
        protectShadows(win, cb, true);
        return ret;
    };
}

function hookShadowDOM(win, cb) {
    securely(() => {
        const desc = ObjectS.getOwnPropertyDescriptor(win.Element.prototype, 'attachShadow');
        const val = desc.value;
        desc.value = getHook(win, val, cb);
        ObjectS.defineProperty(win.Element.prototype, 'attachShadow', desc);
    });
}

module.exports = {hookShadowDOM, protectShadows};