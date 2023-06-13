const {BLOCKED_BLOB_URL} = require('./common');
const {Map, toString, stringStartsWith} = require('./natives');

const blobs = new Map();

function syncGet(url, done) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            done(xhr.responseText);
        }
    };
    xhr.send();
}

function swap(url) {
    if (!blobs.has(url)) {
        syncGet(url, function(content) {
            const js = `(function(){Object.defineProperty(URL, "createObjectURL", {value:()=>"${BLOCKED_BLOB_URL}"})}());` + content;
            blobs.set(url, URL.createObjectURL(new Blob([js], {type: 'text/javascript'})));
        });
    }
    return blobs.get(url);
}

function hook(win, native) {
    return function Worker(aURL, options) {
        const url = typeof aURL === 'string' ? aURL : toString(aURL);
        if (stringStartsWith(url, 'blob')) {
            return new native(swap(aURL), options);
        }
        return new native(aURL, options);
    }
}

function hookWorker(win) {
    const native = win.Worker;
    win.Worker = hook(win, native);
}

module.exports = {hookWorker};