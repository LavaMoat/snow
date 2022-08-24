const secure = require('@weizman/securely');

const config = {
    objects: {
        'JSON': ['parse', 'stringify'],
        'document': ['createElement'],
        'Object': ['defineProperty', 'getOwnPropertyDescriptor'],
    },
    prototypes: {
        'Attr': ['localName', 'name', 'nodeName'],
        'String': ['toLowerCase'],
        'Function': ['apply', 'call', 'bind'],
        'Map': ['get', 'set'],
        'Node': ['nodeType', 'parentElement', 'toString'],
        'Document': ['querySelectorAll'],
        'DocumentFragment': ['querySelectorAll', 'toString', 'replaceChildren', 'append', 'prepend'],
        'ShadowRoot': ['querySelectorAll', 'toString', 'innerHTML'],
        'Object': ['toString'],
        'Array': ['includes', 'push', 'slice'],
        'Element': ['innerHTML', 'toString', 'querySelectorAll', 'getAttribute', 'removeAttribute', 'tagName'],
        'HTMLElement': ['onload', 'toString'],
        'HTMLScriptElement': ['src'],
        'HTMLTemplateElement': ['content'],
        'EventTarget': ['addEventListener'],
    }
};

const securely = secure(top, config);

const wins = securely(() => {
   const arr = new ArrayS();
   arr.push(top);
   return arr;
});

function secureNewWin(win) {
    if (!wins.includes(win)) {
        wins.push(win);
        secure(win, config);
    }
}

module.exports = {securely, secureNewWin};