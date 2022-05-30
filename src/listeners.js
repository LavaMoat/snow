const natives = require('./natives')();
const hook = require('./hook');

function callOnload(that, onload, args) {
    if (onload) {
        if (onload.handleEvent) {
            return onload.handleEvent.apply(onload, args);
        }
        else {
            return onload.apply(that, args);
        }
    }
}

function getHook(win, native, cb) {
    return function() {
        const args = natives['Array'].prototype.slice.call(arguments);
        const index = typeof args[0] === 'function' ? 0 : 1;
        const onload = args[index];
        args[index] = function listener() {
            hook(win, [this], cb);
            const args = natives['Array'].prototype.slice.call(arguments);
            callOnload(this, onload, args);
        };
        return native.apply(this, args);
    }
}

function hookLoadSetters(win, cb) {
    const addEventListener = natives['Object'].getOwnPropertyDescriptor(natives['EventTarget'].prototype, 'addEventListener').value;
    natives['Object'].defineProperty(win.EventTarget.prototype, 'addEventListener', {value: getHook(win, addEventListener, cb)});
}

module.exports = hookLoadSetters;