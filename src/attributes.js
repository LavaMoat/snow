const hook = require('./hook');
const {getFramesArray, getFrameTag} = require('./utils');
const {getOnload, setOnload, removeAttribute, addEventListener} = require('./natives');

function resetOnloadAttribute(win, frame, cb) {
    if (!getFrameTag(frame)) {
        return;
    }

    addEventListener(frame, 'load', function() {
        hook(win, [this], cb);
    });

    const onload = getOnload(frame);
    if (onload) {
        setOnload(frame, null);
        removeAttribute(frame, 'onload');
        setOnload(frame, onload);
    }
}

function resetOnloadAttributes(win, args, cb) {
    for (let i = 0; i < args.length; i++) {
        const element = args[i];
        const frames = getFramesArray(element, true);
        for (let i = 0; i < frames.length; i++) {
            const frame = frames[i];
            resetOnloadAttribute(win, frame, cb);
        }
    }
}

module.exports = resetOnloadAttributes;