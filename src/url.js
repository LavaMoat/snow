const {Object, Array, getBlobFileType} = require('./natives');
const {error, ERR_BLOB_TYPE_BLOCKED} = require('./log');

const KIND = 'KIND', TYPE = 'TYPE';
const BLOB = 'Blob', FILE = 'File', MEDIA_SOURCE = 'MediaSource';

// blobs that were JS crafted by Blob constructor rather than naturally created by the browser from a remote resource
const artificialBlobs = new Array();
const allowedTypes = new Array(
    '',
    'text/javascript',
    'text/css',
    'application/javascript',
    'application/css',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'audio/ogg; codecs=opus',
    'video/mp4',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
);

function getHook(native, kind) {
    return function (a, b) {
        const ret = new native(a, b);
        Object.defineProperty(ret, KIND, { value: kind });
        if (kind === BLOB || kind === FILE) {
            Object.defineProperty(ret, TYPE, { value: getBlobFileType(ret) });
        }
        artificialBlobs.push(ret);
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
    Object.defineProperty(native.prototype, 'constructor', {value: Blob});
}

function hookFile(win) {
    const native = win[FILE];
    const hook = getHook(native, FILE);
    function File(a, b) { return hook(a, b) }
    // to pass 'File.prototype.isPrototypeOf(f)' test (https://github.com/LavaMoat/snow/issues/87#issue-1751534810)
    Object.setPrototypeOf(native.prototype, File.prototype);
    Object.setPrototypeOf(File.prototype, win[BLOB].prototype);
    win[FILE] = File;
    Object.defineProperty(native.prototype, 'constructor', {value: File});
}

function hookMediaSource(win) {
    const native = win[MEDIA_SOURCE];
    const hook = getHook(native, MEDIA_SOURCE);
    function MediaSource(a, b) { return hook(a, b) }
    // MediaSource is expected to have static own props (e.g. isTypeSupported)
    Object.setPrototypeOf(MediaSource, native);
    win[MEDIA_SOURCE] = MediaSource;
    Object.defineProperty(native.prototype, 'constructor', {value: MediaSource});
}

function isBlobArtificial(object) {
    return artificialBlobs.includes(object);

}

function assertTypeIsForbidden(object) {
    const kind = object[KIND];
    if (kind === BLOB || kind === FILE) {
        const type = object[TYPE];
        if (!allowedTypes.includes(type)) {
            throw error(ERR_BLOB_TYPE_BLOCKED, object, kind, type);
        }
    }
}

function hook(win) {
    const native = win.URL.createObjectURL;
    function createObjectURL(object) {
        if (isBlobArtificial(object)) {
            assertTypeIsForbidden(object);
        }
        return native(object);
    }
    Object.defineProperty(win.URL, 'createObjectURL', {
        value: createObjectURL
    });
}

function hookCreateObjectURL(win) {
    hook(win);
    hookFile(win);
    hookBlob(win);
    hookMediaSource(win);
}

module.exports = hookCreateObjectURL;