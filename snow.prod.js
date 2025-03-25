(function(){"use strict";if (typeof SNOW === "function") return;(()=>{var t={586:(t,e,n)=>{const r=n(228),{getFramesArray:o,getFrameTag:i}=n(648),{getOnload:c,setOnload:s,removeAttribute:u,addEventListener:a}=n(14);function p(t){if(!i(t))return;a(t,"load",(function(){r(t)}));const e=c(t);e&&(s(t,null),u(t,"onload"),s(t,e))}t.exports=function(t){for(let e=0;e<t.length;e++){const n=t[e],r=o(n,!0);for(let t=0;t<r.length;t++)p(r[t])}}},750:(t,e,n)=>{const{Object:r}=n(14);t.exports=function(t){t&&r.getOwnPropertyDescriptor(t,"")}},407:t=>{const e=Object.getOwnPropertyDescriptor(window,"length").get,n=e.bind(window),r=Object.getOwnPropertyDescriptor(Document.prototype,"createElement").value.bind(document),o=Object.getOwnPropertyDescriptor(Node.prototype,"appendChild").value.bind(document.documentElement),i=Object.getOwnPropertyDescriptor(Node.prototype,"removeChild").value.bind(document.documentElement);t.exports={getLength:e,runInNewRealm:function(t){const e=n(),c=r("IFRAME");o(c);const s=t(window[e]);return i(c),s}}},832:(t,e,n)=>{const{Object:r,Function:o}=n(14),{isTagFramable:i}=n(648),{error:c,ERR_EXTENDING_FRAMABLES_BLOCKED:s}=n(312);t.exports=function(t){const e=r.getOwnPropertyDescriptor(t.CustomElementRegistry.prototype,"define");e.configurable=e.writable=!0;const n=e.value;var u;e.value=(u=n,function(t,e,n){let r=n;if(n){const e=n.extends;if(i(e+""))throw c(s,t,n)}return o.prototype.call.call(u,this,t,e,r)}),r.defineProperty(t.CustomElementRegistry.prototype,"define",e)}},228:(t,e,n)=>{const r=n(750),{getLength:o}=n(407),{shadows:i,toArray:c,getFramesArray:s,getContentWindowOfFrame:u,getOwnerWindowOfNode:a}=n(648),{Object:p,getFrameElement:l,Function:f,isConnected:g}=n(14),{forEachOpened:y}=n(134);function d(t,e){const n=f.prototype.call.call(o,t);for(let o=0;o<n;o++){if(r=t[o],c=t,null===p.getPrototypeOf.call(c,r))continue;if(l(t[o])===e)return t[o];const n=d(t[o],e);if(n)return n}var r,c;for(let n=0;n<i.length;n++){const r=i[n];if(!g(r))continue;if(a(r)!==t)continue;const o=s(r,!1);for(let t=0;t<o.length;t++){const n=o[t],r=u(n);if(n===e)return r;const i=d(r,e);if(i)return i}}return null}function m(t,e){const n=d(t,e);return n&&function(t){top.SNOW_WINDOW(t)}(n),!!n}t.exports=function(t){t=c(t);for(let e=0;e<t.length;e++){const n=t[e];"object"==typeof n&&null!==n&&(r(n),m(top,n)||y(m,n))}}},328:(t,e,n)=>{const{getFramesArray:r,getDeclarativeShadows:o}=n(648),{document:i,getChildElementCount:c,setInnerHTML:s}=n(14),{error:u,ERR_DECLARATIVE_SHADOWS_BLOCKED:a,ERR_HTML_FRAMES_SRCDOC_BLOCKED:p}=n(312);t.exports={assertHTML:function(t){for(let e=0;e<t.length;e++){const n=i.createElement("html");if(s(n,t[e]),c(n)){if(o(n).length>0)throw u(a,t[e]);const i=r(n,!1);for(let r=0;r<i.length;r++){const o=i[r];if(n.getAttribute.call(o,"srcdoc"))throw u(p,t[e])}}}}}},352:(t,e,n)=>{const r=n(228),o=n(716),i=n(832),c=n(583),s=n(278),u=n(459),a=n(58),p=n(744),l=n(294),{hookShadowDOM:f}=n(373),{Array:g,push:y,addEventListener:d,getFrameElement:m}=n(14),{makeDescriptorSetter:w}=n(648),{isMarked:E,mark:O}=n(111),{error:h,ERR_CB_MUST_BE_FUNCTION:v,ERR_MARK_NEW_WINDOW_FAILED:b}=n(312),D=w("SNOW_WINDOW",(function(t){T(t)})),P=w("SNOW_FRAME",(function(t){r(t)})),L=w("SNOW",C);function R(t){try{const e=!E(t);return e&&O(t),e}catch(e){h(b,t,e)}return R(t)}function T(t,e,n){if(!n&&R(t)){!function(t){L(t),function(t){const e=m(t);d(e,"load",(function(){r(e)}))}(t),o(t),i(t),c(t),s(t),u(t,"load"),a(t),f(t),l(t),p(t)}(t);for(let e=0;e<M.length;e++)if(M[e](t))return}e&&e(t)}const M=new g;function C(t,e){if("function"!=typeof t&&h(v,t))return;D(top),P(top);const n=1===y(M,t),r=e||window;T(r,t,!n&&r===top)}t.exports=C},58:(t,e,n)=>{const{error:r,ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED:o}=n(312),{protectShadows:i}=n(373),c=n(586),{getFramesArray:s,shadows:u}=n(648),{getParentElement:a,getCommonAncestorContainer:p,slice:l,Object:f,Function:g}=n(14),{assertHTML:y}=n(328),d=n(228),m={Range:["insertNode"],DocumentFragment:["replaceChildren","append","prepend"],Document:["replaceChildren","append","prepend","write","writeln","execCommand"],Node:["appendChild","insertBefore","replaceChild"],Element:["innerHTML","outerHTML","insertAdjacentHTML","replaceWith","insertAdjacentElement","append","before","prepend","after","replaceChildren"],ShadowRoot:["innerHTML"],HTMLIFrameElement:["srcdoc"]},w=f.getOwnPropertyNames(m);function E(t,e,n){return function(){if(n&&this!==top.document)throw r(o,this);const f=l(arguments),m=e?p(this):a(this)||this;!function(t){c(t),c(u),y(t)}(f);const w=g.prototype.apply.call(t,this,f);return function(t,e){const n=s(e,!1);d(n),d(t),i(!0)}(f,m),w}}t.exports=function(t){for(let e=0;e<w.length;e++){const n=w[e],r=m[n];for(let e=0;e<r.length;e++){const o=r[e],i=f.getOwnPropertyDescriptor(t[n].prototype,o);if(!i)continue;const c=i.set?"set":"value",s="Range"===n,u="write"===o||"writeln"===o;i[c]=E(i[c],s,u),i.configurable=!0,"value"===c&&(i.writable=!0),f.defineProperty(t[n].prototype,o,i)}}}},459:(t,e,n)=>{const r=n(228),{removeEventListener:o,addEventListener:i,slice:c,Map:s,Object:u}=n(14),a=new s;function p(t,e){return function(n,o,s){let u=o;return n===e&&(a.has(o)||a.set(o,(function(){r(this);const t=c(arguments);!function(t,e,n){e&&(e.handleEvent?e.handleEvent.apply(e,n):e.apply(t,n))}(this,o,t)})),u=a.get(o)),i(this||t,n,u,s)}}function l(t,e){return function(n,r,i){let c=r;return n===e&&(c=a.get(r),a.delete(r)),o(this||t,n,c,i)}}t.exports=function(t,e){u.defineProperty(t.EventTarget.prototype,"addEventListener",{configurable:!0,writable:!0,value:p(t,e)}),u.defineProperty(t.EventTarget.prototype,"removeEventListener",{configurable:!0,writable:!0,value:l(t,e)})}},312:t=>{const{Error:e}=globalThis,{from:n}=Array,r=Function.prototype.apply.bind(console.error,console);function o(t){const o=n(arguments);return r(o),new e(t)}function i(t){return`SNOW ERROR (CODE:${t}):`}t.exports={error:function(t,e,n,r){switch(t){case 7:const t=e,c=n,s=r;return o(i(7),`blocking ${c} object:`,t,`of type "${s}" (not in allow list)`,".","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/87#issuecomment-1586868353",".");case 6:const u=e,a=n;return o(i(6),`blocking extension attempt ("${u}") of framable elements such as provided`,a,".","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/56#issuecomment-1374899809",".");case 1:const p=e,l=n;return o(i(1),"failed to mark new window:",p,".","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/33#issuecomment-1239280063",".","in order to maintain a bulletproof defense mechanism, failing to mark a new window typically causes an infinite loop",".","error caught:",l);case 2:const f=e;return o(i(2),'first argument must be of type "function", instead got:',f,".","therefore, snow bailed and is not applied to the page until this is fixed.");case 3:const g=e,y=n;return o(i(3),'blocking open attempt to "javascript:" url:',g,"by window: ",y,".","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/44#issuecomment-1369687802",".");case 4:const d=e,m=n;return o(i(4),"blocking access to property:",`"${d}"`,"of opened window: ",m,".","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/2#issuecomment-1239264255",".");case 5:const w=e;return o(i(5),"blocking html string that includes a representation of a declarative shadow:",`"${w}"`,".","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/32#issuecomment-1239273328",".");case 8:const E=e;return o(i(8),'blocking html string that includes a representation of a framable element with the "srcdoc" attribute:',`"${E}"`,".","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/???",".");case 9:const O=e;return o(i(9),"blocking document.write\\ln action on a document that is not the top most document:",O,".","if this prevents your application from running correctly, please visit/report at","https://github.com/LavaMoat/snow/issues/???",".")}},generateErrorMessage:i,ERR_MARK_NEW_WINDOW_FAILED:1,ERR_OPENED_PROP_ACCESS_BLOCKED:4,ERR_OPEN_JS_SCHEME_BLOCKED:3,ERR_CB_MUST_BE_FUNCTION:2,ERR_DECLARATIVE_SHADOWS_BLOCKED:5,ERR_EXTENDING_FRAMABLES_BLOCKED:6,ERR_BLOB_TYPE_BLOCKED:7,ERR_HTML_FRAMES_SRCDOC_BLOCKED:8,ERR_NON_TOP_DOCUMENT_WRITE_BLOCKED:9}},111:(t,e,n)=>{const{Map:r,Object:o,Array:i}=n(14),c=new i,s=new r;t.exports={isMarked:function(t){if(!s.has(t))return!1;const e=o.getOwnPropertyDescriptor(t,"SNOW_ID");if(!e||!o.hasOwnProperty.call(e,"value"))return!1;if("function"!=typeof e.value)return!1;const n=s.get(t);return e.value(c)===n},mark:function(t){const e=new i,n=o.create(null);n.value=t=>t===c&&e,o.defineProperty(t,"SNOW_ID",n),s.set(t,e)}}},14:(t,e,n)=>{const{runInNewRealm:r}=n(407);t.exports=function(t){const e=function(t){const{EventTarget:e}=t;return r((function(t){const{URL:n,Proxy:r,JSON:o,Attr:i,String:c,Function:s,Map:u,Node:a,Document:p,DocumentFragment:l,Blob:f,ShadowRoot:g,Object:y,Reflect:d,Array:m,Element:w,HTMLElement:E,Range:O,HTMLIFrameElement:h,HTMLFrameElement:v,HTMLObjectElement:b}=t,D={URL:n,Proxy:r,JSON:o,Attr:i,String:c,Function:s,Map:u,Node:a,Document:p,DocumentFragment:l,Blob:f,ShadowRoot:g,Object:y,Reflect:d,Array:m,Element:w,HTMLElement:E,Range:O,EventTarget:e,HTMLIFrameElement:h,HTMLFrameElement:v,HTMLObjectElement:b};return D.document={createElement:t.document.createElement.bind(t.document)},D}))}(t),{document:n,Proxy:o,Function:i,String:c,Map:s,Node:u,Document:a,DocumentFragment:p,Blob:l,ShadowRoot:f,Object:g,Reflect:y,Array:d,Element:m,HTMLElement:w,Range:E,EventTarget:O,HTMLIFrameElement:h,HTMLFrameElement:v,HTMLObjectElement:b}=e;return g.assign(e,{iframeContentWindow:g.getOwnPropertyDescriptor(h.prototype,"contentWindow").get,frameContentWindow:g.getOwnPropertyDescriptor(v.prototype,"contentWindow").get,objectContentWindow:g.getOwnPropertyDescriptor(b.prototype,"contentWindow").get,createElement:g.getOwnPropertyDescriptor(a.prototype,"createElement").value,slice:g.getOwnPropertyDescriptor(d.prototype,"slice").value,push:g.getOwnPropertyDescriptor(d.prototype,"push").value,split:g.getOwnPropertyDescriptor(c.prototype,"split").value,nodeType:g.getOwnPropertyDescriptor(u.prototype,"nodeType").get,isConnected:g.getOwnPropertyDescriptor(u.prototype,"isConnected").get,tagName:g.getOwnPropertyDescriptor(m.prototype,"tagName").get,getInnerHTML:g.getOwnPropertyDescriptor(m.prototype,"innerHTML").get,setInnerHTML:g.getOwnPropertyDescriptor(m.prototype,"innerHTML").set,toString:g.getOwnPropertyDescriptor(g.prototype,"toString").value,getOnload:g.getOwnPropertyDescriptor(w.prototype,"onload").get,setOnload:g.getOwnPropertyDescriptor(w.prototype,"onload").set,getAttribute:g.getOwnPropertyDescriptor(m.prototype,"getAttribute").value,setAttribute:g.getOwnPropertyDescriptor(m.prototype,"setAttribute").value,removeAttribute:g.getOwnPropertyDescriptor(m.prototype,"removeAttribute").value,remove:g.getOwnPropertyDescriptor(m.prototype,"remove").value,addEventListener:g.getOwnPropertyDescriptor(O.prototype,"addEventListener").value,removeEventListener:g.getOwnPropertyDescriptor(O.prototype,"removeEventListener").value,getChildElementCount:g.getOwnPropertyDescriptor(m.prototype,"childElementCount").get,getFrameElement:g.getOwnPropertyDescriptor(t,"frameElement").get,getParentElement:g.getOwnPropertyDescriptor(u.prototype,"parentElement").get,getOwnerDocument:g.getOwnPropertyDescriptor(u.prototype,"ownerDocument").get,getDefaultView:g.getOwnPropertyDescriptor(a.prototype,"defaultView").get,getBlobFileType:g.getOwnPropertyDescriptor(l.prototype,"type").get,getPreviousElementSibling:g.getOwnPropertyDescriptor(m.prototype,"previousElementSibling").get,getCommonAncestorContainer:g.getOwnPropertyDescriptor(E.prototype,"commonAncestorContainer").get}),{document:n,Proxy:o,Object:g,Reflect:y,Function:i,Node:u,Element:m,Document:a,DocumentFragment:p,Blob:l,ShadowRoot:f,Array:d,Map:s,getContentWindow:function(t,n){switch(n){case"IFRAME":return e.iframeContentWindow.call(t);case"FRAME":return e.frameContentWindow.call(t);case"OBJECT":return e.objectContentWindow.call(t);default:return null}},stringToLowerCase:function(t){return e.String.prototype.toLowerCase.call(t)},stringStartsWith:function(t,n){return e.String.prototype.startsWith.call(t,n)},parse:function(t,n){return e.JSON.parse(t,n)},stringify:function(t,n,r){return e.JSON.stringify(t,n,r)},slice:function(t,n,r){return e.slice.call(t,n,r)},push:function(t,n){return e.push.call(t,n)},split:function(t,n){return e.split.call(t,n)},nodeType:function(t){return e.nodeType.call(t)},isConnected:function(t){return e.isConnected.call(t)},tagName:function(t){return e.tagName.call(t)},toString:function(t){return e.toString.call(t)},getOnload:function(t){return e.getOnload.call(t)},setOnload:function(t,n){return e.setOnload.call(t,n)},remove:function(t){return e.remove.call(t)},removeAttribute:function(t,n){return e.removeAttribute.call(t,n)},getAttribute:function(t,n){return e.getAttribute.call(t,n)},setAttribute:function(t,n,r){return e.setAttribute.call(t,n,r)},addEventListener:function(t,n,r,o){return e.Function.prototype.call.call(e.addEventListener,t,n,r,o)},removeEventListener:function(t,n,r,o){return e.Function.prototype.call.call(e.removeEventListener,t,n,r,o)},createElement:function(t,n,r){return e.createElement.call(t,n,r)},getInnerHTML:function(t){return e.getInnerHTML.call(t)},setInnerHTML:function(t,n){return e.setInnerHTML.call(t,n)},getChildElementCount:function(t){return e.getChildElementCount.call(t)},getFrameElement:function(t){return e.Function.prototype.call.call(e.getFrameElement,t)},getParentElement:function(t){return e.getParentElement.call(t)},getOwnerDocument:function(t){return e.getOwnerDocument.call(t)},getDefaultView:function(t){return e.getDefaultView.call(t)},getBlobFileType:function(t){return e.getBlobFileType.call(t)},getPreviousElementSibling:function(t){return e.getPreviousElementSibling.call(t)},getCommonAncestorContainer:function(t){return e.getCommonAncestorContainer.call(t)}}}(top)},583:(t,e,n)=>{const{stringToLowerCase:r,stringStartsWith:o,slice:i,Function:c,Object:s}=n(14),{error:u,ERR_OPEN_JS_SCHEME_BLOCKED:a}=n(312),{proxy:p,getProxyByOpened:l}=n(134);function f(t){const e=s.getOwnPropertyDescriptor(t.MessageEvent.prototype,"source"),n=e.get;e.get=function(){const t=n.call(this);return l(t)||t},s.defineProperty(t.MessageEvent.prototype,"source",e)}function g(t,e,n,s){return n(t),function(){const n=i(arguments),l=n[0];if(o(r(l+""),"javascript"))throw u(a,l+"",t);const f=c.prototype.apply.call(e,this,n);return f?!s&&n.length<3?f:p(f):null}}t.exports=function(t){s.defineProperty(t,"open",{value:g(t,t.open,f,!0)}),s.defineProperty(t.Document.prototype,"open",{value:g(t,t.document.open,f,!1)})}},134:(t,e,n)=>{const{Object:r,Proxy:o,Reflect:i,Map:c}=n(14),{error:s,ERR_OPENED_PROP_ACCESS_BLOCKED:u}=n(312),a=new c;function p(t){return a.get(t)}t.exports={proxy:function(t){const e=r.create(null);if(r.defineProperty(e,"closed",{get:function(){return t.closed}}),r.defineProperty(e,"close",{value:function(){return t.close()}}),r.defineProperty(e,"focus",{value:function(){return t.focus()}}),r.defineProperty(e,"postMessage",{value:function(e,n,r){return t.postMessage(e,n,r)}}),!a.has(t)){top.SNOW_WINDOW(t);const n=new o(e,{get:function(e,n){let r=i.get(e,n);if(i.has(e,n))return r;if(i.has(t,n))throw s(u,n,t);return r},set:function(){}});a.set(t,n)}return p(t)},getProxyByOpened:p,forEachOpened:function(t,e){for(const n of a.keys())t(n,e)}}},278:(t,e,n)=>{const{Object:r,slice:o,Function:i}=n(14),{proxy:c}=n(134);function s(t,e){const n=r.getOwnPropertyDescriptor(t[e].prototype,"window"),o=n.get;n.get=function(){return c(o.call(this))},r.defineProperty(t[e].prototype,"window",n)}t.exports=function(t){t?.documentPictureInPicture?.requestWindow&&(t.documentPictureInPicture.requestWindow=function(t,e,n){return n(t,"DocumentPictureInPictureEvent"),n(t,"DocumentPictureInPicture"),async function(){const t=o(arguments),n=await i.prototype.apply.call(e,this,t);return n?c(n):null}}(t,t.documentPictureInPicture.requestWindow,s))}},373:(t,e,n)=>{const r=n(228),{getFramesArray:o,shadows:i}=n(648),{Object:c,Function:s,isConnected:u}=n(14);function a(t){for(let e=0;e<i.length;e++){const n=i[e];if(t&&!u(n))continue;const c=o(n,!1);r(c)}}t.exports={hookShadowDOM:function(t){const e=c.getOwnPropertyDescriptor(t.Element.prototype,"attachShadow");e.configurable=e.writable=!0;const n=e.value;var r;e.value=(r=n,function(t){const e=s.prototype.call.call(r,this,t);return i.push(e),a(!0),e}),c.defineProperty(t.Element.prototype,"attachShadow",e)},protectShadows:a}},294:(t,e,n)=>{const{trustedHTMLs:r}=n(648),{Object:o,Function:i}=n(14);t.exports=function(t){if(void 0===t.TrustedTypePolicy)return;const e=o.getOwnPropertyDescriptor(t.TrustedTypePolicy.prototype,"createHTML");e.configurable=e.writable=!0;const n=e.value;e.value=function(t,e){return r.push(t.trustedTypes.emptyHTML),function(t,n){const o=i.prototype.call.call(e,this,t,n);return r.push(o),o}}(t,n),o.defineProperty(t.TrustedTypePolicy.prototype,"createHTML",e)}},716:(t,e,n)=>{const{Object:r,Array:o,getBlobFileType:i}=n(14),{error:c,ERR_BLOB_TYPE_BLOCKED:s}=n(312),u="KIND",a="TYPE",p="Blob",l="File",f="MediaSource",g=new o,y=new o("","text/javascript","text/css","application/javascript","application/css","image/jpeg","image/jpg","image/png","audio/ogg; codecs=opus","video/mp4","application/pdf","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");function d(t,e){return function(n,o){const c=new t(n,o);return r.defineProperty(c,u,{value:e}),e!==p&&e!==l||r.defineProperty(c,a,{value:i(c)}),g.push(c),c}}t.exports=function(t){(function(t){const e=t.URL.createObjectURL;r.defineProperty(t.URL,"createObjectURL",{value:function(t){return function(t){return g.includes(t)}(t)&&function(t){const e=t[u];if(e===p||e===l){const n=t[a];if(!y.includes(n))throw c(s,t,e,n)}}(t),e(t)}})})(t),function(t){const e=t[l],n=d(e,l);function o(t,e){return n(t,e)}r.setPrototypeOf(e.prototype,o.prototype),r.setPrototypeOf(o.prototype,t[p].prototype),t[l]=o,r.defineProperty(e.prototype,"constructor",{value:o})}(t),function(t){const e=t[p],n=d(e,p);function o(t,e){return n(t,e)}r.setPrototypeOf(e.prototype,o.prototype),t[p]=o,r.defineProperty(e.prototype,"constructor",{value:o})}(t),function(t){const e=t[f],n=d(e,f);function o(t,e){return n(t,e)}r.setPrototypeOf(o,e),t[f]=o,r.defineProperty(e.prototype,"constructor",{value:o})}(t)}},648:(t,e,n)=>{const{tagName:r,nodeType:o,slice:i,Array:c,parse:s,stringify:u,Node:a,Document:p,DocumentFragment:l,Element:f,ShadowRoot:g,getContentWindow:y,getDefaultView:d,getOwnerDocument:m,stringToLowerCase:w,Object:E}=n(14),O=new c,h=new c;function v(t){return O.includes(t)}function b(t){if(v(t))return g;switch(o(t)){case a.prototype.DOCUMENT_NODE:return p;case a.prototype.DOCUMENT_FRAGMENT_NODE:return l;default:return f}}function D(t){const e=w(t);return"iframe"===e||"frame"===e||"object"===e||"embed"===e}function P(t){if(!t||"object"!=typeof t)return null;if(o(t)!==f.prototype.ELEMENT_NODE)return null;if(v(t))return null;const e=r(t);return D(e)?e:null}function L(t){return c.isArray(t)||(t=new c(t)),t}function R(t,e){let n=!1;for(let r=0;r<e.length;r++)t.includes(e[r])||(t.push(e[r]),n=!0);return n}t.exports={getDeclarativeShadows:function(t){return b(t).prototype.querySelectorAll.call(t,"template[shadowroot]")},makeDescriptorSetter:function(t,e){const n=E.create(null);return n.value=e,function(e){E.getOwnPropertyDescriptor(e,t)||E.defineProperty(e,t,n)}},toArray:L,isTagFramable:D,getOwnerWindowOfNode:function(t){return d(m(t))},getContentWindowOfFrame:function(t){return y(t,P(t))},getFramesArray:function(t,e){const n=new c;if(null===t||"object"!=typeof t)return n;if(r=t,h.includes(r)||!function(t){if(v(t))return!0;const e=o(t);return e===f.prototype.ELEMENT_NODE||e===f.prototype.DOCUMENT_FRAGMENT_NODE||e===f.prototype.DOCUMENT_NODE}(t))return n;var r;const s=b(t).prototype.querySelectorAll.call(t,"iframe,frame,object,embed");return R(n,i(s)),e&&R(n,L(t)),n},getFrameTag:P,shadows:O,trustedHTMLs:h}},744:(t,e,n)=>{const{runInNewRealm:r}=n(407),{Map:o,toString:i,stringStartsWith:c,Blob:s}=n(14),u=new o,{createObjectURL:a,revokeObjectURL:p}=URL;t.exports=function(t){!function(t){t.URL.revokeObjectURL=function(t){const e=u.get(t);return e&&(p(e),u.delete(e)),p(t)}}(t),function(t){const e=t.Worker;t.Worker=function(t,n){const o="string"==typeof t?t:i(t);return c(o,"blob")?new e(function(t){if(!u.has(t)){const e=function(t){return r((function(e){let n;const r=new e.XMLHttpRequest;return r.open("GET",t,!1),r.onreadystatechange=function(){4===r.readyState&&200===r.status&&(n=r.responseText)},r.send(),n}))}(t),n="(function() { Object.defineProperty(URL, 'createObjectURL', { value: () => { throw new Error(`\nBLOCKED BY SNOW:\nCreating URL objects is not allowed under Snow protection within Web Workers.\nIf this prevents your application from running correctly, please visit/report at https://github.com/LavaMoat/snow/pull/89#issuecomment-1589359673.\nLearn more at https://github.com/LavaMoat/snow/pull/89`) }}) }())\n\n"+e;u.set(t,a(new s([n],{type:"text/javascript"})))}return u.get(t)}(o),n):new e(o,n)}}(t)}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=n(352),e=n.n(t);!function(t){Object.defineProperty(t,"SNOW",{value:function(e,r){n(e,r||t)}});let n=e();t!==top&&(n=top.SNOW,t.SNOW((()=>{}),t))}(window)})()})();}())