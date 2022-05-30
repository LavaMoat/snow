const {securely} = require('./securely');
const hook = require('./hook');
const {getFramesArray, isFrameElement} = require('./utils');

function resetOnloadAttribute(win, frame, cb) {
    if (!isFrameElement(frame)) {
        return;
    }

    securely(() => {
        const onload = frame.onloadS;
        if (onload) {
            frame.onloadS = null;
            frame.removeAttributeS('onload');
            frame.addEventListenerS('load', function() {
                hook(win, [this], cb);
            });
            frame.onloadS = onload;
        }
    });
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