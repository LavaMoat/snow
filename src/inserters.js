const {protectShadows} = require('./shadow');
const {hookAttributes} = require('./attributes');
const {getFramesArray, shadows} = require('./utils');
const {getParentElement, slice, Object, Function} = require('./natives');
const {handleHTML} = require('./html');
const hook = require('./hook');

const map = {
    DocumentFragment: ['replaceChildren', 'append', 'prepend'],
    Document: ['replaceChildren', 'append', 'prepend', 'write', 'writeln'],
    Node: ['appendChild', 'insertBefore', 'replaceChild'],
    Element: ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'replaceWith', 'insertAdjacentElement', 'append', 'before', 'prepend', 'after', 'replaceChildren'],
    ShadowRoot: ['innerHTML'],
    HTMLIFrameElement: ['srcdoc'],
};

function getHook(win, native, cb, callHook) {
    return function() {
        function xx() { hook(win, [this], cb) }
        const args = slice(arguments);
        const element = getParentElement(this) || this;
        hookAttributes(args, true, xx);
        hookAttributes(shadows, false, xx);
        handleHTML(args, callHook);
        const ret = Function.prototype.apply.call(native, this, args);
        const frames = getFramesArray(element, false);
        hook(win, frames, cb);
        hook(win, args, cb);
        protectShadows(win, cb, true);
        return ret;
    };
}

function hookDOMInserters(win, cb) {
    for (const proto in map) {
        const funcs = map[proto];
        for (let i = 0; i < funcs.length; i++) {
            const func = funcs[i];
            const desc = Object.getOwnPropertyDescriptor(win[proto].prototype, func);
            const prop = desc.set ? 'set' : 'value';
            desc[prop] = getHook(win, desc[prop], cb, func === 'srcdoc');
            desc.configurable = true;
            if (prop === 'value') {
                desc.writable = true;
            }
            Object.defineProperty(win[proto].prototype, func, desc);
        }
    }
}

module.exports = hookDOMInserters;