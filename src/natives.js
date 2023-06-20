const {runInNewRealm} = require('./common');

function natives(win) {
    const {EventTarget} = win; // PR#62
    return runInNewRealm(function(win) {
        const {
            URL,
            Proxy,
            JSON,
            Attr,
            String,
            Function,
            Map,
            Node,
            Document,
            DocumentFragment,
            Blob,
            ShadowRoot,
            Object,
            Reflect,
            Array,
            Element,
            HTMLElement,
            Range,
            HTMLIFrameElement,
            HTMLFrameElement,
            HTMLObjectElement,
			XMLSerializer
        } = win;
        const bag = {
            URL,
            Proxy,
            JSON,
            Attr,
            String,
            Function,
            Map,
            Node,
            Document,
            DocumentFragment,
            Blob,
            ShadowRoot,
            Object,
            Reflect,
            Array,
            Element,
            HTMLElement,
            Range,
            EventTarget,
            HTMLIFrameElement,
            HTMLFrameElement,
            HTMLObjectElement,
			XMLSerializer
        };
        bag.document = {
            createElement: win.document.createElement.bind(win.document),
        };
        return bag;
    });
}

function setup(win) {
    const bag = natives(win);

    const {
        document,
        URL,
        Proxy,
        Function,
        String,
        Map,
        Node,
        Document,
        DocumentFragment,
        Blob,
        ShadowRoot,
        Object,
        Reflect,
        Array,
        Element,
        HTMLElement,
        Range,
        EventTarget,
        HTMLIFrameElement,
        HTMLFrameElement,
        HTMLObjectElement,
		XMLSerializer
    } = bag;

    Object.assign(bag, {
        iframeContentWindow: Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow').get,
        frameContentWindow: Object.getOwnPropertyDescriptor(HTMLFrameElement.prototype, 'contentWindow').get,
        objectContentWindow: Object.getOwnPropertyDescriptor(HTMLObjectElement.prototype, 'contentWindow').get,
        createElement: Object.getOwnPropertyDescriptor(Document.prototype, 'createElement').value,
        slice: Object.getOwnPropertyDescriptor(Array.prototype, 'slice').value,
        push: Object.getOwnPropertyDescriptor(Array.prototype, 'push').value,
        split: Object.getOwnPropertyDescriptor(String.prototype, 'split').value,
        nodeType: Object.getOwnPropertyDescriptor(Node.prototype, 'nodeType').get,
        tagName: Object.getOwnPropertyDescriptor(Element.prototype, 'tagName').get,
        getInnerHTML: Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').get,
        setInnerHTML: Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set,
        toString: Object.getOwnPropertyDescriptor(Object.prototype, 'toString').value,
        getOnload: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onload').get,
        setOnload: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onload').set,
        getAttribute: Object.getOwnPropertyDescriptor(Element.prototype, 'getAttribute').value,
        setAttribute: Object.getOwnPropertyDescriptor(Element.prototype, 'setAttribute').value,
        removeAttribute: Object.getOwnPropertyDescriptor(Element.prototype, 'removeAttribute').value,
        remove: Object.getOwnPropertyDescriptor(Element.prototype, 'remove').value,
        addEventListener: Object.getOwnPropertyDescriptor(EventTarget.prototype, 'addEventListener').value,
        removeEventListener: Object.getOwnPropertyDescriptor(EventTarget.prototype, 'removeEventListener').value,
        getChildElementCount: Object.getOwnPropertyDescriptor(Element.prototype, 'childElementCount').get,
        getFrameElement: Object.getOwnPropertyDescriptor(win, 'frameElement').get,
        getParentElement: Object.getOwnPropertyDescriptor(Node.prototype, 'parentElement').get,
        getOwnerDocument: Object.getOwnPropertyDescriptor(Node.prototype, 'ownerDocument').get,
        getDefaultView: Object.getOwnPropertyDescriptor(Document.prototype, 'defaultView').get,
        getBlobFileType: Object.getOwnPropertyDescriptor(Blob.prototype, 'type').get,
        getCommonAncestorContainer: Object.getOwnPropertyDescriptor(Range.prototype, 'commonAncestorContainer').get,
    });

    return {
        document,
        Proxy,
        Object,
        Reflect,
        Function,
        Node,
        Element,
        Document,
        DocumentFragment,
        Blob,
        ShadowRoot,
        Array,
        Map,
        getContentWindow,
        stringToLowerCase,
        stringStartsWith,
        parse,
        stringify,
        slice,
        push,
        split,
        nodeType,
        tagName,
        toString,
        getOnload,
        setOnload,
        remove,
        removeAttribute,
        getAttribute,
        setAttribute,
        addEventListener,
        removeEventListener,
        createElement,
        getInnerHTML,
        setInnerHTML,
        getChildElementCount,
        getFrameElement,
        getParentElement,
        getOwnerDocument,
        getDefaultView,
        getBlobFileType,
        getCommonAncestorContainer,
		XMLSerializer
    };

    function getContentWindow(element, tag) {
        switch (tag) {
            case 'IFRAME':
                return bag.iframeContentWindow.call(element);
            case 'FRAME':
                return bag.frameContentWindow.call(element);
            case 'OBJECT':
                return bag.objectContentWindow.call(element);
            case 'EMBED':
                return null;
            default:
                return null;
        }
    }

    function stringToLowerCase(string) {
        return bag.String.prototype.toLowerCase.call(string);
    }

    function stringStartsWith(string, find) {
        return bag.String.prototype.startsWith.call(string, find);
    }

    function parse(text, reviver) {
        return bag.JSON.parse(text, reviver);
    }

    function stringify(value, replacer, space) {
        return bag.JSON.stringify(value, replacer, space);
    }

    function slice(arr, start, end) {
        return bag.slice.call(arr, start, end);
    }

    function push(arr, item) {
        return bag.push.call(arr, item);
    }

    function split(string, delimiter) {
        return bag.split.call(string, delimiter);
    }

    function nodeType(node) {
        return bag.nodeType.call(node);
    }

    function tagName(element) {
        return bag.tagName.call(element);
    }

    function toString(object) {
        return bag.toString.call(object);
    }

    function getOnload(element) {
        return bag.getOnload.call(element);
    }

    function setOnload(element, onload) {
        return bag.setOnload.call(element, onload);
    }

    function remove(element) {
        return bag.remove.call(element);
    }

    function removeAttribute(element, attribute) {
        return bag.removeAttribute.call(element, attribute);
    }

    function getAttribute(element, attribute) {
        return bag.getAttribute.call(element, attribute);
    }

    function setAttribute(element, attribute, value) {
        return bag.setAttribute.call(element, attribute, value);
    }

    function addEventListener(element, event, listener, options) {
        return bag.addEventListener.call(element, event, listener, options);
    }

    function removeEventListener(element, event, listener, options) {
        return bag.removeEventListener.call(element, event, listener, options);
    }

    function createElement(document, tagName, options) {
        return bag.createElement.call(document, tagName, options);
    }

    function getInnerHTML(element) {
        return bag.getInnerHTML.call(element);
    }

    function setInnerHTML(element, html) {
        return bag.setInnerHTML.call(element, html);
    }

    function getChildElementCount(element) {
        return bag.getChildElementCount.call(element);
    }

    function getFrameElement(win) {
        return bag.Function.prototype.call.call(bag.getFrameElement, win);
    }

    function getParentElement(element) {
        return bag.getParentElement.call(element);
    }

    function getOwnerDocument(node) {
        return bag.getOwnerDocument.call(node);
    }

    function getDefaultView(document) {
        return bag.getDefaultView.call(document);
    }

    function getBlobFileType(blob) {
        return bag.getBlobFileType.call(blob);
    }

    function getCommonAncestorContainer(range) {
        return bag.getCommonAncestorContainer.call(range);
    }
}

module.exports = setup(top);
