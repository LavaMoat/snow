const {error, ERR_DOCUMENT_WRITE_NOT_IN_TOP_FORBIDDEN} = require('./log');
const {protectShadows} = require('./shadow');
const resetOnloadAttributes = require('./attributes');
const {getFramesArray, shadows} = require('./utils');
const {getParentElement, getCommonAncestorContainer, slice, Object, Function} = require('./natives');
const {assertHTML} = require('./html');
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

const protos = Object.getOwnPropertyNames(map);

function getHook(native, isRange, isWrite) {
    function before(args) {
        resetOnloadAttributes(args);
        resetOnloadAttributes(shadows);
        assertHTML(args);
    }

    function after(args, element) {
        const frames = getFramesArray(element, false);
        hook(frames);
        hook(args);
        protectShadows(true);
    }

    return function() {
        if (isWrite && this !== top.document) {
            throw error(ERR_DOCUMENT_WRITE_NOT_IN_TOP_FORBIDDEN, this);
        }
        const args = slice(arguments);
        const element = isRange ? getCommonAncestorContainer(this) : getParentElement(this) || this;
        before(args);
        const ret = Function.prototype.apply.call(native, this, args);
        after(args, element);
        return ret;
    };
}

function hookDOMInserters(win) {
    for (let i = 0; i < protos.length; i++) {
        const proto = protos[i];
        const funcs = map[proto];
        for (let i = 0; i < funcs.length; i++) {
            const func = funcs[i];
            const desc = Object.getOwnPropertyDescriptor(win[proto].prototype, func);
            if (!desc) continue;
            const prop = desc.set ? 'set' : 'value';
            const
                isRange = proto === 'Range',
                isWrite = func === 'write' || func === 'writeln';
            desc[prop] = getHook(desc[prop], isRange, isWrite);
            desc.configurable = true;
            if (prop === 'value') {
                desc.writable = true;
            }
            Object.defineProperty(win[proto].prototype, func, desc);
        }
    }
}

module.exports = hookDOMInserters;