import{j as e,s as i,q as s,x as t,I as a,aX as r,aY as o,aU as n,p as l}from"./index-b58dd535.js";import{l as c,d}from"./mallHelper-0f4c60f4.js";import{S as p,a as m,b as g}from"./SearchHistory-afd16c7b.js";import{S as h}from"./Section-b6a3a8d2.js";import{e as f}from"./mall-9138b710.js";const x=window.React.useState,u=window.React.useLayoutEffect,v=window.React.useRef,b=i.div`
	padding: 0 10px;
	position: relative;
	padding-bottom: calc(4.8vw * 2 + var(--font-size-xm));
`,j=({col:i=2,padding:s=10,gap:t=10,children:a,onRender:r,onRenderFinished:o})=>{const n=v(null),[l,c]=x(0),d=new Array(i).fill(0);return u((()=>{r&&r();const e=(n.current.offsetWidth-2*s-t*(i-1))/i,a=n.current.children;for(let s=0,r=a.length;s<r;s++){const r=a[s];r.style.width=`${e}px`;const o=r.offsetHeight;let n;if(s<i)n=s;else{const{i:e}=d.reduce(((e,i,s)=>(e.val>i&&(e.val=i,e.i=s),e)),{val:1/0,i:-1});n=e}r.style.position="absolute",r.style.transform=`translate(${(e+t)*n}px, \n        ${d[n]}px)`,d[n]+=t+o}c(Math.max(...d)),o&&o()}),[a]),e.jsx(b,{style:{height:`${l}px`},ref:n,children:a})},y=({item:i,size:s="small",rank:a,isIp:r=!1})=>{const o="big"===s?156.5:75.5;return e.jsxs(w,{children:[e.jsx(t,{src:i.imageUrl??i.imageUrls[0],width:"100%",height:o}),a&&e.jsx("span",{className:"rank",children:a}),r&&e.jsx("span",{className:"ip-bar",children:i.name})]})},w=i.div`
	width: 100%;
	position: relative;
	border-radius: var(--radius);
	background: var(--color-border);
	overflow: hidden;
	.rank {
		position: absolute;
		top: 0;
		left: 6px;
		width: 19px;
		height: 19px;
		border-radius: 0 0 var(--radius) var(--radius);
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		display: grid;
		align-items: center;
		justify-items: center;
		font-size: var(--font-size-s);
	}
	.ip-bar {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 1.33333vmin 1.6vmin;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
		color: var(--color-background);
		font-weight: 200;
		font-size: var(--font-size-xs);
		display: flex;
		justify-content: center;
		align-items: center;
	}
`,k=i.div`
	width: 100%;
	position: relative;
	background: #ddd;
	background: var(--color-background);
	border-radius: var(--radius);
	box-shadow: var(--shadow);
	overflow: hidden;
	font-size: var(--font-size-xm);
	.top-title {
		margin-top: 8px;
		display: flex;
		justify-content: center;
		font-weight: 500;
	}

	.four-tiles-wrapper {
		padding: 8px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 5px;
	}

	.info {
		padding: 8px;
		.tags {
			display: flex;
			margin: 5px 0;
		}
		.tag {
			margin-right: 4px;
			padding: 2px 3px;
			border-radius: var(--radius);
			font-size: var(--font-size-xs);
			font-weight: 300;
			&.first {
				background: var(--color-main-detail);
				color: #fff;
			}
			&.second {
				background: var(--color-main-negative);
			}
		}
		.pretag {
			background: var(--color-border);
		}

		.bottom {
			display: flex;
			justify-content: space-between;
			font-size: var(--font-size-s);
			color: var(--color-font-grey);
			.price-wrapper {
				span {
					margin-right: 5px;
				}
				.price {
					color: var(--color-main);
					.price-num {
						font-weight: 500;
						font-size: var(--font-size-m);
					}
				}
				.price-num {
					margin-left: 2px;
				}
			}
			.like {
				display: flex;
				align-items: center;
				&-svg {
					width: var(--font-size-xm);
					height: var(--font-size-xm);
					color: var(--color-font-grey);
				}
			}
		}
	}
`,z=i.div`
	width: 100%;
	position: relative;

	.title-image {
		width: 100%;
		position: absolute;
		padding: 7px 15%;
	}
	.summary {
		width: 100%;
		position: absolute;
		display: flex;
		justify-content: center;
		top: 49px;
		font-size: var(--font-size-s);
		color: #fff;
	}
	.cover {
		width: 100%;
		position: absolute;
		padding: 0 7%;
		bottom: 56px;
		&-img {
			position: absolute;
			width: 100%;
			padding: 0 15%;
			bottom: 60px;
		}
	}

	.button-image {
		position: absolute;
		width: 100%;
		padding: 0 15%;
		bottom: 20px;
	}
`,N=i.div`
	padding: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 500;

	.phb-title-sub {
		margin: 3px auto;
		display: flex;
		font-weight: 400;
		font-size: var(--font-size-s);
		color: var(--color-font-grey);
		&-svg {
			width: var(--font-size-xm);
			height: var(--font-size-xm);
			color: var(--color-font-grey);
			margin-right: 5px;
		}
	}
	.second {
		margin-top: 5px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 5px;
	}
`,I=({product:i})=>{var r,o,n;let l,d;"mallitems"!==i.type&&""!==i.type||(l=(null==(r=i.feedTag)?void 0:r.frontTag.slice())??[],d=(null==(o=i.feedTag)?void 0:o.underTag.slice())??[],l.sort(((e,i)=>i.priority-e.priority)),d.sort(((e,i)=>i.priority-e.priority)));const p=s();return e.jsxs(k,{onClick:()=>{"mallitems"!==i.type&&""!==i.type||p(`/shop/product/${i.itemsId}`)},children:[("mallitems"===i.type||""===i.type)&&e.jsxs(e.Fragment,{children:[e.jsx(t,{src:`${(null==(n=i.imageUrls)?void 0:n[0])??i.itemsImg}@1c.webp`,alt:"",lazy:!0,width:"100%",height:172.5,onLoad:()=>{},placeholder:e.jsx("img",{src:c})}),e.jsxs("section",{className:"info",children:[e.jsxs("p",{className:"multi-ellipsis-line-2",children:[l.length>0&&l.map((i=>e.jsx("i",{className:"tag pretag",children:i.title},i.title))),i.title??i.name]}),e.jsx("p",{className:"tags ellipsis-line-1",children:d.map((i=>e.jsx("i",{className:"tag "+(i.priority>1300?"first":"second"),children:i.title},i.title)))}),e.jsxs("p",{className:"bottom",children:[e.jsx("span",{className:"price-wrapper",children:i.priceDesc.map(((s,t)=>e.jsxs("span",{className:0===t?"price":"",children:[e.jsx("i",{children:i.priceSymbol}),e.jsx("i",{className:"price-num",children:s})]},`${s}_${t}`)))}),e.jsxs("span",{className:"like",children:[e.jsx(a,{name:"heart",className:"like-svg"}),i.like]})]})]})]}),"items_channel"===i.type&&e.jsxs(z,{children:[e.jsx("img",{src:i.titleImage,alt:"",className:"title-image"}),e.jsx("p",{className:"summary",children:i.summary}),e.jsx("img",{src:i.imgVOs[0].itemImg,alt:"",className:"cover-img"}),e.jsx("img",{src:i.coverImage,alt:"",className:"cover"}),e.jsx("img",{src:i.buttonImg,alt:"",className:"button-image"}),e.jsx(t,{src:i.bgImage,width:"100%",height:251.8,alt:""})]}),"phb"===i.type&&e.jsxs(N,{children:[e.jsx("p",{className:"phb-title",children:i.title}),e.jsxs("p",{className:"phb-title-sub",children:[e.jsx(a,{name:"hot",className:"phb-title-sub-svg"}),"热度值 ",i.hot]}),e.jsx(y,{item:i.itemsList[0],rank:1,size:"big"}),e.jsxs("div",{className:"second",children:[e.jsx(y,{item:i.itemsList[1],rank:2}),e.jsx(y,{item:i.itemsList[2],rank:3})]})]}),"four_tiles"===i.type&&e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"top-title",children:i.title}),e.jsx("div",{className:"four-tiles-wrapper",children:i.ipList.map((i=>e.jsx(y,{item:i,isIp:!0},i.id)))})]})]})},R=window.React.useState,$=window.React.useEffect,S=window.React.useRef;function C({onBack:i,inputKeyword:t}){const l=S(null),[c,x]=R(t),[u,v]=R(!1),[b,j]=R([]),[y,w]=R(r()),k=s(),z=!c,N=c&&u&&b.length>0,I=async(e=c)=>{if(!e)return;const i=await f(e);j(i.data.vo)},C=async e=>{v(!1),c!==e&&x(e);const i=Object.assign({},d,{keyword:e,category:"1_107"}),s=n(i);k(`/shop/search_result?${s}`),w([...y.filter((i=>i!==e)),e])};return $((()=>{v(!0)}),[]),$((()=>{u&&l.current.focus()}),[u]),$((()=>{o(y)}),[y]),e.jsxs(L,{children:[e.jsxs(T,{children:[e.jsx(a,{name:"back",className:"back-svg",onClick:i}),e.jsx(p,{showCancelButton:!0,ref:l,value:c,placeholder:"商品、品牌、IP名",onSearch:C,onChange:async e=>{x(e),I(e)},onFocus:()=>(async()=>{I()})(),onClear:()=>{var e;return null==(e=l.current)?void 0:e.focus()},onCancel:async()=>{}})]}),N&&e.jsx(m,{list:b,onSelect:C}),z&&e.jsx(h,{leftTitle:"历史搜索",rightTitle:e.jsx(a,{name:"delete",className:"section-title-svg",onClick:()=>w([])}),children:e.jsx(g,{words:y,onClick:C,onRemove:e=>(e=>w(y.filter((i=>i!=e))))(e)})})]})}const L=i.div`
	background: var(--color-background-grey);

	.search-wrapper {
	}

	.section-title-svg {
		width: var(--font-size-m);
		height: var(--font-size-m);
	}
`,T=i.header`
	background: var(--color-background);
	padding: ${l`10px`};
	position: sticky;
	top: 0;
	z-index: 10;
	display: flex;
	align-items: center;
	.back-svg {
		width: ${l`20px`};
		margin-right: 10px;
	}
	.adm-search-bar {
		flex-grow: 1;
	}
`;export{I as P,C as S,j as W,T as a};
