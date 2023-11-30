import{M as e,V as t,K as i,aw as s,U as a,s as r,j as n,I as l,p as o,u as c,n as d,c as m,aS as p,aT as u,aA as x,t as v,a0 as f,q as h,d as g,aU as b,aV as j,aW as w,aR as y,z as k}from"./index-5222d580.js";import{f as N,a as z,d as C,g as R}from"./mallHelper-1dc680bd.js";import{b as I,c as S,d as T}from"./mall-e3abfd69.js";import{P as E,S as F,a as $,W as L}from"./ShopSearch-656707d8.js";import{c as O}from"./convert-px-4695110a.js";import{t as M}from"./traverse-react-node-9ab3e654.js";import{L as K}from"./index-fc3d5f27.js";import{S as A}from"./SearchHistory-3a2ab7d8.js";import{H as P}from"./Header-f1bbdbbf.js";import"./Section-cfccf90d.js";import"./input-b261d64e.js";import"./bound-6644a254.js";const Q=()=>null,H=window.React,B=window.React.useState,U="adm-index-bar",V=t=>{const[i,s]=B(!1);return H.createElement("div",{className:e(`${U}-sidebar`,{[`${U}-sidebar-interacting`]:i}),onMouseDown:()=>{s(!0)},onMouseUp:()=>{s(!1)},onTouchStart:()=>{s(!0)},onTouchEnd:()=>{s(!1)},onTouchMove:e=>{if(!i)return;const{clientX:s,clientY:a}=e.touches[0],r=document.elementFromPoint(s,a);if(!r)return;const n=r.dataset.index;n&&t.onActive(n)}},t.indexItems.map((({index:s,brief:a})=>{const r=s===t.activeIndex;return H.createElement("div",{className:`${U}-sidebar-row`,onMouseDown:()=>{t.onActive(s)},onTouchStart:()=>{t.onActive(s)},onMouseEnter:()=>{i&&t.onActive(s)},"data-index":s,key:s},i&&r&&H.createElement("div",{className:`${U}-sidebar-bubble`},a),H.createElement("div",{className:e(`${U}-sidebar-item`,{[`${U}-sidebar-item-active`]:r}),"data-index":s},H.createElement("div",null,a)))})))},X=window.React,q=window.React.forwardRef,D=window.React.useRef,W=window.React.useState,_=window.React.useImperativeHandle,Y="adm-index-bar",G={sticky:!0},J=a(q(((a,r)=>{const n=t(G,a),l=O(35),o=D(null),c=[],d=[];M(n.children,(e=>{var t;X.isValidElement(e)&&e.type===Q&&(c.push({index:e.props.index,brief:null!==(t=e.props.brief)&&void 0!==t?t:e.props.index.charAt(0)}),d.push(i(e.props,X.createElement("div",{key:e.props.index,"data-index":e.props.index,className:`${Y}-anchor`},X.createElement("div",{className:`${Y}-anchor-title`},e.props.title||e.props.index),e.props.children))))}));const[m,p]=W((()=>{const e=c[0];return e?e.index:null}));function u(e){var t;const i=o.current;if(!i)return;const s=i.children;for(let a=0;a<s.length;a++){const r=s.item(a);if(!r)continue;if(r.dataset.index===e)return i.scrollTop=r.offsetTop,p(e),void(m!==e&&(null===(t=n.onIndexChange)||void 0===t||t.call(n,e)))}}_(r,(()=>({scrollTo:u})));const{run:x}=s((()=>{var e;const t=o.current;if(!t)return;const i=t.scrollTop,s=t.getElementsByClassName(`${Y}-anchor`);for(let a=0;a<s.length;a++){const t=s.item(a);if(!t)continue;const r=t.dataset.index;if(r&&t.offsetTop+t.clientHeight-l>i)return p(r),void(m!==r&&(null===(e=n.onIndexChange)||void 0===e||e.call(n,r)))}}),{wait:50,trailing:!0,leading:!0});return i(n,X.createElement("div",{className:e(`${Y}`,{[`${Y}-sticky`]:n.sticky})},X.createElement(V,{indexItems:c,activeIndex:m,onActive:e=>{u(e)}}),X.createElement("div",{className:`${Y}-body`,ref:o,onScroll:x},d)))})),{Panel:Q}),Z=window.React.useState,ee=window.React.useEffect,te=({value:e="",type:t="text",placeholder:i,className:s,activeClassName:a,onChange:r,onFinished:l,...o})=>{const[c,d]=Z(e),[m,p]=Z(!1),[u,x]=Z(i);return ee((()=>{d(e),x(i)}),[e,i]),ee((()=>{c&&p(!0),x(m&&!c?"":i)}),[m,c]),n.jsx("input",{className:`${s} ${m?a:""}`,type:"text",placeholder:u,value:c,onFocus:()=>p(!0),onBlur:()=>{c||p(!1),l&&l(c)},onInput:e=>{const i=((e,t)=>"number"===t?e.match(/(\d*)/)[1]??"":e)(e.target.value,t);d(i),r&&r(i)},...o})},ie=({priceCeil:e,priceFlow:t,onChange:i})=>{const[s,a]=Z([t,e]),r=(e,t)=>{let r;r=t?[s[0],e]:[e,s[1]],a(r),i&&i(r)};return ee((()=>{a([t,e])}),[e,t]),n.jsxs(se,{children:[n.jsx(te,{type:"number",placeholder:"最低价",value:s[0],className:"input",activeClassName:"input-active",onFinished:e=>r(e,0)}),"-",n.jsx(te,{type:"number",placeholder:"最高价",value:s[1],className:"input",activeClassName:"input-active",onFinished:e=>r(e,1)})]})},se=r.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: var(--font-size-s);
	.input {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: var(--font-size-s);
		padding: 10px;
		line-height: var(--font-size-s);
		border: none;
		border-radius: var(--radius);
		background: var(--color-border);
	}
	.input-active {
		background: var(--color-background);
		border-radius: var(--radius);
		outline: var(--color-main-4) solid 1px;
		color: var(--color-main-4);
	}
`,ae=window.React.useState,re=window.React.useEffect,ne=({item:e,onClick:t,isSelected:i})=>{const[s,a]=ae(!1);return re((()=>{a(i)}),[i]),n.jsxs(le,{className:s?"selected":"",onClick:()=>{const i=!s;a(i),t&&t(i,{...e,cancel:()=>a(!1)})},children:[e.name,s&&n.jsx(l,{name:"correct",className:"selected-svg"})]})},le=r.p`
	padding-right: 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	&.selected {
		color: var(--color-main-4);
		.selected-svg {
			color: var(--color-main-4);
			width: var(--font-size-xl);
			height: var(--font-size-xl);
		}
	}
`,oe=({list:e=[],select:t,selectedList:i=[]})=>e.length?n.jsx(J,{children:null==e?void 0:e.map((e=>n.jsx(J.Panel,{index:"hotFilter"===e[0]?"热门":e[0],title:"hotFilter"===e[0]?"热门":e[0],children:n.jsx(K,{children:e[1].map((e=>n.jsx(K.Item,{children:n.jsx(ne,{item:e,onClick:t,isSelected:i.some((t=>e.id===t.id))})},e.id)))})},e[0])))}):n.jsx("p",{children:"loading"}),ce=({visible:e,list:t=[],filterType:i,close:s,confirm:a,selectedList:r=[]})=>{const[o,c]=ae(r),d=()=>{o.forEach((e=>e.cancel&&e.cancel())),c([])};return re((()=>{c(r)}),[r]),n.jsxs(de,{className:e?"open":"",children:[n.jsxs("header",{children:[n.jsx(l,{name:"back",className:"header-svg",onClick:s}),n.jsxs("p",{className:"title",children:["全部",null==i?void 0:i.title]})]}),n.jsx(oe,{list:t,select:(e,t)=>{c(e?[...o,t]:o.filter((e=>e.id!==t.id)))},selectedList:o}),n.jsxs("div",{className:"bottom-bar",children:[n.jsx("button",{className:"bottom-bar-btn border-btn",onClick:d,children:"重置"}),n.jsx("button",{className:"bottom-bar-btn solid-btn",onClick:()=>{a(o),s(),d()},children:"确定"})]})]})},de=r.div`
	position: absolute;
	display: grid;
	grid-template-rows: auto 1fr auto;
	width: 100%;
	top: 0;
	bottom: 0;
	background: var(--color-background);
	transform: translateX(100%);
	transition: transform var(--duration) ease-in-out;
	&.open {
		transform: translateX(0);
	}

	header {
		position: relative;
		padding: 10px;
		display: flex;
		align-items: center;
		font-size: var(--font-size-m);
		background: var(--color-background);
		.header-svg {
			position: absolute;
			width: var(--font-size-m);
			height: var(--font-size-m);
			left: 10px;
		}
		.title {
			margin: 0 auto;
		}
	}

	.bottom-bar {
		z-index: 1000;
	}
`,me=window.React.useState,pe=window.React.useEffect,ue=({filter:e,onClick:t,isSelected:i})=>n.jsx(xe,{className:i?"selected":"",onClick:s=>{t&&t(!i,e)},children:e.name}),xe=r.div`
	padding: 0 10px;
	font-size: var(--font-size-s);
	font-weight: 300;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: ${o`40px`};
	background: var(--color-border);
	border-radius: var(--radius);

	&.selected {
		background: var(--color-main-4);
		color: var(--color-background);
	}
`,ve={type:"item",keyword:"",filters:{},priceFlow:"",priceCeil:"",sortType:"",sortOrder:"",state:"",scene:"",termQueries:[],rangeQueries:[]},fe=({filter:e,list:t=[],visible:i,close:s,confirm:a,...r})=>{var o;const[x,v]=me([]),[f,h]=me(""),[g,b]=me(!1),j=c(d("allFilterList")),[w,y]=me([]),[k,C]=me(null),[R,T]=me(1e4),E=m(),F=(e,t)=>{v(e?[...x,t]:x.filter((e=>e.id!==t.id)))};return pe((()=>{const t=Object.entries(e.filters);v(t.map((([e,t])=>({parentKey:parseInt(e),id:t[0]}))));const i=N(e,ve);C(i)}),[e]),pe((()=>{C((e=>{var t;const i={};x.map((({parentKey:e,id:t})=>{const s=e.toString();i[s]||(i[s]=[]),i[s].push(t)}));const s=(null==(t=null==e?void 0:e.termQueries)?void 0:t.filter((e=>"category"===e.field)))??[];Object.keys(i).map((e=>s.push({field:e,values:i[e]})));const a={};if(w.length){const[e,t]=w;a.priceFlow=e??"",a.priceCeil=t??"",a.rangeQueries=[{field:"price",gte:e,lte:t}]}return{...e,filters:i,termQueries:s,...a}}))}),[x,w]),pe((()=>{i&&(async e=>{const t=await S(e);T(t.data)})(k)}),[k,i]),n.jsx(p,{visible:i,...r,children:n.jsxs(he,{children:[n.jsxs("ul",{className:"search-filters",children:[n.jsxs("li",{className:"filter",children:[n.jsx("section",{className:"title",children:"价格区间"}),n.jsx(ie,{onChange:y})]}),t.map((e=>n.jsxs("li",{className:"filter",children:[n.jsxs("section",{className:"title",children:[e.title,e.total>e.filterList.length&&n.jsxs("div",{className:"right",onClick:()=>(async e=>{if(b(!0),h(e),!j[e.key]){const t=await I({...e,filterType:e.key}),i=z(t.data);E(u({...j,[e.key]:i}))}})(e),children:["全部",n.jsx(l,{name:"more",className:"right-svg"})]})]}),n.jsx("ul",{className:"content",children:e.filterList.map((e=>n.jsx(ue,{filter:e,onClick:F,isSelected:x.some((t=>e.parentKey===t.parentKey&&e.id===t.id))},e.id)))})]},e.key)))]}),n.jsxs("div",{className:"bottom-bar",children:[n.jsx("button",{className:"bottom-bar-btn border-btn",onClick:()=>v([]),children:"重置"}),n.jsxs("button",{className:"bottom-bar-btn solid-btn",onClick:()=>{s(),a({...e,...k})},children:["确定",n.jsxs("span",{className:"counts",children:[" (",R,"件商品)"]})]})]}),n.jsx(ce,{visible:g,close:()=>b(!1),list:null==(o=j[f.key])?void 0:o.filterList,filterType:f,confirm:e=>{const t=x.filter((e=>e.parentKey!==f.key));v([...t,...e])},selectedList:x.filter((e=>e.parentKey===f.key))})]})})},he=r.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;

	ul.search-filters {
		flex: 1 1 auto;
		overflow: auto;
		padding-bottom: 10px;
		li.filter {
			margin: 20px 10px 0 10px;
			.title {
				display: flex;
				justify-content: space-between;
				font-size: var(--font-size-xm);
				margin-bottom: 10px;
				.right {
					display: flex;
					color: var(--color-font-grey);
					&-svg {
						color: var(--color-font-grey);
						width: var(--font-size-m);
						height: var(--font-size-m);
					}
				}
			}
			.content {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-gap: 10px;
			}
		}
	}

	.bottom-bar {
		width: 100%;
		background: var(--color-background);
		display: flex;
		justify-content: space-around;
		padding: 10px;
		box-shadow: var(--shadow);
		&-btn {
			width: 48%;
			border-radius: 20px;
			font-size: var(--font-size-xm);
			padding: 10px 5px;
			font-weight: 400;
			border: none;
			.counts {
				font-size: var(--font-size-s);
			}
			&.border-btn {
				background: var(--color-background);
				color: var(--color-main-4);
				border: 1px solid var(--color-main-4);
			}
			&.solid-btn {
				color: var(--color-background);
				background: var(--color-main-4);
			}
		}
	}
`,ge=window.React.useState,be=window.React.useRef,je=window.React.forwardRef,we=[{name:"totalrank",title:"综合"},{name:"sale",title:"销量"},{name:"pubtime",title:"新品"},{name:"price",title:"价格"}],ye=[{name:"all",title:"全部商品",value:null},{name:"single",title:"单品",value:"0,2,3,5,6,7"},{name:"blind",title:"盲盒",value:"4"}],ke=je((({filter:e,setFilter:t,searchFilter:i=[],style:s},a)=>{const[r,o]=ge(!1),[c,d]=ge(we[0]),[m,p]=ge(ye[0]),u=be(null),f=be(null);return n.jsxs(Ne,{ref:a,style:s,className:"line-bottom-1px",children:[n.jsx("div",{className:"sorter "+(0===we.findIndex((t=>t.name===(null==e?void 0:e.sortType)))||1===we.findIndex((t=>t.name===(null==e?void 0:e.sortType)))?"active":""),onClick:()=>{t({...e,sortType:c.name,sortOrder:""})},children:n.jsx(x,{ref:u,children:n.jsx(x.Item,{title:c.title,children:n.jsx(ze,{children:we.slice(0,2).map((i=>n.jsxs("li",{className:c.name===i.name?"active":"",onClick:()=>{i.name!==c.name&&t({...e,sortType:i.name,sortOrder:""}),d(i),u.current.close()},children:[i.title,c.name===i.name&&n.jsx(l,{name:"correct",className:"active-svg"})]},i.name)))})},"sortType")})}),n.jsx("div",{className:"sorter "+("pubtime"===(null==e?void 0:e.sortType)?"active":""),onClick:()=>{t({...e,sortType:"pubtime",sortOrder:""}),u.current.close()},children:n.jsx("div",{className:"sorter-item",children:n.jsx("span",{className:"sorter-item-title",children:"新品"})})}),n.jsx("div",{className:"sorter "+("price"===(null==e?void 0:e.sortType)?"active":""),onClick:()=>{u.current.close(),"asc"===e.sortOrder?t({...e,sortOrder:"desc"}):t({...e,sortType:"price",sortOrder:"asc"})},children:n.jsxs("div",{className:"sorter-item",children:[n.jsx("span",{className:"sorter-item-title",children:"价格"}),n.jsxs("div",{className:"sorter-price-icons",children:[n.jsx(l,{name:"up_fill",className:"price-svg "+("asc"===(null==e?void 0:e.sortOrder)?"active":"")}),n.jsx(l,{name:"down_fill",className:"price-svg "+("desc"===(null==e?void 0:e.sortOrder)?"active":"")})]})]})}),n.jsx("div",{className:"sorter "+(0!==ye.findIndex((e=>e.name===m.name))?"active":""),children:n.jsx(x,{ref:f,children:n.jsx(x.Item,{title:m.title,children:n.jsx(ze,{children:ye.map((i=>n.jsxs("li",{className:m.name===i.name?"active":"",onClick:()=>{p(i);const s=[];i.value&&s.push(i.value),t({...e,detailFilter:{...null==e?void 0:e.detailFilter,categories:{6:s}}}),f.current.close()},children:[i.title,m.name===i.name&&n.jsx(l,{name:"correct",className:"active-svg"})]},i.name)))})},"single")})}),n.jsx("div",{className:"filter-line line-left-1px"}),n.jsx("div",{className:"sorter "+(v(e.filters)?"active":""),onClick:()=>o(!0),children:n.jsxs("div",{className:"sorter-item",children:[n.jsx("span",{className:"sorter-item-title",children:"筛选"}),n.jsx(l,{name:"filter",className:"filter-svg "+(v(e.filters)?"active":"")})]})}),n.jsx(fe,{position:"right",visible:r,bodyStyle:{width:"90vw"},onMaskClick:()=>o(!1),list:i,filter:e,close:()=>o(!1),confirm:t})]})})),Ne=r.div`
	position: sticky;
	padding: 0 10px;
	transition: all var(--duration) ease-in-out;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: var(--font-size-xm);
	background: var(--color-background);
	z-index: 10;

	.sorter {
		&-item {
			display: flex;
			align-items: center;
			padding: 12px;
			&-title {
				margin-right: 5px;
			}
		}
		&-price-icons {
			display: flex;
			flex-direction: column;
			align-items: center;
			.price-svg {
				width: 8px;
				height: 8px;
				&.active {
					color: var(--color-main);
				}
			}
		}
		.filter-svg {
			width: var(--font-size-m);
			height: var(--font-size-m);
			&.active {
				color: var(--color-main);
			}
		}

		&.active {
			color: var(--color-main);
		}

		&:nth-child(4) {
			flex: 0 0 calc(var(--font-size-xm) * 4 + 12px * 2 + 5px + 8px);
		}
	}
	.filter-line {
		height: var(--font-size-m);
		width: 0.1px;
	}

	.adm-dropdown {
		.adm-dropdown-item {
			/* margin-right: 20px; */
			&:last-child {
				/* margin-right: 0; */
			}
			.adm-dropdown-item-title-text {
				font-size: var(--font-size-xm);
			}
		}
	}
`,ze=r.ul`
	display: flex;
	flex-direction: column;
	font-size: var(--font-size-xm);
	background: var(--color-background);
	li {
		padding: 10px 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		&.active {
			color: var(--color-main);
		}
		.active-svg {
			width: var(--font-size-xl);
			height: var(--font-size-xl);
			color: var(--color-main);
		}
	}
`,Ce=window.React.useState,Re=window.React.useEffect,Ie=window.React.useRef,Se=window.React.useMemo,Te={pageIndex:1,pageSize:32},Ee=({isSearchResult:e})=>{const t=Ie(null),i=Ie(null),s=f(),a=h(),[r,o]=g(),p=m(),[u,x]=Ce(C),[v,z]=Ce(Te),I=c(d("productsInfo")),S=c(d("productsList")),[O,M]=Ce(!1),[K,Q]=Ce(!1),[H,B]=Ce(!0);Re((()=>{if(!i.current||e){const e=R(s),t=N(e,C);x(t)}}),[s]),Re((()=>{if(i.current){if(e)M(!1);else{const e=b(u);o(e)}u.termQueries.length&&(p(j([])),p(w({})),z(Te),B(!0))}else u.termQueries.length&&(i.current=!0)}),[u]),Re((()=>()=>{p(j([])),p(w({})),z(Te)}),[]);const U=Se((()=>S.map((e=>n.jsx(E,{className:"item",product:e},e.itemsId)))),[S]);return O?n.jsx(F,{inputKeyword:u.keyword,onBack:()=>M(!1)}):n.jsxs(y,{header:e?n.jsxs($,{children:[n.jsx(l,{name:"back",className:"back-svg",onClick:()=>a(-1)}),n.jsx(A,{showCancelButton:!0,placeholder:"商品、品牌、IP名",value:u.keyword,onFocus:()=>M(!0),clearable:!1})]}):n.jsx(P,{title:(null==I?void 0:I.pageTitle)??"",onClickLeft:()=>a(-1),rightIcon:"search",onClickRight:()=>M(!0)}),stickyEl:t,children:[n.jsx(ke,{style:{marginBottom:"10px"},ref:t,filter:u,setFilter:x,searchFilter:I.searchFilter}),n.jsx(L,{onRender:()=>Q(!1),onRenderFinished:()=>{Q(!0)},children:U}),K&&n.jsx(k,{loadMore:async()=>{i.current&&await(async e=>{let t=await T({...u,...v,...e});t=t.data;const i=t.pageIndex,s={};for(const a in t)"list"===a?p(j(i<=1?t[a]:[...S,...t[a]])):s[a]=t[a];p(w(s)),B(s.hasNextPage),s.hasNextPage&&z((e=>({...e,pageIndex:t.pageIndex?t.pageIndex+1:e.pageIndex+1})))})()},hasMore:H})]})};export{Ee as default};
