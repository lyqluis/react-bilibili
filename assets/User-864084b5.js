import{C as e,D as t,_ as n,E as i,F as r,G as a,H as o,J as s,K as c,M as l,N as d,O as u,P as m,Q as f,R as h,T as p,U as v,V as g,W as w,X as x,u as b,Y as y,c as _,j,z as E,Z as R,$ as N,s as C,p as O,a0 as k,q as z,a1 as M,I as A,a2 as T,a3 as $,a4 as I,a5 as L,a6 as S,a7 as F,x as D,a8 as q,a9 as H,aa as P,ab as W,ac as Z,ad as B,ae as K,af as G,ag as V,ah as Y}from"./index-5222d580.js";import{g as U,a as X,b as J,c as Q,d as ee,e as te,f as ne}from"./user-21a66d6f.js";import{T as ie}from"./index-b4a15293.js";import{L as re}from"./index-fc3d5f27.js";import{L as ae}from"./ListCard-4b3d2f60.js";import{t as oe}from"./traverse-react-node-9ab3e654.js";import{u as se}from"./useRequest-e96b32f6.js";import{S as ce}from"./Section-cfccf90d.js";import{E as le}from"./ellipsis-8166a0da.js";import{b as de}from"./bound-6644a254.js";import{c as ue,d as me,p as fe,u as he}from"./use-gesture-react.esm-cbba5b86.js";import{c as pe}from"./convert-px-4695110a.js";import"./use-resize-effect-66b1e796.js";const ve=window.React.useEffect;const ge=function(n){e&&t(n),ve((function(){null==n||n()}),[])},we=window.React.useCallback,xe=window.React.useRef,be=window.React.useState;var ye=function(){if("undefined"!=typeof Map)return Map;function e(e,t){var n=-1;return e.some((function(e,i){return e[0]===t&&(n=i,!0)})),n}return function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(t){var n=e(this.__entries__,t),i=this.__entries__[n];return i&&i[1]},t.prototype.set=function(t,n){var i=e(this.__entries__,t);~i?this.__entries__[i][1]=n:this.__entries__.push([t,n])},t.prototype.delete=function(t){var n=this.__entries__,i=e(n,t);~i&&n.splice(i,1)},t.prototype.has=function(t){return!!~e(this.__entries__,t)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(e,t){void 0===t&&(t=null);for(var n=0,i=this.__entries__;n<i.length;n++){var r=i[n];e.call(t,r[1],r[0])}},t}()}(),_e="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,je="undefined"!=typeof global&&global.Math===Math?global:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),Ee="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(je):function(e){return setTimeout((function(){return e(Date.now())}),1e3/60)};var Re=["top","right","bottom","left","width","height","size","weight"],Ne="undefined"!=typeof MutationObserver,Ce=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(e,t){var n=!1,i=!1,r=0;function a(){n&&(n=!1,e()),i&&s()}function o(){Ee(a)}function s(){var e=Date.now();if(n){if(e-r<2)return;i=!0}else n=!0,i=!1,setTimeout(o,t);r=e}return s}(this.refresh.bind(this),20)}return e.prototype.addObserver=function(e){~this.observers_.indexOf(e)||this.observers_.push(e),this.connected_||this.connect_()},e.prototype.removeObserver=function(e){var t=this.observers_,n=t.indexOf(e);~n&&t.splice(n,1),!t.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},e.prototype.updateObservers_=function(){var e=this.observers_.filter((function(e){return e.gatherActive(),e.hasActive()}));return e.forEach((function(e){return e.broadcastActive()})),e.length>0},e.prototype.connect_=function(){_e&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),Ne?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){_e&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(e){var t=e.propertyName,n=void 0===t?"":t;Re.some((function(e){return!!~n.indexOf(e)}))&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e}(),Oe=function(e,t){for(var n=0,i=Object.keys(t);n<i.length;n++){var r=i[n];Object.defineProperty(e,r,{value:t[r],enumerable:!1,writable:!1,configurable:!0})}return e},ke=function(e){return e&&e.ownerDocument&&e.ownerDocument.defaultView||je},ze=Le(0,0,0,0);function Me(e){return parseFloat(e)||0}function Ae(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return t.reduce((function(t,n){return t+Me(e["border-"+n+"-width"])}),0)}function Te(e){var t=e.clientWidth,n=e.clientHeight;if(!t&&!n)return ze;var i=ke(e).getComputedStyle(e),r=function(e){for(var t={},n=0,i=["top","right","bottom","left"];n<i.length;n++){var r=i[n],a=e["padding-"+r];t[r]=Me(a)}return t}(i),a=r.left+r.right,o=r.top+r.bottom,s=Me(i.width),c=Me(i.height);if("border-box"===i.boxSizing&&(Math.round(s+a)!==t&&(s-=Ae(i,"left","right")+a),Math.round(c+o)!==n&&(c-=Ae(i,"top","bottom")+o)),!function(e){return e===ke(e).document.documentElement}(e)){var l=Math.round(s+a)-t,d=Math.round(c+o)-n;1!==Math.abs(l)&&(s-=l),1!==Math.abs(d)&&(c-=d)}return Le(r.left,r.top,s,c)}var $e="undefined"!=typeof SVGGraphicsElement?function(e){return e instanceof ke(e).SVGGraphicsElement}:function(e){return e instanceof ke(e).SVGElement&&"function"==typeof e.getBBox};function Ie(e){return _e?$e(e)?function(e){var t=e.getBBox();return Le(0,0,t.width,t.height)}(e):Te(e):ze}function Le(e,t,n,i){return{x:e,y:t,width:n,height:i}}var Se=function(){function e(e){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=Le(0,0,0,0),this.target=e}return e.prototype.isActive=function(){var e=Ie(this.target);return this.contentRect_=e,e.width!==this.broadcastWidth||e.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var e=this.contentRect_;return this.broadcastWidth=e.width,this.broadcastHeight=e.height,e},e}(),Fe=function(e,t){var n,i,r,a,o,s,c,l=(i=(n=t).x,r=n.y,a=n.width,o=n.height,s="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,c=Object.create(s.prototype),Oe(c,{x:i,y:r,width:a,height:o,top:r,right:i+a,bottom:o+r,left:i}),c);Oe(this,{target:e,contentRect:l})},De=function(){function e(e,t,n){if(this.activeObservations_=[],this.observations_=new ye,"function"!=typeof e)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=e,this.controller_=t,this.callbackCtx_=n}return e.prototype.observe=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(e instanceof ke(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)||(t.set(e,new Se(e)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(e instanceof ke(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)&&(t.delete(e),t.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var e=this;this.clearActive(),this.observations_.forEach((function(t){t.isActive()&&e.activeObservations_.push(t)}))},e.prototype.broadcastActive=function(){if(this.hasActive()){var e=this.callbackCtx_,t=this.activeObservations_.map((function(e){return new Fe(e.target,e.broadcastRect())}));this.callback_.call(e,t,e),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e}(),qe="undefined"!=typeof WeakMap?new WeakMap:new ye,He=function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=Ce.getInstance(),i=new De(t,n,this);qe.set(this,i)};["observe","unobserve","disconnect"].forEach((function(e){He.prototype[e]=function(){var t;return(t=qe.get(this))[e].apply(t,arguments)}}));var Pe=void 0!==je.ResizeObserver?je.ResizeObserver:He;var We=r(window.React.useLayoutEffect);const Ze=a?We:o;function Be(e){var t=n(function(e){var t=xe(0),r=n(be(e),2),a=r[0],o=r[1],s=we((function(e){cancelAnimationFrame(t.current),t.current=requestAnimationFrame((function(){o(e)}))}),[]);return i((function(){cancelAnimationFrame(t.current)})),[a,s]}((function(){var t=s(e);return t?{width:t.clientWidth,height:t.clientHeight}:void 0})),2),r=t[0],a=t[1];return Ze((function(){var t=s(e);if(t){var n=new Pe((function(e){e.forEach((function(e){var t=e.target,n=t.clientWidth,i=t.clientHeight;a({width:n,height:i})}))}));return n.observe(t),function(){n.disconnect()}}}),[],e),r}const Ke=window.React;function Ge(e){return Ke.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},e,{style:Object.assign({verticalAlign:"-0.125em"},e.style),className:["antd-mobile-icon",e.className].filter(Boolean).join(" ")}),Ke.createElement("g",{id:"DownOutline-DownOutline",stroke:"none",strokeWidth:1,fill:"none",fillRule:"evenodd"},Ke.createElement("g",null,Ke.createElement("rect",{id:"DownOutline-矩形",fill:"#FFFFFF",opacity:0,x:0,y:0,width:48,height:48}),Ke.createElement("path",{d:"M5.11219264,16.3947957 L22.6612572,34.5767382 L22.6612572,34.5767382 C23.2125856,35.1304785 24.0863155,35.1630514 24.6755735,34.6744571 L24.7825775,34.5767382 L42.8834676,16.3956061 C42.9580998,16.320643 43,16.2191697 43,16.1133896 L43,12.9866673 C43,12.7657534 42.8209139,12.5866673 42.6,12.5866673 C42.4936115,12.5866673 42.391606,12.6290496 42.316542,12.7044413 L23.7816937,31.3201933 L23.7816937,31.3201933 L5.6866816,12.7237117 C5.53262122,12.5653818 5.27937888,12.5619207 5.121049,12.7159811 C5.04365775,12.7912854 5,12.8946805 5,13.0026627 L5,16.1170064 C5,16.2206403 5.04022164,16.3202292 5.11219264,16.3947957 Z",id:"DownOutline-down",fill:"currentColor",fillRule:"nonzero"}))))}const Ve=window.React,Ye="adm-safe-area",Ue=e=>c(e,Ve.createElement("div",{className:l(Ye,`${Ye}-position-${e.position}`)})),Xe=window.ReactDOM,Je=Object.assign({},Xe),{version:Qe,render:et,unmountComponentAtNode:tt}=Je;let nt;try{Number((Qe||"").split(".")[0])>=18&&Je.createRoot&&(nt=Je.createRoot)}catch(yn){}function it(e){const{__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:t}=Je;t&&"object"==typeof t&&(t.usingClientEntryPoint=e)}const rt="__antd_mobile_root__";function at(e,t){nt?function(e,t){it(!0);const n=t[rt]||nt(t);it(!1),n.render(e),t[rt]=n}(e,t):function(e,t){et(e,t)}(e,t)}function ot(e){return nt?function(e){return d(this,void 0,void 0,(function*(){return Promise.resolve().then((()=>{var t;null===(t=e[rt])||void 0===t||t.unmount(),delete e[rt]}))}))}(e):function(e){return tt(e)}(e)}const st=window.React,ct=window.React.useEffect,lt=window.React.useImperativeHandle,dt=window.React.useRef,ut=window.React.useState;function mt(e){const t=st.forwardRef(((t,n)=>{const[r,a]=ut(!1),o=dt(!1),[s,c]=ut(e),l=dt(0);function d(){var e,t;o.current=!0,a(!1),null===(t=(e=s.props).onClose)||void 0===t||t.call(e)}function u(){var e,t;i(),null===(t=(e=s.props).afterClose)||void 0===t||t.call(e)}return ct((()=>{o.current?u():a(!0)}),[]),lt(n,(()=>({close:d,replace:e=>{var t,n;l.current++,null===(n=(t=s.props).afterClose)||void 0===n||n.call(t),c(e)}}))),st.cloneElement(s,Object.assign(Object.assign({},s.props),{key:l.current,visible:r,onClose:d,afterClose:u}))})),n=st.createRef(),i=function(e){const t=document.createElement("div");return document.body.appendChild(t),at(e,t),function(){ot(t)&&t.parentNode&&t.parentNode.removeChild(t)}}(st.createElement(t,{ref:n}));return{close:()=>d(this,void 0,void 0,(function*(){var e;n.current?null===(e=n.current)||void 0===e||e.close():i()})),replace:e=>{var t;null===(t=n.current)||void 0===t||t.replace(e)}}}function ft(e,t,n){return e*t*n/(t+n*e)}function ht(e,t,n,i,r=.15){return 0===r?de(e,t,n):e<t?-ft(t-e,i,r)+t:e>n?+ft(e-n,i,r)+n:e}const pt=window.React,vt=window.React.useRef,gt="adm-collapse",wt=e=>{const{visible:t}=e,n=vt(null),i=m(t,e.forceRender,e.destroyOnClose),[{height:r},a]=f((()=>({from:{height:0},config:{precision:.01,mass:1,tension:200,friction:25,clamp:!0}})));return ge((()=>{if(!t)return;const e=n.current;e&&a.start({height:e.offsetHeight,immediate:!0})})),h((()=>{const e=n.current;e&&(t?a.start({height:e.offsetHeight}):(a.start({height:e.offsetHeight,immediate:!0}),a.start({height:0})))}),[t]),pt.createElement(p.div,{className:`${gt}-panel-content`,style:{height:r.to((e=>r.idle&&t?"auto":e))}},pt.createElement("div",{className:`${gt}-panel-content-inner`,ref:n},pt.createElement(re.Item,null,i&&e.children)))},xt=v((e=>{var t;const n=[];oe(e.children,(e=>{if(!pt.isValidElement(e))return;"string"==typeof e.key&&n.push(e)}));const[i,r]=u(e.accordion?{value:void 0===e.activeKey?void 0:null===e.activeKey?[]:[e.activeKey],defaultValue:void 0===e.defaultActiveKey||null===e.defaultActiveKey?[]:[e.defaultActiveKey],onChange:t=>{var n,i;null===(n=e.onChange)||void 0===n||n.call(e,null!==(i=t[0])&&void 0!==i?i:null)}}:{value:e.activeKey,defaultValue:null!==(t=e.defaultActiveKey)&&void 0!==t?t:[],onChange:e.onChange}),a=null===i?[]:Array.isArray(i)?i:[i];return c(e,pt.createElement("div",{className:gt},pt.createElement(re,null,n.map((t=>{const n=t.key,i=a.includes(n);return pt.createElement(pt.Fragment,{key:n},c(t.props,pt.createElement(re.Item,{className:`${gt}-panel-header`,onClick:function(o){var s,c;e.accordion?r(i?[]:[n]):r(i?a.filter((e=>e!==n)):[...a,n]),null===(c=(s=t.props).onClick)||void 0===c||c.call(s,o)},disabled:t.props.disabled,arrow:(()=>{let n=pt.createElement(Ge,null);return void 0!==e.arrow&&(n=e.arrow),void 0!==t.props.arrow&&(n=t.props.arrow),"function"==typeof n?n(i):pt.createElement("div",{className:l(`${gt}-arrow`,{[`${gt}-arrow-active`]:i})},n)})()},t.props.title)),pt.createElement(wt,{visible:i,forceRender:!!t.props.forceRender,destroyOnClose:!!t.props.destroyOnClose},t.props.children))})))))}),{Panel:()=>null}),bt=ue([me,fe]),yt=e=>e[4],_t=e=>e[5],jt=e=>e[0],Et=(e,t,n)=>Rt([1,0,0,1,t,n],e),Rt=(e,t)=>[e[0]*t[0]+e[2]*t[1],e[1]*t[0]+e[3]*t[1],e[0]*t[2]+e[2]*t[3],e[1]*t[2]+e[3]*t[3],e[0]*t[4]+e[2]*t[5]+e[4],e[1]*t[4]+e[3]*t[5]+e[5]],Nt=window.React,Ct=window.React.useRef,Ot="adm-image-viewer",kt=e=>{const{dragLockRef:t,maxZoom:n}=e,i=Ct(null),r=Ct(null),[{matrix:a},o]=f((()=>({matrix:[1,0,0,1,0,0],config:{tension:200}}))),s=Be(i),c=Be(r),l=Ct(!1),d=(e,t,n=!1)=>{if(!s||!c)return e;const i=-s.width/2,r=-s.height/2,a=-c.width/2,o=-c.height/2,l=jt(e),d=l*c.width,u=l*c.height,[m,f]=((e,[t,n])=>[e[0]*t+e[2]*n+e[4],e[1]*t+e[3]*n+e[5]])(e,[a,o]);if("translate"===t){let t=m,a=f;if(d>s.width){const e=i-(d-s.width),r=i;t=n?de(m,e,r):ht(m,e,r,50*l)}else t=-d/2;if(u>s.height){const e=r-(u-s.height),t=r;a=n?de(f,e,t):ht(f,e,t,50*l)}else a=-u/2;return Et(e,t-m,a-f)}if("scale"===t&&n){const[t,n]=[d>s.width?de(m,i-(d-s.width),i):-d/2,u>s.height?de(f,r-(u-s.height),r):-u/2];return Et(e,t-m,n-f)}return e};return bt({onDrag:n=>{if(n.first)return;if(n.pinching)return n.cancel();if(n.tap&&n.elapsedTime>0&&n.elapsedTime<1e3)return void e.onTap();const i=jt(a.get());if(t&&(t.current=1!==i),!l.current&&i<=1)o.start({matrix:[1,0,0,1,0,0]});else{const e=a.get(),t=[n.offset[0]-yt(e),n.offset[1]-_t(e)],i=Et(e,...n.last?[t[0]+n.velocity[0]*n.direction[0]*200,t[1]+n.velocity[1]*n.direction[1]*200]:t);o.start({matrix:d(i,"translate",n.last),immediate:!n.last})}},onPinch:i=>{var r;l.current=!i.last;const[u]=i.offset;if(u<0)return;let m;m="auto"===n?s&&c?Math.max(s.height/c.height,s.width/c.width):1:n;const f=i.last?de(u,1,m):u;if(null===(r=e.onZoomChange)||void 0===r||r.call(e,f),i.last&&f<=1)o.start({matrix:[1,0,0,1,0,0]}),t&&(t.current=!1);else{if(!s)return;const e=a.get(),n=jt(e),r=i.origin[0]-s.width/2,c=i.origin[1]-s.height/2;let l=Et(e,-r,-c);l=((e,t,n=t)=>Rt([t,0,0,n,0,0],e))(l,f/n),l=Et(l,r,c),o.start({matrix:d(l,"scale",i.last),immediate:!i.last}),t&&(t.current=!0)}}},{target:i,drag:{from:()=>[yt(a.get()),_t(a.get())],pointer:{touch:!0}},pinch:{from:()=>[jt(a.get()),0],pointer:{touch:!0}}}),Nt.createElement("div",{className:`${Ot}-slide`,onPointerMove:e=>{1!==jt(a.get())&&e.stopPropagation()}},Nt.createElement("div",{className:`${Ot}-control`,ref:i},Nt.createElement(p.div,{className:`${Ot}-image-wrapper`,style:{matrix:a}},Nt.createElement("img",{ref:r,src:e.image,draggable:!1,alt:e.image}))))},zt=window.React,Mt=window.React.forwardRef,At=window.React.useImperativeHandle,Tt=window.React.useRef,$t="adm-image-viewer",It=Mt(((e,t)=>{const n=window.innerWidth+pe(16),[{x:i},r]=f((()=>({x:e.defaultIndex*n,config:{tension:250,clamp:!0}}))),a=e.images.length;function o(t,i=!1){var o;const s=de(t,0,a-1);null===(o=e.onIndexChange)||void 0===o||o.call(e,s),r.start({x:s*n,immediate:i})}At(t,(()=>({swipeTo:o})));const s=Tt(!1),c=he((e=>{if(s.current)return;const[t]=e.offset;if(e.last){const i=Math.floor(t/n),r=i+1,a=Math.min(2e3*e.velocity[0],n)*e.direction[0];o(de(Math.round((t+a)/n),i,r))}else r.start({x:t,immediate:!0})}),{transform:([e,t])=>[-e,t],from:()=>[i.get(),0],bounds:()=>({left:0,right:(a-1)*n}),rubberband:!0,axis:"x",pointer:{touch:!0}});return zt.createElement("div",Object.assign({className:`${$t}-slides`},c()),zt.createElement(p.div,{className:`${$t}-indicator`},i.to((e=>`${de(Math.round(e/n),0,a-1)+1} / ${a}`))),zt.createElement(p.div,{className:`${$t}-slides-inner`,style:{x:i.to((e=>-e))}},e.images.map(((t,a)=>zt.createElement(kt,{key:a,image:t,onTap:e.onTap,maxZoom:e.maxZoom,onZoomChange:e=>{if(1!==e){const e=Math.round(i.get()/n);r.start({x:e*n})}},dragLockRef:s})))))})),Lt=window.React,St=window.React.forwardRef,Ft=window.React.useImperativeHandle,Dt=window.React.useRef,qt=window.React.useState,Ht=window.React.useCallback,Pt="adm-image-viewer",Wt={maxZoom:3,getContainer:null,visible:!1},Zt=e=>{var t;const n=g(Wt,e),i=Lt.createElement(w,{visible:n.visible,disableBodyScroll:!1,opacity:"thick",afterClose:n.afterClose,destroyOnClose:!0},Lt.createElement("div",{className:`${Pt}-content`},n.image&&Lt.createElement(kt,{image:n.image,onTap:()=>{var e;null===(e=n.onClose)||void 0===e||e.call(n)},maxZoom:n.maxZoom})),n.image&&Lt.createElement("div",{className:`${Pt}-footer`},null===(t=n.renderFooter)||void 0===t?void 0:t.call(n,n.image),Lt.createElement(Ue,{position:"bottom"})));return x(n.getContainer,i)},Bt=Object.assign(Object.assign({},Wt),{defaultIndex:0}),Kt=St(((e,t)=>{var n;const i=g(Bt,e),[r,a]=qt(i.defaultIndex),o=Dt(null);Ft(t,(()=>({swipeTo:(e,t)=>{var n;a(e),null===(n=o.current)||void 0===n||n.swipeTo(e,t)}})));const s=Ht((e=>{var t;a(e),null===(t=i.onIndexChange)||void 0===t||t.call(i,e)}),[i.onIndexChange]),c=Lt.createElement(w,{visible:i.visible,disableBodyScroll:!1,opacity:"thick",afterClose:i.afterClose,destroyOnClose:!0},Lt.createElement("div",{className:`${Pt}-content`},i.images&&Lt.createElement(It,{ref:o,defaultIndex:r,onIndexChange:s,images:i.images,onTap:()=>{var e;null===(e=i.onClose)||void 0===e||e.call(i)},maxZoom:i.maxZoom})),i.images&&Lt.createElement("div",{className:`${Pt}-footer`},null===(n=i.renderFooter)||void 0===n?void 0:n.call(i,i.images[r],r),Lt.createElement(Ue,{position:"bottom"})));return x(i.getContainer,c)})),Gt=window.React,Vt=new Set;function Yt(){Vt.forEach((e=>{e.close()})),Vt.clear()}const Ut=v(Kt,{show:function(e){Yt();const t=mt(Gt.createElement(Kt,Object.assign({},e,{afterClose:()=>{var n;Vt.delete(t),null===(n=e.afterClose)||void 0===n||n.call(e)}})));return Vt.add(t),t}}),Xt=v(Zt,{Multi:Ut,show:function(e){Yt();const t=mt(Gt.createElement(Zt,Object.assign({},e,{afterClose:()=>{var n;Vt.delete(t),null===(n=e.afterClose)||void 0===n||n.call(e)}})));return Vt.add(t),t},clear:Yt}),Jt=window.React.useState,Qt=window.React.useState,en=window.React.useEffect,tn=N(2),nn=C.div`
	display: flex;
	.left-title-svg {
		width: var(--font-size-m);
		height: var(--font-size-m);
		margin-right: 5px;
	}
	.left-title {
		font-size: var(--font-size-xm);
		span {
			color: var(--color-font-grey);
		}
	}
`,rn=C.div`
	.adm-collapse-panel-content {
		color: inherit;
		.adm-list-item {
			padding: 0;
			.adm-list-item-content {
				padding: 0;
				.adm-list-item-content-main {
					overflow-x: auto;
					display: flex;
				}
			}
		}
	}

	.card-wrapper {
		display: flex;
		padding: 0 ${O`10px`};

		& > *,
		.video-list-item {
			flex: none;
			margin-right: 10px;
			width: ${O`172.5px`};

			&:last-child {
				margin-right: 0;
			}
		}

		.card-more {
			width: 30px;
			display: grid;
			align-items: center;
			&-svg {
				color: var(--color-font-grey);
			}
		}
	}
`,an=window.React.useRef,on=window.React.useState,sn=({pic:e,onClick:t,isNinePatternGrid:n})=>j.jsxs(cn,{onClick:t,children:[j.jsx(D,{lazy:!0,src:`${e.img_src}@${n?"240w_240h_":""}1c.webp`,width:"100%",height:"100%"},e.img_src),q(e)&&j.jsx(dn,{className:"label",children:"长图"})]}),cn=C.div`
	position: relative;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: var(--radius);
	}

	.label {
		right: 2.5px;
		bottom: 2.5px;
	}
`,ln=({item:e,isOrigin:t})=>{var n,i;const r=z(),a=an(null),[o,s]=on(!1);if(!e)return null;const{desc:c,extra:l}=e,d=JSON.parse((null==e?void 0:e.card)??e),u=d.aid?"video":(null==(n=d.item)?void 0:n.content)?"repost":"dynamic";let m,f,h;"video"===u?(f=d.owner,m=d.dynamic):"repost"===u?(f=d.user,m=d.item.content):"dynamic"===u&&(f=d.user,m=d.item.description,h=d.item.pictures_count);const p=h>1;return j.jsx(un,{children:j.jsxs(ce,{className:t&&"origin-card",leftTitle:j.jsxs("div",{className:"dynamic-avator",children:[!t&&j.jsx("img",{src:f.face??f.head_url}),j.jsxs("div",{className:"dynamic-avator-info",children:[j.jsxs("p",{className:"nickname",onClick:()=>r(`/user/${f.mid??f.uid}`),children:[t&&j.jsx("span",{children:"@"}),f.uname??f.name]}),!t&&j.jsx("p",{className:"post_time",children:L(c.timestamp)})]})]}),rightTitle:!!(null==l?void 0:l.is_space_top)&&j.jsxs("span",{className:"pinned-label",children:[j.jsx(A,{name:"top",className:"pinned-svg"}),"置顶"]}),children:[j.jsx(le,{content:m,rows:4,direction:"end",expandText:"展开",collapseText:"收起"}),"dynamic"===u&&j.jsxs("article",{className:"pics "+(p&&"pics-9"),children:[d.item.pictures.map(((e,t)=>j.jsx(sn,{pic:e,isNinePatternGrid:p,onClick:()=>(e=>{a.current.swipeTo(e),s(!0)})(t)},e.img_src))),j.jsx(Xt.Multi,{ref:a,getContainer:()=>document.getElementById("root"),images:d.item.pictures.map((e=>e.img_src)),visible:o,onClose:()=>s(!1)})]}),"video"===u&&j.jsxs("article",{className:"video",children:[j.jsxs("div",{className:"video-pic",children:[j.jsx("img",{src:d.pic,alt:d.desc}),j.jsx(dn,{className:"duration",children:S(d.duration)}),j.jsxs(dn,{className:"danmaku",children:[j.jsx(A,{name:"danmaku",className:"svg"}),F(d.stat.danmaku)]})]}),j.jsx("p",{className:"title",children:d.title})]}),"repost"===u&&j.jsx(ln,{item:d.origin,isOrigin:!0}),!t&&j.jsxs("footer",{className:"dynamic-footer",children:[j.jsxs("div",{className:"footer-btn",children:[j.jsx(A,{name:"redo",className:"svg",style:{transform:"rotateY(180deg)"}}),j.jsx("span",{children:F(c.repost??0)})]}),j.jsxs("div",{className:"footer-btn",children:[j.jsx(A,{name:"comment",className:"svg"}),j.jsx("span",{children:F(c.comment??(null==(i=null==d?void 0:d.stat)?void 0:i.reply)??0)})]}),j.jsxs("div",{className:"footer-btn",children:[j.jsx(A,{name:"good",className:`svg ${c.is_liked&&"active"}`}),j.jsx("span",{className:`${c.is_liked&&"active"}`,children:F(c.like??0)})]})]})]})})},dn=C.p`
	display: flex;
	position: absolute;
	bottom: 5px;
	color: var(--color-background);
	font-size: var(--font-size-xs);
	font-weight: 100;
	padding: 0 2px;
	border-radius: 3px;
	background: rgba(0, 0, 0, 0.5);

	.svg {
		margin-right: 5px;
		width: var(--font-size-s);
		height: var(--font-size-s);
		color: var(--color-background);
	}
`,un=C.div`
	.origin-card {
		background: var(--color-background-grey);
		border-radius: var(--radius);
		margin: 5px 0;
	}

	.dynamic-avator {
		display: flex;

		img {
			border-radius: 50%;
			width: 40px;
			height: 40px;
			margin-right: 10px;
		}

		&-info {
			font-size: var(--font-size-xm);
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.post_time {
				font-weight: 300;
				color: var(--color-font-grey);
			}
		}
	}

	.pinned-label {
		padding: 2px 5px;
		display: flex;
		align-items: center;
		font-size: var(--font-size-xs);
		color: var(--color-main);
		font-weight: 400;
		background: var(--color-main-negative);
		border-radius: var(--radius);
		opacity: 0.75;

		.pinned-svg {
			margin-right: 5px;
			width: var(--font-size-s);
			height: var(--font-size-s);
			color: var(--color-main);
		}
	}

	.adm-ellipsis {
		margin-bottom: 10px;
		white-space: pre-wrap;
	}

	article {
		margin: 10px 0px;
		display: grid;
	}

	.pics {
		&-4 {
			grid-gap: 7px;
			grid-template-columns: repeat(2, 1fr);
			justify-items: stretch;
			align-items: stretch;
		}
		&-9 {
			grid-gap: 5px;
			grid-template-columns: repeat(3, 1fr);
			justify-items: stretch;
			align-items: stretch;
		}
	}

	.video {
		&-pic {
			position: relative;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: var(--radius);
			}
			p {
				display: flex;
				position: absolute;
				bottom: 5px;
				color: var(--color-background);
				font-size: var(--font-size-xs);
				font-weight: 100;
				padding: 0 2px;
				border-radius: 3px;
				background: rgba(0, 0, 0, 0.5);

				.svg {
					margin-right: 5px;
					width: var(--font-size-s);
					height: var(--font-size-s);
					color: var(--color-background);
				}
			}

			.danmaku {
				left: 5px;
			}

			.duration {
				right: 5px;
			}
		}
		.title {
			margin-top: 5px;
			font-size: var(--font-size-xm);
			font-weight: 500;
		}
	}

	.dynamic-footer {
		padding: 5px 0;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.footer-btn {
			display: flex;
			align-items: center;
			.svg {
				width: var(--font-size-m);
				height: var(--font-size-m);
				color: var(--color-font-grey);
			}
			.active {
				color: var(--color-main);
			}
			span {
				margin-left: 5px;
				color: var(--color-font-grey);
				font-size: var(--font-size-s);
			}
		}
	}
`,mn=window.React.useState;window.React.useEffect;const fn=C.div`
	background: var(--color-background-grey);
`,hn=window.React.useState,pn=window.React.useState,vn=window.React.useEffect,gn=window.React.useMemo,wn=[{title:"动态",name:"space",logo:"fav",Element:({uid:e})=>{var t;const n=b(y("dynamic")),i=_(),[r,a]=mn(!0);return j.jsxs(fn,{children:[null==(t=n.cards)?void 0:t.map((e=>{if(e)return j.jsx(ln,{item:e},e.desc.dynamic_id)})),j.jsx(E,{loadMore:async()=>{var t,r;try{const o=null==(t=n.cards)?void 0:t.findLast((e=>e.desc.dynamic_id===n.next_offset)),s=await Q(e,n.has_more?o.desc.dynamic_id_str:null);if(s){const e=s.data,t=(null==(r=n.cards)?void 0:r.slice())??[];e.cards=t.concat(e.cards),i(H(e)),a(!!e.has_more)}}catch(o){}},hasMore:r})]})},requireAuth:!1},{title:"视频",name:"video",logo:"fav",Element:({uid:e})=>{var t,n;const i=_(),r=b(y("videos")),a=null==r?void 0:r.page;let[o,s,c]=[0,30,0];a&&(o=a.count,s=a.ps,c=a.pn);const[l,d]=hn(c),[u,m]=hn(!o||o>s*c);return j.jsxs(j.Fragment,{children:[j.jsx(re,{children:(null==(n=null==(t=r.list)?void 0:t.vlist)?void 0:n.length)>0&&r.list.vlist.map((e=>j.jsx(re.Item,{arrow:!1,children:j.jsx(ae,{item:e})},e.aid)))}),j.jsx(E,{loadMore:async()=>{const t=await ee({mid:e,pn:l+1});i(P(t.data));const{count:n,ps:r,pn:a}=t.data.page;d(a),m(n>r*a)},hasMore:u})]})},requireAuth:!1},{title:"收藏",name:"favorite",logo:"fav",Element:({uid:e})=>{const t=k(),[n,i]=Qt(null),r=b(y("userInfo")),a=b(y("collectionList")),{data:o,finished:s,request:c}=se((()=>X(parseInt(e))),{manual:!0,deps:[e]}),l=z(),d=_();return en((()=>{var t;(!a.length||e&&e!=(null==(t=null==r?void 0:r.card)?void 0:t.mid))&&c()}),[e]),en((()=>{if(s){const e=o.data.list;d(M(e))}}),[o,s]),j.jsx(rn,{children:j.jsx(xt,{accordion:!0,onChange:e=>{e&&(async e=>{var t,n;const r=a.find((t=>t.id===e));if(null==(n=null==(t=null==r?void 0:r.content)?void 0:t.medias)?void 0:n.length)return;i(!0);const o=await J(e,5);d(I({id:e,content:o.data})),i(!1)})(parseInt(e))},children:(null==a?void 0:a.length)>0&&a.map((e=>{var i,r,a;return j.jsx(xt.Panel,{title:j.jsxs(nn,{children:[j.jsx(A,{name:"collection",className:"left-title-svg"}),j.jsxs("p",{className:"left-title",children:[e.title,j.jsxs("span",{children:[" (",e.media_count,")"]})]})]}),children:j.jsxs("div",{className:"card-wrapper",children:[n?tn:null==(r=null==(i=e.content)?void 0:i.medias)?void 0:r.slice(0,5).map((e=>j.jsx(T,{item:e},e.id))),(null==(a=e.content)?void 0:a.has_more)&&j.jsx($,{className:"card-more",onClick:n=>{n.preventDefault();let i=t.pathname;i.includes("favorite")||(i+="/favorite"),l(`${i}/${e.id}`)},children:j.jsx(A,{name:"more",className:"card-more-svg"})})]})},e.id)}))})})},requireAuth:!0},{title:"历史",name:"history",logo:"fav",Element:({uid:e})=>{var t;const[n,i]=Jt(!1),[r,a]=Jt(!0),o=b(y("historyInfo")),s=_();return j.jsxs(j.Fragment,{children:[j.jsx(re,{children:(null==(t=null==o?void 0:o.list)?void 0:t.length)>0&&o.list.map((e=>j.jsx(re.Item,{arrow:!1,children:j.jsx(ae,{item:e,isHistory:!0})},e.aid??e.kid)))}),j.jsx(E,{loadMore:async()=>{var e;const t=o.cursor,r=await U(t),{list:c,cursor:l,tabs:d}=r.data,u=(null==(e=null==o?void 0:o.list)?void 0:e.slice())??[];u.push(...c),s(R({...o,cursor:l,list:u,tabs:d})),0===l.max&&a(!1),!n&&i(!0)},hasMore:r})]})},requireAuth:!0}];function xn(){var e,t,n;const i=b(y("userInfo")),r=b(y("stat")),a=b(W("authInfo")),{userId:o,tabName:s}=Z(),c=gn((()=>o==a.mid?wn:wn.filter((e=>!e.requireAuth))),[o]),[l,d]=pn(c[0]),{data:u,finished:m,request:f}=se((()=>te(parseInt(o))),{manual:!0,deps:[o]}),{data:h,finished:p,request:v}=se((()=>ne(parseInt(o))),{manual:!0,deps:[o]}),g=_(),w=z();return vn((()=>{var e;o?o!=(null==(e=null==i?void 0:i.card)?void 0:e.mid)&&(f(),v(),g(B())):w(`/user/${a.mid}`)}),[o]),vn((()=>{m&&g(K(u.data))}),[u]),vn((()=>{p&&g(G(h.data))}),[h]),vn((()=>{if(s){const e=c.find((e=>e.name===s))??c[0];d(e)}}),[s]),i.card?j.jsxs(bn,{children:[j.jsx("section",{className:"user-background",children:j.jsx("img",{src:null==(e=null==i?void 0:i.card)?void 0:e.face,alt:""})}),j.jsxs("section",{className:"user-info",children:[j.jsx("img",{src:null==(t=i.card)?void 0:t.face,alt:"user-avator",className:"user-avator"}),j.jsxs("p",{className:"user-name",children:[j.jsx("span",{children:null==(n=i.card)?void 0:n.name}),j.jsx(A,{className:"user-level-svg",name:`user_levels-l_${i.card.level_info.current_level}`})]}),j.jsxs("p",{className:"user-mid",children:["mid: ",i.card.mid]}),j.jsxs("div",{className:"user-info-stat",children:[j.jsxs("p",{className:"user-info-stat-item",children:[j.jsx("span",{className:"num",children:r.follower}),j.jsx("span",{children:"follower"})]}),j.jsxs("p",{className:"user-info-stat-item",children:[j.jsx("span",{className:"num",children:r.following}),j.jsx("span",{children:"following"})]}),j.jsxs("p",{className:"user-info-stat-item",children:[j.jsx("span",{className:"num",children:null==r?void 0:r.whisper}),j.jsx("span",{children:"whisper"})]})]})]}),j.jsx("button",{onClick:async()=>{const e=await V();e.status&&0===e.code&&(g(Y(!1)),w("/login"))},children:"logout"}),j.jsx(ie,{activeKey:l.name,onChange:e=>{w(`/user/${i.card.mid}/${e}`)},style:{position:"sticky",top:0},children:c.map((e=>j.jsx(ie.Tab,{title:e.title,children:j.jsx(e.Element,{uid:o})},e.name)))})]}):j.jsx("h1",{children:"loading"})}const bn=C.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;

	.user-background {
		position: relative;
		width: 100%;
		height: 30vh;
		overflow: hidden;
		display: flex;
		align-items: center;

		img {
			width: 100%;
		}

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			backdrop-filter: blur(10px);
			background: rgba(0, 0, 0, 0.3);
		}
	}

	.user-info {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		padding-top: ${O`40px`};

		.user-avator {
			position: absolute;
			top: 0;
			transform: translateY(-50%);
			border-radius: 50%;
			width: ${O`80px`};
			height: ${O`80px`};
			box-shadow: var(--shadow);
		}

		& > p {
			margin: 5px;
		}

		.user-name {
			font-size: var(--font-size-l);
			font-weight: 600;
			margin-bottom: 0;
			display: flex;
			align-items: center;
			position: relative;

			.user-level-svg {
				width: 25px;
				position: absolute;
				right: 0;
				transform: translateX(105%);
			}
		}
		.user-mid {
			font-size: var(--font-size-s);
			color: var(--color-font-grey);
			background: var(--color-border);
			font-weight: 200;
			padding: 2px;
		}
		.user-info-stat {
			width: 100%;
			margin: 10px 0;
			display: flex;
			justify-content: space-around;

			.user-info-stat-item {
				display: grid;
				align-items: center;
				justify-items: center;

				span {
					margin: 2px;
				}
				.num {
					font-size: var(--font-size-m);
					font-weight: 600;
				}
			}
		}
	}

	.adm-tabs {
		width: 100%;

		.adm-tabs-header {
			position: sticky;
			top: 0;
			z-index: 10;
			background: var(--color-background);
		}
		.adm-tabs-content {
			padding: 0;
			.adm-list-body {
				border-top: none;
			}
		}
	}
`;export{xn as default};
