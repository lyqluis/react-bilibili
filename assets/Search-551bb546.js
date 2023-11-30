import{a as s,j as e,S as a,s as t,L as i,u as r,b as n,c as o,d as l,e as c,f as d,I as h,g as m,r as u,h as g,i as p,k as f,l as j,p as x,m as w}from"./index-c769d5fd.js";import{S as y,a as k,b as v}from"./SearchHistory-d5ec7810.js";import{S}from"./Section-c9ec87ab.js";import{L as C}from"./index-9f127002.js";import{L as N}from"./ListCard-f6049623.js";import{u as b}from"./useRequest-e96b32f6.js";import"./input-a2f64204.js";import"./bound-6644a254.js";const z=()=>s({method:"get",url:"/hotsearchkeyword"}).catch((s=>{})),R=()=>s({method:"get",url:"/searchplaceholder"}).catch((s=>{}));function L({list:s=[],onSelect:t,loading:i}){if(i){const s=new Array(10).fill(null).map(((s,t)=>e.jsx(a,{animated:!0,className:"skeleton"},t)));return e.jsx(I,{className:"hot-search-list",children:s})}return e.jsx(I,{className:"hot-search-list",children:s.map((s=>e.jsxs("p",{className:"ellipsis-line-1",onClick:()=>t(s.keyword),children:[e.jsx("span",{className:"num",children:s.id}),e.jsx("span",{className:"word ellipsis-line-1",children:s.keyword}),e.jsx("i",{children:s.icon&&e.jsx("img",{src:s.icon,alt:s.keyword})})]},s.id)))})}const I=t.div`
	&.hot-search-list {
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 5px 10px;
		justify-items: stretch;
		align-items: start;

		p {
			width: 100%;
			font-size: var(--font-size-xm);
			overflow: hidden;
			position: relative;
			display: grid;
			grid-template-columns: auto 1fr auto;

			.num {
				margin-right: 5px;
				font-style: italic;
				font-weight: 600;
			}
			i {
				display: grid;
				justify-items: center;
				align-items: center;
				margin-left: 3px;
				img {
					height: var(--font-size-xm);
				}
			}
		}

		.skeleton {
			--height: var(--font-size-xm);
		}
	}
`;function T({list:s=[],loading:a,onClick:t}){const r=new Array(20).fill(null).map(((s,a)=>e.jsx(C.Item,{children:e.jsx(i,{})},a)));return a?e.jsx(C,{children:r}):e.jsx(C,{children:s.length>0&&s.map((s=>e.jsx(C.Item,{arrow:!1,onClick:t,children:e.jsx(N,{item:s})},s.aid)))})}const A=window.React.useState,F=window.React.useEffect,q=window.React.useRef;function B(){const a=q(null),[t,i]=A(!1),x=r(n("placeholder")),C=r(n("hotSearches")),N=r(n("keyword")),I=r(n("isFocused")),B=r(n("suggestions")),E=r(n("searchData")),H=r(n("historyKeywords")),K=o(),[$,_]=l(),G=!N&&!$.has("keyword"),J=N&&I&&B.length>0,M=N&&!I,O=async(e=N)=>{if(!e)return;const a=await(e=>s({method:"get",url:"/searchsuggest",params:{keyword:e}}).catch((s=>{})))(e),t=a.result.tag;K(w(t))},P=async e=>{e=""===e?x:e,K(g(!1)),N!==e&&K(p(e)),$.get("keyword")!==e&&_({keyword:e}),K(f(e)),i(!0);const a=await(e=>s({method:"get",url:"/search",params:{keyword:e}}).catch((s=>{})))(e).then((s=>(i(!1),s))),t=((s,e="video")=>s.result.find((s=>s.result_type===e)).data)(a.data);K(j(t))},{data:Q,loading:U,finished:V}=b(z);F((()=>{V&&K(c(Q.list))}),[V]);const{data:W,finished:X}=b(R);return F((()=>{X&&K(d(W.data.name))}),[X]),F((()=>{if($.has("keyword")){const s=$.get("keyword");s&&P(s)}}),[]),e.jsxs(D,{children:[e.jsx("div",{className:"search-wrapper",children:e.jsx(y,{showCancelButton:!0,ref:a,value:N,placeholder:x,onSearch:P,onChange:async s=>{K(p(s)),O(s)},onFocus:()=>(async()=>{O(),K(g(!0))})(),onClear:()=>{var s;return null==(s=a.current)?void 0:s.focus()},onCancel:async()=>{K(g(!1)),_({})}})}),J&&e.jsx(k,{list:B,onSelect:P}),M&&e.jsx(T,{list:E,loading:t}),G&&e.jsx(S,{leftTitle:"热搜",children:e.jsx(L,{loading:U,list:C,onSelect:P})}),G&&e.jsx(S,{leftTitle:"历史搜索",rightTitle:e.jsx(h,{name:"delete",className:"section-title-svg",onClick:()=>K(m())}),children:e.jsx(v,{words:H,onClick:P,onRemove:s=>K(u(s))})})]})}const D=t.div`
	background: var(--color-background-grey);

	.search-wrapper {
		background: var(--color-background);
		padding: ${x`10px`};
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.section-title-svg {
		width: var(--font-size-m);
		height: var(--font-size-m);
	}
`;export{B as default};
