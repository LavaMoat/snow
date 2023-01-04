const hook = require('./hook');
const {getFramesArray, getFrameTag} = require('./utils');
const {getOnload, setOnload, removeAttribute, addEventListener} = require('./natives');

function resetOnloadAttribute(frame) {
    if (!getFrameTag(frame)) {
        return;
    }

    addEventListener(frame, 'load', function() {
        hook(frame);
    });

    const onload = getOnload(frame);
    if (onload) {
        setOnload(frame, null);
        removeAttribute(frame, 'onload');
        setOnload(frame, onload);
    }
}

function resetOnloadAttributes(args) {
    for (let i = 0; i < args.length; i++) {
        const element = args[i];
        const frames = getFramesArray(element, true);
        for (let i = 0; i < frames.length; i++) {
            const frame = frames[i];
            resetOnloadAttribute(frame);
        }
    }
}

module.exports = resetOnloadAttributes;