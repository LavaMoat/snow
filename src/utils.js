const {securely} = require('./securely');
const {toString, nodeType} = require('./natives');

const map = securely(() => ArrayS.prototype.map);
function iterate(arr, cb) {
    map.call(arr, cb);
}

const slice = securely(() => ArrayS.prototype.slice);
function getArguments(args) {
    return slice.call(args);
}

function isTrustedHTML(node) {
    return toString(node) === '[object TrustedHTML]';
}

function getPrototype(node) {
    switch (toString(node)) {
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
    const frames = securely(() => new ArrayS());

    if (null === element || typeof element !== 'object') {
        return frames;
    }

    if (isTrustedHTML(element) || !canNodeRunQuerySelector(element)) {
        return frames;
    }

    const list = securely(() => {
        return getPrototype(element).prototype.querySelectorAll.call(element, 'iframe,frame,object,embed');
    });

    fillArrayUniques(frames, slice.call(list));
    if (includingParent) {
        fillArrayUniques(frames, [element]);
    }

    return frames;
}

function fillArrayUniques(arr, items) {
    let isArrUpdated = false;

    iterate(items, item => {
        if (!arr.includes(item)) {
            arr.push(item);
            isArrUpdated = true;
        }
    });

    return isArrUpdated;
}

module.exports = {getArguments, getFramesArray, isFrameElement, iterate};