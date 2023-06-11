const {Object, Array} = require('./natives');
const {error, ERR_BLOB_FILE_URL_OBJECT_FORBIDDEN} = require('./log');

const IS = 'IS', TYPE = 'TYPE',
    BLOB = 'Blob', FILE = 'File', MEDIA_SOURCE = 'MediaSource';

const allowedBlobs = new Array();
const allowedTypes = new Array('text/javascript');

function hookBlob(win) {
    const native = win[BLOB];
    const getType = Object.getOwnPropertyDescriptor(native.prototype, 'type').get;
    function Blob(a,b) {
        const x = new native(a,b);
        Object.defineProperty(x, IS, { value: BLOB });
        Object.defineProperty(x, TYPE, { value: getType.call(x) });
        allowedBlobs.push(x);
        return x;
    }
    Object.setPrototypeOf(native.prototype, Blob.prototype);
    win[BLOB] = Blob;
}

function hookFile(win) {
    const native = win[FILE];
    const getType = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(native).prototype, 'type').get;
    function File(a,b) {
        const x = new native(a,b);
        Object.defineProperty(x, IS, { value: FILE });
        Object.defineProperty(x, TYPE, { value: getType.call(x) });
        allowedBlobs.push(x);
        return x;
    }
    Object.setPrototypeOf(native.prototype, File.prototype);
    win[FILE] = File;
}

function hookMediaSource(win) {
    const native = win[MEDIA_SOURCE];
    function MediaSource(a,b) {
        const x = new native(a,b);
        Object.defineProperty(x, IS, { value: MEDIA_SOURCE });
        allowedBlobs.push(x);
        return x;
    }
    Object.setPrototypeOf(MediaSource.prototype, native.prototype);
    Object.setPrototypeOf(MediaSource, native);
    win[MEDIA_SOURCE] = MediaSource;
}

function hook(win, native) {
    return function (object) {
        if (!allowedBlobs.includes(object)) {
            if (error(ERR_BLOB_FILE_URL_OBJECT_FORBIDDEN, 'unknown', object)) {
                return;
            }
        }
        const is = object[IS];
        if (is === BLOB || is === FILE) {
            const type = object[TYPE];
            if (!allowedTypes.includes(type)) {
                // remove from allowedTypes after usage is safe??
                if (error(ERR_BLOB_FILE_URL_OBJECT_FORBIDDEN, is, object)) {
                    return;
                }
            }
        }
        return native(object);
    };
}

function hookCreateObjectURL(win) {
    Object.defineProperty(win.URL, 'createObjectURL', {
        value: hook(win, win.URL.createObjectURL)
    });
    hookBlob(win);
    hookFile(win);
    hookMediaSource(win);
}

module.exports = hookCreateObjectURL;