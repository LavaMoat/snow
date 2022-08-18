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
    isFrameElement = _require.isFrameElement;

var _require2 = __webpack_require__(14),
    getOnload = _require2.getOnload,
    setOnload = _require2.setOnload,
    removeAttribute = _require2.removeAttribute,
    addEventListener = _require2.addEventListener;

function resetOnloadAttribute(win, frame, cb) {
  if (!isFrameElement(frame)) {
    return;
  }

  var onload = getOnload(frame);

  if (onload) {
    setOnload(frame, null);
    removeAttribute(frame, 'onload');
    addEventListener(frame, 'load', function () {
      hook(win, [this], cb);
    });
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

var _require = __webpack_require__(733),
    securely = _require.securely;

var isCrossOrigin = __webpack_require__(851);

var workaroundChromiumBug = __webpack_require__(750);

function findWin(win, frameElement) {
  var frame = null,
      i = -1;

  while (win[++i]) {
    var cross = securely(function () {
      return isCrossOrigin(win[i], win, win.ObjectS);
    });

    if (!cross) {
      if (win[i].frameElement === frameElement) {
        frame = win[i];
        break;
      }
    }
  }

  return frame;
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

var _require = __webpack_require__(733),
    securely = _require.securely;

var _require2 = __webpack_require__(648),
    getFramesArray = _require2.getFramesArray;

var _require3 = __webpack_require__(14),
    removeAttribute = _require3.removeAttribute,
    getAttribute = _require3.getAttribute;

var WARN_OF_ONLOAD_ATTRIBUTES = false; // DEBUG MODE ONLY!

var WARN_OF_ONLOAD_ATTRIBUTES_MSG = 'WARN: Snow: Removing html string iframe onload attribute:';

function dropOnLoadAttributes(frames) {
  for (var i = 0; i < frames.length; i++) {
    var frame = frames[i];

    if (WARN_OF_ONLOAD_ATTRIBUTES) {
      var onload = getAttribute(frame, 'onload');

      if (onload) {
        console.warn(WARN_OF_ONLOAD_ATTRIBUTES_MSG, frame, onload);
      }
    }

    removeAttribute(frame, 'onload');
  }
}

function handleHTML(win, args) {
  var _loop = function _loop(i) {
    var html = args[i];

    if (typeof html !== 'string') {
      return "continue";
    }

    securely(function () {
      var template = document.createElementS('template');
      template.innerHTMLS = html;
      var frames = getFramesArray(template.contentS, false);
      dropOnLoadAttributes(frames);
      args[i] = template.innerHTMLS;
    });
  };

  for (var i = 0; i < args.length; i++) {
    var _ret = _loop(i);

    if (_ret === "continue") continue;
  }
}

module.exports = handleHTML;

/***/ }),

/***/ 352:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(733),
    securely = _require.securely,
    secureNewWin = _require.secureNewWin;

var hook = __webpack_require__(228);

var hookOpen = __webpack_require__(583);

var hookLoadSetters = __webpack_require__(459);

var hookDOMInserters = __webpack_require__(58);

var _require2 = __webpack_require__(14),
    addEventListener = _require2.addEventListener;

var callback;

module.exports = function onWin(cb) {
  var win = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

  function hookWin(contentWindow) {
    onWin(cb, contentWindow);
    addEventListener(contentWindow.frameElement, 'load', function () {
      hook(win, [this], function () {
        onWin(cb, contentWindow);
      });
    });
  }

  callback = callback || cb;

  if (callback !== cb) {
    return;
  }

  secureNewWin(win);
  hookOpen(win, hookWin);
  hookLoadSetters(win, hookWin);
  hookDOMInserters(win, hookWin);
  cb(win, securely);
};

/***/ }),

/***/ 58:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var resetOnloadAttributes = __webpack_require__(586);

var _require = __webpack_require__(733),
    securely = _require.securely;

var _require2 = __webpack_require__(648),
    getFramesArray = _require2.getFramesArray,
    getArguments = _require2.getArguments;

var handleHTML = __webpack_require__(328);

var hook = __webpack_require__(228);

var map = {
  Document: ['replaceChildren', 'append', 'prepend', 'write', 'writeln'],
  Node: ['appendChild', 'insertBefore', 'replaceChild'],
  Element: ['innerHTML', 'outerHTML', 'insertAdjacentHTML', 'replaceWith', 'insertAdjacentElement', 'append', 'before', 'prepend', 'after', 'replaceChildren']
};

function getHook(win, native, cb) {
  return function () {
    var _this = this;

    var args = getArguments(arguments);
    var element = securely(function () {
      return _this.parentElementS || _this;
    });
    resetOnloadAttributes(win, args, cb);
    handleHTML(win, args);
    var ret = securely(function () {
      return FunctionS.prototype.apply;
    }).call(native, this, args);
    var frames = getFramesArray(element, false);
    hook(win, frames, cb);
    hook(win, args, cb);
    return ret;
  };
}

function hookDOMInserters(win, cb) {
  var _loop = function _loop(proto) {
    var funcs = map[proto];

    var _loop2 = function _loop2(i) {
      var func = funcs[i];
      securely(function () {
        var desc = ObjectS.getOwnPropertyDescriptor(win[proto].prototype, func);
        var prop = desc.set ? 'set' : 'value';
        desc[prop] = getHook(win, desc[prop], cb);
        ObjectS.defineProperty(win[proto].prototype, func, desc);
      });
    };

    for (var i = 0; i < funcs.length; i++) {
      _loop2(i);
    }
  };

  for (var proto in map) {
    _loop(proto);
  }
}

module.exports = hookDOMInserters;

/***/ }),

/***/ 459:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hook = __webpack_require__(228);

var _require = __webpack_require__(733),
    securely = _require.securely;

var _require2 = __webpack_require__(648),
    getArguments = _require2.getArguments;

var _require3 = __webpack_require__(14),
    addEventListener = _require3.addEventListener;

function callOnload(that, onload, args) {
  if (onload) {
    if (onload.handleEvent) {
      return onload.handleEvent.apply(onload, args);
    } else {
      return onload.apply(that, args);
    }
  }
}

function getHook(win, cb) {
  return function (type, listener, options) {
    var onload = listener;

    if (type === 'load') {
      onload = function onload() {
        hook(win, [this], cb);
        var args = getArguments(arguments);
        callOnload(this, listener, args);
      };
    }

    return addEventListener(this, type, onload, options);
  };
}

function hookLoadSetters(win, cb) {
  securely(function () {
    ObjectS.defineProperty(win.EventTarget.prototype, 'addEventListener', {
      value: getHook(win, cb)
    });
  });
}

module.exports = hookLoadSetters;

/***/ }),

/***/ 14:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(733),
    securely = _require.securely;

function slice(arr, start, end) {
  return natives.slice.call(arr, start, end);
}

function nodeType(node) {
  return natives.nodeType.call(node);
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

function getAttribute(element) {
  return natives.getAttribute.call(element);
}

function addEventListener(element, event, listener, options) {
  return natives.addEventListener.call(element, event, listener, options);
}

var natives = securely(function () {
  return {
    slice: Object.getOwnPropertyDescriptor(ArrayS.prototype, 'slice').value,
    nodeType: Object.getOwnPropertyDescriptor(NodeS.prototype, 'nodeType').get,
    toString: Object.getOwnPropertyDescriptor(ObjectS.prototype, 'toString').value,
    getOnload: Object.getOwnPropertyDescriptor(HTMLElementS.prototype, 'onload').get,
    setOnload: Object.getOwnPropertyDescriptor(HTMLElementS.prototype, 'onload').set,
    getAttribute: Object.getOwnPropertyDescriptor(ElementS.prototype, 'getAttribute').value,
    removeAttribute: Object.getOwnPropertyDescriptor(ElementS.prototype, 'removeAttribute').value,
    addEventListener: Object.getOwnPropertyDescriptor(EventTargetS.prototype, 'addEventListener').value
  };
});
module.exports = {
  slice: slice,
  nodeType: nodeType,
  toString: toString,
  getOnload: getOnload,
  setOnload: setOnload,
  removeAttribute: removeAttribute,
  getAttribute: getAttribute,
  addEventListener: addEventListener
};

/***/ }),

/***/ 583:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(648),
    getArguments = _require.getArguments; // https://github.com/lavamoat/snow/issues/2


var ISSUE_2_SOLVED = false;

function hookOpen(win, cb) {
  var realOpen = win.open;

  win.open = function () {
    if (!ISSUE_2_SOLVED) {
      return null;
    }

    var args = getArguments(arguments);
    var opened = realOpen.apply(this, args);
    cb(opened);
    return opened;
  };
}

module.exports = hookOpen;

/***/ }),

/***/ 733:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var secure = __webpack_require__(528);

var config = {
  objects: {
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
    'DocumentFragment': ['querySelectorAll', 'toString'],
    'Object': ['toString'],
    'Array': ['includes', 'push', 'slice'],
    'Element': ['innerHTML', 'toString', 'querySelectorAll', 'getAttribute', 'removeAttribute', 'tagName'],
    'HTMLElement': ['onload', 'toString'],
    'HTMLScriptElement': ['src'],
    'HTMLTemplateElement': ['content'],
    'EventTarget': ['addEventListener']
  }
};
var securely = secure(top, config);
var wins = securely(function () {
  var arr = new ArrayS();
  arr.push(top);
  return arr;
});

function secureNewWin(win) {
  if (!wins.includes(win)) {
    wins.push(win);
    secure(win, config);
  }
}

module.exports = {
  securely: securely,
  secureNewWin: secureNewWin
};

/***/ }),

/***/ 648:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _require = __webpack_require__(733),
    securely = _require.securely;

var _require2 = __webpack_require__(14),
    toString = _require2.toString,
    nodeType = _require2.nodeType,
    slice = _require2.slice;

function getArguments(args) {
  return slice(args);
}

function isTrustedHTML(node) {
  return toString(node) === '[object TrustedHTML]';
}

function getPrototype(node) {
  switch (toString(node)) {
    case '[object HTMLDocument]':
      return DocumentS;

    case '[object DocumentFragment]':
      return DocumentFragmentS;

    default:
      return ElementS;
  }
}

function isFrameElement(element) {
  return securely(function () {
    return ['[object HTMLIFrameElement]', '[object HTMLFrameElement]', '[object HTMLObjectElement]', '[object HTMLEmbedElement]'].includesS(toString(element));
  });
}

function canNodeRunQuerySelector(node) {
  return securely(function () {
    return [ElementS.prototype.ELEMENT_NODE, ElementS.prototype.DOCUMENT_FRAGMENT_NODE, ElementS.prototype.DOCUMENT_NODE].includesS(nodeType(node));
  });
}

function getFramesArray(element, includingParent) {
  var frames = securely(function () {
    return new ArrayS();
  });

  if (null === element || _typeof(element) !== 'object') {
    return frames;
  }

  if (isTrustedHTML(element) || !canNodeRunQuerySelector(element)) {
    return frames;
  }

  var list = securely(function () {
    return getPrototype(element).prototype.querySelectorAll.call(element, 'iframe,frame,object,embed');
  });
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
  getArguments: getArguments,
  getFramesArray: getFramesArray,
  isFrameElement: isFrameElement
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