const {BLOCKED_BLOB_URL, BLOCKED_BLOB_MSG, runInNewRealm} = require('./common');
const {Map, toString, stringStartsWith, createObjectURL, revokeObjectURL, Blob} = require('./natives');

const blobs = new Map();

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
        const js = `(function() {
                Object.defineProperty(URL, 'createObjectURL', {value:() => {
                    console.log(\`${BLOCKED_BLOB_MSG}\`);
                    return '${BLOCKED_BLOB_URL}';
                }})
            }());
            
            ` + content;
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

module.exports = {hookWorker};