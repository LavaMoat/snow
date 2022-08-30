const {slice} = require('./natives');

// https://github.com/lavamoat/snow/issues/2
const ISSUE_2_SOLVED = false;

function hookOpen(win, cb) {
    const realOpen = win.open;
    win.open = function() {
        if (!ISSUE_2_SOLVED) {
            return null;
        }

        const args = slice(arguments);
        const opened = realOpen.apply(this, args);
        cb(opened);
        return opened;
    }
}

module.exports = hookOpen;