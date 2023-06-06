(function(){"use strict";(()=>{var e={586:(e,t,n)=>{const r=n(228),{getFramesArray:o,getFrameTag:i}=n(648),{getOnload:c,setOnload:s,removeAttribute:a,addEventListener:u}=n(14);function l(e){if(!i(e))return;u(e,"load",(function(){r(e)}));const t=c(e);t&&(s(e,null),a(e,"onload"),s(e,t))}e.exports=function(e){for(let t=0;t<e.length;t++){const n=e[t],r=o(n,!0);for(let e=0;e<r.length;e++)l(r[e])}}},750:e=>{e.exports=function(e){e&&e.contentWindow}},832:(e,t,n)=>{const{Object:r,Function:o}=n(14),{isTagFramable:i}=n(648),{error:c,ERR_EXTENDING_FRAMABLES_BLOCKED:s}=n(312);e.exports=function(e){const t=r.getOwnPropertyDescriptor(e.CustomElementRegistry.prototype,"define");t.configurable=t.writable=!0;const n=t.value;var a;t.value=(a=n,function(e,t,n){let r=n;if(n){const t=n.extends;i(t+"")&&c(s,e,n)&&(r=void 0)}return o.prototype.call.call(a,this,e,t,r)}),r.defineProperty(e.CustomElementRegistry.prototype,"define",t)}},228:(e,t,n)=>{const r=n(851),o=n(750),{shadows:i,toArray:c,getFramesArray:s,getContentWindowOfFrame:a,getOwnerWindowOfNode:u}=n(648),{Object:l,getFrameElement:p}=n(14);function f(e,t){let n=-1;for(;e[++n];){if(r(e[n],e,l))continue;if(p(e[n])===t)return e[n];const o=f(e[n],t);if(o)return o}for(let n=0;n<i.length;n++){const r=i[n];if(u(r)!==e)continue;const o=s(r,!1);for(let e=0;e<o.length;e++){const n=o[e],r=a(n);if(n===t)return r;const i=f(r,t);if(i)return i}}return null}e.exports=function(e){e=c(e);for(let t=0;t<e.length;t++){const n=e[t];if("object"!=typeof n)continue;o(n);const r=f(top,n);r&&top.SNOW_WINDOW(r)}}},328:(e,t,n)=>{const{getFramesArray:r}=n(648),{Array:o,stringToLowerCase:i,split:c,getAttribute:s,setAttribute:a,getChildElementCount:u,createElement:l,getInnerHTML:p,setInnerHTML:f,remove:d,Element:m}=n(14),{warn:g,WARN_DECLARATIVE_SHADOWS:y}=n(312),w=m.prototype.querySelectorAll;function O(e,t){let n="top."+(e?"SNOW_FRAME":"SNOW_WINDOW")+"(this);";return t&&(n="<script>"+n+"document.currentScript.remove();<\/script>"),n}function E(e){let t=s(e,"onload");return!!t&&(t=O(!0,!1)+t,a(e,"onload",t),!0)}function h(e){let t=s(e,"src")||"";const[n,r]=c(t,":");return"javascript"===i(n)&&(t="javascript:"+O(!1,!1)+r,a(e,"src",t),!0)}function v(e){let t=s(e,"srcdoc");if(t){t=O(!1,!0)+t;const n=new o(t);return _(n,!0),a(e,"srcdoc",n[0]),!0}return!1}function _(e,t){for(let i=0;i<e.length;i++){const c=l(document,"html");if(f(c,e[i]),!u(c))continue;let s=!1;if(t){const e=l(document,"script");e.textContent=O(!1,!1),c.insertBefore(e,c.firstChild),s=!0}const a=w.call(c,"template[shadowroot]");for(let t=0;t<a.length;t++)n=a[t],o=e[i],g(y,n,o),d(n),s=!0;const m=r(c,!1);for(let e=0;e<m.length;e++){const t=m[e];s=E(t)||s,s=h(t)||s,s=v(t)||s}s&&(e[i]=p(c))}var n,o}e.exports={handleHTML:_}},352:(e,t,n)=>{const r=n(228),o=n(716),i=n(832),c=n(583),s=n(278),a=n(459),u=n(58),{hookShadowDOM:l}=n(373),{Object:p,Array:f,push:d,addEventListener:m,getFrameElement:g}=n(14),{isMarked:y,mark:w}=n(111),{error:O,warn:E,WARN_SNOW_FAILED_ON_TOP:h,ERR_PROVIDED_CB_IS_NOT_A_FUNCTION:v,ERR_MARK_NEW_WINDOW_FAILED:_}=n(312);function D(e,t){const n=p.create(null);n.value=t,p.defineProperty(top,e,n)}function N(e){try{const t=!y(e);return t&&w(e),t}catch(t){if(e===top)return E(h,e),!1;O(_,e,t)}return N(e)}function b(e,t){if(N(e)){!function(e){!function(e){const t=g(e);m(t,"load",(function(){r(t)}))}(e),o(e),i(e),c(e),s(e),a(e,"load"),u(e),l(e)}(e);for(let t=0;t<A.length;t++)if(A[t](e))return}t&&t(e)}const A=new f;e.exports=function(e){"function"!=typeof e&&O(v,e)||(A.length||(D("SNOW_WINDOW",(function(e){b(e)})),D("SNOW_FRAME",(function(e){r(e)}))),d(A,e),b(top,e))}},58:(e,t,n)=>{const{protectShadows:r}=n(373),o=n(586),{getFramesArray:i,shadows:c}=n(648),{getParentElement:s,slice:a,Object:u,Function:l}=n(14),{handleHTML:p}=n(328),f=n(228),d={DocumentFragment:["replaceChildren","append","prepend"],Document:["replaceChildren","append","prepend","write","writeln"],Node:["appendChild","insertBefore","replaceChild"],Element:["innerHTML","outerHTML","insertAdjacentHTML","replaceWith","insertAdjacentElement","append","before","prepend","after","replaceChildren"],ShadowRoot:["innerHTML"],HTMLIFrameElement:["srcdoc"]};function m(e,t){return function(){const n=a(arguments),u=s(this)||this;!function(e){o(e),o(c),p(e,t)}(n);const d=l.prototype.apply.call(e,this,n);return function(e,t){const n=i(t,!1);f(n),f(e),r(!0)}(n,u),d}}e.exports=function(e){for(const t in d){const n=d[t];for(let r=0;r<n.length;r++){const o=n[r],i=u.getOwnPropertyDescriptor(e[t].prototype,o);if(!i)continue;const c=i.set?"set":"value";i[c]=m(i[c],"srcdoc"===o),i.configurable=!0,"value"===c&&(i.writable=!0),u.defineProperty(e[t].prototype,o,i)}}}},459:(e,t,n)=>{const r=n(228),{removeEventListener:o,addEventListener:i,slice:c,Map:s,Object:a}=n(14),u=new s;function l(e,t){return function(n,o,s){let a=o;return n===t&&(u.has(o)||u.set(o,(function(){r(this);const e=c(arguments);!function(e,t,n){t&&(t.handleEvent?t.handleEvent.apply(t,n):t.apply(e,n))}(this,o,e)})),a=u.get(o)),i(this||e,n,a,s)}}function p(e,t){return function(n,r,i){let c=r;return n===t&&(c=u.get(r),u.delete(r)),o(this||e,n,c,i)}}e.exports=function(e,t){a.defineProperty(e.EventTarget.prototype,"addEventListener",{configurable:!0,writable:!0,value:l(e,t)}),a.defineProperty(e.EventTarget.prototype,"removeEventListener",{configurable:!0,writable:!0,value:p(e,t)})}},312:(e,t,n)=>{const{console:r}=n(14);e.exports={warn:function(e,t,n){let o;switch(e){case 5:const e=t,i=n;o=!1,r.warn("SNOW:","removing html string representing a declarative shadow:",e,"\n",`"${i}"`,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/32#issuecomment-1239273328",".");break;case 3:const c=t,s=n;o=!0,r.warn("SNOW:",o?"":"NOT",'blocking open attempt to "javascript:" url:',c,"by window: ",s,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/44#issuecomment-1369687802",".");break;case 2:const a=t,u=n;o=!0,r.warn("SNOW:","blocking access to property:",`"${a}"`,"of opened window: ",u,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255",".");break;case 8:const l=t;o=!1,r.warn("SNOW:","applying snow to top window was bailed:",l,".","\n","if this is a window/tab opened by another snow protected window, you may ignore this message",".","\n","if this is the very first snow instance to run, this page might be compromised by an attacker who is trying to bypass snow",".")}return o},error:function(e,t,n){let o;switch(e){case 7:const e=t,i=n;o=!0,r.error("SNOW:",`calling "URL.createObjectURL()" on a "${e}" object is forbidden under snow protection:`,i,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/43#issuecomment-1434063891",".","\n");break;case 6:const c=t,s=n;o=!0,r.error("SNOW:",`"${c}"`,"extending attempt","of framable elements such as provided",s,"is blocked to prevent bypass",".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/56#issuecomment-1374899809",".","\n");break;case 1:const a=t,u=n;o=!0,r.error("SNOW:","failed to mark new window:",a,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/33#issuecomment-1239280063",".","\n","in order to maintain a bulletproof defense mechanism, failing to mark a new window typically causes an infinite loop",".","\n","error caught:","\n",u);break;case 4:const l=t;o=!0,r.error("SNOW:",'first argument must be of type "function", instead got:',l,".","\n","therefore, snow bailed and is not applied to the page until this is fixed.")}return o},ERR_MARK_NEW_WINDOW_FAILED:1,WARN_OPEN_API_LIMITED:2,WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME:3,ERR_PROVIDED_CB_IS_NOT_A_FUNCTION:4,WARN_DECLARATIVE_SHADOWS:5,ERR_EXTENDING_FRAMABLES_BLOCKED:6,ERR_BLOB_FILE_URL_OBJECT_FORBIDDEN:7,WARN_SNOW_FAILED_ON_TOP:8}},111:(e,t,n)=>{const{Map:r,Object:o,Array:i}=n(14),c=new i,s=new r;e.exports={isMarked:function(e){if(!s.has(e))return!1;const t=o.getOwnPropertyDescriptor(e,"SNOW_ID");if(!t||!o.hasOwnProperty.call(t,"value"))return!1;if("function"!=typeof t.value)return!1;const n=s.get(e);return t.value(c)===n},mark:function(e){const t=new i,n=o.create(null);n.value=e=>e===c&&t,o.defineProperty(e,"SNOW_ID",n),s.set(e,t)}}},14:e=>{e.exports=function(e){const t=function(e){const{EventTarget:t}=e;return function(e,n){const r=e.document.createElement("iframe");(e.document.head||e.document.documentElement).appendChild(r);const o=function(e){const{console:n,Proxy:r,JSON:o,Attr:i,String:c,Function:s,Map:a,Node:u,Document:l,DocumentFragment:p,ShadowRoot:f,Object:d,Reflect:m,Array:g,Element:y,HTMLElement:w,HTMLTemplateElement:O,HTMLIFrameElement:E,HTMLFrameElement:h,HTMLObjectElement:v}=e,_={console:n,Proxy:r,JSON:o,Attr:i,String:c,Function:s,Map:a,Node:u,Document:l,DocumentFragment:p,ShadowRoot:f,Object:d,Reflect:m,Array:g,Element:y,HTMLElement:w,HTMLTemplateElement:O,EventTarget:t,HTMLIFrameElement:E,HTMLFrameElement:h,HTMLObjectElement:v};return _.document={createElement:e.document.createElement},_}(r.contentWindow);return r.parentElement.removeChild(r),o}(e)}(e),{console:n,Proxy:r,Function:o,String:i,Map:c,Node:s,Document:a,DocumentFragment:u,ShadowRoot:l,Object:p,Reflect:f,Array:d,Element:m,HTMLElement:g,HTMLTemplateElement:y,EventTarget:w,HTMLIFrameElement:O,HTMLFrameElement:E,HTMLObjectElement:h}=t;return p.assign(t,{iframeContentWindow:p.getOwnPropertyDescriptor(O.prototype,"contentWindow").get,frameContentWindow:p.getOwnPropertyDescriptor(E.prototype,"contentWindow").get,objectContentWindow:p.getOwnPropertyDescriptor(h.prototype,"contentWindow").get,createElement:p.getOwnPropertyDescriptor(a.prototype,"createElement").value,slice:p.getOwnPropertyDescriptor(d.prototype,"slice").value,push:p.getOwnPropertyDescriptor(d.prototype,"push").value,split:p.getOwnPropertyDescriptor(i.prototype,"split").value,nodeType:p.getOwnPropertyDescriptor(s.prototype,"nodeType").get,tagName:p.getOwnPropertyDescriptor(m.prototype,"tagName").get,getInnerHTML:p.getOwnPropertyDescriptor(m.prototype,"innerHTML").get,setInnerHTML:p.getOwnPropertyDescriptor(m.prototype,"innerHTML").set,toString:p.getOwnPropertyDescriptor(p.prototype,"toString").value,getOnload:p.getOwnPropertyDescriptor(g.prototype,"onload").get,setOnload:p.getOwnPropertyDescriptor(g.prototype,"onload").set,getAttribute:p.getOwnPropertyDescriptor(m.prototype,"getAttribute").value,setAttribute:p.getOwnPropertyDescriptor(m.prototype,"setAttribute").value,removeAttribute:p.getOwnPropertyDescriptor(m.prototype,"removeAttribute").value,remove:p.getOwnPropertyDescriptor(m.prototype,"remove").value,addEventListener:p.getOwnPropertyDescriptor(w.prototype,"addEventListener").value,removeEventListener:p.getOwnPropertyDescriptor(w.prototype,"removeEventListener").value,getChildElementCount:p.getOwnPropertyDescriptor(m.prototype,"childElementCount").get,getFrameElement:p.getOwnPropertyDescriptor(e,"frameElement").get,getParentElement:p.getOwnPropertyDescriptor(s.prototype,"parentElement").get,getOwnerDocument:p.getOwnPropertyDescriptor(s.prototype,"ownerDocument").get,getDefaultView:p.getOwnPropertyDescriptor(a.prototype,"defaultView").get}),{console:n,Proxy:r,Object:p,Reflect:f,Function:o,Node:s,Element:m,Document:a,DocumentFragment:u,ShadowRoot:l,Array:d,Map:c,getContentWindow:function(e,n){switch(n){case"IFRAME":return t.iframeContentWindow.call(e);case"FRAME":return t.frameContentWindow.call(e);case"OBJECT":return t.objectContentWindow.call(e);default:return null}},stringToLowerCase:function(e){return t.String.prototype.toLowerCase.call(e)},stringStartsWith:function(e,n){return t.String.prototype.startsWith.call(e,n)},parse:function(e,n){return t.JSON.parse(e,n)},stringify:function(e,n,r){return t.JSON.stringify(e,n,r)},slice:function(e,n,r){return t.slice.call(e,n,r)},push:function(e,n){return t.push.call(e,n)},split:function(e,n){return t.split.call(e,n)},nodeType:function(e){return t.nodeType.call(e)},tagName:function(e){return t.tagName.call(e)},toString:function(e){return t.toString.call(e)},getOnload:function(e){return t.getOnload.call(e)},setOnload:function(e,n){return t.setOnload.call(e,n)},remove:function(e){return t.remove.call(e)},removeAttribute:function(e,n){return t.removeAttribute.call(e,n)},getAttribute:function(e,n){return t.getAttribute.call(e,n)},setAttribute:function(e,n,r){return t.setAttribute.call(e,n,r)},addEventListener:function(e,n,r,o){return t.addEventListener.call(e,n,r,o)},removeEventListener:function(e,n,r,o){return t.removeEventListener.call(e,n,r,o)},createElement:function(e,n,r){return t.createElement.call(e,n,r)},getInnerHTML:function(e){return t.getInnerHTML.call(e)},setInnerHTML:function(e,n){return t.setInnerHTML.call(e,n)},getChildElementCount:function(e){return t.getChildElementCount.call(e)},getFrameElement:function(e){return t.Function.prototype.call.call(t.getFrameElement,e)},getParentElement:function(e){return t.getParentElement.call(e)},getOwnerDocument:function(e){return t.getOwnerDocument.call(e)},getDefaultView:function(e){return t.getDefaultView.call(e)}}}(top)},583:(e,t,n)=>{const{stringToLowerCase:r,stringStartsWith:o,slice:i,Function:c,Object:s}=n(14),{warn:a,WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME:u}=n(312),{proxy:l,getProxyByOpened:p}=n(134);function f(e){const t=s.getOwnPropertyDescriptor(e.MessageEvent.prototype,"source"),n=t.get;t.get=function(){const e=n.call(this);return p(e)||e},s.defineProperty(e.MessageEvent.prototype,"source",t)}function d(e,t,n){return n(e),function(){const n=i(arguments),s=n[0]+"",p=n[1],f=n[2];if(o(r(s),"javascript")&&a(u,s,e))return null;const d=c.prototype.call.call(t,this,s,p,f);return d?l(d):null}}e.exports=function(e){e.open=d(e,e.open,f),e.document.open=d(e,e.document.open,f)}},134:(e,t,n)=>{const{Object:r,Proxy:o,Reflect:i,Map:c}=n(14),{warn:s,WARN_OPEN_API_LIMITED:a}=n(312),u=new c;function l(e){return u.get(e)}e.exports={proxy:function(e){const t=new r(null);if(r.defineProperty(t,"closed",{get:function(){return e.closed}}),r.defineProperty(t,"close",{value:function(){return e.close()}}),r.defineProperty(t,"focus",{value:function(){return e.focus()}}),r.defineProperty(t,"postMessage",{value:function(t,n,r){return e.postMessage(t,n,r)}}),!u.has(e)){top.SNOW_WINDOW(e);const n=new o(t,{get:function(t,n){let r=i.get(t,n);return i.has(t,n)||i.has(e,n)&&(s(a,n,e)||(r=i.get(e,n))),r},set:function(){}});u.set(e,n)}return l(e)},getProxyByOpened:l}},278:(e,t,n)=>{const{Object:r,slice:o,Function:i}=n(14),{proxy:c}=n(134);function s(e,t){const n=r.getOwnPropertyDescriptor(e[t].prototype,"window"),o=n.get;n.get=function(){return c(o.call(this))},r.defineProperty(e[t].prototype,"window",n)}e.exports=function(e){e?.documentPictureInPicture?.requestWindow&&(e.documentPictureInPicture.requestWindow=function(e,t,n){return n(e,"DocumentPictureInPictureEvent"),n(e,"DocumentPictureInPicture"),async function(){const e=o(arguments),n=await i.prototype.apply.call(t,this,e);return n?c(n):null}}(e,e.documentPictureInPicture.requestWindow,s))}},373:(e,t,n)=>{const r=n(228),{getFramesArray:o,shadows:i}=n(648),{Object:c,Function:s}=n(14);function a(e){for(let t=0;t<i.length;t++){const n=i[t];if(e&&!n.isConnected)continue;const c=o(n,!1);r(c)}}e.exports={hookShadowDOM:function(e){const t=c.getOwnPropertyDescriptor(e.Element.prototype,"attachShadow");t.configurable=t.writable=!0;const n=t.value;var r;t.value=(r=n,function(e){const t=s.prototype.call.call(r,this,e);return i.push(t),a(!0),t}),c.defineProperty(e.Element.prototype,"attachShadow",t)},protectShadows:a}},716:(e,t,n)=>{const{Object:r}=n(14),{error:o,ERR_BLOB_FILE_URL_OBJECT_FORBIDDEN:i}=n(312),c="Blob",s="File";function a(e,t){const n=e[t];return function(e,o,i){const c=new n(e,o,i);return r.defineProperty(c,t,{value:!0}),c}}e.exports=function(e){var t;r.defineProperty(e.URL,"createObjectURL",{value:(t=e.URL.createObjectURL,function(e){const n=e[c]?c:e[s]?s:null;if(!n||!o(i,n,e))return t(e)})}),e[c]=a(e,c),e[s]=a(e,s)}},648:(e,t,n)=>{const{tagName:r,nodeType:o,slice:i,Array:c,parse:s,stringify:a,Node:u,Document:l,DocumentFragment:p,Element:f,ShadowRoot:d,getContentWindow:m,getDefaultView:g,getOwnerDocument:y,stringToLowerCase:w}=n(14),O=new c;function E(e){return O.includes(e)}function h(e){const t=w(e);return"iframe"===t||"frame"===t||"object"===t||"embed"===t}function v(e){if(!e||"object"!=typeof e)return null;if(o(e)!==f.prototype.ELEMENT_NODE)return null;if(E(e))return null;const t=r(e);return h(t)?t:null}function _(e){return c.isArray(e)||(e=new c(e)),e}function D(e,t){let n=!1;for(let r=0;r<t.length;r++)e.includes(t[r])||(e.push(t[r]),n=!0);return n}e.exports={toArray:_,isTagFramable:h,getOwnerWindowOfNode:function(e){return g(y(e))},getContentWindowOfFrame:function(e){return m(e,v(e))},getFramesArray:function(e,t){const n=new c;if(null===e||"object"!=typeof e)return n;if("string"==typeof s(a(r=e,((e,t)=>e||r!==t?"":t)))||!function(e){if(E(e))return!0;const t=o(e);return t===f.prototype.ELEMENT_NODE||t===f.prototype.DOCUMENT_FRAGMENT_NODE||t===f.prototype.DOCUMENT_NODE}(e))return n;var r;const m=function(e){if(E(e))return d;switch(o(e)){case u.prototype.DOCUMENT_NODE:return l;case u.prototype.DOCUMENT_FRAGMENT_NODE:return p;default:return f}}(e).prototype.querySelectorAll.call(e,"iframe,frame,object,embed");return D(n,i(m)),t&&D(n,_(e)),n},getFrameTag:v,shadows:O}},626:e=>{e.exports={SRC_IS_NOT_A_WINDOW:'provided argument "src" must be a proper window of instance Window',DST_IS_NOT_A_WINDOW:'provided argument "dst" must be a proper window of instance Window',SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW:'provided argument "src" must be a window in the same origin as the current context window'}},851:(e,t,n)=>{const{DST_IS_NOT_A_WINDOW:r,SRC_IS_NOT_A_WINDOW:o,SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW:i}=n(626);function c(e,t){const n=t(e);return n===n.window}function s(e,t,n){return null===n.getPrototypeOf.call(t,e)}e.exports=function(e,t=window,n=window.Object){if(!c(t,n))throw new Error(o);if(!c(e,n))throw new Error(r);if(s(window,t,n))throw new Error(i);return s(e,t,n)}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e,t=n(352),r=n.n(t);e=top,Object.defineProperty(e,"SNOW",{value:r()})})()})();}())