const {error, ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED} = require('./log');
const {protectShadows} = require('./shadow');
const resetOnloadAttributes = require('./attributes');
const {getFramesArray, shadows} = require('./utils');
const {getParentElement, getCommonAncestorContainer, slice, stringToLowerCase, Object, Function} = require('./natives');
const {assertHTML} = require('./html');
const hook = require('./hook');

const map = {
    Range: ['insertNode'],
    DocumentFragment: ['replaceChildren', 'append', 'prepend'],
    Document: ['replaceChildren', 'append', 'prepend', 'write', 'writeln', 'execCommand'],
    Node: ['appendChild', 'insertBefore', 'replaceChild'],
    Element: ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'replaceWith', 'insertAdjacentElement', 'append', 'before', 'prepend', 'after', 'replaceChildren', 'setAttribute'],
    ShadowRoot: ['innerHTML'],
    HTMLIFrameElement: ['srcdoc'],
};

const protos = Object.getOwnPropertyNames(map);

// a frame already connected/marked gets a brand-new global object on re-navigation (e.g. re-assigning
// srcdoc), which drops SNOW's marking; the `load` event fires only after the new document's own
// scripts already ran, so re-marking after the fact is always too late. instead, this is prepended to
// srcdoc content so the browser's own HTML parser guarantees it runs before any of that content's scripts.
const SRCDOC_BOOTSTRAP = '<script>top.SNOW_WINDOW(window)</script>';

function getHook(native, isRange, isWrite, isSrcdoc, isSrcdocAttr) {
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
            throw error(ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED, this);
        }
        const args = slice(arguments);

        if (isSrcdocAttr && stringToLowerCase(args[0]+'') !== 'srcdoc') {
            return Function.prototype.apply.call(native, this, args);
        }

        const htmlArgIndex = isSrcdocAttr ? 1 : 0;
        if ((isSrcdoc || isSrcdocAttr) && typeof args[htmlArgIndex] === 'string') {
            args[htmlArgIndex] = SRCDOC_BOOTSTRAP + args[htmlArgIndex];
        }

        const htmlArgs = isSrcdocAttr ? [args[htmlArgIndex]] : args;
        const element = isRange ? getCommonAncestorContainer(this) : getParentElement(this) || this;
        before(htmlArgs);
        const ret = Function.prototype.apply.call(native, this, args);
        after(htmlArgs, element);
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
                isWrite = func === 'write' || func === 'writeln',
                isSrcdoc = proto === 'HTMLIFrameElement' && func === 'srcdoc',
                isSrcdocAttr = func === 'setAttribute';
            desc[prop] = getHook(desc[prop], isRange, isWrite, isSrcdoc, isSrcdocAttr);
            desc.configurable = true;
            if (prop === 'value') {
                desc.writable = true;
            }
            Object.defineProperty(win[proto].prototype, func, desc);
        }
    }
}

module.exports = hookDOMInserters;