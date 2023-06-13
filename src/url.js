const {BLOCKED_BLOB_URL} = require('./common');
const {Object, Array, getBlobFileType} = require('./natives');
const {error, ERR_BLOB_FILE_URL_OBJECT_FORBIDDEN, ERR_BLOB_FILE_URL_OBJECT_TYPE_FORBIDDEN} = require('./log');

const KIND = 'KIND', TYPE = 'TYPE';
const BLOB = 'Blob', FILE = 'File', MEDIA_SOURCE = 'MediaSource';

const allowedBlobs = new Array();
const allowedTypes = new Array('text/javascript', 'text/css');

function getHook(native, kind) {
    return function (a, b) {
        const ret = new native(a, b);
        Object.defineProperty(ret, KIND, { value: kind });
        if (kind === BLOB || kind === FILE) {
            Object.defineProperty(ret, TYPE, { value: getBlobFileType(ret) });
        }
        allowedBlobs.push(ret);
        return ret;
    }
}

function hookBlob(win) {
    const native = win[BLOB];
    const hook = getHook(native, BLOB);
    function Blob(a, b) { return hook(a, b) }
    // to pass 'Blob.prototype.isPrototypeOf(b)' test (https://github.com/LavaMoat/snow/issues/87#issue-1751534810)
    Object.setPrototypeOf(native.prototype, Blob.prototype);
    win[BLOB] = Blob;
}

function hookFile(win) {
    const native = win[FILE];
    const hook = getHook(native, FILE);
    function File(a, b) { return hook(a, b) }
    // to pass 'File.prototype.isPrototypeOf(f)' test (https://github.com/LavaMoat/snow/issues/87#issue-1751534810)
    Object.setPrototypeOf(native.prototype, File.prototype);
    win[FILE] = File;
}

function hookMediaSource(win) {
    const native = win[MEDIA_SOURCE];
    const hook = getHook(native, MEDIA_SOURCE);
    function MediaSource(a, b) { return hook(a, b) }
    // MediaSource is expected to have static own props (e.g. isTypeSupported)
    Object.setPrototypeOf(MediaSource, native);
    win[MEDIA_SOURCE] = MediaSource;
}

function isBlobForbidden(object) {
    const index = allowedBlobs.indexOf(object);
    if (index > -1) {
        allowedBlobs.splice(index, 1);
        return false;
    }
    return error(ERR_BLOB_FILE_URL_OBJECT_FORBIDDEN, object);

}
function isTypeForbidden(object) {
    const kind = object[KIND];
    if (kind !== BLOB && kind !== FILE) {
        return false;
    }
    const type = object[TYPE];
    if (allowedTypes.includes(type)) {
        return false;
    }
    return error(ERR_BLOB_FILE_URL_OBJECT_TYPE_FORBIDDEN, object, kind, type);
}

function hook(win) {
    const native = win.URL.createObjectURL;
    function createObjectURL(object) {
        if (isBlobForbidden(object) || isTypeForbidden(object)) {
            return BLOCKED_BLOB_URL;
        }
        return native(object);
    }
    Object.defineProperty(win.URL, 'createObjectURL', {
        value: createObjectURL
    });
}

function hookCreateObjectURL(win) {
    hook(win);
    hookBlob(win);
    hookFile(win);
    hookMediaSource(win);
}

module.exports = hookCreateObjectURL;