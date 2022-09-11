const securely = require('@weizman/securely')(window, {
    objects: {
        'JSON': ['parse', 'stringify'],
        'document': ['createElement'],
        'Object': ['defineProperty', 'getOwnPropertyDescriptor'],
    },
    prototypes: {
        'Attr': ['localName', 'name', 'nodeName'],
        'String': ['toLowerCase'],
        'Function': ['apply', 'call', 'bind'],
        'Map': ['get', 'set'],
        'Node': ['nodeType', 'parentElement', 'toString'],
        'Document': ['querySelectorAll'],
        'DocumentFragment': ['querySelectorAll', 'toString', 'replaceChildren', 'append', 'prepend'],
        'ShadowRoot': ['querySelectorAll', 'toString', 'innerHTML'],
        'Object': ['toString'],
        'Array': ['includes', 'push', 'slice'],
        'Element': ['innerHTML', 'toString', 'querySelectorAll', 'getAttribute', 'removeAttribute', 'tagName'],
        'HTMLElement': ['onload', 'toString'],
        'HTMLScriptElement': ['src'],
        'HTMLTemplateElement': ['content'],
        'EventTarget': ['addEventListener'],
        'HTMLIFrameElement': ['contentWindow'],
        'HTMLFrameElement': ['contentWindow'],
        'HTMLObjectElement': ['contentWindow'],
    }
});

function getContentWindow(element, tag) {
    switch (tag) {
        case 'IFRAME':
            return natives.iframeContentWindow.call(element);
        case 'FRAME':
            return natives.frameContentWindow.call(element);
        case 'OBJECT':
            return natives.objectContentWindow.call(element);
        case 'EMBED':
            return null;
        default:
            return null;
    }
}

function parse(text, reviver) {
    return natives.parse(text, reviver);
}

function stringify(value, replacer, space) {
    return natives.stringify(value, replacer, space);
}

function Array() {
    return natives.Array.apply(null, slice(arguments));
}

function Map() {
    return new natives.Map();
}

function slice(arr, start, end) {
    return natives.slice.call(arr, start, end);
}

function nodeType(node) {
    return natives.nodeType.call(node);
}

function tagName(element) {
    return natives.tagName.call(element);
}

function toString(object) {
    return natives.toString.call(object);
}

function getOnload(element) {
    return natives.getOnload.call(element);
}

function setOnload(element, onload) {
    return natives.setOnload.call(element, onload);
}

function removeAttribute(element, attribute) {
    return natives.removeAttribute.call(element, attribute);
}

function getAttribute(element, attribute) {
    return natives.getAttribute.call(element, attribute);
}

function addEventListener(element, event, listener, options) {
    return natives.addEventListener.call(element, event, listener, options);
}

function removeEventListener(element, event, listener, options) {
    return natives.removeEventListener.call(element, event, listener, options);
}

function createElement(document, tagName, options) {
    return natives.createElement.call(document, tagName, options);
}

function getInnerHTML(element) {
    return natives.getInnerHTML.call(element);
}

function setInnerHTML(element, html) {
    return natives.setInnerHTML.call(element, html);
}

function getTemplateContent(template) {
    return natives.getTemplateContent.call(template);
}

function getFrameElement(win) {
    return natives.Function.prototype.call.call(natives.getFrameElement, win);
}

function getParentElement(element) {
    return natives.getParentElement.call(element);
}

const natives = securely(() => ({
    Array: ArrayS, Map: MapS, Object: ObjectS, Function: FunctionS,
    Node: NodeS, Element: ElementS, ShadowRoot: ShadowRootS,
    Document: DocumentS, DocumentFragment: DocumentFragmentS,
    parse: JSON.parseS, stringify: JSON.stringifyS,
    iframeContentWindow: Object.getOwnPropertyDescriptor(HTMLIFrameElementS.prototype, 'contentWindow').get,
    frameContentWindow: Object.getOwnPropertyDescriptor(HTMLFrameElementS.prototype, 'contentWindow').get,
    objectContentWindow: Object.getOwnPropertyDescriptor(HTMLObjectElementS.prototype, 'contentWindow').get,
    createElement: Object.getOwnPropertyDescriptor(DocumentS.prototype, 'createElement').value,
    slice: Object.getOwnPropertyDescriptor(ArrayS.prototype, 'slice').value,
    nodeType: Object.getOwnPropertyDescriptor(NodeS.prototype, 'nodeType').get,
    tagName: Object.getOwnPropertyDescriptor(ElementS.prototype, 'tagName').get,
    getInnerHTML: Object.getOwnPropertyDescriptor(ElementS.prototype, 'innerHTML').get,
    setInnerHTML: Object.getOwnPropertyDescriptor(ElementS.prototype, 'innerHTML').set,
    toString: Object.getOwnPropertyDescriptor(ObjectS.prototype, 'toString').value,
    getOnload: Object.getOwnPropertyDescriptor(HTMLElementS.prototype, 'onload').get,
    setOnload: Object.getOwnPropertyDescriptor(HTMLElementS.prototype, 'onload').set,
    getAttribute: Object.getOwnPropertyDescriptor(ElementS.prototype, 'getAttribute').value,
    removeAttribute: Object.getOwnPropertyDescriptor(ElementS.prototype, 'removeAttribute').value,
    addEventListener: Object.getOwnPropertyDescriptor(EventTargetS.prototype, 'addEventListener').value,
    removeEventListener: Object.getOwnPropertyDescriptor(EventTargetS.prototype, 'removeEventListener').value,
    getTemplateContent: Object.getOwnPropertyDescriptor(HTMLTemplateElementS.prototype, 'content').get,
    getFrameElement: Object.getOwnPropertyDescriptor(window, 'frameElement').get,
    getParentElement: Object.getOwnPropertyDescriptor(NodeS.prototype, 'parentElement').get,
}));

module.exports = {
    securely,

    Object: natives.Object,
    Function: natives.Function,
    Node: natives.Node,
    Element: natives.Element,
    Document: natives.Document,
    DocumentFragment: natives.DocumentFragment,
    ShadowRoot: natives.ShadowRoot,

    getParentElement,
    getTemplateContent, getFrameElement,
    getInnerHTML, setInnerHTML,
    getContentWindow,
    createElement,
    slice, Array, Map,
    parse, stringify,
    nodeType, toString, tagName,
    getOnload, setOnload,
    removeAttribute, getAttribute,
    addEventListener, removeEventListener,
}