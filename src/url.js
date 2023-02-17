const {Object} = require('./natives');
const {error, ERR_BLOB_FILE_URL_OBJECT_FORBIDDEN} = require('./log');

const BLOB = 'Blob', FILE = 'File';

function hookObject(win, prop) {
    const native = win[prop];
    return function(a, b, c) {
        const ret = new native(a, b, c);
        Object.defineProperty(ret, prop, { value: true });
        return ret;
    }
}

function hook(win, native) {
    return function (object) {
        const type = object[BLOB] ? BLOB : (object[FILE] ? FILE : null);
        if (type) {
            if (error(ERR_BLOB_FILE_URL_OBJECT_FORBIDDEN, type, object)) {
                return;
            }
        }
        return native(object);
    };
}

function hookCreateObjectURL(win) {
    Object.defineProperty(win.URL, 'createObjectURL', {
        value: hook(win, win.URL.createObjectURL)
    });
    win[BLOB] = hookObject(win, BLOB);
    win[FILE] = hookObject(win, FILE);
}

module.exports = hookCreateObjectURL;