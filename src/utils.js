const {securely} = require('./securely');
const {tagName, nodeType, slice, Array, parse, stringify} = require('./natives');

const shadows = new Array();

function isShadow(node) {
    return shadows.includes(node);
}

function isTrustedHTML(node) {
    const replacer = (k, v) => (!k && node === v) ? v : ''; // avoid own props
    // normal nodes will parse into objects whereas trusted htmls into strings
    return typeof parse(stringify(node, replacer)) === 'string';
}

function getPrototype(node) {
    if (isShadow(node)) {
        return ShadowRootS;
    }
    switch (nodeType(node)) {
        case NodeS.prototype.DOCUMENT_NODE:
            return DocumentS;
        case NodeS.prototype.DOCUMENT_FRAGMENT_NODE:
            return DocumentFragmentS;
        default:
            return ElementS;
    }
}

function isFrameElement(element) {
    return securely(() => {
        if (nodeType(element) !== ElementS.prototype.ELEMENT_NODE) {
            return false;
        }
        if (isShadow(element)) {
            return false;
        }
        return [
            'IFRAME',
            'FRAME',
            'OBJECT',
            'EMBED',
        ].includesS(tagName(element));
    });
}

function canNodeRunQuerySelector(node) {
    if (isShadow(node)) {
        return true;
    }
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

module.exports = {getFramesArray, isFrameElement, shadows};