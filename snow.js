/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 528:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const objects = __webpack_require__(88);
const prototypes = __webpack_require__(311);
const specifics = __webpack_require__(199);

let allowNativesAccess = false;

function shouldAllowNativesAccess() {
    return allowNativesAccess;
}

function natively(win, cb) {
    const ifr = win.document.createElement('iframe');
    win.document.head.appendChild(ifr);
    cb(ifr.contentWindow);
    ifr.parentElement.removeChild(ifr);
}

function securely(cb, a, b, c, d, e, f, g, h, i, j) {
    const state = allowNativesAccess;

    allowNativesAccess = true;

    let ret, err;
    try {
        ret = cb(a, b, c, d, e, f, g, h, i, j);
    } catch (e) {
        err = e;
    }

    if (!state) {
        allowNativesAccess = false;
    }

    if (err) {
        throw err;
    }

    return ret;
}

function secure(win, config) {
    natively(win, (nativeWin) => {
        securely(() => {
            config = config || new nativeWin.Object();
            objects(win, nativeWin, shouldAllowNativesAccess, config.objects || new nativeWin.Object());
            prototypes(win, nativeWin, shouldAllowNativesAccess, config.prototypes || new nativeWin.Object());
            specifics(win, nativeWin, shouldAllowNativesAccess);
        });
    });

    return securely;
}

module.exports = secure;

/***/ }),

/***/ 88:
/***/ ((module) => {

module.exports = function objects(win, nativeWin, shouldAllowNativesAccess, objects) {
    for (const object in objects) {
        const apis = objects[object];
        for (let i = 0; i < apis.length; i++) {
            const api = apis[i];
            let native = nativeWin[object][api];
            if (typeof native === 'function') {
                native = native.bind(win[object]);
            }
            nativeWin['Object'].defineProperty(win[object], api + 'S', {
                configurable: false,
                get: function () {
                    if (!shouldAllowNativesAccess()) {
                        return;
                    }

                    return native;
                },
            });
        }
    }
}

/***/ }),

/***/ 311:
/***/ ((module) => {

function method(func, shouldAllowNativesAccess) {
    return function(a, b, c, d, e) {
        if (!shouldAllowNativesAccess()) {
            return;
        }

        return func(this, a, b, c, d, e);
    };
}

function descriptor(nativeWin, desc, shouldAllowNativesAccess) {
    const value = desc.value;
    const set = desc.set || (() => {});
    const get = desc.get || (() => value);

    desc.configurable = false;

    delete desc.value;
    delete desc.writable;

    const getter = nativeWin['Function'].prototype.call.bind(get);
    const setter = nativeWin['Function'].prototype.call.bind(set);

    desc.get = method(getter, shouldAllowNativesAccess);
    desc.set = method(setter, shouldAllowNativesAccess);

    return desc;
}

function prototype(win, nativeWin, done, shouldAllowNativesAccess, prototype, property) {
    let proto = win[prototype];
    const arr = new nativeWin.Array();
    while (true) {
        const desc = nativeWin['Object'].getOwnPropertyDescriptor(proto.prototype, property);
        nativeWin['Array'].prototype.push.call(arr, proto.prototype);
        if (desc) {
            break;
        }
        proto = nativeWin['Object'].getPrototypeOf(proto.prototype).constructor;
    }
    const desc = nativeWin['Object'].getOwnPropertyDescriptor(arr[arr.length - 1], property);
    while (arr.length) {
        const proto = nativeWin['Array'].prototype.pop.call(arr);
        if (!done[proto.constructor.name] || !nativeWin['Array'].prototype.includes.call(done[proto.constructor.name], property)) {
            nativeWin['Object'].defineProperty(proto, property + 'S', descriptor(nativeWin, desc, shouldAllowNativesAccess));
            done[proto.constructor.name] = done[proto.constructor.name] || new nativeWin.Array();
            nativeWin['Array'].prototype.push.call(done[proto.constructor.name], property);
        }
    }
}

module.exports = function prototypes(win, nativeWin, shouldAllowNativesAccess, prototypes) {
    const done = new nativeWin.Object();
    for (const proto in prototypes) {
        const native = nativeWin[proto];
        nativeWin['Object'].defineProperty(win, proto + 'S', {
            configurable: false,
            get: function() {
                if (!shouldAllowNativesAccess()) {
                    return;
                }

                return native;
            }
        });
        done[proto] = done[proto] || new nativeWin.Array();
        const properties = prototypes[proto];
        for (let i = 0; i < properties.length; i++) {
            const property = properties[i];
            prototype(win, nativeWin, done, shouldAllowNativesAccess, proto, property);
            prototype(win, nativeWin, done, shouldAllowNativesAccess, proto + 'S', property);
        }
    }
}

/***/ }),

/***/ 199:
/***/ ((module) => {

module.exports = function specifics(win, nativeWin, shouldAllowNativesAccess) {
    let getDocumentCurrentScript = nativeWin['Object'].getOwnPropertyDescriptor(win.Document.prototype, 'currentScript').get.bind(win.document);
    nativeWin['Object'].defineProperty(win.document, 'currentScript' + 'S', {
        configurable: false,
        get: function() {
            if (!shouldAllowNativesAccess()) {
                return;
            }

            return getDocumentCurrentScript();
        }
    });
}

/***/ }),

/***/ 586:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hook = __webpack_require__(228);

var _require = __webpack_require__(648),
    getFramesArray = _require.getFramesArray,
    getFrameTag = _require.getFrameTag;

var _require2 = __webpack_require__(14),
    getOnload = _require2.getOnload,
    setOnload = _require2.setOnload,
    removeAttribute = _require2.removeAttribute,
    addEventListener = _require2.addEventListener;

function resetOnloadAttribute(win, frame, cb) {
  if (!getFrameTag(frame)) {
    return;
  }

  addEventListener(frame, 'load', function () {
    hook(win, [this], cb);
  });
  var onload = getOnload(frame);

  if (onload) {
    setOnload(frame, null);
    removeAttribute(frame, 'onload');
    setOnload(frame, onload);
  }
}

function resetOnloadAttributes(win, args, cb) {
  for (var i = 0; i < args.length; i++) {
    var element = args[i];
    var frames = getFramesArray(element, true);

    for (var _i = 0; _i < frames.length; _i++) {
      var frame = frames[_i];
      resetOnloadAttribute(win, frame, cb);
    }
  }
}

module.exports = resetOnloadAttributes;

/***/ }),

/***/ 750:
/***/ ((module) => {

/*

This crazy function is a workaround to support 'object' in this project
in chromium due to a bug that can be reproduced by running:

<script>
    document.body.innerHTML = ('<object id="wow" data="/" />');
    alert(window[0]); // undefined
    wow.contentWindow.frameElement;
    alert(window[0]); // [object Window]
</script>

Seems that in order for the object frame to appear in window.frames,
one must first try to access any property of it.

This for some reason registers it to the window.frames list, otherwise it won't be there.

*/
function workaroundChromiumBug(frame) {
  frame && frame.contentWindow;
}

module.exports = workaroundChromiumBug;

/***/ }),

/***/ 228:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCrossOrigin = __webpack_require__(851);

var workaroundChromiumBug = __webpack_require__(750);

var _require = __webpack_require__(648),
    shadows = _require.shadows,
    getFramesArray = _require.getFramesArray,
    getFrameTag = _require.getFrameTag;

var _require2 = __webpack_require__(14),
    getContentWindow = _require2.getContentWindow,
    Object = _require2.Object,
    getFrameElement = _require2.getFrameElement;

function findWin(win, frameElement) {
  var i = -1;

  while (win[++i]) {
    var cross = isCrossOrigin(win[i], win, Object);

    if (!cross) {
      if (getFrameElement(win[i]) === frameElement) {
        return win[i];
      }
    }
  }

  for (var _i = 0; _i < shadows.length; _i++) {
    var shadow = shadows[_i];
    var frames = getFramesArray(shadow, false);

    for (var j = 0; j < frames.length; j++) {
      if (frames[j] === frameElement) {
        return getContentWindow(frames[j], getFrameTag(frames[j]));
      }
    }
  }

  return null;
}

function hook(win, frames, cb) {
  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];
    workaroundChromiumBug(frame);
    var contentWindow = findWin(win, frame);

    if (contentWindow) {
      cb(contentWindow);
    }
  }
}

module.exports = hook;

/***/ }),

/***/ 328:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(648),
    getFramesArray = _require.getFramesArray;

var _require2 = __webpack_require__(14),
    removeAttribute = _require2.removeAttribute,
    getAttribute = _require2.getAttribute,
    getTemplateContent = _require2.getTemplateContent,
    createElement = _require2.createElement,
    getInnerHTML = _require2.getInnerHTML,
    setInnerHTML = _require2.setInnerHTML;

var _require3 = __webpack_require__(312),
    warn = _require3.warn,
    WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED = _require3.WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED;

function dropOnLoadAttributes(frames) {
  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];
    var onload = getAttribute(frame, 'onload');

    if (onload) {
      warn(WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED, frame, onload);
      removeAttribute(frame, 'onload');
    }
  }
}

function handleHTML(win, args) {
  for (var i = 0; i < args.length; i++) {
    var html = args[i];
    var template = createElement(document, 'template');
    setInnerHTML(template, html);
    var frames = getFramesArray(getTemplateContent(template), false);

    if (frames.length) {
      dropOnLoadAttributes(frames);
      args[i] = getInnerHTML(template);
    }
  }
}

module.exports = handleHTML;

/***/ }),

/***/ 352:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(733),
    secure = _require.secure,
    securely = _require.securely;

var hook = __webpack_require__(228);

var hookOpen = __webpack_require__(583);

var hookLoadSetters = __webpack_require__(459);

var hookDOMInserters = __webpack_require__(58);

var _require2 = __webpack_require__(373),
    hookShadowDOM = _require2.hookShadowDOM;

var _require3 = __webpack_require__(14),
    addEventListener = _require3.addEventListener,
    getFrameElement = _require3.getFrameElement;

var _require4 = __webpack_require__(111),
    isMarked = _require4.isMarked,
    mark = _require4.mark;

var _require5 = __webpack_require__(312),
    error = _require5.error,
    ERR_MARK_NEW_WINDOW_FAILED = _require5.ERR_MARK_NEW_WINDOW_FAILED;

function shouldRun(win) {
  try {
    var run = !isMarked(win);

    if (run) {
      mark(win);
    }

    return run;
  } catch (err) {
    error(ERR_MARK_NEW_WINDOW_FAILED, win, err);
  }

  return shouldRun(win);
}

function applyHooks(win, hookWin, securely, cb) {
  hookOpen(win, hookWin);
  hookLoadSetters(win, hookWin);
  hookDOMInserters(win, hookWin);
  hookShadowDOM(win, hookWin);
  cb(win, securely);
}

function onWin(cb, win) {
  function hookWin(contentWindow) {
    onWin(cb, contentWindow);
    addEventListener(getFrameElement(contentWindow), 'load', function () {
      hook(win, [this], function () {
        onWin(cb, contentWindow);
      });
    });
  }

  if (shouldRun(win)) {
    applyHooks(win, hookWin, win === top ? securely : secure(win), cb);
  }
}

var used = false;

module.exports = function (cb, win) {
  if (!used) {
    used = true;
    onWin(cb, win || top);
  }
};

/***/ }),

/***/ 58:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(373),
    protectShadows = _require.protectShadows;

var resetOnloadAttributes = __webpack_require__(586);

var _require2 = __webpack_require__(648),
    getFramesArray = _require2.getFramesArray,
    shadows = _require2.shadows;

var _require3 = __webpack_require__(14),
    getParentElement = _require3.getParentElement,
    slice = _require3.slice,
    Object = _require3.Object,
    Function = _require3.Function;

var handleHTML = __webpack_require__(328);

var hook = __webpack_require__(228);

var map = {
  DocumentFragment: ['replaceChildren', 'append', 'prepend'],
  Document: ['replaceChildren', 'append', 'prepend', 'write', 'writeln'],
  Node: ['appendChild', 'insertBefore', 'replaceChild'],
  Element: ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'replaceWith', 'insertAdjacentElement', 'append', 'before', 'prepend', 'after', 'replaceChildren'],
  ShadowRoot: ['innerHTML'],
  HTMLIFrameElement: ['srcdoc']
};

function getHook(win, native, cb) {
  return function () {
    var args = slice(arguments);
    var element = getParentElement(this) || this;
    resetOnloadAttributes(win, args, cb);
    resetOnloadAttributes(win, shadows, cb);
    handleHTML(win, args);
    handleHTML(win, shadows);
    var ret = Function.prototype.apply.call(native, this, args);
    var frames = getFramesArray(element, false);
    hook(win, frames, cb);
    hook(win, args, cb);
    protectShadows(win, cb, true);
    return ret;
  };
}

function hookDOMInserters(win, cb) {
  for (var proto in map) {
    var funcs = map[proto];

    for (var i = 0; i < funcs.length; i++) {
      var func = funcs[i];
      var desc = Object.getOwnPropertyDescriptor(win[proto].prototype, func);
      var prop = desc.set ? 'set' : 'value';
      desc[prop] = getHook(win, desc[prop], cb);
      Object.defineProperty(win[proto].prototype, func, desc);
    }
  }
}

module.exports = hookDOMInserters;

/***/ }),

/***/ 459:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hook = __webpack_require__(228);

var _require = __webpack_require__(14),
    removeEventListener = _require.removeEventListener,
    addEventListener = _require.addEventListener,
    slice = _require.slice,
    Map = _require.Map,
    Object = _require.Object;

var handlers = new Map();

function callOnload(that, onload, args) {
  if (onload) {
    if (onload.handleEvent) {
      return onload.handleEvent.apply(onload, args);
    } else {
      return onload.apply(that, args);
    }
  }
}

function getAddEventListener(win, cb) {
  return function (type, handler, options) {
    var listener = handler;

    if (type === 'load') {
      if (!handlers.has(handler)) {
        handlers.set(handler, function () {
          hook(win, [this], cb);
          var args = slice(arguments);
          callOnload(this, handler, args);
        });
      }

      listener = handlers.get(handler);
    }

    return addEventListener(this, type, listener, options);
  };
}

function getRemoveEventListener() {
  return function (type, handler, options) {
    var listener = handler;

    if (type === 'load') {
      listener = handlers.get(handler);
      handlers.delete(handler);
    }

    return removeEventListener(this, type, listener, options);
  };
}

function hookLoadSetters(win, cb) {
  Object.defineProperty(win.EventTarget.prototype, 'addEventListener', {
    value: getAddEventListener(win, cb)
  });
  Object.defineProperty(win.EventTarget.prototype, 'removeEventListener', {
    value: getRemoveEventListener()
  });
}

module.exports = hookLoadSetters;

/***/ }),

/***/ 312:
/***/ ((module) => {

var WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED = 1;
var ERR_MARK_NEW_WINDOW_FAILED = 2;
var WARN_OPEN_API_DISABLED = 3;

function warn(msg, a, b) {
  var bail;

  switch (msg) {
    case WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED:
      var frame = a,
          onload = b;
      bail = false;
      console.warn('SNOW:', 'removing html string iframe onload attribute:', frame, "\"".concat(onload, "\"."), '\nthis technique is less common under legitimate use, but can be used to attack snow and therefore is removed.', '\nif this harms your web app, open an issue at snow github repo.');
      break;

    case WARN_OPEN_API_DISABLED:
      var args = a,
          win = b;
      bail = true;
      console.warn('SNOW:', 'blocking open API call:', args, win, '\nlearn more about why open API is blocked by snow completely here:', 'https://github.com/lavamoat/snow/issues/2');
      break;

    default:
      break;
  }

  return bail;
}

function error(msg, a, b) {
  var bail;

  switch (msg) {
    case ERR_MARK_NEW_WINDOW_FAILED:
      var win = a,
          err = b;
      bail = true;
      console.error('SNOW:', 'failed to mark new window:', win, '.', '\nthis is either a bug in snow or an attack attempt.', '\nthis typically causes an infinite loop until either one is solved.', '\nerror caught:\n', err);
      break;

    default:
      break;
  }

  return bail;
}

module.exports = {
  warn: warn,
  error: error,
  WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED: WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED,
  ERR_MARK_NEW_WINDOW_FAILED: ERR_MARK_NEW_WINDOW_FAILED,
  WARN_OPEN_API_DISABLED: WARN_OPEN_API_DISABLED
};

/***/ }),

/***/ 111:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(14),
    Map = _require.Map,
    Object = _require.Object,
    Array = _require.Array;

var secret = (Math.random() + 1).toString(36).substring(7);
var wins = new Map();

function isMarked(win) {
  if (!wins.has(win)) {
    return false;
  }

  var desc = Object.getOwnPropertyDescriptor(win, 'SNOW_ID');

  if (!desc || !Object.hasOwnProperty.call(desc, 'value')) {
    return false;
  }

  if (typeof desc.value !== 'function') {
    return false;
  }

  var key = wins.get(win);
  var answer = desc.value(secret);
  return answer === key;
}

function mark(win) {
  var key = new Array();
  Object.defineProperty(win, 'SNOW_ID', {
    configurable: false,
    writable: false,
    value: function value(s) {
      return s === secret && key;
    }
  });
  wins.set(win, key);
}

module.exports = {
  isMarked: isMarked,
  mark: mark
};

/***/ }),

/***/ 14:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(733),
    securely = _require.securely;

function getContentWindow(element, tag) {
  switch (tag) {
    case 'IFRAME':
      return natives.iframeContentWindow.call(element);

    case 'FRAME':
      return natives.frameContentWindow.call(element);

    case 'OBJECT':
      return natives.objectContentWindow.call(element);

    case 'EMBED':
      return null;

    default:
      return null;
  }
}

function parse(text, reviver) {
  return natives.parse(text, reviver);
}

function stringify(value, replacer, space) {
  return natives.stringify(value, replacer, space);
}

function Array() {
  return natives.Array.apply(null, slice(arguments));
}

function Map() {
  return new natives.Map();
}

function slice(arr, start, end) {
  return natives.slice.call(arr, start, end);
}

function nodeType(node) {
  return natives.nodeType.call(node);
}

function tagName(element) {
  return natives.tagName.call(element);
}

function toString(object) {
  return natives.toString.call(object);
}

function getOnload(element) {
  return natives.getOnload.call(element);
}

function setOnload(element, onload) {
  return natives.setOnload.call(element, onload);
}

function removeAttribute(element, attribute) {
  return natives.removeAttribute.call(element, attribute);
}

function getAttribute(element, attribute) {
  return natives.getAttribute.call(element, attribute);
}

function addEventListener(element, event, listener, options) {
  return natives.addEventListener.call(element, event, listener, options);
}

function removeEventListener(element, event, listener, options) {
  return natives.removeEventListener.call(element, event, listener, options);
}

function createElement(document, tagName, options) {
  return natives.createElement.call(document, tagName, options);
}

function getInnerHTML(element) {
  return natives.getInnerHTML.call(element);
}

function setInnerHTML(element, html) {
  return natives.setInnerHTML.call(element, html);
}

function getTemplateContent(template) {
  return natives.getTemplateContent.call(template);
}

function getFrameElement(win) {
  return natives.Function.prototype.call.call(natives.getFrameElement, win);
}

function getParentElement(element) {
  return natives.getParentElement.call(element);
}

var natives = securely(function () {
  return {
    Array: ArrayS,
    Map: MapS,
    Object: ObjectS,
    Function: FunctionS,
    Node: NodeS,
    Element: ElementS,
    ShadowRoot: ShadowRootS,
    Document: DocumentS,
    DocumentFragment: DocumentFragmentS,
    parse: JSON.parseS,
    stringify: JSON.stringifyS,
    iframeContentWindow: Object.getOwnPropertyDescriptor(HTMLIFrameElementS.prototype, 'contentWindow').get,
    frameContentWindow: Object.getOwnPropertyDescriptor(HTMLFrameElementS.prototype, 'contentWindow').get,
    objectContentWindow: Object.getOwnPropertyDescriptor(HTMLObjectElementS.prototype, 'contentWindow').get,
    createElement: Object.getOwnPropertyDescriptor(DocumentS.prototype, 'createElement').value,
    slice: Object.getOwnPropertyDescriptor(ArrayS.prototype, 'slice').value,
    nodeType: Object.getOwnPropertyDescriptor(NodeS.prototype, 'nodeType').get,
    tagName: Object.getOwnPropertyDescriptor(ElementS.prototype, 'tagName').get,
    getInnerHTML: Object.getOwnPropertyDescriptor(ElementS.prototype, 'innerHTML').get,
    setInnerHTML: Object.getOwnPropertyDescriptor(ElementS.prototype, 'innerHTML').set,
    toString: Object.getOwnPropertyDescriptor(ObjectS.prototype, 'toString').value,
    getOnload: Object.getOwnPropertyDescriptor(HTMLElementS.prototype, 'onload').get,
    setOnload: Object.getOwnPropertyDescriptor(HTMLElementS.prototype, 'onload').set,
    getAttribute: Object.getOwnPropertyDescriptor(ElementS.prototype, 'getAttribute').value,
    removeAttribute: Object.getOwnPropertyDescriptor(ElementS.prototype, 'removeAttribute').value,
    addEventListener: Object.getOwnPropertyDescriptor(EventTargetS.prototype, 'addEventListener').value,
    removeEventListener: Object.getOwnPropertyDescriptor(EventTargetS.prototype, 'removeEventListener').value,
    getTemplateContent: Object.getOwnPropertyDescriptor(HTMLTemplateElementS.prototype, 'content').get,
    getFrameElement: Object.getOwnPropertyDescriptor(window, 'frameElement').get,
    getParentElement: Object.getOwnPropertyDescriptor(NodeS.prototype, 'parentElement').get
  };
});
module.exports = {
  getParentElement: getParentElement,
  getTemplateContent: getTemplateContent,
  getFrameElement: getFrameElement,
  getInnerHTML: getInnerHTML,
  setInnerHTML: setInnerHTML,
  getContentWindow: getContentWindow,
  createElement: createElement,
  slice: slice,
  Array: Array,
  Map: Map,
  Object: natives.Object,
  Function: natives.Function,
  Node: natives.Node,
  Element: natives.Element,
  Document: natives.Document,
  DocumentFragment: natives.DocumentFragment,
  ShadowRoot: natives.ShadowRoot,
  parse: parse,
  stringify: stringify,
  nodeType: nodeType,
  toString: toString,
  tagName: tagName,
  getOnload: getOnload,
  setOnload: setOnload,
  removeAttribute: removeAttribute,
  getAttribute: getAttribute,
  addEventListener: addEventListener,
  removeEventListener: removeEventListener
};

/***/ }),

/***/ 583:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(14),
    slice = _require.slice,
    Function = _require.Function;

var _require2 = __webpack_require__(312),
    warn = _require2.warn,
    WARN_OPEN_API_DISABLED = _require2.WARN_OPEN_API_DISABLED;

function hookOpen(win, cb) {
  var realOpen = win.open;

  win.open = function () {
    var args = slice(arguments);
    var blocked = warn(WARN_OPEN_API_DISABLED, args, win);

    if (blocked) {
      return null;
    }

    var opened = Function.prototype.apply.call(realOpen, this, args);
    cb(opened);
    return opened;
  };
}

module.exports = hookOpen;

/***/ }),

/***/ 733:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _secure = __webpack_require__(528);

var config = {
  objects: {
    'JSON': ['parse', 'stringify'],
    'document': ['createElement'],
    'Object': ['defineProperty', 'getOwnPropertyDescriptor']
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
    'HTMLIFrameElement': ['contentWindow'],
    'HTMLFrameElement': ['contentWindow'],
    'HTMLObjectElement': ['contentWindow']
  }
};
module.exports = {
  securely: _secure(top, config),
  secure: function secure(win) {
    return _secure(win, config);
  }
};

/***/ }),

/***/ 373:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hook = __webpack_require__(228);

var _require = __webpack_require__(648),
    getFramesArray = _require.getFramesArray,
    shadows = _require.shadows;

var _require2 = __webpack_require__(14),
    Object = _require2.Object,
    Function = _require2.Function;

function protectShadows(win, cb, connectedOnly) {
  for (var i = 0; i < shadows.length; i++) {
    var shadow = shadows[i];

    if (connectedOnly && !shadow.isConnected) {
      continue;
    }

    var frames = getFramesArray(shadow, false);
    hook(win, frames, cb);
  }
}

function getHook(win, native, cb) {
  return function (options) {
    var ret = Function.prototype.call.call(native, this, options);
    shadows.push(ret);
    protectShadows(win, cb, true);
    return ret;
  };
}

function hookShadowDOM(win, cb) {
  var desc = Object.getOwnPropertyDescriptor(win.Element.prototype, 'attachShadow');
  var val = desc.value;
  desc.value = getHook(win, val, cb);
  Object.defineProperty(win.Element.prototype, 'attachShadow', desc);
}

module.exports = {
  hookShadowDOM: hookShadowDOM,
  protectShadows: protectShadows
};

/***/ }),

/***/ 648:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _require = __webpack_require__(14),
    tagName = _require.tagName,
    nodeType = _require.nodeType,
    slice = _require.slice,
    Array = _require.Array,
    parse = _require.parse,
    stringify = _require.stringify,
    Node = _require.Node,
    Document = _require.Document,
    DocumentFragment = _require.DocumentFragment,
    Element = _require.Element,
    ShadowRoot = _require.ShadowRoot;

var shadows = new Array();

function isShadow(node) {
  return shadows.includes(node);
}

function isTrustedHTML(node) {
  var replacer = function replacer(k, v) {
    return !k && node === v ? v : '';
  }; // avoid own props
  // normal nodes will parse into objects whereas trusted htmls into strings


  return typeof parse(stringify(node, replacer)) === 'string';
}

function getPrototype(node) {
  if (isShadow(node)) {
    return ShadowRoot;
  }

  switch (nodeType(node)) {
    case Node.prototype.DOCUMENT_NODE:
      return Document;

    case Node.prototype.DOCUMENT_FRAGMENT_NODE:
      return DocumentFragment;

    default:
      return Element;
  }
}

function getFrameTag(element) {
  if (!element || _typeof(element) !== 'object') {
    return null;
  }

  if (nodeType(element) !== Element.prototype.ELEMENT_NODE) {
    return null;
  }

  if (isShadow(element)) {
    return null;
  }

  var tag = tagName(element);

  if (tag !== 'IFRAME' && tag !== 'FRAME' && tag !== 'OBJECT' && tag !== 'EMBED') {
    return null;
  }

  return tag;
}

function canNodeRunQuerySelector(node) {
  if (isShadow(node)) {
    return true;
  }

  var type = nodeType(node);
  return type === Element.prototype.ELEMENT_NODE || type === Element.prototype.DOCUMENT_FRAGMENT_NODE || type === Element.prototype.DOCUMENT_NODE;
}

function getFramesArray(element, includingParent) {
  var frames = new Array();

  if (null === element || _typeof(element) !== 'object') {
    return frames;
  }

  if (isTrustedHTML(element) || !canNodeRunQuerySelector(element)) {
    return frames;
  }

  var querySelectorAll = getPrototype(element).prototype.querySelectorAll;
  var list = querySelectorAll.call(element, 'iframe,frame,object,embed');
  fillArrayUniques(frames, slice(list));

  if (includingParent) {
    fillArrayUniques(frames, [element]);
  }

  return frames;
}

function fillArrayUniques(arr, items) {
  var isArrUpdated = false;

  for (var i = 0; i < items.length; i++) {
    if (!arr.includes(items[i])) {
      arr.push(items[i]);
      isArrUpdated = true;
    }
  }

  return isArrUpdated;
}

module.exports = {
  getFramesArray: getFramesArray,
  getFrameTag: getFrameTag,
  shadows: shadows
};

/***/ }),

/***/ 626:
/***/ ((module) => {

module.exports = {
    SRC_IS_NOT_A_WINDOW: 'provided argument "src" must be a proper window of instance Window',
    DST_IS_NOT_A_WINDOW: 'provided argument "dst" must be a proper window of instance Window',
    SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW: 'provided argument "src" must be a window in the same origin as the current context window',
}

/***/ }),

/***/ 851:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {DST_IS_NOT_A_WINDOW, SRC_IS_NOT_A_WINDOW, SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW} = __webpack_require__(626);

function isWindow(obj, Object) {
    const o = Object(obj);
    return o === o.window;
}

function isCrossOrigin(dst, src, Object) {
    return Object.getPrototypeOf.call(src, dst) === null;
}

module.exports = function(dst, src = window, Object = window.Object) {
    if (!isWindow(src, Object)) {
        throw new Error(SRC_IS_NOT_A_WINDOW);
    }
    if (!isWindow(dst, Object)) {
        throw new Error(DST_IS_NOT_A_WINDOW);
    }
    if (isCrossOrigin(window, src, Object)) {
        throw new Error(SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW);
    }
    return isCrossOrigin(dst, src, Object);
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(352);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_index__WEBPACK_IMPORTED_MODULE_0__);


(function (win) {
  Object.defineProperty(win, 'SNOW', {
    value: (_src_index__WEBPACK_IMPORTED_MODULE_0___default())
  });
})(window);
})();

/******/ })()
;