const hook = require('./hook');
const {securely} = require('./securely');
const {getArguments} = require('./utils');

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

function getHook(win, addEventListener, cb) {
    return function() {
        const args = getArguments(arguments);
        const index = typeof args[0] === 'function' ? 0 : 1;
        const onload = args[index];
        args[index] = function listener() {
            hook(win, [this], cb);
            const args = getArguments(arguments);
            callOnload(this, onload, args);
        };
        return securely(() => this.addEventListenerS(args[0], args[1], args[2], args[3]));
    }
}

function hookLoadSetters(win, cb) {
    securely(() => ObjectS.defineProperty(win.EventTarget.prototype, 'addEventListener', {value: getHook(win, addEventListener, cb)}));
}

module.exports = hookLoadSetters;