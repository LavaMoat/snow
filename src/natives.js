function natively(win, cb) {
    const ifr = win.document.createElement('iframe');
    win.document.head.appendChild(ifr);
    const ret = cb(ifr.contentWindow);
    ifr.parentElement.removeChild(ifr);
    return ret;
}

function generateNatives(win) {
    return natively(win, function(win) {
        const {
            JSON,
            Attr,
            String,
            Function,
            Map,
            Node,
            Document,
            DocumentFragment,
            ShadowRoot,
            Object,
            Array,
            Element,
            HTMLElement,
            HTMLTemplateElement,
            EventTarget,
            HTMLIFrameElement,
            HTMLFrameElement,
            HTMLObjectElement,
        } = win;
        const natives = {
            JSON,
            Attr,
            String,
            Function,
            Map,
            Node,
            Document,
            DocumentFragment,
            ShadowRoot,
            Object,
            Array,
            Element,
            HTMLElement,
            HTMLTemplateElement,
            EventTarget,
            HTMLIFrameElement,
            HTMLFrameElement,
            HTMLObjectElement,
        };
        natives.document = {
            createElement: win.document.createElement,
        };
        return natives;
    });
}

function setup(win) {
    const natives = generateNatives(win);

    const {
        Function,
        Map,
        Node,
        Document,
        DocumentFragment,
        ShadowRoot,
        Object,
        Array,
        Element,
        HTMLElement,
        HTMLTemplateElement,
        EventTarget,
        HTMLIFrameElement,
        HTMLFrameElement,
        HTMLObjectElement,
    } = natives;

    Object.assign(natives, {
        iframeContentWindow: Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow').get,
        frameContentWindow: Object.getOwnPropertyDescriptor(HTMLFrameElement.prototype, 'contentWindow').get,
        objectContentWindow: Object.getOwnPropertyDescriptor(HTMLObjectElement.prototype, 'contentWindow').get,
        createElement: Object.getOwnPropertyDescriptor(Document.prototype, 'createElement').value,
        slice: Object.getOwnPropertyDescriptor(Array.prototype, 'slice').value,
        nodeType: Object.getOwnPropertyDescriptor(Node.prototype, 'nodeType').get,
        tagName: Object.getOwnPropertyDescriptor(Element.prototype, 'tagName').get,
        getInnerHTML: Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').get,
        setInnerHTML: Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set,
        toString: Object.getOwnPropertyDescriptor(Object.prototype, 'toString').value,
        getOnload: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onload').get,
        setOnload: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onload').set,
        getAttribute: Object.getOwnPropertyDescriptor(Element.prototype, 'getAttribute').value,
        removeAttribute: Object.getOwnPropertyDescriptor(Element.prototype, 'removeAttribute').value,
        addEventListener: Object.getOwnPropertyDescriptor(EventTarget.prototype, 'addEventListener').value,
        removeEventListener: Object.getOwnPropertyDescriptor(EventTarget.prototype, 'removeEventListener').value,
        getTemplateContent: Object.getOwnPropertyDescriptor(HTMLTemplateElement.prototype, 'content').get,
        getFrameElement: Object.getOwnPropertyDescriptor(win, 'frameElement').get,
        getParentElement: Object.getOwnPropertyDescriptor(Node.prototype, 'parentElement').get,
    });

    return {
        Object,
        Function,
        Node,
        Element,
        Document,
        DocumentFragment,
        ShadowRoot,
        Array,
        Map,
        getContentWindow,
        parse,
        stringify,
        slice,
        nodeType,
        tagName,
        toString,
        getOnload,
        setOnload,
        removeAttribute,
        getAttribute,
        addEventListener,
        removeEventListener,
        createElement,
        getInnerHTML,
        setInnerHTML,
        getTemplateContent,
        getFrameElement,
        getParentElement,
    };

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
        return natives.JSON.parse(text, reviver);
    }

    function stringify(value, replacer, space) {
        return natives.JSON.stringify(value, replacer, space);
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
}

module.exports = setup(top);