const {Array, Object} = require('./natives');
const {handleHTML} = require('./html');

const xhr = new XMLHttpRequest();

function syncFetch(url) {
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
}

function hookObject(win, prop) {
    const native = win[prop];
    return function(a, b, c) {
        const ret = new native(a, b, c);
        Object.defineProperty(ret, prop, {value: true});
        return ret;
    }
}

function hook(win, createObjectURL, revokeObjectURL, Blob, File) {
    return function (object) {
        let url = createObjectURL(object);
        if (!object.Blob && !object.File) {
            return url;
        }
        const content = syncFetch(url);
        const contents = new Array(content);
        handleHTML(contents, true);
        if (contents[0] !== content) {
            revokeObjectURL(url);
            const opts = {
                type: object.type,
                lastModified:  object.lastModified,
            }
            if (object.File) {
                url = createObjectURL(new File(contents, object.name, opts));
            }
            if (object.Blob) {
                url = createObjectURL(new Blob(contents, opts));
            }
        }
        return url;
    };
}

function hookCreateObjectURL(win) {
    Object.defineProperty(win.URL, 'createObjectURL', {
        value: hook(win, win.URL.createObjectURL, win.URL.revokeObjectURL, win.Blob, win.File)
    });
    win.Blob = hookObject(win, 'Blob');
    win.File = hookObject(win, 'File');
}

module.exports = hookCreateObjectURL;