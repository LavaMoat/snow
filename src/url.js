const {Array, Object} = require('./natives');
const {handleHTML} = require('./html');

const xhr = new XMLHttpRequest();

function syncFetch(url) {
    xhr.open('GET', url, false);
    xhr.send(null);
    return {
        content: xhr.responseText,
        type: xhr.getResponseHeader('Content-Type'),
    };
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

        const {content, type} = syncFetch(url);
        if (type !== 'text/html') {
            return url;
        }

        const opts = {
            type: 'text/html',
            lastModified:  object.lastModified,
        }

        const html = new Array(content);
        handleHTML(html, true);
        revokeObjectURL(url);

        if (object.File) {
            url = createObjectURL(new File(html, object.name, opts));
        }
        if (object.Blob) {
            url = createObjectURL(new Blob(html, opts));
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