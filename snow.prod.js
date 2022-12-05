(function(){"use strict";(()=>{var e={586:(e,t,n)=>{const r=n(228),{getFramesArray:o,getFrameTag:c}=n(648),{getOnload:i,setOnload:a,removeAttribute:s,addEventListener:l}=n(14);function u(e,t,n){if(!c(t))return;l(t,"load",(function(){r(e,[this],n)}));const o=i(t);o&&(a(t,null),s(t,"onload"),a(t,o))}e.exports=function(e,t,n){for(let r=0;r<t.length;r++){const c=t[r],i=o(c,!0);for(let t=0;t<i.length;t++)u(e,i[t],n)}}},750:e=>{e.exports=function(e){e&&e.contentWindow}},228:(e,t,n)=>{const r=n(851),o=n(750),{shadows:c,getFramesArray:i,getFrameTag:a}=n(648),{getContentWindow:s,Object:l,getFrameElement:u}=n(14);function p(e,t){let n=-1;for(;e[++n];)if(!r(e[n],e,l)&&u(e[n])===t)return e[n];for(let e=0;e<c.length;e++){const n=c[e],r=i(n,!1);for(let e=0;e<r.length;e++)if(r[e]===t)return s(r[e],a(r[e]))}return null}e.exports=function(e,t,n){for(let r=0;r<t.length;r++){const c=t[r];o(c);const i=p(e,c);i&&n(i)}}},328:(e,t,n)=>{const{getFramesArray:r}=n(648),{removeAttribute:o,getAttribute:c,getTemplateContent:i,createElement:a,getInnerHTML:s,setInnerHTML:l}=n(14),{warn:u,WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED:p}=n(312);function f(e){for(let t=0;t<e.length;t++){const n=e[t],r=c(n,"onload");r&&(u(p,n,r),o(n,"onload"))}}e.exports=function(e,t){for(let e=0;e<t.length;e++){const n=t[e],o=a(document,"template");l(o,n);const c=r(i(o),!1);c.length&&(f(c),t[e]=s(o))}}},352:(e,t,n)=>{const r=n(228),o=n(583),c=n(459),i=n(58),{hookShadowDOM:a}=n(373),{securely:s,addEventListener:l,getFrameElement:u}=n(14),{isMarked:p,mark:f}=n(111),{error:m,ERR_MARK_NEW_WINDOW_FAILED:d}=n(312);function g(e){try{const t=!p(e);return t&&f(e),t}catch(t){m(d,e,t)}return g(e)}function y(e,t){g(t)&&function(e,t,n,r){o(e,t),c(e,"load",t),i(e,t),a(e,t),r(e,n)}(t,(function(n){y(e,n),l(u(n),"load",(function(){r(t,[this],(function(){y(e,n)}))}))}),s,e)}let E=!1;e.exports=function(e,t){E||(E=!0,y(e,t||window))}},58:(e,t,n)=>{const{protectShadows:r}=n(373),o=n(586),{getFramesArray:c,shadows:i}=n(648),{getParentElement:a,slice:s,Object:l,Function:u}=n(14),p=n(328),f=n(228),m={DocumentFragment:["replaceChildren","append","prepend"],Document:["replaceChildren","append","prepend","write","writeln"],Node:["appendChild","insertBefore","replaceChild"],Element:["innerHTML","outerHTML","insertAdjacentHTML","replaceWith","insertAdjacentElement","append","before","prepend","after","replaceChildren"],ShadowRoot:["innerHTML"],HTMLIFrameElement:["srcdoc"]};function d(e,t,n){return function(){const l=s(arguments),m=a(this)||this;o(e,l,n),o(e,i,n),p(e,l),p(e,i);const d=u.prototype.apply.call(t,this,l),g=c(m,!1);return f(e,g,n),f(e,l,n),r(e,n,!0),d}}e.exports=function(e,t){for(const n in m){const r=m[n];for(let o=0;o<r.length;o++){const c=r[o],i=l.getOwnPropertyDescriptor(e[n].prototype,c),a=i.set?"set":"value";i[a]=d(e,i[a],t),l.defineProperty(e[n].prototype,c,i)}}}},459:(e,t,n)=>{const r=n(228),{removeEventListener:o,addEventListener:c,slice:i,Map:a,Object:s}=n(14),l=new a;function u(e,t,n){if(t)return t.handleEvent?t.handleEvent.apply(t,n):t.apply(e,n)}function p(e,t,n){return function(o,a,s){let p=a;return o===t&&(l.has(a)||l.set(a,(function(){r(e,[this],n);const t=i(arguments);u(this,a,t)})),p=l.get(a)),c(this||e,o,p,s)}}function f(e,t){return function(n,r,c){let i=r;return n===t&&(i=l.get(r),l.delete(r)),o(this||e,n,i,c)}}e.exports=function(e,t,n){s.defineProperty(e.EventTarget.prototype,"addEventListener",{value:p(e,t,n)}),s.defineProperty(e.EventTarget.prototype,"removeEventListener",{value:f(e,t)})}},312:(e,t,n)=>{const{console:r}=n(14);e.exports={warn:function(e,t,n){let o;switch(e){case 1:const e=t,c=n;o=!1,r.warn("SNOW:","removing html string iframe onload attribute:",e,'"'.concat(c,'"'),".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/32#issuecomment-1239273328",".");break;case 4:const i=t,a=n;o=!0,r.warn("SNOW:",o?"":"NOT",'blocking open attempt to "javascript:" url:',i,"by window: ",a,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255",".");break;case 3:const s=t,l=n;o=!0,r.warn("SNOW:","blocking access to property:",'"'.concat(s,'"'),"of opened window: ",l,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255",".")}return o},error:function(e,t,n){let o;if(2===e){const e=t,c=n;o=!0,r.error("SNOW:","failed to mark new window:",e,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/33#issuecomment-1239280063",".","\n","in order to maintain a bulletproof defense mechanism, failing to mark a new window typically causes an infinite loop",".","\n","error caught:","\n",c)}return o},WARN_IFRAME_ONLOAD_ATTRIBUTE_REMOVED:1,ERR_MARK_NEW_WINDOW_FAILED:2,WARN_OPEN_API_LIMITED:3,WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME:4}},111:(e,t,n)=>{const{Map:r,Object:o,Array:c}=n(14),i=(Math.random()+1).toString(36).substring(7),a=new r;e.exports={isMarked:function(e){if(!a.has(e))return!1;const t=o.getOwnPropertyDescriptor(e,"SNOW_ID");if(!t||!o.hasOwnProperty.call(t,"value"))return!1;if("function"!=typeof t.value)return!1;const n=a.get(e);return t.value(i)===n},mark:function(e){const t=new c;o.defineProperty(e,"SNOW_ID",{configurable:!1,writable:!1,value:e=>e===i&&t}),a.set(e,t)}}},14:e=>{e.exports=function(e){const t=function(e){return function(e,t){const n=e.document.createElement("iframe");e.document.head.appendChild(n);const r=function(e){const{console:t,Proxy:n,JSON:r,Attr:o,String:c,Function:i,Map:a,Node:s,Document:l,DocumentFragment:u,ShadowRoot:p,Object:f,Reflect:m,Array:d,Element:g,HTMLElement:y,HTMLTemplateElement:E,EventTarget:w,HTMLIFrameElement:O,HTMLFrameElement:h,HTMLObjectElement:v}=e,T={console:t,Proxy:n,JSON:r,Attr:o,String:c,Function:i,Map:a,Node:s,Document:l,DocumentFragment:u,ShadowRoot:p,Object:f,Reflect:m,Array:d,Element:g,HTMLElement:y,HTMLTemplateElement:E,EventTarget:w,HTMLIFrameElement:O,HTMLFrameElement:h,HTMLObjectElement:v};return T.document={createElement:e.document.createElement},T}(n.contentWindow);return n.parentElement.removeChild(n),r}(e)}(e),{console:n,Proxy:r,Function:o,Map:c,Node:i,Document:a,DocumentFragment:s,ShadowRoot:l,Object:u,Reflect:p,Array:f,Element:m,HTMLElement:d,HTMLTemplateElement:g,EventTarget:y,HTMLIFrameElement:E,HTMLFrameElement:w,HTMLObjectElement:O}=t;return u.assign(t,{iframeContentWindow:u.getOwnPropertyDescriptor(E.prototype,"contentWindow").get,frameContentWindow:u.getOwnPropertyDescriptor(w.prototype,"contentWindow").get,objectContentWindow:u.getOwnPropertyDescriptor(O.prototype,"contentWindow").get,createElement:u.getOwnPropertyDescriptor(a.prototype,"createElement").value,slice:u.getOwnPropertyDescriptor(f.prototype,"slice").value,nodeType:u.getOwnPropertyDescriptor(i.prototype,"nodeType").get,tagName:u.getOwnPropertyDescriptor(m.prototype,"tagName").get,getInnerHTML:u.getOwnPropertyDescriptor(m.prototype,"innerHTML").get,setInnerHTML:u.getOwnPropertyDescriptor(m.prototype,"innerHTML").set,toString:u.getOwnPropertyDescriptor(u.prototype,"toString").value,getOnload:u.getOwnPropertyDescriptor(d.prototype,"onload").get,setOnload:u.getOwnPropertyDescriptor(d.prototype,"onload").set,getAttribute:u.getOwnPropertyDescriptor(m.prototype,"getAttribute").value,removeAttribute:u.getOwnPropertyDescriptor(m.prototype,"removeAttribute").value,addEventListener:u.getOwnPropertyDescriptor(y.prototype,"addEventListener").value,removeEventListener:u.getOwnPropertyDescriptor(y.prototype,"removeEventListener").value,getTemplateContent:u.getOwnPropertyDescriptor(g.prototype,"content").get,getFrameElement:u.getOwnPropertyDescriptor(e,"frameElement").get,getParentElement:u.getOwnPropertyDescriptor(i.prototype,"parentElement").get}),{console:n,Proxy:r,Object:u,Reflect:p,Function:o,Node:i,Element:m,Document:a,DocumentFragment:s,ShadowRoot:l,Array:f,Map:c,getContentWindow:function(e,n){switch(n){case"IFRAME":return t.iframeContentWindow.call(e);case"FRAME":return t.frameContentWindow.call(e);case"OBJECT":return t.objectContentWindow.call(e);default:return null}},stringToLowerCase:function(e){return t.String.prototype.toLowerCase.call(e)},stringStartsWith:function(e,n){return t.String.prototype.startsWith.call(e,n)},parse:function(e,n){return t.JSON.parse(e,n)},stringify:function(e,n,r){return t.JSON.stringify(e,n,r)},slice:function(e,n,r){return t.slice.call(e,n,r)},nodeType:function(e){return t.nodeType.call(e)},tagName:function(e){return t.tagName.call(e)},toString:function(e){return t.toString.call(e)},getOnload:function(e){return t.getOnload.call(e)},setOnload:function(e,n){return t.setOnload.call(e,n)},removeAttribute:function(e,n){return t.removeAttribute.call(e,n)},getAttribute:function(e,n){return t.getAttribute.call(e,n)},addEventListener:function(e,n,r,o){return t.addEventListener.call(e,n,r,o)},removeEventListener:function(e,n,r,o){return t.removeEventListener.call(e,n,r,o)},createElement:function(e,n,r){return t.createElement.call(e,n,r)},getInnerHTML:function(e){return t.getInnerHTML.call(e)},setInnerHTML:function(e,n){return t.setInnerHTML.call(e,n)},getTemplateContent:function(e){return t.getTemplateContent.call(e)},getFrameElement:function(e){return t.Function.prototype.call.call(t.getFrameElement,e)},getParentElement:function(e){return t.getParentElement.call(e)}}}(top)},583:(e,t,n)=>{const{stringToLowerCase:r,stringStartsWith:o,slice:c,Function:i,Object:a,Reflect:s,Proxy:l,Map:u}=n(14),{warn:p,WARN_OPEN_API_LIMITED:f,WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME:m}=n(312),d=new u;function g(e,t){const n={};return a.defineProperty(n,"closed",{get:function(){return t.closed}}),a.defineProperty(n,"close",{value:function(){return t.close()}}),a.defineProperty(n,"focus",{value:function(){return t.focus()}}),a.defineProperty(n,"postMessage",{value:function(e,n,r){return t.postMessage(e,n,r)}}),new l(n,{get:function(n,r){let o=s.get(n,r);return s.has(n,r)||s.has(t,r)&&(p(f,r,e)||(o=s.get(t,r))),o},set:function(){}})}e.exports=function(e,t){!function(e){const t=a.getOwnPropertyDescriptor(e.MessageEvent.prototype,"source"),n=t.get;t.get=function(){const e=n.call(this);return d.get(e)||e},a.defineProperty(e.MessageEvent.prototype,"source",t)}(e),e.open=function(e,t,n){return function(){const a=c(arguments),s=a[0]+"",l=a[1],u=a[2];if(o(r(s),"javascript")&&p(m,s,e))return null;const f=i.prototype.call.call(t,this,s,l,u);n(f);const y=g(e,f);return d.set(f,y),y}}(e,e.open,t)}},373:(e,t,n)=>{const r=n(228),{getFramesArray:o,shadows:c}=n(648),{Object:i,Function:a}=n(14);function s(e,t,n){for(let i=0;i<c.length;i++){const a=c[i];if(n&&!a.isConnected)continue;const s=o(a,!1);r(e,s,t)}}e.exports={hookShadowDOM:function(e,t){const n=i.getOwnPropertyDescriptor(e.Element.prototype,"attachShadow"),r=n.value;n.value=function(e,t,n){return function(r){const o=a.prototype.call.call(t,this,r);return c.push(o),s(e,n,!0),o}}(e,r,t),i.defineProperty(e.Element.prototype,"attachShadow",n)},protectShadows:s}},648:(e,t,n)=>{const{tagName:r,nodeType:o,slice:c,Array:i,parse:a,stringify:s,Node:l,Document:u,DocumentFragment:p,Element:f,ShadowRoot:m}=n(14),d=new i;function g(e){return d.includes(e)}function y(e,t){let n=!1;for(let r=0;r<t.length;r++)e.includes(t[r])||(e.push(t[r]),n=!0);return n}e.exports={getFramesArray:function(e,t){const n=new i;if(null===e||"object"!=typeof e)return n;if("string"==typeof a(s(r=e,((e,t)=>e||r!==t?"":t)))||!function(e){if(g(e))return!0;const t=o(e);return t===f.prototype.ELEMENT_NODE||t===f.prototype.DOCUMENT_FRAGMENT_NODE||t===f.prototype.DOCUMENT_NODE}(e))return n;var r;const d=function(e){if(g(e))return m;switch(o(e)){case l.prototype.DOCUMENT_NODE:return u;case l.prototype.DOCUMENT_FRAGMENT_NODE:return p;default:return f}}(e).prototype.querySelectorAll,E=d.call(e,"iframe,frame,object,embed");return y(n,c(E)),t&&y(n,[e]),n},getFrameTag:function(e){if(!e||"object"!=typeof e)return null;if(o(e)!==f.prototype.ELEMENT_NODE)return null;if(g(e))return null;const t=r(e);return"IFRAME"!==t&&"FRAME"!==t&&"OBJECT"!==t&&"EMBED"!==t?null:t},shadows:d}},626:e=>{e.exports={SRC_IS_NOT_A_WINDOW:'provided argument "src" must be a proper window of instance Window',DST_IS_NOT_A_WINDOW:'provided argument "dst" must be a proper window of instance Window',SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW:'provided argument "src" must be a window in the same origin as the current context window'}},851:(e,t,n)=>{const{DST_IS_NOT_A_WINDOW:r,SRC_IS_NOT_A_WINDOW:o,SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW:c}=n(626);function i(e,t){const n=t(e);return n===n.window}function a(e,t,n){return null===n.getPrototypeOf.call(t,e)}e.exports=function(e,t=window,n=window.Object){if(!i(t,n))throw new Error(o);if(!i(e,n))throw new Error(r);if(a(window,t,n))throw new Error(c);return a(e,t,n)}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,n),c.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e,t=n(352),r=n.n(t);e=window,Object.defineProperty(e,"SNOW",{value:r()})})()})();}())