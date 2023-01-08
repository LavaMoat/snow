const {Object, Function} = require('./natives');
const {isTagFramable} = require('./utils');
const {error, ERR_EXTENDING_FRAMABLES_BLOCKED} = require('./log');

function getHook(win, native) {
    return function(name, constructor, options) {
        let opts = options;
        if (options) {
            const extend = options.extends;
            if (isTagFramable(extend+'')) {
                const blocked = error(ERR_EXTENDING_FRAMABLES_BLOCKED, name, options);
                if (blocked) {
                    opts = undefined;
                }
            }
        }
        return Function.prototype.call.call(native, this, name, constructor, opts);
    };
}

function hookCustoms(win) {
    const desc = Object.getOwnPropertyDescriptor(win.CustomElementRegistry.prototype, 'define');
    desc.configurable = desc.writable = true;
    const val = desc.value;
    desc.value = getHook(win, val);
    Object.defineProperty(win.CustomElementRegistry.prototype, 'define', desc);
}

module.exports = hookCustoms;