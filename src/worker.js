const {runInNewRealm} = require('./common');
const {Map, toString, stringStartsWith, Blob} = require('./natives');

const blobs = new Map();
const {createObjectURL, revokeObjectURL} = URL;

const BLOCKED_BLOB_MSG = `
BLOCKED BY SNOW:
Creating URL objects is not allowed under Snow protection within Web Workers.
If this prevents your application from running correctly, please visit/report at https://github.com/LavaMoat/snow/pull/89#issuecomment-1589359673.
Learn more at https://github.com/LavaMoat/snow/pull/89`;

function syncGet(url) {
    return runInNewRealm(function(win) {
        let content;
        const xhr = new win.XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                content = xhr.responseText;
            }
        };
        xhr.send();
        return content;
    });
}

function swap(url) {
    if (!blobs.has(url)) {
        const content = syncGet(url);
        const prefix = `(function() { Object.defineProperty(URL, 'createObjectURL', { value: () => { throw new Error(\`${BLOCKED_BLOB_MSG}\`) }}) }())`;
        const js = prefix + '\n\n' + content;
        blobs.set(url, createObjectURL(new Blob([js], {type: 'text/javascript'})));
    }
    return blobs.get(url);
}

function hookRevokeObjectURL(win) {
    win.URL.revokeObjectURL = function (objectURL) {
        const url = blobs.get(objectURL);
        if (url) {
            revokeObjectURL(url);
            blobs.delete(url);
        }
        return revokeObjectURL(objectURL);
    }
}

function hook(win) {
    const native = win.Worker;
    win.Worker = function Worker(aURL, options) {
        const url = typeof aURL === 'string' ? aURL : toString(aURL);
        if (stringStartsWith(url, 'blob')) {
            return new native(swap(url), options);
        }
        return new native(url, options);
    };
}

function hookWorker(win) {
    hookRevokeObjectURL(win);
    hook(win);
}

module.exports = hookWorker;