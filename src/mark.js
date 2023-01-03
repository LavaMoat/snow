const {Map, Object, Array} = require('./natives');

const secret = (Math.random() + 1).toString(36).substring(7);
const wins = new Map();

function isMarked(win) {
    if (!wins.has(win)) {
        return false;
    }

    const desc = Object.getOwnPropertyDescriptor(win, 'SNOW_ID');
    if (!desc || !Object.hasOwnProperty.call(desc, 'value')) {
        return false;
    }

    if (typeof desc.value !== 'function') {
        return false;
    }

    const key = wins.get(win);
    const answer = desc.value(secret);

    return answer === key;

}

function mark(win) {
    const key = new Array();
    const desc = Object.create(null);
    desc.value = s => s === secret && key;
    Object.defineProperty(win, 'SNOW_ID', desc);
    wins.set(win, key);
}

module.exports = {isMarked, mark};