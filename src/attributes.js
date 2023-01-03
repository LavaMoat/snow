const {getOnload, setOnload, removeAttribute, addEventListener, getAttribute, setAttribute, split, stringToLowerCase, Array} = require('./natives');
const {applyHookByString, getFramesArray} = require('./utils');

function resetOnloadHandler(frame, cb) {
    addEventListener(frame, 'load', cb);
    const onload = getOnload(frame);
    if (onload) {
        setOnload(frame, null);
        removeAttribute(frame, 'onload');
        setOnload(frame, onload);
    }
}

function hookOnLoadAttributes(frame) {
    let onload = getAttribute(frame, 'onload');
    if (onload) {
        onload = applyHookByString(onload, 'top.SNOW_FRAME_TO_WINDOW(this)', false);
        setAttribute(frame, 'onload', onload);
    }
}

function hookJavaScriptURI(frame) {
    let src = getAttribute(frame, 'src') || '';
    const [scheme, js] = split(src, ':');
    if (stringToLowerCase(scheme) === 'javascript') {
        src = 'javascript:' + applyHookByString(js, 'window', false);
        setAttribute(frame, 'src', src);
    }
}

function hookSrcDoc(frame, cb) {
    let srcdoc = getAttribute(frame, 'srcdoc');
    if (srcdoc) {
        srcdoc = applyHookByString(srcdoc, 'window', true);
        const html = new Array(srcdoc);
        if (cb) cb(html);
        setAttribute(frame, 'srcdoc', html[0]);
    }
}

function hookAttributes(elements, includingParent, cb) {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const frames = getFramesArray(element, includingParent);
        for (let j = 0; j < frames.length; j++) {
            const frame = frames[j];
            resetOnloadHandler(frame, cb);
            hookOnLoadAttributes(frame);
            hookJavaScriptURI(frame);
            hookSrcDoc(frame, cb);
        }
    }
}

module.exports = {hookAttributes};