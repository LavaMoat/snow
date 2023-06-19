const {trustedHTMLs} = require('./utils');
const {Object, Function} = require('./natives');

function getHook(win, native) {
    return function(a, b) {
        const ret = Function.prototype.call.call(native, this, a, b);
        trustedHTMLs.push(ret);
        return ret;
    };
}

function hookTrustedHTMLs(win) {
    if (typeof TrustedTypePolicy === 'undefined') {
        return;
    }
    const desc = Object.getOwnPropertyDescriptor(TrustedTypePolicy.prototype, 'createHTML');
    desc.configurable = desc.writable = true;
    const val = desc.value;
    desc.value = getHook(win, val);
    Object.defineProperty(TrustedTypePolicy.prototype, 'createHTML', desc);
}

module.exports = hookTrustedHTMLs;