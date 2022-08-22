const {securely} = require('./securely');
const {toString, nodeType, slice, Array} = require('./natives');

function isTrustedHTML(node) {
    return toString(node) === '[object TrustedHTML]';
}

function getPrototype(node) {
    switch (toString(node)) {
        case '[object ShadowRoot]':
            return ShadowRootS;
        case '[object HTMLDocument]':
            return DocumentS;
        case '[object DocumentFragment]':
            return DocumentFragmentS;
        default:
            return ElementS;
    }
}

function isFrameElement(element) {
    return securely(() => [
        '[object HTMLIFrameElement]',
        '[object HTMLFrameElement]',
        '[object HTMLObjectElement]',
        '[object HTMLEmbedElement]',
    ].includesS(toString(element)));
}

function canNodeRunQuerySelector(node) {
    return securely(() => [
        ElementS.prototype.ELEMENT_NODE,
        ElementS.prototype.DOCUMENT_FRAGMENT_NODE,
        ElementS.prototype.DOCUMENT_NODE,
    ].includesS(nodeType(node)));
}

function getFramesArray(element, includingParent) {
    const frames = new Array();

    if (null === element || typeof element !== 'object') {
        return frames;
    }

    if (isTrustedHTML(element) || !canNodeRunQuerySelector(element)) {
        return frames;
    }

    const list = securely(() => {
        return getPrototype(element).prototype.querySelectorAll.call(element, 'iframe,frame,object,embed');
    });

    fillArrayUniques(frames, slice(list));
    if (includingParent) {
        fillArrayUniques(frames, [element]);
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

module.exports = {getFramesArray, isFrameElement};