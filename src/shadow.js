const hook = require('./hook');
const {getFramesArray, shadows} = require('./utils');
const {Object, Function} = require('./natives');

function protectShadows(connectedOnly) {
    for (let i = 0; i < shadows.length; i++) {
        const shadow = shadows[i];
        if (connectedOnly && !shadow.isConnected) {
            continue;
        }
        const frames = getFramesArray(shadow, false);
        hook(frames);
    }
}

function getHook(win, native) {
    return function(options) {
        const ret = Function.prototype.call.call(native, this, options);
        shadows.push(ret);
        protectShadows(true);
        return ret;
    };
}

function hookShadowDOM(win) {
    const desc = Object.getOwnPropertyDescriptor(win.Element.prototype, 'attachShadow');
    desc.configurable = desc.writable = true;
    const val = desc.value;
    desc.value = getHook(win, val);
    Object.defineProperty(win.Element.prototype, 'attachShadow', desc);
}

module.exports = {hookShadowDOM, protectShadows};