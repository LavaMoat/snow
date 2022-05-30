const natives = require('./natives')();

function hookOpen(win, cb) {
    const realOpen = win.open;
    win.open = function() {
        const args = natives['Array'].prototype.slice.call(arguments);
        const opened = realOpen.apply(this, args);
        cb(opened);
        return opened;
    }
}

module.exports = hookOpen;