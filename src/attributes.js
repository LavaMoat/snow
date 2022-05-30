const natives = require('./natives')();
const hook = require('./hook');
const {getFramesArray, isFrameElement} = require('./utils');

function resetOnloadAttribute(win, frame, cb) {
    if (!isFrameElement(frame)) {
        return;
    }

    const onload = natives['getOnload'].call(frame);
    if (onload) {
        natives['setOnload'].call(frame, null);
        natives['Element'].prototype.removeAttribute.call(frame, 'onload');
        natives['addEventListener'].call(frame, 'load', function() {
            hook(win, [this], cb);
        });
        natives['setOnload'].call(frame, onload);
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