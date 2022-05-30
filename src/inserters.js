const natives = require('./natives')();
const resetOnloadAttributes = require('./attributes');
const {getFramesArray} = require('./utils');
const handleHTML = require('./html');
const hook = require('./hook');

const map = {
    Document: ['replaceChildren', 'append', 'prepend', 'write', 'writeln'],
    Node: ['appendChild', 'insertBefore', 'replaceChild'],
    Element: ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'replaceWith', 'insertAdjacentElement', 'append', 'before', 'prepend', 'after', 'replaceChildren'],
};

function getHook(win, native, cb) {
    return function() {
        const args = natives['Array'].prototype.slice.call(arguments);
        const element = natives['getParentElement'].call(this) || this;
        resetOnloadAttributes(win, args, cb);
        handleHTML(win, args);
        const ret = native.apply(this, args);
        const frames = getFramesArray(element, false);
        hook(win, frames, cb);
        hook(win, args, cb);
        return ret;
    };
}

function hookDOMInserters(win, cb) {
    for (const proto in map) {
        const funcs = map[proto];
        for (let i = 0; i < funcs.length; i++) {
            const func = funcs[i];
            const desc = natives['Object'].getOwnPropertyDescriptor(natives[proto].prototype, func);
            const prop = desc.set ? 'set' : 'value';
            const native = desc[prop];
            desc[prop] = getHook(win, native, cb);
            natives['Object'].defineProperty(win[proto].prototype, func, desc);
        }
    }
}

module.exports = hookDOMInserters;