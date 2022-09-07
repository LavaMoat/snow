const {slice, Function} = require('./natives');
const {warn, WARN_OPEN_API_DISABLED} = require('./log');

function hookOpen(win, cb) {
    const realOpen = win.open;
    win.open = function() {
        const args = slice(arguments);

        const blocked = warn(WARN_OPEN_API_DISABLED, args, win);
        if (blocked) {
            return null;
        }

        const opened = Function.prototype.apply.call(realOpen, this, args);
        cb(opened);
        return opened;
    }
}

module.exports = hookOpen;