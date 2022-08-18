const resetOnloadAttributes = require('./attributes');
const {securely} = require('./securely');
const {getFramesArray, getArguments, iterate} = require('./utils');
const handleHTML = require('./html');
const hook = require('./hook');

const map = {
    Document: ['replaceChildren', 'append', 'prepend', 'write', 'writeln'],
    Node: ['appendChild', 'insertBefore', 'replaceChild'],
    Element: ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'replaceWith', 'insertAdjacentElement', 'append', 'before', 'prepend', 'after', 'replaceChildren'],
};

function getHook(win, native, cb) {
    return function() {
        const args = getArguments(arguments)
        const element = securely(() => this.parentElementS || this);
        resetOnloadAttributes(win, args, cb);
        handleHTML(win, args);
        const ret = securely(() => FunctionS.prototype.apply).call(native, this, args);
        const frames = getFramesArray(element, false);
        hook(win, frames, cb);
        hook(win, args, cb);
        return ret;
    };
}

function hookDOMInserters(win, cb) {
    for (const proto in map) {
        const funcs = map[proto];
        iterate(funcs, func => {
            securely(() => {
                const desc = ObjectS.getOwnPropertyDescriptor(win[proto].prototype, func);
                const prop = desc.set ? 'set' : 'value';
                desc[prop] = getHook(win, desc[prop], cb);
                ObjectS.defineProperty(win[proto].prototype, func, desc);
            });
        });
    }
}

module.exports = hookDOMInserters;