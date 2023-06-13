(function(){"use strict";(()=>{var e={586:(e,t,n)=>{const r=n(228),{getFramesArray:o,getFrameTag:c}=n(648),{getOnload:i,setOnload:s,removeAttribute:a,addEventListener:u}=n(14);function p(e){if(!c(e))return;u(e,"load",(function(){r(e)}));const t=i(e);t&&(s(e,null),a(e,"onload"),s(e,t))}e.exports=function(e){for(let t=0;t<e.length;t++){const n=e[t],r=o(n,!0);for(let e=0;e<r.length;e++)p(r[e])}}},750:e=>{e.exports=function(e){e&&e.contentWindow}},407:e=>{const t=Object.getOwnPropertyDescriptor(Document.prototype,"createElement").value.bind(document),n=Object.getOwnPropertyDescriptor(Node.prototype,"appendChild").value.bind(document.documentElement),r=Object.getOwnPropertyDescriptor(Node.prototype,"removeChild").value.bind(document.documentElement),o="BLOCKED BY SNOW:\nCreating URL objects is not allowed under Snow protection within Web Workers.\nIf this prevents your application from running correctly, please visit/report at https://github.com/LavaMoat/snow/pull/89#issuecomment-1589359673.\nLearn more at https://github.com/LavaMoat/snow/pull/89";e.exports={runInNewRealm:function(e){const o=t("IFRAME");n(o);const c=e(o.contentWindow);return r(o),c},BLOCKED_BLOB_URL:URL.createObjectURL(new Blob([o],{type:"text/plain"})),BLOCKED_BLOB_MSG:o}},832:(e,t,n)=>{const{Object:r,Function:o}=n(14),{isTagFramable:c}=n(648),{error:i,ERR_EXTENDING_FRAMABLES_BLOCKED:s}=n(312);e.exports=function(e){const t=r.getOwnPropertyDescriptor(e.CustomElementRegistry.prototype,"define");t.configurable=t.writable=!0;const n=t.value;var a;t.value=(a=n,function(e,t,n){let r=n;if(n){const t=n.extends;c(t+"")&&i(s,e,n)&&(r=void 0)}return o.prototype.call.call(a,this,e,t,r)}),r.defineProperty(e.CustomElementRegistry.prototype,"define",t)}},228:(e,t,n)=>{const r=n(851),o=n(750),{shadows:c,toArray:i,getFramesArray:s,getContentWindowOfFrame:a,getOwnerWindowOfNode:u}=n(648),{Object:p,getFrameElement:l}=n(14),{forEachOpened:f}=n(134);function d(e,t){let n=-1;for(;e[++n];){if(r(e[n],e,p))continue;if(l(e[n])===t)return e[n];const o=d(e[n],t);if(o)return o}for(let n=0;n<c.length;n++){const r=c[n];if(u(r)!==e)continue;const o=s(r,!1);for(let e=0;e<o.length;e++){const n=o[e],r=a(n);if(n===t)return r;const c=d(r,t);if(c)return c}}return null}function g(e,t){const n=d(e,t);return n&&function(e){top.SNOW_WINDOW(e)}(n),!!n}e.exports=function(e){e=i(e);for(let t=0;t<e.length;t++){const n=e[t];"object"==typeof n&&null!==n&&(o(n),g(top,n)||f(g,n))}}},328:(e,t,n)=>{const{getFramesArray:r}=n(648),{Array:o,stringToLowerCase:c,split:i,getAttribute:s,setAttribute:a,getChildElementCount:u,createElement:p,getInnerHTML:l,setInnerHTML:f,remove:d,Element:g}=n(14),{warn:m,WARN_DECLARATIVE_SHADOWS:y}=n(312),O=g.prototype.querySelectorAll;function w(e,t){let n="top."+(e?"SNOW_FRAME":"SNOW_WINDOW")+"(this);";return t&&(n="<script>"+n+"document.currentScript.remove();<\/script>"),n}function E(e){let t=s(e,"onload");return!!t&&(t=w(!0,!1)+t,a(e,"onload",t),!0)}function h(e){let t=s(e,"src")||"";const[n,r]=i(t,":");return"javascript"===c(n)&&(t="javascript:"+w(!1,!1)+r,a(e,"src",t),!0)}function v(e){let t=s(e,"srcdoc");if(t){t=w(!1,!0)+t;const n=new o(t);return b(n,!0),a(e,"srcdoc",n[0]),!0}return!1}function b(e,t){for(let c=0;c<e.length;c++){const i=p(document,"html");if(f(i,e[c]),!u(i))continue;let s=!1;if(t){const e=p(document,"script");e.textContent=w(!1,!1),i.insertBefore(e,i.firstChild),s=!0}const a=O.call(i,"template[shadowroot]");for(let t=0;t<a.length;t++)n=a[t],o=e[c],m(y,n,o),d(n),s=!0;const g=r(i,!1);for(let e=0;e<g.length;e++){const t=g[e];s=E(t)||s,s=h(t)||s,s=v(t)||s}s&&(e[c]=l(i))}var n,o}e.exports={handleHTML:b}},352:(e,t,n)=>{const r=n(228),o=n(716),c=n(832),i=n(583),s=n(278),a=n(459),u=n(58),{hookShadowDOM:p}=n(373),{hookWorker:l}=n(744),{Object:f,Array:d,push:g,addEventListener:m,getFrameElement:y}=n(14),{isMarked:O,mark:w}=n(111),{error:E,ERR_PROVIDED_CB_IS_NOT_A_FUNCTION:h,ERR_MARK_NEW_WINDOW_FAILED:v}=n(312);function b(e,t){const n=f.create(null);n.value=t,f.defineProperty(top,e,n)}function L(e){try{const t=!O(e);return t&&w(e),t}catch(t){E(v,e,t)}return L(e)}function _(e,t){if(L(e)){!function(e){!function(e){const t=y(e);m(t,"load",(function(){r(t)}))}(e),o(e),c(e),i(e),s(e),a(e,"load"),u(e),p(e),l(e)}(e);for(let t=0;t<D.length;t++)if(D[t](e))return}t&&t(e)}const D=new d;e.exports=function(e){"function"!=typeof e&&E(h,e)||(D.length||(b("SNOW_WINDOW",(function(e){_(e)})),b("SNOW_FRAME",(function(e){r(e)}))),g(D,e),_(top,e))}},58:(e,t,n)=>{const{protectShadows:r}=n(373),o=n(586),{getFramesArray:c,shadows:i}=n(648),{getParentElement:s,slice:a,Object:u,Function:p}=n(14),{handleHTML:l}=n(328),f=n(228),d={DocumentFragment:["replaceChildren","append","prepend"],Document:["replaceChildren","append","prepend","write","writeln"],Node:["appendChild","insertBefore","replaceChild"],Element:["innerHTML","outerHTML","insertAdjacentHTML","replaceWith","insertAdjacentElement","append","before","prepend","after","replaceChildren"],ShadowRoot:["innerHTML"],HTMLIFrameElement:["srcdoc"]};function g(e,t){return function(){const n=a(arguments),u=s(this)||this;!function(e){o(e),o(i),l(e,t)}(n);const d=p.prototype.apply.call(e,this,n);return function(e,t){const n=c(t,!1);f(n),f(e),r(!0)}(n,u),d}}e.exports=function(e){for(const t in d){const n=d[t];for(let r=0;r<n.length;r++){const o=n[r],c=u.getOwnPropertyDescriptor(e[t].prototype,o);if(!c)continue;const i=c.set?"set":"value";c[i]=g(c[i],"srcdoc"===o),c.configurable=!0,"value"===i&&(c.writable=!0),u.defineProperty(e[t].prototype,o,c)}}}},459:(e,t,n)=>{const r=n(228),{removeEventListener:o,addEventListener:c,slice:i,Map:s,Object:a}=n(14),u=new s;function p(e,t){return function(n,o,s){let a=o;return n===t&&(u.has(o)||u.set(o,(function(){r(this);const e=i(arguments);!function(e,t,n){t&&(t.handleEvent?t.handleEvent.apply(t,n):t.apply(e,n))}(this,o,e)})),a=u.get(o)),c(this||e,n,a,s)}}function l(e,t){return function(n,r,c){let i=r;return n===t&&(i=u.get(r),u.delete(r)),o(this||e,n,i,c)}}e.exports=function(e,t){a.defineProperty(e.EventTarget.prototype,"addEventListener",{configurable:!0,writable:!0,value:p(e,t)}),a.defineProperty(e.EventTarget.prototype,"removeEventListener",{configurable:!0,writable:!0,value:l(e,t)})}},312:e=>{const{console:t}=top;e.exports={warn:function(e,n,r){let o;switch(e){case 5:const e=n,c=r;o=!1,t.warn("SNOW:","removing html string representing a declarative shadow:",e,"\n",`"${c}"`,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/32#issuecomment-1239273328",".");break;case 3:const i=n,s=r;o=!0,t.warn("SNOW:",o?"":"NOT",'blocking open attempt to "javascript:" url:',i,"by window: ",s,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/44#issuecomment-1369687802",".");break;case 2:const a=n,u=r;o=!0,t.warn("SNOW:","blocking access to property:",`"${a}"`,"of opened window: ",u,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255",".")}return o},error:function(e,n,r,o){let c;switch(e){case 7:const e=n;c=!0,t.error("SNOW:","Blob/File/MediaSource object:",e,"was not created normally via the proper constructor,",'and therefore calling "URL.createObjectURL()" on it is blocked',".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/87#issuecomment-1586868353",".","\n");break;case 8:const i=n,s=r,a=o;c=!0,t.error("SNOW:",`${s} object:`,i,`of type "${a}" is not allowed and therefore is blocked`,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/87#issuecomment-1586868353",".","\n");break;case 6:const u=n,p=r;c=!0,t.error("SNOW:",`"${u}"`,"extending attempt","of framable elements such as provided",p,"is blocked to prevent bypass",".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/56#issuecomment-1374899809",".","\n");break;case 1:const l=n,f=r;c=!0,t.error("SNOW:","failed to mark new window:",l,".","\n","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/33#issuecomment-1239280063",".","\n","in order to maintain a bulletproof defense mechanism, failing to mark a new window typically causes an infinite loop",".","\n","error caught:","\n",f);break;case 4:const d=n;c=!0,t.error("SNOW:",'first argument must be of type "function", instead got:',d,".","\n","therefore, snow bailed and is not applied to the page until this is fixed.")}return c},ERR_MARK_NEW_WINDOW_FAILED:1,WARN_OPEN_API_LIMITED:2,WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME:3,ERR_PROVIDED_CB_IS_NOT_A_FUNCTION:4,WARN_DECLARATIVE_SHADOWS:5,ERR_EXTENDING_FRAMABLES_BLOCKED:6,ERR_BLOB_FILE_URL_OBJECT_FORBIDDEN:7,ERR_BLOB_FILE_URL_OBJECT_TYPE_FORBIDDEN:8}},111:(e,t,n)=>{const{Map:r,Object:o,Array:c}=n(14),i=new c,s=new r;e.exports={isMarked:function(e){if(!s.has(e))return!1;const t=o.getOwnPropertyDescriptor(e,"SNOW_ID");if(!t||!o.hasOwnProperty.call(t,"value"))return!1;if("function"!=typeof t.value)return!1;const n=s.get(e);return t.value(i)===n},mark:function(e){const t=new c,n=o.create(null);n.value=e=>e===i&&t,o.defineProperty(e,"SNOW_ID",n),s.set(e,t)}}},14:(e,t,n)=>{const{runInNewRealm:r}=n(407);e.exports=function(e){const t=function(e){const{EventTarget:t}=e;return r((function(e){const{URL:n,Proxy:r,JSON:o,Attr:c,String:i,Function:s,Map:a,Node:u,Document:p,DocumentFragment:l,Blob:f,ShadowRoot:d,Object:g,Reflect:m,Array:y,Element:O,HTMLElement:w,HTMLTemplateElement:E,HTMLIFrameElement:h,HTMLFrameElement:v,HTMLObjectElement:b}=e,L={URL:n,Proxy:r,JSON:o,Attr:c,String:i,Function:s,Map:a,Node:u,Document:p,DocumentFragment:l,Blob:f,ShadowRoot:d,Object:g,Reflect:m,Array:y,Element:O,HTMLElement:w,HTMLTemplateElement:E,EventTarget:t,HTMLIFrameElement:h,HTMLFrameElement:v,HTMLObjectElement:b};return L.document={createElement:e.document.createElement},L}))}(e),{URL:n,Proxy:o,Function:c,String:i,Map:s,Node:a,Document:u,DocumentFragment:p,Blob:l,ShadowRoot:f,Object:d,Reflect:g,Array:m,Element:y,HTMLElement:O,HTMLTemplateElement:w,EventTarget:E,HTMLIFrameElement:h,HTMLFrameElement:v,HTMLObjectElement:b}=t;return d.assign(t,{iframeContentWindow:d.getOwnPropertyDescriptor(h.prototype,"contentWindow").get,frameContentWindow:d.getOwnPropertyDescriptor(v.prototype,"contentWindow").get,objectContentWindow:d.getOwnPropertyDescriptor(b.prototype,"contentWindow").get,createElement:d.getOwnPropertyDescriptor(u.prototype,"createElement").value,slice:d.getOwnPropertyDescriptor(m.prototype,"slice").value,push:d.getOwnPropertyDescriptor(m.prototype,"push").value,split:d.getOwnPropertyDescriptor(i.prototype,"split").value,nodeType:d.getOwnPropertyDescriptor(a.prototype,"nodeType").get,tagName:d.getOwnPropertyDescriptor(y.prototype,"tagName").get,getInnerHTML:d.getOwnPropertyDescriptor(y.prototype,"innerHTML").get,setInnerHTML:d.getOwnPropertyDescriptor(y.prototype,"innerHTML").set,toString:d.getOwnPropertyDescriptor(d.prototype,"toString").value,getOnload:d.getOwnPropertyDescriptor(O.prototype,"onload").get,setOnload:d.getOwnPropertyDescriptor(O.prototype,"onload").set,getAttribute:d.getOwnPropertyDescriptor(y.prototype,"getAttribute").value,setAttribute:d.getOwnPropertyDescriptor(y.prototype,"setAttribute").value,removeAttribute:d.getOwnPropertyDescriptor(y.prototype,"removeAttribute").value,remove:d.getOwnPropertyDescriptor(y.prototype,"remove").value,addEventListener:d.getOwnPropertyDescriptor(E.prototype,"addEventListener").value,removeEventListener:d.getOwnPropertyDescriptor(E.prototype,"removeEventListener").value,getChildElementCount:d.getOwnPropertyDescriptor(y.prototype,"childElementCount").get,getFrameElement:d.getOwnPropertyDescriptor(e,"frameElement").get,getParentElement:d.getOwnPropertyDescriptor(a.prototype,"parentElement").get,getOwnerDocument:d.getOwnPropertyDescriptor(a.prototype,"ownerDocument").get,getDefaultView:d.getOwnPropertyDescriptor(u.prototype,"defaultView").get,getBlobFileType:d.getOwnPropertyDescriptor(l.prototype,"type").get,createObjectURL:d.getOwnPropertyDescriptor(n,"createObjectURL").value,revokeObjectURL:d.getOwnPropertyDescriptor(n,"revokeObjectURL").value}),{Proxy:o,Object:d,Reflect:g,Function:c,Node:a,Element:y,Document:u,DocumentFragment:p,Blob:l,ShadowRoot:f,Array:m,Map:s,getContentWindow:function(e,n){switch(n){case"IFRAME":return t.iframeContentWindow.call(e);case"FRAME":return t.frameContentWindow.call(e);case"OBJECT":return t.objectContentWindow.call(e);default:return null}},stringToLowerCase:function(e){return t.String.prototype.toLowerCase.call(e)},stringStartsWith:function(e,n){return t.String.prototype.startsWith.call(e,n)},parse:function(e,n){return t.JSON.parse(e,n)},stringify:function(e,n,r){return t.JSON.stringify(e,n,r)},slice:function(e,n,r){return t.slice.call(e,n,r)},push:function(e,n){return t.push.call(e,n)},split:function(e,n){return t.split.call(e,n)},nodeType:function(e){return t.nodeType.call(e)},tagName:function(e){return t.tagName.call(e)},toString:function(e){return t.toString.call(e)},getOnload:function(e){return t.getOnload.call(e)},setOnload:function(e,n){return t.setOnload.call(e,n)},remove:function(e){return t.remove.call(e)},removeAttribute:function(e,n){return t.removeAttribute.call(e,n)},getAttribute:function(e,n){return t.getAttribute.call(e,n)},setAttribute:function(e,n,r){return t.setAttribute.call(e,n,r)},addEventListener:function(e,n,r,o){return t.addEventListener.call(e,n,r,o)},removeEventListener:function(e,n,r,o){return t.removeEventListener.call(e,n,r,o)},createElement:function(e,n,r){return t.createElement.call(e,n,r)},getInnerHTML:function(e){return t.getInnerHTML.call(e)},setInnerHTML:function(e,n){return t.setInnerHTML.call(e,n)},getChildElementCount:function(e){return t.getChildElementCount.call(e)},getFrameElement:function(e){return t.Function.prototype.call.call(t.getFrameElement,e)},getParentElement:function(e){return t.getParentElement.call(e)},getOwnerDocument:function(e){return t.getOwnerDocument.call(e)},getDefaultView:function(e){return t.getDefaultView.call(e)},getBlobFileType:function(e){return t.getBlobFileType.call(e)},createObjectURL:function(e){return t.createObjectURL(e)},revokeObjectURL:function(e){return t.revokeObjectURL(e)}}}(top)},583:(e,t,n)=>{const{stringToLowerCase:r,stringStartsWith:o,slice:c,Function:i,Object:s}=n(14),{warn:a,WARN_OPEN_API_URL_ARG_JAVASCRIPT_SCHEME:u}=n(312),{proxy:p,getProxyByOpened:l}=n(134);function f(e){const t=s.getOwnPropertyDescriptor(e.MessageEvent.prototype,"source"),n=t.get;t.get=function(){const e=n.call(this);return l(e)||e},s.defineProperty(e.MessageEvent.prototype,"source",t)}function d(e,t,n){return n(e),function(){const n=c(arguments),s=n[0]+"",l=n[1],f=n[2];if(o(r(s),"javascript")&&a(u,s,e))return null;const d=i.prototype.call.call(t,this,s,l,f);return d?p(d):null}}e.exports=function(e){e.open=d(e,e.open,f),e.document.open=d(e,e.document.open,f)}},134:(e,t,n)=>{const{Object:r,Proxy:o,Reflect:c,Map:i}=n(14),{warn:s,WARN_OPEN_API_LIMITED:a}=n(312),u=new i;function p(e){return u.get(e)}e.exports={proxy:function(e){const t=new r(null);if(r.defineProperty(t,"closed",{get:function(){return e.closed}}),r.defineProperty(t,"close",{value:function(){return e.close()}}),r.defineProperty(t,"focus",{value:function(){return e.focus()}}),r.defineProperty(t,"postMessage",{value:function(t,n,r){return e.postMessage(t,n,r)}}),!u.has(e)){top.SNOW_WINDOW(e);const n=new o(t,{get:function(t,n){let r=c.get(t,n);return c.has(t,n)||c.has(e,n)&&(s(a,n,e)||(r=c.get(e,n))),r},set:function(){}});u.set(e,n)}return p(e)},getProxyByOpened:p,forEachOpened:function(e,t){for(const n of u.keys())e(n,t)}}},278:(e,t,n)=>{const{Object:r,slice:o,Function:c}=n(14),{proxy:i}=n(134);function s(e,t){const n=r.getOwnPropertyDescriptor(e[t].prototype,"window"),o=n.get;n.get=function(){return i(o.call(this))},r.defineProperty(e[t].prototype,"window",n)}e.exports=function(e){e?.documentPictureInPicture?.requestWindow&&(e.documentPictureInPicture.requestWindow=function(e,t,n){return n(e,"DocumentPictureInPictureEvent"),n(e,"DocumentPictureInPicture"),async function(){const e=o(arguments),n=await c.prototype.apply.call(t,this,e);return n?i(n):null}}(e,e.documentPictureInPicture.requestWindow,s))}},373:(e,t,n)=>{const r=n(228),{getFramesArray:o,shadows:c}=n(648),{Object:i,Function:s}=n(14);function a(e){for(let t=0;t<c.length;t++){const n=c[t];if(e&&!n.isConnected)continue;const i=o(n,!1);r(i)}}e.exports={hookShadowDOM:function(e){const t=i.getOwnPropertyDescriptor(e.Element.prototype,"attachShadow");t.configurable=t.writable=!0;const n=t.value;var r;t.value=(r=n,function(e){const t=s.prototype.call.call(r,this,e);return c.push(t),a(!0),t}),i.defineProperty(e.Element.prototype,"attachShadow",t)},protectShadows:a}},716:(e,t,n)=>{const{BLOCKED_BLOB_URL:r}=n(407),{Object:o,Array:c,getBlobFileType:i}=n(14),{error:s,ERR_BLOB_FILE_URL_OBJECT_FORBIDDEN:a,ERR_BLOB_FILE_URL_OBJECT_TYPE_FORBIDDEN:u}=n(312),p="KIND",l="TYPE",f="Blob",d="File",g="MediaSource",m=new c,y=new c("text/javascript","text/css","application/javascript","application/css","image/jpeg","image/jpg","image/png");function O(e,t){return function(n,r){const c=new e(n,r);return o.defineProperty(c,p,{value:t}),t!==f&&t!==d||o.defineProperty(c,l,{value:i(c)}),m.push(c),c}}e.exports=function(e){(function(e){const t=e.URL.createObjectURL;o.defineProperty(e.URL,"createObjectURL",{value:function(e){return function(e){const t=m.indexOf(e);return t>-1?(m.splice(t,1),!1):s(a,e)}(e)||function(e){const t=e[p];if(t!==f&&t!==d)return!1;const n=e[l];return!y.includes(n)&&s(u,e,t,n)}(e)?r:t(e)}})})(e),function(e){const t=e[f],n=O(t,f);function r(e,t){return n(e,t)}o.setPrototypeOf(t.prototype,r.prototype),e[f]=r}(e),function(e){const t=e[d],n=O(t,d);function r(e,t){return n(e,t)}o.setPrototypeOf(t.prototype,r.prototype),e[d]=r}(e),function(e){const t=e[g],n=O(t,g);function r(e,t){return n(e,t)}o.setPrototypeOf(r,t),e[g]=r}(e)}},648:(e,t,n)=>{const{tagName:r,nodeType:o,slice:c,Array:i,parse:s,stringify:a,Node:u,Document:p,DocumentFragment:l,Element:f,ShadowRoot:d,getContentWindow:g,getDefaultView:m,getOwnerDocument:y,stringToLowerCase:O}=n(14),w=new i;function E(e){return w.includes(e)}function h(e){const t=O(e);return"iframe"===t||"frame"===t||"object"===t||"embed"===t}function v(e){if(!e||"object"!=typeof e)return null;if(o(e)!==f.prototype.ELEMENT_NODE)return null;if(E(e))return null;const t=r(e);return h(t)?t:null}function b(e){return i.isArray(e)||(e=new i(e)),e}function L(e,t){let n=!1;for(let r=0;r<t.length;r++)e.includes(t[r])||(e.push(t[r]),n=!0);return n}e.exports={toArray:b,isTagFramable:h,getOwnerWindowOfNode:function(e){return m(y(e))},getContentWindowOfFrame:function(e){return g(e,v(e))},getFramesArray:function(e,t){const n=new i;if(null===e||"object"!=typeof e)return n;if("string"==typeof s(a(r=e,((e,t)=>e||r!==t?"":t)))||!function(e){if(E(e))return!0;const t=o(e);return t===f.prototype.ELEMENT_NODE||t===f.prototype.DOCUMENT_FRAGMENT_NODE||t===f.prototype.DOCUMENT_NODE}(e))return n;var r;const g=function(e){if(E(e))return d;switch(o(e)){case u.prototype.DOCUMENT_NODE:return p;case u.prototype.DOCUMENT_FRAGMENT_NODE:return l;default:return f}}(e).prototype.querySelectorAll.call(e,"iframe,frame,object,embed");return L(n,c(g)),t&&L(n,b(e)),n},getFrameTag:v,shadows:w}},744:(e,t,n)=>{const{BLOCKED_BLOB_URL:r,BLOCKED_BLOB_MSG:o,runInNewRealm:c}=n(407),{Map:i,toString:s,stringStartsWith:a,createObjectURL:u,revokeObjectURL:p,Blob:l}=n(14),f=new i;e.exports={hookWorker:function(e){!function(e){e.URL.revokeObjectURL=function(e){const t=f.get(e);return t&&(p(t),f.delete(t)),p(e)}}(e),function(e){const t=e.Worker;e.Worker=function(e,n){const i="string"==typeof e?e:s(e);return a(i,"blob")?new t(function(e){if(!f.has(e)){const t=function(e){return c((function(t){let n;const r=new t.XMLHttpRequest;return r.open("GET",e,!1),r.onreadystatechange=function(){4===r.readyState&&200===r.status&&(n=r.responseText)},r.send(),n}))}(e),n=`(function() {\n                Object.defineProperty(URL, 'createObjectURL', {value:() => {\n                    console.log(\`${o}\`);\n                    return '${r}';\n                }})\n            }());\n            \n            `+t;f.set(e,u(new l([n],{type:"text/javascript"})))}return f.get(e)}(i),n):new t(i,n)}}(e)}}},626:e=>{e.exports={SRC_IS_NOT_A_WINDOW:'provided argument "src" must be a proper window of instance Window',DST_IS_NOT_A_WINDOW:'provided argument "dst" must be a proper window of instance Window',SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW:'provided argument "src" must be a window in the same origin as the current context window'}},851:(e,t,n)=>{const{DST_IS_NOT_A_WINDOW:r,SRC_IS_NOT_A_WINDOW:o,SRC_IS_NOT_SAME_ORIGIN_AS_WINDOW:c}=n(626);function i(e,t){const n=t(e);return n===n.window}function s(e,t,n){return null===n.getPrototypeOf.call(t,e)}e.exports=function(e,t=window,n=window.Object){if(!i(t,n))throw new Error(o);if(!i(e,n))throw new Error(r);if(s(window,t,n))throw new Error(c);return s(e,t,n)}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,n),c.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e,t=n(352),r=n.n(t);e=top,Object.defineProperty(e,"SNOW",{value:r()})})()})();}())