const {Object, Function} = require('./natives');
const {isTagFramable} = require('./utils');
const {error, ERR_EXTENDING_FRAMABLES_BLOCKED} = require('./log');

function getHook(win, native) {
    return function(name, constructor, options) {
        let opts = options;
        if (options) {
            const extend = options.extends;
            if (isTagFramable(extend+'')) {
                throw error(ERR_EXTENDING_FRAMABLES_BLOCKED, name, options);
            }
        }
        return Function.prototype.call.call(native, this, name, constructor, opts);
    };
}

function hookCustoms(win) {
    // some engines expose "define" as an own property of customElements instead of on the prototype
    const target = Object.getOwnPropertyDescriptor(win.customElements, 'define')
        ? win.customElements
        : win.CustomElementRegistry.prototype;
    const desc = Object.getOwnPropertyDescriptor(target, 'define');
    desc.configurable = desc.writable = true;
    const val = desc.value;
    desc.value = getHook(win, val);
    Object.defineProperty(target, 'define', desc);
}

module.exports = hookCustoms;