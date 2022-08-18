const hook = require('./hook');
const {getFramesArray, isFrameElement, iterate} = require('./utils');
const {getOnload, setOnload, removeAttribute, addEventListener} = require('./natives');

function resetOnloadAttribute(win, frame, cb) {
    if (!isFrameElement(frame)) {
        return;
    }

    const onload = getOnload(frame);
    if (onload) {
        setOnload(frame, null);
        removeAttribute(frame, 'onload');
        addEventListener(frame, 'load', function() {
            hook(win, [this], cb);
        });
        setOnload(frame, onload);
    }
}

function resetOnloadAttributes(win, args, cb) {
    iterate(args, element => {
        const frames = getFramesArray(element, true);
        iterate(frames, frame => {
            resetOnloadAttribute(win, frame, cb);
        });
    });
}

module.exports = resetOnloadAttributes;