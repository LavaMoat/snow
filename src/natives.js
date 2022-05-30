const natives = {};

let extracted = false;

function extractNatives() {
    const ifr = document.createElement('iframe');
    document.head.appendChild(ifr);

    natives['Document'] = ifr.contentWindow.Document;
    natives['DocumentFragment'] = ifr.contentWindow.DocumentFragment;
    natives['Object'] = ifr.contentWindow.Object;
    natives['Array'] = ifr.contentWindow.Array;
    natives['Node'] = ifr.contentWindow.Node;
    natives['Element'] = ifr.contentWindow.Element;
    natives['HTMLElement'] = ifr.contentWindow.HTMLElement;
    natives['EventTarget'] = ifr.contentWindow.EventTarget;
    natives['toStringObject'] = natives['Object'].prototype.toString;
    natives['getNodeType'] = natives['Object'].getOwnPropertyDescriptor(natives['Node'].prototype, 'nodeType').get;
    natives['getParentElement'] = natives['Object'].getOwnPropertyDescriptor(natives['Node'].prototype, 'parentElement').get;
    natives['addEventListener'] = natives['Object'].getOwnPropertyDescriptor(ifr.contentWindow.EventTarget.prototype, 'addEventListener').value;
    natives['getOnload'] = natives['Object'].getOwnPropertyDescriptor(natives['HTMLElement'].prototype, 'onload').get;
    natives['setOnload'] = natives['Object'].getOwnPropertyDescriptor(natives['HTMLElement'].prototype, 'onload').set;
    natives['getInnerHTML'] = natives['Object'].getOwnPropertyDescriptor(natives['Element'].prototype, 'innerHTML').get;
    natives['setInnerHTML'] = natives['Object'].getOwnPropertyDescriptor(natives['Element'].prototype, 'innerHTML').set;

    ifr.parentElement.removeChild(ifr);
}

function getNatives() {
    if (!extracted) {
        extractNatives();
        extracted = true;
    }

    return natives;
}

module.exports = getNatives;