(function(){
"use strict";
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 586:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const hook = __webpack_require__(228);
const {
  getFramesArray,
  getFrameTag
} = __webpack_require__(648);
const {
  getOnload,
  setOnload,
  removeAttribute,
  addEventListener
} = __webpack_require__(14);
function resetOnloadAttribute(win, frame, cb) {
  if (!getFrameTag(frame)) {
    return;
  }
  addEventListener(frame, 'load', function () {
    hook(win, [this], cb);
  });
  const onload = getOnload(frame);
  if (onload) {
    setOnload(frame, null);
    removeAttribute(frame, 'onload');
    setOnload(frame, onload);
  }
}
function resetOnloadAttributes(win, args, cb) {
  for (let i = 0; i < args.length; i++) {
    const element = args[i];
    const frames = getFramesArray(element, true);
    for (let i = 0; i < frames.length; i++) {
      const frame = frames[i];
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

const isCrossOrigin = __webpack_require__(851);
const workaroundChromiumBug = __webpack_require__(750);
const {
  shadows,
  getFramesArray,
  getFrameTag
} = __webpack_require__(648);
const {
  getContentWindow,
  Object,
  getFrameElement
} = __webpack_require__(14);
function findWin(win, frameElement) {
  let i = -1;
  while (win[++i]) {
    const cross = isCrossOrigin(win[i], win, Object);
    if (!cross) {
      if (getFrameElement(win[i]) === frameElement) {
        return win[i];
      }
    }
  }
  for (let i = 0; i < shadows.length; i++) {
    const shadow = shadows[i];
    const frames = getFramesArray(shadow, false);
    for (let j = 0; j < frames.length; j++) {
      if (frames[j] === frameElement) {
        return getContentWindow(frames[j], getFrameTag(frames[j]));
      }
    }
  }
  return null;
}
function hook(win, frames, cb) {
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    workaroundChromiumBug(frame);
    const contentWindow = findWin(win, frame);
    if (contentWindow) {
      cb(contentWindow);
    }
  }
}
module.exports = hook;

/***/ }),

/***/ 328:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  getFramesArray
} = __webpack_require__(648);
const {
  removeAttribute,
  getAttribute,
  getTemplateContent,
  createElement,
  getInnerHTML,
  setInnerHTML
} = __webpack_require__(14);
const {
  warn,
  WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED
} = __webpack_require__(312);
function dropOnLoadAttributes(frames) {
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const onload = getAttribute(frame, 'onload');
    if (onload) {
      warn(WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED, frame, onload);
      removeAttribute(frame, 'onload');
    }
  }
}
function handleHTML(win, args) {
  for (let i = 0; i < args.length; i++) {
    const html = args[i];
    const template = createElement(document, 'template');
    setInnerHTML(template, html);
    const frames = getFramesArray(getTemplateContent(template), false);
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

const hook = __webpack_require__(228);
const hookOpen = __webpack_require__(583);
const hookLoadSetters = __webpack_require__(459);
const hookDOMInserters = __webpack_require__(58);
const {
  hookShadowDOM
} = __webpack_require__(373);
const {
  securely,
  addEventListener,
  getFrameElement
} = __webpack_require__(14);
const {
  isMarked,
  mark
} = __webpack_require__(111);
const {
  error,
  ERR_MARK_NEW_WINDOW_FAILED
} = __webpack_require__(312);
function shouldRun(win) {
  try {
    const run = !isMarked(win);
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
    applyHooks(win, hookWin, securely, cb);
  }
}
let used = false;
module.exports = function (cb, win) {
  if (!used) {
    used = true;
    onWin(cb, win || window);
  }
};

/***/ }),

/***/ 58:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  protectShadows
} = __webpack_require__(373);
const resetOnloadAttributes = __webpack_require__(586);
const {
  getFramesArray,
  shadows
} = __webpack_require__(648);
const {
  getParentElement,
  slice,
  Object,
  Function
} = __webpack_require__(14);
const handleHTML = __webpack_require__(328);
const hook = __webpack_require__(228);
const map = {
  DocumentFragment: ['replaceChildren', 'append', 'prepend'],
  Document: ['replaceChildren', 'append', 'prepend', 'write', 'writeln'],
  Node: ['appendChild', 'insertBefore', 'replaceChild'],
  Element: ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'replaceWith', 'insertAdjacentElement', 'append', 'before', 'prepend', 'after', 'replaceChildren'],
  ShadowRoot: ['innerHTML'],
  HTMLIFrameElement: ['srcdoc']
};
function getHook(win, native, cb) {
  return function () {
    const args = slice(arguments);
    const element = getParentElement(this) || this;
    resetOnloadAttributes(win, args, cb);
    resetOnloadAttributes(win, shadows, cb);
    handleHTML(win, args);
    handleHTML(win, shadows);
    const ret = Function.prototype.apply.call(native, this, args);
    const frames = getFramesArray(element, false);
    hook(win, frames, cb);
    hook(win, args, cb);
    protectShadows(win, cb, true);
    return ret;
  };
}
function hookDOMInserters(win, cb) {
  for (const proto in map) {
    const funcs = map[proto];
    for (let i = 0; i < funcs.length; i++) {
      const func = funcs[i];
      const desc = Object.getOwnPropertyDescriptor(win[proto].prototype, func);
      const prop = desc.set ? 'set' : 'value';
      desc[prop] = getHook(win, desc[prop], cb);
      Object.defineProperty(win[proto].prototype, func, desc);
    }
  }
}
module.exports = hookDOMInserters;

/***/ }),

/***/ 459:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const hook = __webpack_require__(228);
const {
  removeEventListener,
  addEventListener,
  slice,
  Map,
  Object
} = __webpack_require__(14);
const handlers = new Map();
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
    let listener = handler;
    if (type === 'load') {
      if (!handlers.has(handler)) {
        handlers.set(handler, function () {
          hook(win, [this], cb);
          const args = slice(arguments);
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
    let listener = handler;
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

const WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED = 1;
const ERR_MARK_NEW_WINDOW_FAILED = 2;
const WARN_OPEN_API_DISABLED = 3;
function warn(msg, a, b) {
  let bail;
  switch (msg) {
    case WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED:
      const frame = a,
        onload = b;
      bail = false;
      console.warn('SNOW:', 'removing html string iframe onload attribute:', frame, `"${onload}"`, '.', '\n', 'if this prevents your application from running correctly, please visit/report at', 'https://github.com/LavaMoat/snow/issues/32#issuecomment-1239273328', '.');
      break;
    case WARN_OPEN_API_DISABLED:
      const args = a,
        win = b;
      bail = true;
      console.warn('SNOW:', 'blocking open API call:', args, win, '.', '\n', 'if this prevents your application from running correctly, please visit/report at', 'https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255', '.');
      break;
    default:
      break;
  }
  return bail;
}
function error(msg, a, b) {
  let bail;
  switch (msg) {
    case ERR_MARK_NEW_WINDOW_FAILED:
      const win = a,
        err = b;
      bail = true;
      console.error('SNOW:', 'failed to mark new window:', win, '.', '\n', 'if this prevents your application from running correctly, please visit/report at', 'https://github.com/LavaMoat/snow/issues/33#issuecomment-1239280063', '.', '\n', 'in order to maintain a bulletproof defense mechanism, failing to mark a new window typically causes an infinite loop', '.', '\n', 'error caught:', '\n', err);
      break;
    default:
      break;
  }
  return bail;
}
module.exports = {
  warn,
  error,
  WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED,
  ERR_MARK_NEW_WINDOW_FAILED,
  WARN_OPEN_API_DISABLED
};

/***/ }),

/***/ 111:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  Map,
  Object,
  Array
} = __webpack_require__(14);
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
  Object.defineProperty(win, 'SNOW_ID', {
    configurable: false,
    writable: false,
    value: s => s === secret && key
  });
  wins.set(win, key);
}
module.exports = {
  isMarked,
  mark
};

/***/ }),

/***/ 14:
/***/ ((module) => {

function natively(win, cb) {
  const ifr = win.document.createElement('iframe');
  win.document.head.appendChild(ifr);
  const ret = cb(ifr.contentWindow);
  ifr.parentElement.removeChild(ifr);
  return ret;
}
function generateNatives(win) {
  return natively(win, function (win) {
    const {
      JSON,
      Attr,
      String,
      Function,
      Map,
      Node,
      Document,
      DocumentFragment,
      ShadowRoot,
      Object,
      Array,
      Element,
      HTMLElement,
      HTMLScriptElement,
      HTMLTemplateElement,
      EventTarget,
      HTMLIFrameElement,
      HTMLFrameElement,
      HTMLObjectElement
    } = win;
    const natives = {
      JSON,
      Attr,
      String,
      Function,
      Map,
      Node,
      Document,
      DocumentFragment,
      ShadowRoot,
      Object,
      Array,
      Element,
      HTMLElement,
      HTMLScriptElement,
      HTMLTemplateElement,
      EventTarget,
      HTMLIFrameElement,
      HTMLFrameElement,
      HTMLObjectElement
    };
    natives.document = {
      createElement: win.document.createElement
    };
    return natives;
  });
}
function setup(win) {
  const natives = generateNatives(win);
  const {
    JSON,
    Attr,
    String,
    Function,
    Map,
    Node,
    Document,
    DocumentFragment,
    ShadowRoot,
    Object,
    Array,
    Element,
    HTMLElement,
    HTMLScriptElement,
    HTMLTemplateElement,
    EventTarget,
    HTMLIFrameElement,
    HTMLFrameElement,
    HTMLObjectElement
  } = natives;
  Object.assign(natives, {
    iframeContentWindow: Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow').get,
    frameContentWindow: Object.getOwnPropertyDescriptor(HTMLFrameElement.prototype, 'contentWindow').get,
    objectContentWindow: Object.getOwnPropertyDescriptor(HTMLObjectElement.prototype, 'contentWindow').get,
    createElement: Object.getOwnPropertyDescriptor(Document.prototype, 'createElement').value,
    slice: Object.getOwnPropertyDescriptor(Array.prototype, 'slice').value,
    nodeType: Object.getOwnPropertyDescriptor(Node.prototype, 'nodeType').get,
    tagName: Object.getOwnPropertyDescriptor(Element.prototype, 'tagName').get,
    getInnerHTML: Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').get,
    setInnerHTML: Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set,
    toString: Object.getOwnPropertyDescriptor(Object.prototype, 'toString').value,
    getOnload: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onload').get,
    setOnload: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onload').set,
    getAttribute: Object.getOwnPropertyDescriptor(Element.prototype, 'getAttribute').value,
    removeAttribute: Object.getOwnPropertyDescriptor(Element.prototype, 'removeAttribute').value,
    addEventListener: Object.getOwnPropertyDescriptor(EventTarget.prototype, 'addEventListener').value,
    removeEventListener: Object.getOwnPropertyDescriptor(EventTarget.prototype, 'removeEventListener').value,
    getTemplateContent: Object.getOwnPropertyDescriptor(HTMLTemplateElement.prototype, 'content').get,
    getFrameElement: Object.getOwnPropertyDescriptor(win, 'frameElement').get,
    getParentElement: Object.getOwnPropertyDescriptor(Node.prototype, 'parentElement').get
  });
  return {
    Object,
    Function,
    Node,
    Element,
    Document,
    DocumentFragment,
    ShadowRoot,
    getContentWindow,
    parse,
    stringify,
    Array,
    Map,
    slice,
    nodeType,
    tagName,
    toString,
    getOnload,
    setOnload,
    removeAttribute,
    getAttribute,
    addEventListener,
    removeEventListener,
    createElement,
    getInnerHTML,
    setInnerHTML,
    getTemplateContent,
    getFrameElement,
    getParentElement
  };
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
    return natives.JSON.parse(text, reviver);
  }
  function stringify(value, replacer, space) {
    return natives.JSON.stringify(value, replacer, space);
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
}
module.exports = setup(top);

/***/ }),

/***/ 583:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  slice,
  Function
} = __webpack_require__(14);
const {
  warn,
  WARN_OPEN_API_DISABLED
} = __webpack_require__(312);
function hookOpen(win, cb) {
  const realOpen = win.open;
  win.open = function () {
    const args = slice(arguments);
    const blocked = warn(WARN_OPEN_API_DISABLED, args, win);
    if (blocked) {
      return null;
    }
    const opened = Function.prototype.apply.call(realOpen, this, args);
    cb(opened);
    return opened;
  };
}
module.exports = hookOpen;

/***/ }),

/***/ 373:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const hook = __webpack_require__(228);
const {
  getFramesArray,
  shadows
} = __webpack_require__(648);
const {
  Object,
  Function
} = __webpack_require__(14);
function protectShadows(win, cb, connectedOnly) {
  for (let i = 0; i < shadows.length; i++) {
    const shadow = shadows[i];
    if (connectedOnly && !shadow.isConnected) {
      continue;
    }
    const frames = getFramesArray(shadow, false);
    hook(win, frames, cb);
  }
}
function getHook(win, native, cb) {
  return function (options) {
    const ret = Function.prototype.call.call(native, this, options);
    shadows.push(ret);
    protectShadows(win, cb, true);
    return ret;
  };
}
function hookShadowDOM(win, cb) {
  const desc = Object.getOwnPropertyDescriptor(win.Element.prototype, 'attachShadow');
  const val = desc.value;
  desc.value = getHook(win, val, cb);
  Object.defineProperty(win.Element.prototype, 'attachShadow', desc);
}
module.exports = {
  hookShadowDOM,
  protectShadows
};

/***/ }),

/***/ 648:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  tagName,
  nodeType,
  slice,
  Array,
  parse,
  stringify,
  Node,
  Document,
  DocumentFragment,
  Element,
  ShadowRoot
} = __webpack_require__(14);
const shadows = new Array();
function isShadow(node) {
  return shadows.includes(node);
}
function isTrustedHTML(node) {
  const replacer = (k, v) => !k && node === v ? v : ''; // avoid own props
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
  if (!element || typeof element !== 'object') {
    return null;
  }
  if (nodeType(element) !== Element.prototype.ELEMENT_NODE) {
    return null;
  }
  if (isShadow(element)) {
    return null;
  }
  const tag = tagName(element);
  if (tag !== 'IFRAME' && tag !== 'FRAME' && tag !== 'OBJECT' && tag !== 'EMBED') {
    return null;
  }
  return tag;
}
function canNodeRunQuerySelector(node) {
  if (isShadow(node)) {
    return true;
  }
  const type = nodeType(node);
  return type === Element.prototype.ELEMENT_NODE || type === Element.prototype.DOCUMENT_FRAGMENT_NODE || type === Element.prototype.DOCUMENT_NODE;
}
function getFramesArray(element, includingParent) {
  const frames = new Array();
  if (null === element || typeof element !== 'object') {
    return frames;
  }
  if (isTrustedHTML(element) || !canNodeRunQuerySelector(element)) {
    return frames;
  }
  const querySelectorAll = getPrototype(element).prototype.querySelectorAll;
  const list = querySelectorAll.call(element, 'iframe,frame,object,embed');
  fillArrayUniques(frames, slice(list));
  if (includingParent) {
    fillArrayUniques(frames, [element]);
  }
  return frames;
}
function fillArrayUniques(arr, items) {
  let isArrUpdated = false;
  for (let i = 0; i < items.length; i++) {
    if (!arr.includes(items[i])) {
      arr.push(items[i]);
      isArrUpdated = true;
    }
  }
  return isArrUpdated;
}
module.exports = {
  getFramesArray,
  getFrameTag,
  shadows
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
}())