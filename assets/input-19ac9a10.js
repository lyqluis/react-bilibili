import{a_ as e,b9 as n,V as l,K as o,M as t,N as a,O as i,aZ as r,av as c}from"./index-87bdad0d.js";import{b as u}from"./bound-6644a254.js";const s=window.React;function d(e){return s.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink"},e,{style:Object.assign({verticalAlign:"-0.125em"},e.style),className:["antd-mobile-icon",e.className].filter(Boolean).join(" ")}),s.createElement("g",{id:"CloseCircleFill-CloseCircleFill",stroke:"none",strokeWidth:1,fill:"none",fillRule:"evenodd"},s.createElement("g",{id:"CloseCircleFill-编组"},s.createElement("rect",{id:"CloseCircleFill-矩形",fill:"#FFFFFF",opacity:0,x:0,y:0,width:48,height:48}),s.createElement("path",{d:"M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M18.6753876,16 L15.5637812,16 C15.4576916,16 15.3559474,16.0421451 15.2809323,16.1171635 C15.124726,16.2733766 15.1247316,16.5266426 15.2809447,16.6828489 L15.2809447,16.6828489 L22.299066,23.7006641 L14.6828159,31.3171619 C14.6078042,31.3921761 14.5656632,31.4939157 14.5656632,31.6 C14.5656632,31.8209139 14.7447493,32 14.9656632,32 L14.9656632,32 L18.0753284,32 C18.1814068,32 18.2831412,31.9578638 18.3581544,31.8828594 L18.3581544,31.8828594 L24.420066,25.8216641 L30.4818451,31.8828564 C30.5568585,31.9578626 30.6585942,32 30.7646741,32 L30.7646741,32 L33.8763476,32 C33.9824309,32 34.0841695,31.9578599 34.1591835,31.8828496 C34.315397,31.7266436 34.3154031,31.4733776 34.1591972,31.3171641 L34.1591972,31.3171641 L26.542066,23.6996641 L33.5591874,16.6828489 C33.6342057,16.6078338 33.6763508,16.5060896 33.6763508,16.4 C33.6763508,16.1790861 33.4972647,16 33.2763508,16 L33.2763508,16 L30.1637654,16 C30.0576705,16 29.9559218,16.0421493 29.8809058,16.1171741 L29.8809058,16.1171741 L24.420066,21.5786641 L18.9582218,16.1171488 C18.883208,16.0421394 18.7814701,16 18.6753876,16 L18.6753876,16 Z",id:"CloseCircleFill-形状结合",fill:"currentColor",fillRule:"nonzero"}))))}const m=window.React,p=window.React.forwardRef,C=window.React.useImperativeHandle,v=window.React.useRef,w=window.React.useState,f="adm-button",h={color:"default",fill:"solid",block:!1,loading:!1,loadingIcon:m.createElement(n,{color:"currentColor"}),type:"button",shape:"default",size:"middle"},g=p(((e,n)=>{const i=l(h,e),[r,c]=w(!1),u=v(null),s="auto"===i.loading?r:i.loading,d=i.disabled||s;C(n,(()=>({get nativeElement(){return u.current}})));return o(i,m.createElement("button",{ref:u,type:i.type,onClick:e=>a(void 0,void 0,void 0,(function*(){if(!i.onClick)return;const n=i.onClick(e);if((l=n)&&"object"==typeof l&&"function"==typeof l.then)try{c(!0),yield n,c(!1)}catch(o){throw c(!1),o}var l})),className:t(f,i.color?`${f}-${i.color}`:null,{[`${f}-block`]:i.block,[`${f}-disabled`]:d,[`${f}-fill-outline`]:"outline"===i.fill,[`${f}-fill-none`]:"none"===i.fill,[`${f}-mini`]:"mini"===i.size,[`${f}-small`]:"small"===i.size,[`${f}-large`]:"large"===i.size,[`${f}-loading`]:s},`${f}-shape-${i.shape}`),disabled:d,onMouseDown:i.onMouseDown,onMouseUp:i.onMouseUp,onTouchStart:i.onTouchStart,onTouchEnd:i.onTouchEnd},s?m.createElement("div",{className:`${f}-loading-wrapper`},i.loadingIcon,i.loadingText):m.createElement("span",null,i.children)))})),b=window.React,y=window.React.useState,L=window.React.forwardRef,E=window.React.useImperativeHandle,F=window.React.useRef,R="adm-input",$={defaultValue:"",onlyShowClearWhenFocus:!0},k=L(((n,a)=>{const s=l($,n),[m,p]=i(s),[C,v]=y(!1),w=F(!1),f=F(null),{locale:h}=r();E(a,(()=>({clear:()=>{p("")},focus:()=>{var e;null===(e=f.current)||void 0===e||e.focus()},blur:()=>{var e;null===(e=f.current)||void 0===e||e.blur()},get nativeElement(){return f.current}})));c((()=>{var e;if(s.enterKeyHint)return null===(e=f.current)||void 0===e||e.setAttribute("enterkeyhint",s.enterKeyHint),()=>{var e;null===(e=f.current)||void 0===e||e.removeAttribute("enterkeyhint")}}),[s.enterKeyHint]);const g=!(!s.clearable||!m||s.readOnly)&&(!s.onlyShowClearWhenFocus||C);return o(s,b.createElement("div",{className:t(`${R}`,s.disabled&&`${R}-disabled`)},b.createElement("input",{ref:f,className:`${R}-element`,value:m,onChange:e=>{p(e.target.value)},onFocus:e=>{var n;v(!0),null===(n=s.onFocus)||void 0===n||n.call(s,e)},onBlur:e=>{var n;v(!1),function(){let e=m;"number"===s.type&&(e=e&&u(parseFloat(e),s.min,s.max).toString()),e!==m&&p(e)}(),null===(n=s.onBlur)||void 0===n||n.call(s,e)},id:s.id,placeholder:s.placeholder,disabled:s.disabled,readOnly:s.readOnly,maxLength:s.maxLength,minLength:s.minLength,max:s.max,min:s.min,autoComplete:s.autoComplete,autoFocus:s.autoFocus,pattern:s.pattern,inputMode:s.inputMode,type:s.type,name:s.name,autoCapitalize:s.autoCapitalize,autoCorrect:s.autoCorrect,onKeyDown:e=>{var n;!s.onEnterPress||"Enter"!==e.code&&13!==e.keyCode||s.onEnterPress(e),null===(n=s.onKeyDown)||void 0===n||n.call(s,e)},onKeyUp:s.onKeyUp,onCompositionStart:e=>{var n;w.current=!0,null===(n=s.onCompositionStart)||void 0===n||n.call(s,e)},onCompositionEnd:e=>{var n;w.current=!1,null===(n=s.onCompositionEnd)||void 0===n||n.call(s,e)},onClick:s.onClick,step:s.step,role:s.role,"aria-valuenow":s["aria-valuenow"],"aria-valuemax":s["aria-valuemax"],"aria-valuemin":s["aria-valuemin"],"aria-label":s["aria-label"]}),g&&b.createElement("div",{className:`${R}-clear`,onMouseDown:e=>{e.preventDefault()},onClick:()=>{var n,l;p(""),null===(n=s.onClear)||void 0===n||n.call(s),e&&/ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())&&w.current&&(w.current=!1,null===(l=f.current)||void 0===l||l.blur())},"aria-label":h.Input.clear},b.createElement(d,null))))}));export{g as B,k as I};