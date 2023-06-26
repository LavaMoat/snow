const {protectShadows} = require('./shadow');
const resetOnloadAttributes = require('./attributes');
const {getFramesArray, shadows} = require('./utils');
const {getParentElement, getCommonAncestorContainer, slice, Object, Function} = require('./natives');
const {handleHTML} = require('./html');
const hook = require('./hook');

const map = {
    Range: ['insertNode'],
    DocumentFragment: ['replaceChildren', 'append', 'prepend'],
    Document: ['replaceChildren', 'append', 'prepend', 'write', 'writeln'],
    Node: ['appendChild', 'insertBefore', 'replaceChild'],
    Element: ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'replaceWith', 'insertAdjacentElement', 'append', 'before', 'prepend', 'after', 'replaceChildren'],
    ShadowRoot: ['innerHTML'],
    HTMLIFrameElement: ['srcdoc'],
};

function getHook(native, isRange, isSrcDoc) {
    function before(args) {
        resetOnloadAttributes(args);
        resetOnloadAttributes(shadows);
        handleHTML(args, isSrcDoc);
    }

    function after(args, element) {
        const frames = getFramesArray(element, false);
        hook(frames);
        hook(args);
        protectShadows(true);
    }

    return function() {
        const args = slice(arguments);
        const element = isRange ? getCommonAncestorContainer(this) : getParentElement(this) || this;
        before(args);
        const ret = Function.prototype.apply.call(native, this, args);
        after(args, element);
        return ret;
    };
}

function hookDOMInserters(win) {
    for (const proto in map) {
        if (Object.hasOwnProperty.call(map, proto)) {
            const funcs = map[proto];
            for (let i = 0; i < funcs.length; i++) {
                const func = funcs[i];
                const desc = Object.getOwnPropertyDescriptor(win[proto].prototype, func);
                if (!desc) continue;
                const prop = desc.set ? 'set' : 'value';
                desc[prop] = getHook(desc[prop], proto === 'Range', func === 'srcdoc');
                desc.configurable = true;
                if (prop === 'value') {
                    desc.writable = true;
                }
                Object.defineProperty(win[proto].prototype, func, desc);
            }
        }
    }
}

module.exports = hookDOMInserters;