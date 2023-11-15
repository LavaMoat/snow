const {tagName, nodeType, slice, Array, parse, stringify,
    Node, Document, DocumentFragment, Element, ShadowRoot, getContentWindow,
    getDefaultView, getOwnerDocument, stringToLowerCase, Object,
} = require('./natives');

const shadows = new Array(), trustedHTMLs = new Array();

function isShadow(node) {
    return shadows.includes(node);
}

function isTrustedHTML(node) {
    return trustedHTMLs.includes(node);
}

function makeDescriptorSetter(prop, val) {
    const desc = Object.create(null);
    desc.value = val;
    return function(obj) {
        if (!Object.getOwnPropertyDescriptor(obj, prop)) {
            Object.defineProperty(obj, prop, desc)
        }
    };
}

function getPrototype(node) {
    if (isShadow(node)) {
        return ShadowRoot;
    }

    switch (nodeType(node)) {
        case Node.prototype.DOCUMENT_NODE:
            return Document;
        case Node.prototype.DOCUMENT_FRAGMENT_NODE:
            return DocumentFragment;
        default:
            return Element;
    }
}

function isTagFramable(t) {
    const tag = stringToLowerCase(t);
    return tag === 'iframe' || tag === 'frame' || tag === 'object' || tag === 'embed';
}

function getFrameTag(element) {
    if (!element || typeof element !== 'object') {
        return null;
    }

    if (nodeType(element) !== Element.prototype.ELEMENT_NODE) {
        return null;
    }

    if (isShadow(element)) {
        return null;
    }

    const tag = tagName(element);
    if (!isTagFramable(tag)) {
        return null;
    }

    return tag;
}

function toArray(item) {
    if (!Array.isArray(item)) {
        item = new Array(item);
    }
    return item;
}

function getContentWindowOfFrame(iframe) {
    return getContentWindow(iframe, getFrameTag(iframe));
}

function getOwnerWindowOfNode(iframe) {
    return getDefaultView(getOwnerDocument(iframe));
}

function canNodeRunQuerySelector(node) {
    if (isShadow(node)) {
        return true;
    }
    const type = nodeType(node);
    return (
        type === Element.prototype.ELEMENT_NODE ||
        type === Element.prototype.DOCUMENT_FRAGMENT_NODE ||
        type === Element.prototype.DOCUMENT_NODE
    );
}

function getDeclarativeShadows(element) {
    const querySelectorAll = getPrototype(element).prototype.querySelectorAll;
    return querySelectorAll.call(element, 'template[shadowroot]')
}

function getFramesArray(element, includingParent) {
    const frames = new Array();

    if (null === element || typeof element !== 'object') {
        return frames;
    }

    if (isTrustedHTML(element) || !canNodeRunQuerySelector(element)) {
        return frames;
    }

    const querySelectorAll = getPrototype(element).prototype.querySelectorAll;
    const list = querySelectorAll.call(element, 'iframe,frame,object,embed');

    fillArrayUniques(frames, slice(list));
    if (includingParent) {
        fillArrayUniques(frames, toArray(element));
    }

    return frames;
}

function fillArrayUniques(arr, items) {
    let isArrUpdated = false;

    for (let i = 0; i < items.length; i++) {
        if (!arr.includes(items[i])) {
            arr.push(items[i]);
            isArrUpdated = true;
        }
    }

    return isArrUpdated;
}

module.exports = {getDeclarativeShadows, makeDescriptorSetter, toArray, isTagFramable, getOwnerWindowOfNode, getContentWindowOfFrame, getFramesArray, getFrameTag, shadows, trustedHTMLs};