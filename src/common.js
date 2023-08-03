const getLength = Object.getOwnPropertyDescriptor(window, 'length').get;
const getLengthTop = getLength.bind(window);
const createElement = Object.getOwnPropertyDescriptor(Document.prototype, 'createElement').value.bind(document);
const appendChild = Object.getOwnPropertyDescriptor(Node.prototype, 'appendChild').value.bind(document.documentElement);
const removeChild = Object.getOwnPropertyDescriptor(Node.prototype, 'removeChild').value.bind(document.documentElement);

function runInNewRealm(cb) {
    const length = getLengthTop();
    const ifr = createElement('IFRAME');
    appendChild(ifr);
    const ret = cb(window[length]);
    removeChild(ifr);
    return ret;
}

module.exports = {
    getLength,
    runInNewRealm,
}