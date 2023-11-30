import{V as e,O as n,K as t,au as i,M as a,U as r,s,a5 as l,c,j as o,x as d,b7 as m,q as h,u,n as p,aR as x,p as g,b8 as f}from"./index-b58dd535.js";import{H as v}from"./Header-cee3ca8b.js";import{S as j}from"./Section-b6a3a8d2.js";import{L as b}from"./index-dc19943f.js";import{S as w}from"./stepper-52d646d4.js";import"./input-414b791f.js";import"./bound-6644a254.js";const C=(0,window.React.createContext)(null),k=window.React,N={disabled:!1,defaultValue:[]},R=window.React,z=(0,window.React.memo)((e=>t(e,R.createElement("svg",{viewBox:"0 0 40 40"},R.createElement("path",{d:"M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",fill:"currentColor"}))))),E=window.React,L=(0,window.React.memo)((e=>t(e,E.createElement("svg",{viewBox:"0 0 40 40"},E.createElement("path",{d:"M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",fill:"currentColor"}))))),y=window.React,S=window.React.useEffect,$=window.React.useRef,I=e=>{const n=$(null),t=i((n=>{n.stopPropagation(),n.stopImmediatePropagation();const t=n.target.checked;t!==e.checked&&e.onChange(t)}));return S((()=>{if(e.disabled)return;if(!n.current)return;const i=n.current;return i.addEventListener("click",t),()=>{i.removeEventListener("click",t)}}),[e.disabled,e.onChange]),y.createElement("input",{ref:n,type:e.type,checked:e.checked,onChange:()=>{},disabled:e.disabled,id:e.id})},V=window.React,M=window.React.forwardRef,G=window.React.useContext,H=window.React.useImperativeHandle,O="adm-checkbox",P={defaultChecked:!1,indeterminate:!1},T=r(M(((i,r)=>{const s=G(C),l=e(P,i);let[c,o]=n({value:l.checked,defaultValue:l.defaultChecked,onChange:l.onChange}),d=l.disabled;const{value:m}=l;s&&void 0!==m&&(c=s.value.includes(m),o=e=>{var n;e?s.check(m):s.uncheck(m),null===(n=l.onChange)||void 0===n||n.call(l,e)},d=d||s.disabled),H(r,(()=>({check:()=>{o(!0)},uncheck:()=>{o(!1)},toggle:()=>{o(!c)}})));return t(l,V.createElement("label",{className:a(O,{[`${O}-checked`]:c&&!l.indeterminate,[`${O}-indeterminate`]:l.indeterminate,[`${O}-disabled`]:d,[`${O}-block`]:l.block})},V.createElement(I,{type:"checkbox",checked:c,onChange:o,disabled:d,id:l.id}),l.icon?V.createElement("div",{className:`${O}-custom-icon`},l.icon(c,l.indeterminate)):V.createElement("div",{className:`${O}-icon`},l.indeterminate?V.createElement(L,null):c&&V.createElement(z,null)),l.children&&V.createElement("div",{className:`${O}-content`},l.children)))})),{Group:t=>{const i=e(N,t),[a,r]=n(i);return k.createElement(C.Provider,{value:{value:a,disabled:i.disabled,check:e=>{r([...a,e])},uncheck:e=>{r(a.filter((n=>n!==e)))}}},i.children)}});window.React.useState;const B=({item:e})=>{const n=null==e?void 0:e.productInfo,t=null==n?void 0:n.advState,i=t&&l(t.presaleEndOrderTime,{connector:".",needTime:!1,needYear:!0,needToday:!1}),a=c();return o.jsxs(Z,{children:[o.jsx(T,{value:e}),o.jsxs("div",{className:"item-right",children:[o.jsx("div",{className:"item-right-img",children:o.jsx(d,{src:e.img,alt:""})}),o.jsxs("div",{className:"item-right-detail",children:[o.jsx("div",{className:"item-name",children:n.name}),o.jsx("div",{className:"item-standard",children:o.jsxs("span",{children:[n.itemsSkuListVO.specs[0],": ",e.specValues[0]]})}),o.jsxs("div",{className:"item-price-num",children:[o.jsxs("div",{className:"price",children:[o.jsx("p",{children:t?`定金截止：${i}`:""}),o.jsx("p",{className:"price-total",children:t?`全款：¥${e.price}`:""}),o.jsxs("p",{className:"",children:[t?"定金：":"","¥",o.jsx("span",{className:"price-num",children:t?e.deposit:e.price})]})]}),o.jsxs("div",{className:"count",children:[o.jsx("p",{children:n.restriction&&o.jsxs("span",{className:"extra-info",children:["限购",n.restriction,"件"]})}),o.jsx(w,{defaultValue:e.number,min:1,max:Math.min(null==n?void 0:n.restriction,null==e?void 0:e.stock),onChange:n=>(n=>{a(m({...e,number:n}))})(n)})]})]})]})]})]})},Z=s.div`
	display: flex;
	.item-right {
		display: flex;
		&-img {
			flex: none;
			margin-right: 5px;
			width: 84px;
			height: 84px;
		}
		&-detail {
			.item-name {
				font-weight: 400;
			}
			.item-standard {
				margin: 3px 0;
				font-size: var(--font-size-xs);
				span {
					padding: 2px 3px;
					background: var(--color-border);
					border-radius: var(--radius);
				}
			}
			.item-price-num {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				.price {
					flex: none;
					color: var(--color-main-4);
					font-size: var(--font-size-xxs);
					font-weight: 500;
					&-total {
						color: var(--color-font);
						font-weight: 400;
					}
					&-num {
						font-size: var(--font-size-m);
						font-weight: 500;
					}
				}
				.count {
					margin-left: 5px;
					font-size: var(--font-size-xxs);
					text-align: right;
					.extra-info {
						color: var(--color-main-4);
						font-size: var(--font-size-xxs);
						font-weight: 500;
					}
					.adm-stepper {
						--input-width: 10vw;
					}
				}
			}
		}
	}
`,q=window.React.useMemo,A=window.React.useState,K=()=>{const e=h(),n=c(),t=u(p("cart")),{preSaleCart:i,saleCart:a}=q((()=>({preSaleCart:t.filter((e=>{var n,t;return null==(t=null==(n=null==e?void 0:e.productInfo)?void 0:n.advState)?void 0:t.preSale})),saleCart:t.filter((e=>{var n,t;return!(null==(t=null==(n=null==e?void 0:e.productInfo)?void 0:n.advState)?void 0:t.preSale)}))})),[t]),[r,s]=A(!1),[l,d]=A([]),[m,g]=A([]),w=q((()=>{const e=!!m.length;return(r?[...m,...l]:e?m:l).reduce(((n,t)=>(n.count+=t.number,n.price+=t.number*(e?t.deposit:t.price),n)),{count:0,price:0})}),[l,m,r]);return o.jsx(x,{header:o.jsx(v,{title:`购物车(${t.length})`,onClickLeft:()=>e(-1),right:r?"完成":"管理",onClickRight:()=>s(!r)}),children:o.jsxs(U,{children:[a.length>0&&o.jsxs(j,{children:[o.jsx(T,{disabled:!r&&m.length>0,indeterminate:l.length>0&&l.length<a.length,checked:l.length===a.length,onChange:e=>{d(e?a:[])},children:"国内到货"}),o.jsx(T.Group,{disabled:!r&&m.length>0,value:l,onChange:e=>d(e),children:o.jsx(b,{children:a.map((e=>o.jsx(b.Item,{children:o.jsx(B,{item:e})},e.id)))})})]}),i.length>0&&o.jsxs(j,{children:[o.jsx(T,{disabled:!r&&l.length>0,indeterminate:m.length>0&&m.length<i.length,checked:m.length===i.length,onChange:e=>{g(e?i:[])},children:"预售区"}),o.jsx(T.Group,{disabled:!r&&l.length>0,value:m,onChange:e=>g(e),children:o.jsx(b,{children:i.map((e=>o.jsx(b.Item,{children:o.jsx(B,{item:e})},e.id)))})})]}),o.jsxs("footer",{children:[o.jsx(T,{onChange:e=>{e?r?(d(a),g(i)):a.length?d(a):i.length&&g(i):(d([]),g([]))},children:"全选"}),o.jsxs("div",{className:"footer-right",children:[!r&&o.jsxs("p",{className:"total-price",children:["合计：¥ ",o.jsx("span",{className:"total-price-num",children:w.price})]}),o.jsxs("button",{className:"buy-btn",onClick:()=>{if(r){const e=[...l,...m],i=t.filter((n=>e.some((e=>e.id!=n.id))));n(f(i))}},children:[r?"删除":"结算"," (",w.count,")"]})]})]})]})})},U=s.div`
	background: var(--color-border);
	padding-bottom: 62px;

	.adm-list-item-content {
		padding-right: 0;
	}
	footer {
		position: fixed;
		bottom: ${g`70px`};
		left: 0;
		right: 0;
		background: var(--color-background);
		box-shadow: var(--shadow);
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.footer-right {
			display: flex;
			align-items: center;
			.total-price {
				margin-right: 10px;
				color: var(--color-main-4);
				font-size: var(--font-size-m);
				&-num {
					font-size: var(--font-size-l);
				}
			}
			.buy-btn {
				flex-grow: 1;
				padding: 10px;
				font-size: var(--font-size-m);
				border-radius: 30px;
				outline: 0;
				border: 0;
				background: var(--color-main);
				color: var(--color-background);
			}
		}
	}
`;export{K as default};
