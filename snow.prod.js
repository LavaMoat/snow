(function(){"use strict";(()=>{var e={586:(e,t,n)=>{const r=n(228),{getFramesArray:o,getFrameTag:i}=n(648),{getOnload:c,setOnload:a,removeAttribute:s,addEventListener:l}=n(14);function u(e,t,n){if(!i(t))return;l(t,"load",(function(){r(e,[this],n)}));const o=c(t);o&&(a(t,null),s(t,"onload"),a(t,o))}e.exports=function(e,t,n){for(let r=0;r<t.length;r++){const i=t[r],c=o(i,!0);for(let t=0;t<c.length;t++)u(e,c[t],n)}}},750:e=>{e.exports=function(e){e&&e.contentWindow}},228:(e,t,n)=>{const r=n(851),o=n(750),{shadows:i,getFramesArray:c,getFrameTag:a}=n(648),{getContentWindow:s,Object:l,getFrameElement:u}=n(14);function p(e,t){let n=-1;for(;e[++n];)if(!r(e[n],e,l)&&u(e[n])===t)return e[n];for(let e=0;e<i.length;e++){const n=i[e],r=c(n,!1);for(let e=0;e<r.length;e++)if(r[e]===t)return s(r[e],a(r[e]))}return null}e.exports=function(e,t,n){for(let r=0;r<t.length;r++){const i=t[r];o(i);const c=p(e,i);c&&n(c)}}},328:(e,t,n)=>{const{getFramesArray:r}=n(648),{removeAttribute:o,getAttribute:i,getTemplateContent:c,createElement:a,getInnerHTML:s,setInnerHTML:l}=n(14),{warn:u,WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED:p}=n(312);function f(e){for(let t=0;t<e.length;t++){const n=e[t],r=i(n,"onload");r&&(u(p,n,r),o(n,"onload"))}}e.exports={handleHTML:function(e){for(let t=0;t<e.length;t++){const n=e[t],o=a(document,"template");l(o,n);const i=r(c(o),!1);i.length&&(f(i),e[t]=s(o))}},handleSrcDoc:function(e,t){t&&(e[0]="<script>top.SNOW_CB(null, window)<\/script>"+e[0])}}},352:(e,t,n)=>{const r=n(228),o=n(583),i=n(459),c=n(58),{hookShadowDOM:a}=n(373),{Object:s,addEventListener:l,getFrameElement:u}=n(14),{isMarked:p,mark:f}=n(111),{error:d,ERR_PROVIDED_CB_IS_NOT_A_FUNCTION:m,ERR_MARK_NEW_WINDOW_FAILED:g}=n(312);function E(e){try{const t=!p(e);return t&&f(e),t}catch(t){d(g,e,t)}return E(e)}function y(e,t){E(t)&&function(e,t,n){o(e,t),i(e,"load",t),c(e,t),a(e,t),n(e)}(t,(function(n){y(e,n),l(u(n),"load",(function(){r(t,[this],(function(){y(e,n)}))}))}),e)}let w;e.exports=function e(t,n){if(!w){if("function"!=typeof t&&d(m,t))return;s.defineProperty(top,"SNOW_CB",{value:e}),w=t}y(w,n||top)}},58:(e,t,n)=>{const{protectShadows:r}=n(373),o=n(586),{getFramesArray:i,shadows:c}=n(648),{getParentElement:a,slice:s,Object:l,Function:u}=n(14),{handleHTML:p,handleSrcDoc:f}=n(328),d=n(228),m={DocumentFragment:["replaceChildren","append","prepend"],Document:["replaceChildren","append","prepend","write","writeln"],Node:["appendChild","insertBefore","replaceChild"],Element:["innerHTML","outerHTML","insertAdjacentHTML","replaceWith","insertAdjacentElement","append","before","prepend","after","replaceChildren"],ShadowRoot:["innerHTML"],HTMLIFrameElement:["srcdoc"]};function g(e,t,n,l){return function(){const m=s(arguments),g=a(this)||this;o(e,m,n),o(e,c,n),f(m,l),p(m),p(c);const E=u.prototype.apply.call(t,this,m),y=i(g,!1);return d(e,y,n),d(e,m,n),r(e,n,!0),E}}e.exports=function(e,t){for(const n in m){const r=m[n];for(let o=0;o<r.length;o++){const i=r[o],c=l.getOwnPropertyDescriptor(e[n].prototype,i),a=c.set?"set":"value";c[a]=g(e,c[a],t,"srcdoc"===i),l.defineProperty(e[n].prototype,i,c)}}}},459:(e,t,n)=>{const r=n(228),{removeEventListener:o,addEventListener:i,slice:c,Map:a,Object:s}=n(14),l=new a;function u(e,t,n){if(t)return t.handleEvent?t.handleEvent.apply(t,n):t.apply(e,n)}function p(e,t,n){return function(o,a,s){let p=a;return o===t&&(l.has(a)||l.set(a,(function(){r(e,[this],n);const t=c(arguments);u(this,a,t)})),p=l.get(a)),i(this||e,o,p,s)}}function f(e,t){return function(n,r,i){let c=r;return n===t&&(c=l.get(r),l.delete(r)),o(this||e,n,c,i)}}e.exports=function(e,t,n){s.defineProperty(e.EventTarget.prototype,"addEventListener",{value:p(e,t,n)}),s.defineProperty(e.EventTarget.prototype,"removeEventListener",{value:f(e,t)})}},312:(e,t,n)=>{const{console:r}=n(14);e.exports={warn:function(e,t,n){let o;switch(e){case 1:const e=t,i=n;o=!1,r.warn("SNOW:","removing html string iframe onload attribute:",e,`"${i}"`,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/32#issuecomment-1239273328",".");break;case 4:const c=t,a=n;o=!0,r.warn("SNOW:",o?"":"NOT",'blocking open attempt to "javascript:" url:',c,"by window: ",a,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255",".");break;case 3:const s=t,l=n;o=!0,r.warn("SNOW:","blocking access to property:",`"${s}"`,"of opened window: ",l,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255",".")}return o},error:function(e,t,n){let o;switch(e){case 2:const e=t,i=n;o=!0,r.error("SNOW:","failed to mark new window:",e,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/33#issuecomment-1239280063",".","\n","in order to maintain a bulletproof defense mechanism, failing to mark a new window typically causes an infinite loop",".","\n","error caught:","\n",i);break;case 5:const c=t;o=!0,r.error("SNOW:",'first argument must be of type "function", instead got:',c,".","\n","therefore, snow bailed and is not applied to the page until this is fixed.")}return o},WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED:1,ERR_MARK_NEW_WINDOW_FAILED:2,WARN_OPEN_API_LIMITED:3,WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME:4,ERR_PROVIDED_CB_IS_NOT_A_FUNCTION:5}},111:(e,t,n)=>{const{Map:r,Object:o,Array:i}=n(14),c=(Math.random()+1).toString(36).substring(7),a=new r;e.exports={isMarked:function(e){if(!a.has(e))return!1;const t=o.getOwnPropertyDescriptor(e,"SNOW_ID");if(!t||!o.hasOwnProperty.call(t,"value"))return!1;if("function"!=typeof t.value)return!1;const n=a.get(e);return t.value(c)===n},mark:function(e){const t=new i;o.defineProperty(e,"SNOW_ID",{configurable:!1,writable:!1,value:e=>e===c&&t}),a.set(e,t)}}},14:e=>{e.exports=function(e){const t=function(e){return function(e,t){const n=e.document.createElement("iframe");(e.document.head||e.document.documentElement).appendChild(n);const r=function(e){const{console:t,Proxy:n,JSON:r,Attr:o,String:i,Function:c,Map:a,Node:s,Document:l,DocumentFragment:u,ShadowRoot:p,Object:f,Reflect:d,Array:m,Element:g,HTMLElement:E,HTMLTemplateElement:y,EventTarget:w,HTMLIFrameElement:O,HTMLFrameElement:h,HTMLObjectElement:_}=e,T={console:t,Proxy:n,JSON:r,Attr:o,String:i,Function:c,Map:a,Node:s,Document:l,DocumentFragment:u,ShadowRoot:p,Object:f,Reflect:d,Array:m,Element:g,HTMLElement:E,HTMLTemplateElement:y,EventTarget:w,HTMLIFrameElement:O,HTMLFrameElement:h,HTMLObjectElement:_};return T.document={createElement:e.document.createElement},T}(n.contentWindow);return n.parentElement.removeChild(n),r}(e)}(e),{console:n,Proxy:r,Function:o,Map:i,Node:c,Document:a,DocumentFragment:s,ShadowRoot:l,Object:u,Reflect:p,Array:f,Element:d,HTMLElement:m,HTMLTemplateElement:g,EventTarget:E,HTMLIFrameElement:y,HTMLFrameElement:w,HTMLObjectElement:O}=t;return u.assign(t,{iframeContentWindow:u.getOwnPropertyDescriptor(y.prototype,"contentWindow").get,frameContentWindow:u.getOwnPropertyDescriptor(w.prototype,"contentWindow").get,objectContentWindow:u.getOwnPropertyDescriptor(O.prototype,"contentWindow").get,createElement:u.getOwnPropertyDescriptor(a.prototype,"createElement").value,slice:u.getOwnPropertyDescriptor(f.prototype,"slice").value,nodeType:u.getOwnPropertyDescriptor(c.prototype,"nodeType").get,tagName:u.getOwnPropertyDescriptor(d.prototype,"tagName").get,getInnerHTML:u.getOwnPropertyDescriptor(d.prototype,"innerHTML").get,setInnerHTML:u.getOwnPropertyDescriptor(d.prototype,"innerHTML").set,toString:u.getOwnPropertyDescriptor(u.prototype,"toString").value,getOnload:u.getOwnPropertyDescriptor(m.prototype,"onload").get,setOnload:u.getOwnPropertyDescriptor(m.prototype,"onload").set,getAttribute:u.getOwnPropertyDescriptor(d.prototype,"getAttribute").value,removeAttribute:u.getOwnPropertyDescriptor(d.prototype,"removeAttribute").value,addEventListener:u.getOwnPropertyDescriptor(E.prototype,"addEventListener").value,removeEventListener:u.getOwnPropertyDescriptor(E.prototype,"removeEventListener").value,getTemplateContent:u.getOwnPropertyDescriptor(g.prototype,"content").get,getFrameElement:u.getOwnPropertyDescriptor(e,"frameElement").get,getParentElement:u.getOwnPropertyDescriptor(c.prototype,"parentElement").get}),{console:n,Proxy:r,Object:u,Reflect:p,Function:o,Node:c,Element:d,Document:a,DocumentFragment:s,ShadowRoot:l,Array:f,Map:i,getContentWindow:function(e,n){switch(n){case"IFRAME":return t.iframeContentWindow.call(e);case"FRAME":return t.frameContentWindow.call(e);case"OBJECT":return t.objectContentWindow.call(e);default:return null}},stringToLowerCase:function(e){return t.String.prototype.toLowerCase.call(e)},stringStartsWith:function(e,n){return t.String.prototype.startsWith.call(e,n)},parse:function(e,n){return t.JSON.parse(e,n)},stringify:function(e,n,r){return t.JSON.stringify(e,n,r)},slice:function(e,n,r){return t.slice.call(e,n,r)},nodeType:function(e){return t.nodeType.call(e)},tagName:function(e){return t.tagName.call(e)},toString:function(e){return t.toString.call(e)},getOnload:function(e){return t.getOnload.call(e)},setOnload:function(e,n){return t.setOnload.call(e,n)},removeAttribute:function(e,n){return t.removeAttribute.call(e,n)},getAttribute:function(e,n){return t.getAttribute.call(e,n)},addEventListener:function(e,n,r,o){return t.addEventListener.call(e,n,r,o)},removeEventListener:function(e,n,r,o){return t.removeEventListener.call(e,n,r,o)},createElement:function(e,n,r){return t.createElement.call(e,n,r)},getInnerHTML:function(e){return t.getInnerHTML.call(e)},setInnerHTML:function(e,n){return t.setInnerHTML.call(e,n)},getTemplateContent:function(e){return t.getTemplateContent.call(e)},getFrameElement:function(e){return t.Function.prototype.call.call(t.getFrameElement,e)},getParentElement:function(e){return t.getParentElement.call(e)}}}(top)},583:(e,t,n)=>{const{stringToLowerCase:r,stringStartsWith:o,slice:i,Function:c,Object:a,Reflect:s,Proxy:l,Map:u}=n(14),{warn:p,WARN_OPEN_API_LIMITED:f,WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME:d}=n(312),m=new u;function g(e,t){const n={};return a.defineProperty(n,"closed",{get:function(){return t.closed}}),a.defineProperty(n,"close",{value:function(){return t.close()}}),a.defineProperty(n,"focus",{value:function(){return t.focus()}}),a.defineProperty(n,"postMessage",{value:function(e,n,r){return t.postMessage(e,n,r)}}),new l(n,{get:function(n,r){let o=s.get(n,r);return s.has(n,r)||s.has(t,r)&&(p(f,r,e)||(o=s.get(t,r))),o},set:function(){}})}e.exports=function(e,t){!function(e){const t=a.getOwnPropertyDescriptor(e.MessageEvent.prototype,"source"),n=t.get;t.get=function(){const e=n.call(this);return m.get(e)||e},a.defineProperty(e.MessageEvent.prototype,"source",t)}(e),e.open=function(e,t,n){return function(){const a=i(arguments),s=a[0]+"",l=a[1],u=a[2];if(o(r(s),"javascript")&&p(d,s,e))return null;const f=c.prototype.call.call(t,this,s,l,u);if(!f)return null;n(f);const E=g(e,f);return m.set(f,E),E}}(e,e.open,t)}},373:(e,t,n)=>{const r=n(228),{getFramesArray:o,shadows:i}=n(648),{Object:c,Function:a}=n(14);function s(e,t,n){for(let c=0;c<i.length;c++){const a=i[c];if(n&&!a.isConnected)continue;const s=o(a,!1);r(e,s,t)}}e.exports={hookShadowDOM:function(e,t){const n=c.getOwnPropertyDescriptor(e.Element.prototype,"attachShadow"),r=n.value;n.value=function(e,t,n){return function(r){const o=a.prototype.call.call(t,this,r);return i.push(o),s(e,n,!0),o}}(e,r,t),c.defineProperty(e.Element.prototype,"attachShadow",n)},protectShadows:s}},648:(e,t,n)=>{const{tagName:r,nodeType:o,slice:i,Array:c,parse:a,stringify:s,Node:l,Document:u,DocumentFragment:p,Element:f,ShadowRoot:d}=n(14),m=new c;function g(e){return m.includes(e)}function E(e,t){let n=!1;for(let r=0;r<t.length;r++)e.includes(t[r])||(e.push(t[r]),n=!0);return n}e.exports={getFramesArray:function(e,t){const n=new c;if(null===e||"object"!=typeof e)return n;if("string"==typeof a(s(r=e,((e,t)=>e||r!==t?"":t)))||!function(e){if(g(e))return!0;const t=o(e);return t===f.prototype.ELEMENT_NODE||t===f.prototype.DOCUMENT_FRAGMENT_NODE||t===f.prototype.DOCUMENT_NODE}(e))return n;var r;const m=function(e){if(g(e))return d;switch(o(e)){case l.prototype.DOCUMENT_NODE:return u;case l.prototype.DOCUMENT_FRAGMENT_NODE:return p;default:return f}}(e).prototype.querySelectorAll.call(e,"iframe,frame,object,embed");return E(n,i(m)),t&&E(n,[e]),n},getFrameTag:function(e){if(!e||"object"!=typeof e)return null;if(o(e)!==f.prototype.ELEMENT_NODE)return null;if(g(e))return null;const t=r(e);return"IFRAME"!==t&&"FRAME"!==t&&"OBJECT"!==t&&"EMBED"!==t?null:t},shadows:m}},626:e=>{e.exports={SRC_IS_NOT_A_WINDOW:'provided argument "src" must be a proper window of instance Window',DST_IS_NOT_A_WINDOW:'provided argument "dst" must be a proper window of instance Window',SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW:'provided argument "src" must be a window in the same origin as the current context window'}},851:(e,t,n)=>{const{DST_IS_NOT_A_WINDOW:r,SRC_IS_NOT_A_WINDOW:o,SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW:i}=n(626);function c(e,t){const n=t(e);return n===n.window}function a(e,t,n){return null===n.getPrototypeOf.call(t,e)}e.exports=function(e,t=window,n=window.Object){if(!c(t,n))throw new Error(o);if(!c(e,n))throw new Error(r);if(a(window,t,n))throw new Error(i);return a(e,t,n)}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e,t=n(352),r=n.n(t);e=top,Object.defineProperty(e,"SNOW",{value:r()})})()})();}())