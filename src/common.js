const createElement = Object.getOwnPropertyDescriptor(Document.prototype, 'createElement').value.bind(document);
const appendChild = Object.getOwnPropertyDescriptor(Node.prototype, 'appendChild').value.bind(document.documentElement);
const removeChild = Object.getOwnPropertyDescriptor(Node.prototype, 'removeChild').value.bind(document.documentElement);

function runInNewRealm(cb) {
    const ifr = createElement('IFRAME');
    appendChild(ifr);
    const ret = cb(ifr.contentWindow);
    removeChild(ifr);
    return ret;
}

const BLOCKED_BLOB_MSG = `BLOCKED BY SNOW:
Creating URL objects is not allowed under Snow protection within Web Workers.
Learn more at https://github.com/LavaMoat/snow/pull/89/`;

module.exports = {
    runInNewRealm,
    BLOCKED_BLOB_URL: URL.createObjectURL(new Blob([BLOCKED_BLOB_MSG], {type: 'text/plain'})),
    BLOCKED_BLOB_MSG,
}