(function(){"use strict";(()=>{var t={586:(t,e,n)=>{const r=n(228),{getFramesArray:o,getFrameTag:c}=n(648),{getOnload:i,setOnload:a,removeAttribute:s,addEventListener:l}=n(14);function u(t,e,n){if(!c(e))return;l(e,"load",(function(){r(t,[this],n)}));const o=i(e);o&&(a(e,null),s(e,"onload"),a(e,o))}t.exports=function(t,e,n){for(let r=0;r<e.length;r++){const c=e[r],i=o(c,!0);for(let e=0;e<i.length;e++)u(t,i[e],n)}}},750:t=>{t.exports=function(t){t&&t.contentWindow}},228:(t,e,n)=>{const r=n(851),o=n(750),{shadows:c,getFramesArray:i,getContentWindowOfFrame:a}=n(648),{Object:s,getFrameElement:l}=n(14);function u(t,e){let n=-1;for(;t[++n];)if(!r(t[n],t,s)&&l(t[n])===e)return t[n];for(let t=0;t<c.length;t++){const n=c[t],r=i(n,!1);for(let t=0;t<r.length;t++)if(r[t]===e)return a(r[t])}return null}t.exports=function(t,e,n){for(let r=0;r<e.length;r++){const c=e[r];o(c);const i=u(t,c);i&&n(i)}}},328:(t,e,n)=>{const{getFramesArray:r}=n(648),{Array:o,stringToLowerCase:c,split:i,getAttribute:a,setAttribute:s,getTemplateContent:l,getChildElementCount:u,createElement:p,getInnerHTML:f,setInnerHTML:d}=n(14);function m(t,e,n){let r="top.SNOW_CB(null, ".concat(e,");");return n&&(r="<script>"+r+"document.currentScript.remove();<\/script>"),r+t}function g(t){let e=a(t,"onload");e&&(e=m(e,"top.SNOW_FRAME_TO_WINDOW(this)",!1),s(t,"onload",e))}function y(t){let e=a(t,"src")||"";const[n,r]=i(e,":");"javascript"===c(n)&&(e="javascript:"+m(r,"window",!1),s(t,"src",e))}function w(t){let e=a(t,"srcdoc");if(e){e=m(e,"window",!0);const n=new o(e);E(n,!0),s(t,"srcdoc",n[0])}}function E(t,e){for(let n=0;n<t.length;n++){const o=p(document,"template");d(o,t[n]);const c=l(o);if(!u(c))continue;const i=r(c,!1);for(let t=0;t<i.length;t++){const e=i[t];g(e),y(e),w(e)}t[n]=f(o),e&&(t[n]=m(t[n],"window",!0))}}t.exports={handleHTML:E}},352:(t,e,n)=>{const r=n(228),o=n(583),c=n(459),i=n(58),{hookShadowDOM:a}=n(373),{Object:s,addEventListener:l,getFrameElement:u}=n(14),{isMarked:p,mark:f}=n(111),{error:d,ERR_PROVIDED_CB_IS_NOT_A_FUNCTION:m,ERR_MARK_NEW_WINDOW_FAILED:g}=n(312),{getContentWindowOfFrame:y}=n(648);function w(t,e){const n=s.create(null);n.value=e,s.defineProperty(top,t,n)}function E(t){try{const e=!p(t);return e&&f(t),e}catch(e){d(g,t,e)}return E(t)}function O(t,e){E(e)&&function(t,e,n){o(t,e),c(t,"load",e),i(t,e),a(t,e),n(t)}(e,(function(n){O(t,n),l(u(n),"load",(function(){r(e,[this],(function(){O(t,n)}))}))}),t)}let h;t.exports=function t(e,n){if(!h){if("function"!=typeof e&&d(m,e))return;w("SNOW_CB",t),w("SNOW_FRAME_TO_WINDOW",y),h=e}O(h,n||top)}},58:(t,e,n)=>{const{protectShadows:r}=n(373),o=n(586),{getFramesArray:c,shadows:i}=n(648),{getParentElement:a,slice:s,Object:l,Function:u}=n(14),{handleHTML:p}=n(328),f=n(228),d={DocumentFragment:["replaceChildren","append","prepend"],Document:["replaceChildren","append","prepend","write","writeln"],Node:["appendChild","insertBefore","replaceChild"],Element:["innerHTML","outerHTML","insertAdjacentHTML","replaceWith","insertAdjacentElement","append","before","prepend","after","replaceChildren"],ShadowRoot:["innerHTML"],HTMLIFrameElement:["srcdoc"]};function m(t,e,n,l){return function(){const d=s(arguments),m=a(this)||this;o(t,d,n),o(t,i,n),p(d,l);const g=u.prototype.apply.call(e,this,d),y=c(m,!1);return f(t,y,n),f(t,d,n),r(t,n,!0),g}}t.exports=function(t,e){for(const n in d){const r=d[n];for(let o=0;o<r.length;o++){const c=r[o],i=l.getOwnPropertyDescriptor(t[n].prototype,c),a=i.set?"set":"value";i[a]=m(t,i[a],e,"srcdoc"===c),l.defineProperty(t[n].prototype,c,i)}}}},459:(t,e,n)=>{const r=n(228),{removeEventListener:o,addEventListener:c,slice:i,Map:a,Object:s}=n(14),l=new a;function u(t,e,n){if(e)return e.handleEvent?e.handleEvent.apply(e,n):e.apply(t,n)}function p(t,e,n){return function(o,a,s){let p=a;return o===e&&(l.has(a)||l.set(a,(function(){r(t,[this],n);const e=i(arguments);u(this,a,e)})),p=l.get(a)),c(this||t,o,p,s)}}function f(t,e){return function(n,r,c){let i=r;return n===e&&(i=l.get(r),l.delete(r)),o(this||t,n,i,c)}}t.exports=function(t,e,n){s.defineProperty(t.EventTarget.prototype,"addEventListener",{value:p(t,e,n)}),s.defineProperty(t.EventTarget.prototype,"removeEventListener",{value:f(t,e)})}},312:(t,e,n)=>{const{console:r}=n(14);t.exports={warn:function(t,e,n){let o;switch(t){case 3:const t=e,c=n;o=!0,r.warn("SNOW:",o?"":"NOT",'blocking open attempt to "javascript:" url:',t,"by window: ",c,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255",".");break;case 2:const i=e,a=n;o=!0,r.warn("SNOW:","blocking access to property:",'"'.concat(i,'"'),"of opened window: ",a,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255",".")}return o},error:function(t,e,n){let o;switch(t){case 1:const t=e,c=n;o=!0,r.error("SNOW:","failed to mark new window:",t,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/33#issuecomment-1239280063",".","\n","in order to maintain a bulletproof defense mechanism, failing to mark a new window typically causes an infinite loop",".","\n","error caught:","\n",c);break;case 4:const i=e;o=!0,r.error("SNOW:",'first argument must be of type "function", instead got:',i,".","\n","therefore, snow bailed and is not applied to the page until this is fixed.")}return o},ERR_MARK_NEW_WINDOW_FAILED:1,WARN_OPEN_API_LIMITED:2,WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME:3,ERR_PROVIDED_CB_IS_NOT_A_FUNCTION:4}},111:(t,e,n)=>{const{Map:r,Object:o,Array:c}=n(14),i=(Math.random()+1).toString(36).substring(7),a=new r;t.exports={isMarked:function(t){if(!a.has(t))return!1;const e=o.getOwnPropertyDescriptor(t,"SNOW_ID");if(!e||!o.hasOwnProperty.call(e,"value"))return!1;if("function"!=typeof e.value)return!1;const n=a.get(t);return e.value(i)===n},mark:function(t){const e=new c,n=o.create(null);n.writable=n.configurable=!1,n.value=t=>t===i&&e,o.defineProperty(t,"SNOW_ID",n),a.set(t,e)}}},14:t=>{t.exports=function(t){const e=function(t){return function(t,e){const n=t.document.createElement("iframe");(t.document.head||t.document.documentElement).appendChild(n);const r=function(t){const{console:e,Proxy:n,JSON:r,Attr:o,String:c,Function:i,Map:a,Node:s,Document:l,DocumentFragment:u,ShadowRoot:p,Object:f,Reflect:d,Array:m,Element:g,HTMLElement:y,HTMLTemplateElement:w,EventTarget:E,HTMLIFrameElement:O,HTMLFrameElement:h,HTMLObjectElement:_}=t,v={console:e,Proxy:n,JSON:r,Attr:o,String:c,Function:i,Map:a,Node:s,Document:l,DocumentFragment:u,ShadowRoot:p,Object:f,Reflect:d,Array:m,Element:g,HTMLElement:y,HTMLTemplateElement:w,EventTarget:E,HTMLIFrameElement:O,HTMLFrameElement:h,HTMLObjectElement:_};return v.document={createElement:t.document.createElement},v}(n.contentWindow);return n.parentElement.removeChild(n),r}(t)}(t),{console:n,Proxy:r,Function:o,String:c,Map:i,Node:a,Document:s,DocumentFragment:l,ShadowRoot:u,Object:p,Reflect:f,Array:d,Element:m,HTMLElement:g,HTMLTemplateElement:y,EventTarget:w,HTMLIFrameElement:E,HTMLFrameElement:O,HTMLObjectElement:h}=e;return p.assign(e,{iframeContentWindow:p.getOwnPropertyDescriptor(E.prototype,"contentWindow").get,frameContentWindow:p.getOwnPropertyDescriptor(O.prototype,"contentWindow").get,objectContentWindow:p.getOwnPropertyDescriptor(h.prototype,"contentWindow").get,createElement:p.getOwnPropertyDescriptor(s.prototype,"createElement").value,slice:p.getOwnPropertyDescriptor(d.prototype,"slice").value,split:p.getOwnPropertyDescriptor(c.prototype,"split").value,nodeType:p.getOwnPropertyDescriptor(a.prototype,"nodeType").get,tagName:p.getOwnPropertyDescriptor(m.prototype,"tagName").get,getInnerHTML:p.getOwnPropertyDescriptor(m.prototype,"innerHTML").get,setInnerHTML:p.getOwnPropertyDescriptor(m.prototype,"innerHTML").set,toString:p.getOwnPropertyDescriptor(p.prototype,"toString").value,getOnload:p.getOwnPropertyDescriptor(g.prototype,"onload").get,setOnload:p.getOwnPropertyDescriptor(g.prototype,"onload").set,getAttribute:p.getOwnPropertyDescriptor(m.prototype,"getAttribute").value,setAttribute:p.getOwnPropertyDescriptor(m.prototype,"setAttribute").value,removeAttribute:p.getOwnPropertyDescriptor(m.prototype,"removeAttribute").value,addEventListener:p.getOwnPropertyDescriptor(w.prototype,"addEventListener").value,removeEventListener:p.getOwnPropertyDescriptor(w.prototype,"removeEventListener").value,getTemplateContent:p.getOwnPropertyDescriptor(y.prototype,"content").get,getChildElementCount:p.getOwnPropertyDescriptor(l.prototype,"childElementCount").get,getFrameElement:p.getOwnPropertyDescriptor(t,"frameElement").get,getParentElement:p.getOwnPropertyDescriptor(a.prototype,"parentElement").get}),{console:n,Proxy:r,Object:p,Reflect:f,Function:o,Node:a,Element:m,Document:s,DocumentFragment:l,ShadowRoot:u,Array:d,Map:i,getContentWindow:function(t,n){switch(n){case"IFRAME":return e.iframeContentWindow.call(t);case"FRAME":return e.frameContentWindow.call(t);case"OBJECT":return e.objectContentWindow.call(t);default:return null}},stringToLowerCase:function(t){return e.String.prototype.toLowerCase.call(t)},stringStartsWith:function(t,n){return e.String.prototype.startsWith.call(t,n)},parse:function(t,n){return e.JSON.parse(t,n)},stringify:function(t,n,r){return e.JSON.stringify(t,n,r)},slice:function(t,n,r){return e.slice.call(t,n,r)},split:function(t,n){return e.split.call(t,n)},nodeType:function(t){return e.nodeType.call(t)},tagName:function(t){return e.tagName.call(t)},toString:function(t){return e.toString.call(t)},getOnload:function(t){return e.getOnload.call(t)},setOnload:function(t,n){return e.setOnload.call(t,n)},removeAttribute:function(t,n){return e.removeAttribute.call(t,n)},getAttribute:function(t,n){return e.getAttribute.call(t,n)},setAttribute:function(t,n,r){return e.setAttribute.call(t,n,r)},addEventListener:function(t,n,r,o){return e.addEventListener.call(t,n,r,o)},removeEventListener:function(t,n,r,o){return e.removeEventListener.call(t,n,r,o)},createElement:function(t,n,r){return e.createElement.call(t,n,r)},getInnerHTML:function(t){return e.getInnerHTML.call(t)},setInnerHTML:function(t,n){return e.setInnerHTML.call(t,n)},getTemplateContent:function(t){return e.getTemplateContent.call(t)},getChildElementCount:function(t){return e.getChildElementCount.call(t)},getFrameElement:function(t){return e.Function.prototype.call.call(e.getFrameElement,t)},getParentElement:function(t){return e.getParentElement.call(t)}}}(top)},583:(t,e,n)=>{const{stringToLowerCase:r,stringStartsWith:o,slice:c,Function:i,Object:a,Reflect:s,Proxy:l,Map:u}=n(14),{warn:p,WARN_OPEN_API_LIMITED:f,WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME:d}=n(312),m=new u;function g(t,e){const n=new a(null);return a.defineProperty(n,"closed",{get:function(){return e.closed}}),a.defineProperty(n,"close",{value:function(){return e.close()}}),a.defineProperty(n,"focus",{value:function(){return e.focus()}}),a.defineProperty(n,"postMessage",{value:function(t,n,r){return e.postMessage(t,n,r)}}),new l(n,{get:function(n,r){let o=s.get(n,r);return s.has(n,r)||s.has(e,r)&&(p(f,r,t)||(o=s.get(e,r))),o},set:function(){}})}t.exports=function(t,e){!function(t){const e=a.getOwnPropertyDescriptor(t.MessageEvent.prototype,"source"),n=e.get;e.get=function(){const t=n.call(this);return m.get(t)||t},a.defineProperty(t.MessageEvent.prototype,"source",e)}(t),t.open=function(t,e,n){return function(){const a=c(arguments),s=a[0]+"",l=a[1],u=a[2];if(o(r(s),"javascript")&&p(d,s,t))return null;const f=i.prototype.call.call(e,this,s,l,u);if(!f)return null;n(f);const y=g(t,f);return m.set(f,y),y}}(t,t.open,e)}},373:(t,e,n)=>{const r=n(228),{getFramesArray:o,shadows:c}=n(648),{Object:i,Function:a}=n(14);function s(t,e,n){for(let i=0;i<c.length;i++){const a=c[i];if(n&&!a.isConnected)continue;const s=o(a,!1);r(t,s,e)}}t.exports={hookShadowDOM:function(t,e){const n=i.getOwnPropertyDescriptor(t.Element.prototype,"attachShadow"),r=n.value;n.value=function(t,e,n){return function(r){const o=a.prototype.call.call(e,this,r);return c.push(o),s(t,n,!0),o}}(t,r,e),i.defineProperty(t.Element.prototype,"attachShadow",n)},protectShadows:s}},648:(t,e,n)=>{const{tagName:r,nodeType:o,slice:c,Array:i,parse:a,stringify:s,Node:l,Document:u,DocumentFragment:p,Element:f,ShadowRoot:d,getContentWindow:m}=n(14),g=new i;function y(t){return g.includes(t)}function w(t){if(!t||"object"!=typeof t)return null;if(o(t)!==f.prototype.ELEMENT_NODE)return null;if(y(t))return null;const e=r(t);return"IFRAME"!==e&&"FRAME"!==e&&"OBJECT"!==e&&"EMBED"!==e?null:e}function E(t,e){let n=!1;for(let r=0;r<e.length;r++)t.includes(e[r])||(t.push(e[r]),n=!0);return n}t.exports={getContentWindowOfFrame:function(t){return m(t,w(t))},getFramesArray:function(t,e){const n=new i;if(null===t||"object"!=typeof t)return n;if("string"==typeof a(s(r=t,((t,e)=>t||r!==e?"":e)))||!function(t){if(y(t))return!0;const e=o(t);return e===f.prototype.ELEMENT_NODE||e===f.prototype.DOCUMENT_FRAGMENT_NODE||e===f.prototype.DOCUMENT_NODE}(t))return n;var r;const m=function(t){if(y(t))return d;switch(o(t)){case l.prototype.DOCUMENT_NODE:return u;case l.prototype.DOCUMENT_FRAGMENT_NODE:return p;default:return f}}(t).prototype.querySelectorAll,g=m.call(t,"iframe,frame,object,embed");return E(n,c(g)),e&&E(n,[t]),n},getFrameTag:w,shadows:g}},626:t=>{t.exports={SRC_IS_NOT_A_WINDOW:'provided argument "src" must be a proper window of instance Window',DST_IS_NOT_A_WINDOW:'provided argument "dst" must be a proper window of instance Window',SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW:'provided argument "src" must be a window in the same origin as the current context window'}},851:(t,e,n)=>{const{DST_IS_NOT_A_WINDOW:r,SRC_IS_NOT_A_WINDOW:o,SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW:c}=n(626);function i(t,e){const n=e(t);return n===n.window}function a(t,e,n){return null===n.getPrototypeOf.call(e,t)}t.exports=function(t,e=window,n=window.Object){if(!i(e,n))throw new Error(o);if(!i(t,n))throw new Error(r);if(a(window,e,n))throw new Error(c);return a(t,e,n)}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var c=e[r]={exports:{}};return t[r](c,c.exports,n),c.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t,e=n(352),r=n.n(e);t=top,Object.defineProperty(t,"SNOW",{value:r()})})()})();}())