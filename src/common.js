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

module.exports = {
    runInNewRealm,
    BLOCKED_BLOB_URL: URL.createObjectURL(new Blob(['BLOCKED BY SNOW'], {type: 'text/plain'})),
}