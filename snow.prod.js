(()=>{var e={528:(e,t,r)=>{const n=r(88),o=r(311),c=r(199);let i=!1;function u(){return i}function a(e,t,r,n,o,c,u,a,l,p,s){const f=i;let d,y;i=!0;try{d=e(t,r,n,o,c,u,a,l,p,s)}catch(c){y=c}if(f||(i=!1),y)throw y;return d}e.exports=function(e,t){return function(e,t){const r=e.document.createElement("iframe");e.document.head.appendChild(r),t(r.contentWindow),r.parentElement.removeChild(r)}(e,(r=>{a((()=>{t=t||new r.Object,n(e,r,u,t.objects||new r.Object),o(e,r,u,t.prototypes||new r.Object),c(e,r,u)}))})),a}},88:e=>{e.exports=function(e,t,r,n){for(const o in n){const c=n[o];for(let n=0;n<c.length;n++){const i=c[n];let u=t[o][i];"function"==typeof u&&(u=u.bind(e[o])),t.Object.defineProperty(e[o],i+"S",{configurable:!1,get:function(){if(r())return u}})}}}},311:e=>{function t(e,t){return function(r,n,o,c,i){if(t())return e(this,r,n,o,c,i)}}function r(e,r,n){const o=r.value,c=r.set||(()=>{}),i=r.get||(()=>o);r.configurable=!1,delete r.value,delete r.writable;const u=e.Function.prototype.call.bind(i),a=e.Function.prototype.call.bind(c);return r.get=t(u,n),r.set=t(a,n),r}function n(e,t,n,o,c,i){let u=e[c];const a=new t.Array;for(;;){const e=t.Object.getOwnPropertyDescriptor(u.prototype,i);if(t.Array.prototype.push.call(a,u.prototype),e)break;u=t.Object.getPrototypeOf(u.prototype).constructor}const l=t.Object.getOwnPropertyDescriptor(a[a.length-1],i);for(;a.length;){const e=t.Array.prototype.pop.call(a);n[e.constructor.name]&&t.Array.prototype.includes.call(n[e.constructor.name],i)||(t.Object.defineProperty(e,i+"S",r(t,l,o)),n[e.constructor.name]=n[e.constructor.name]||new t.Array,t.Array.prototype.push.call(n[e.constructor.name],i))}}e.exports=function(e,t,r,o){const c=new t.Object;for(const i in o){const u=t[i];t.Object.defineProperty(e,i+"S",{configurable:!1,get:function(){if(r())return u}}),c[i]=c[i]||new t.Array;const a=o[i];for(let o=0;o<a.length;o++){const u=a[o];n(e,t,c,r,i,u),n(e,t,c,r,i+"S",u)}}}},199:e=>{e.exports=function(e,t,r){let n=t.Object.getOwnPropertyDescriptor(e.Document.prototype,"currentScript").get.bind(e.document);t.Object.defineProperty(e.document,"currentScriptS",{configurable:!1,get:function(){if(r())return n()}})}},586:(e,t,r)=>{var n=r(228),o=r(648),c=o.getFramesArray,i=o.isFrameElement,u=r(14),a=u.getOnload,l=u.setOnload,p=u.removeAttribute,s=u.addEventListener;function f(e,t,r){if(i(t)){var o=a(t);o&&(l(t,null),p(t,"onload"),s(t,"load",(function(){n(e,[this],r)})),l(t,o))}}e.exports=function(e,t,r){for(var n=0;n<t.length;n++)for(var o=t[n],i=c(o,!0),u=0;u<i.length;u++)f(e,i[u],r)}},750:e=>{e.exports=function(e){e&&e.contentWindow}},228:(e,t,r)=>{var n=r(733).securely,o=r(851),c=r(750);function i(e,t){for(var r=null,c=-1;e[++c];)if(!n((function(){return o(e[c],e,e.ObjectS)}))&&e[c].frameElement===t){r=e[c];break}return r}e.exports=function(e,t,r){for(var n=0;n<t.length;n++){var o=t[n];c(o);var u=i(e,o);u&&r(u)}}},328:(e,t,r)=>{var n=r(733).securely,o=r(648).getFramesArray,c=r(14),i=c.removeAttribute;c.getAttribute,e.exports=function(e,t){for(var r=function(e){var r=t[e];if("string"!=typeof r)return"continue";n((function(){var n=document.createElementS("template");n.innerHTMLS=r,function(e){for(var t=0;t<e.length;t++){var r=e[t];i(r,"onload")}}(o(n.contentS,!1)),t[e]=n.innerHTMLS}))},c=0;c<t.length;c++)r(c)}},352:(e,t,r)=>{var n,o=r(733),c=o.securely,i=o.secureNewWin,u=r(228),a=r(583),l=r(459),p=r(58),s=r(14).addEventListener;e.exports=function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window;function o(n){e(t,n),s(n.frameElement,"load",(function(){u(r,[this],(function(){e(t,n)}))}))}(n=n||t)===t&&(i(r),a(r,o),l(r,o),p(r,o),t(r,c))}},58:(e,t,r)=>{var n=r(586),o=r(733).securely,c=r(648),i=c.getFramesArray,u=c.getArguments,a=r(328),l=r(228),p={Document:["replaceChildren","append","prepend","write","writeln"],Node:["appendChild","insertBefore","replaceChild"],Element:["innerHTML","outerHTML","insertAdjacentHTML","replaceWith","insertAdjacentElement","append","before","prepend","after","replaceChildren"]};e.exports=function(e,t){var r=function(r){for(var c=p[r],s=function(p){var s=c[p];o((function(){var c=ObjectS.getOwnPropertyDescriptor(e[r].prototype,s),p=c.set?"set":"value";c[p]=function(e,t,r){return function(){var c=this,p=u(arguments),s=o((function(){return c.parentElementS||c}));n(e,p,r),a(e,p);var f=o((function(){return FunctionS.prototype.apply})).call(t,this,p),d=i(s,!1);return l(e,d,r),l(e,p,r),f}}(e,c[p],t),ObjectS.defineProperty(e[r].prototype,s,c)}))},f=0;f<c.length;f++)s(f)};for(var c in p)r(c)}},459:(e,t,r)=>{var n=r(228),o=r(733).securely,c=r(648).getArguments,i=r(14).addEventListener;function u(e,t,r){if(t)return t.handleEvent?t.handleEvent.apply(t,r):t.apply(e,r)}function a(e,t){return function(r,o,a){var l=o;return"load"===r&&(l=function(){n(e,[this],t);var r=c(arguments);u(this,o,r)}),i(this,r,l,a)}}e.exports=function(e,t){o((function(){ObjectS.defineProperty(e.EventTarget.prototype,"addEventListener",{value:a(e,t)})}))}},14:(e,t,r)=>{var n=(0,r(733).securely)((function(){return{Array:ArrayS,slice:Object.getOwnPropertyDescriptor(ArrayS.prototype,"slice").value,nodeType:Object.getOwnPropertyDescriptor(NodeS.prototype,"nodeType").get,toString:Object.getOwnPropertyDescriptor(ObjectS.prototype,"toString").value,getOnload:Object.getOwnPropertyDescriptor(HTMLElementS.prototype,"onload").get,setOnload:Object.getOwnPropertyDescriptor(HTMLElementS.prototype,"onload").set,getAttribute:Object.getOwnPropertyDescriptor(ElementS.prototype,"getAttribute").value,removeAttribute:Object.getOwnPropertyDescriptor(ElementS.prototype,"removeAttribute").value,addEventListener:Object.getOwnPropertyDescriptor(EventTargetS.prototype,"addEventListener").value}}));e.exports={slice:function(e,t,r){return n.slice.call(e,t,r)},Array:function(){return n.Array()},nodeType:function(e){return n.nodeType.call(e)},toString:function(e){return n.toString.call(e)},getOnload:function(e){return n.getOnload.call(e)},setOnload:function(e,t){return n.setOnload.call(e,t)},removeAttribute:function(e,t){return n.removeAttribute.call(e,t)},getAttribute:function(e){return n.getAttribute.call(e)},addEventListener:function(e,t,r,o){return n.addEventListener.call(e,t,r,o)}}},583:(e,t,r)=>{r(648).getArguments,e.exports=function(e,t){e.open,e.open=function(){return null}}},733:(e,t,r)=>{var n=r(528),o={objects:{document:["createElement"],Object:["defineProperty","getOwnPropertyDescriptor"]},prototypes:{Attr:["localName","name","nodeName"],String:["toLowerCase"],Function:["apply","call","bind"],Map:["get","set"],Node:["nodeType","parentElement","toString"],Document:["querySelectorAll"],DocumentFragment:["querySelectorAll","toString"],Object:["toString"],Array:["includes","push","slice"],Element:["innerHTML","toString","querySelectorAll","getAttribute","removeAttribute","tagName"],HTMLElement:["onload","toString"],HTMLScriptElement:["src"],HTMLTemplateElement:["content"],EventTarget:["addEventListener"]}},c=n(top,o),i=c((function(){var e=new ArrayS;return e.push(top),e}));e.exports={securely:c,secureNewWin:function(e){i.includes(e)||(i.push(e),n(e,o))}}},648:(e,t,r)=>{function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}var o=r(733).securely,c=r(14),i=c.toString,u=c.nodeType,a=c.slice,l=c.Array;function p(e,t){for(var r=!1,n=0;n<t.length;n++)e.includes(t[n])||(e.push(t[n]),r=!0);return r}e.exports={getArguments:function(e){return a(e)},getFramesArray:function(e,t){var r,c=new l;if(null===e||"object"!==n(e))return c;if("[object TrustedHTML]"===i(e)||(r=e,!o((function(){return[ElementS.prototype.ELEMENT_NODE,ElementS.prototype.DOCUMENT_FRAGMENT_NODE,ElementS.prototype.DOCUMENT_NODE].includesS(u(r))}))))return c;var s=o((function(){return function(e){switch(i(e)){case"[object HTMLDocument]":return DocumentS;case"[object DocumentFragment]":return DocumentFragmentS;default:return ElementS}}(e).prototype.querySelectorAll.call(e,"iframe,frame,object,embed")}));return p(c,a(s)),t&&p(c,[e]),c},isFrameElement:function(e){return o((function(){return["[object HTMLIFrameElement]","[object HTMLFrameElement]","[object HTMLObjectElement]","[object HTMLEmbedElement]"].includesS(i(e))}))}}},626:e=>{e.exports={SRC_IS_NOT_A_WINDOW:'provided argument "src" must be a proper window of instance Window',DST_IS_NOT_A_WINDOW:'provided argument "dst" must be a proper window of instance Window',SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW:'provided argument "src" must be a window in the same origin as the current context window'}},851:(e,t,r)=>{const{DST_IS_NOT_A_WINDOW:n,SRC_IS_NOT_A_WINDOW:o,SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW:c}=r(626);function i(e,t){const r=t(e);return r===r.window}function u(e,t,r){return null===r.getPrototypeOf.call(t,e)}e.exports=function(e,t=window,r=window.Object){if(!i(t,r))throw new Error(o);if(!i(e,r))throw new Error(n);if(u(window,t,r))throw new Error(c);return u(e,t,r)}}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var c=t[n]={exports:{}};return e[n](c,c.exports,r),c.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e,t=r(352),n=r.n(t);e=window,Object.defineProperty(e,"SNOW",{value:n()})})()})();