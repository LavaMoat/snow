const natives = require('./natives')();

function getNodeType(node) {
    return natives['getNodeType'].call(node);
}

function getPrototypeAsString(node) {
    return natives['toStringObject'].call(node);
}

function isTrustedHTML(node) {
    return getPrototypeAsString(node) === '[object TrustedHTML]';
}

function getPrototype(node) {
    switch (getPrototypeAsString(node)) {
        case '[object HTMLDocument]':
            return natives['Document'];
        case '[object DocumentFragment]':
            return natives['DocumentFragment'];
        default:
            return natives['Element'];
    }
}

function isFrameElement(element) {
    const string = natives['toStringObject'].call(element);
    return natives['Array'].prototype.includes.call([
        '[object HTMLIFrameElement]',
        '[object HTMLFrameElement]',
        '[object HTMLObjectElement]',
        '[object HTMLEmbedElement]',
    ], string);
}

function canNodeRunQuerySelector(node) {
    const nodeType = getNodeType(node);
    return natives['Array'].prototype.includes.call([
        natives['Element'].prototype.ELEMENT_NODE,
        natives['Element'].prototype.DOCUMENT_FRAGMENT_NODE,
        natives['Element'].prototype.DOCUMENT_NODE,
    ], nodeType);
}

function getFramesArray(element, includingParent) {
    const frames = [];

    if (null === element || typeof element !== 'object') {
        return frames;
    }

    if (isTrustedHTML(element) || !canNodeRunQuerySelector(element)) {
        return frames;
    }

    const list = getPrototype(element).prototype.querySelectorAll.call(element, 'iframe,frame,object,embed');

    fillArrayUniques(frames, natives['Array'].prototype.slice.call(list));
    if (includingParent) {
        fillArrayUniques(frames, [element]);
    }

    return frames;
}

function fillArrayUniques(arr, items) {
    let isArrUpdated = false;

    for (let i = 0; i < items.length; i++) {
        if (!natives['Array'].prototype.includes.call(arr, items[i])) {
            natives['Array'].prototype.push.call(arr, items[i]);
            isArrUpdated = true;
        }
    }

    return isArrUpdated;
}

module.exports = {getFramesArray, isFrameElement};