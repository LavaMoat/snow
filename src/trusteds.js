const {trustedHTMLs} = require('./utils');
const {Object, Function} = require('./natives');

function getHook(win, native) {
    trustedHTMLs.push(win.trustedTypes.emptyHTML);
    return function(a, b) {
        const ret = Function.prototype.call.call(native, this, a, b);
        trustedHTMLs.push(ret);
        return ret;
    };
}

function hookTrustedHTMLs(win) {
    if (typeof win.TrustedTypePolicy === 'undefined') {
        return;
    }
    const desc = Object.getOwnPropertyDescriptor(win.TrustedTypePolicy.prototype, 'createHTML');
    desc.configurable = desc.writable = true;
    const val = desc.value;
    desc.value = getHook(win, val);
    Object.defineProperty(win.TrustedTypePolicy.prototype, 'createHTML', desc);
}

module.exports = hookTrustedHTMLs;