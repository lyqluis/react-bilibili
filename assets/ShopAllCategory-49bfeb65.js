import{M as e,K as t,U as a,O as r,s as n,c as l,u as s,n as i,a$ as c,b0 as o,j as m,p as d,q as p,x as g}from"./index-b58dd535.js";import{t as u}from"./traverse-react-node-7b3dd3aa.js";import{u as h}from"./useRequest-e96b32f6.js";import{f}from"./mall-9138b710.js";const v=window.React,y="adm-badge",x=v.createElement(v.Fragment,null),w=a((a=>{const{content:r,color:n,children:l}=a,s=r===x,i=e(y,!!l&&`${y}-fixed`,s&&`${y}-dot`,a.bordered&&`${y}-bordered`),c=r||0===r?t(a,v.createElement("div",{className:i,style:{"--color":n}},!s&&v.createElement("div",{className:`${y}-content`},r))):null;return l?v.createElement("div",{className:e(`${y}-wrapper`,a.wrapperClassName),style:a.wrapperStyle},l,c):c}),{dot:x}),N=window.React,$=(0,window.React.memo)((e=>t(e,N.createElement("svg",{viewBox:"0 0 30 30"},N.createElement("g",{stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},N.createElement("path",{d:"M30,0 C13.4314575,3.04359188e-15 -2.02906125e-15,13.4314575 0,30 L0,30 L0,0 Z",fill:"var(--adm-color-background)",transform:"translate(15.000000, 15.000000) scale(-1, -1) translate(-15.000000, -15.000000) "})))))),b=window.React,E="adm-side-bar",j=a((a=>{var n;let l=null;const s=[];u(a.children,((e,t)=>{if(!b.isValidElement(e))return;const a=e.key;"string"==typeof a&&(0===t&&(l=a),s.push(e))}));const[i,c]=r({value:a.activeKey,defaultValue:null!==(n=a.defaultActiveKey)&&void 0!==n?n:l,onChange:e=>{var t;null!==e&&(null===(t=a.onChange)||void 0===t||t.call(a,e))}}),o=s[s.length-1],m=o&&o.key===i;return t(a,b.createElement("div",{className:E},b.createElement("div",{className:`${E}-items`},s.map(((a,r)=>{const n=a.key===i,l=s[r-1]&&s[r-1].key===i,o=s[r+1]&&s[r+1].key===i;return t(a.props,b.createElement("div",{key:a.key,onClick:()=>{const{key:e}=a;null==e||a.props.disabled||c(e.toString())},className:e(`${E}-item`,{[`${E}-item-active`]:n,[`${E}-item-disabled`]:a.props.disabled})},b.createElement(b.Fragment,null,l&&b.createElement($,{className:`${E}-item-corner ${E}-item-corner-top`}),o&&b.createElement($,{className:`${E}-item-corner ${E}-item-corner-bottom`})),b.createElement(w,{content:a.props.badge,className:`${E}-badge`},b.createElement("div",{className:`${E}-item-title`},n&&b.createElement("div",{className:`${E}-item-highlight`}),a.props.title))))}))),b.createElement("div",{className:e(`${E}-extra-space`,m&&`${E}-item-active-next-sibling`)},m&&b.createElement($,{className:`${E}-item-corner ${E}-item-corner-top`}))))}),{Item:()=>null}),k=window.React.useState,R=window.React.useEffect,C=window.React.useRef,z=({cateType:e})=>{const t=p();return m.jsxs(L,{children:[m.jsx("h1",{id:`anchor-${e.typeName}`,children:e.typeName}),m.jsx("div",{className:"cate-wrapper",children:e.categoryLogicVOList.map((e=>m.jsxs("div",{className:"category-box",onClick:()=>{let a="category";switch(e.mapType){case 2:a="brand";break;case 3:a="ip"}e.mapType<5&&t(`/shop/list?noTitleBar=1&from=category_gz&${a}=${e.id}`)},children:[m.jsx("div",{className:"img",children:m.jsx(g,{lazy:!0,width:"100%",height:"100%",src:e.img,alt:e.name})}),m.jsx("p",{children:e.name})]},"url"===e.id?e.name:e.id)))})]})},L=n.div`
	h1 {
		padding: 10px;
		font-weight: 400;
		font-size: var(--font-size-xm);
	}
	.cate-wrapper {
		padding: 10px;
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(3, 1fr);
		.category-box {
			justify-self: center;
			width: 77px;
			.img {
				width: 100%;
				height: 77px;
				display: flex;
				align-items: center;
				overflow: hidden;
				margin-bottom: 5px;
				img {
					object-fit: cover;
					width: 100%;
				}
			}
			p {
				width: 100%;
				word-wrap: break-word;
				word-break: keep-all;
				text-align: center;
				font-size: var(--font-size-s);
				color: var(--color-font-grey);
			}
		}
	}
`,B=()=>{const[e,t]=k(null),a=l(),r=s(i("allCategories")),{data:n,finished:d,request:p}=h(f,{manual:!0});R((()=>{r.length||p()}),[r]),R((()=>{d&&(a(c(n.data.vo)),t(n.data.vo[0].typeName))}),[n,d]);const g=C(null),{run:u}=o((()=>{var e;let a=null==(e=r[0])?void 0:e.typeName;for(const t of r){const e=document.getElementById(`anchor-${t.typeName}`);if(!e)continue;const{top:r}=e.getBoundingClientRect();if(!(r<=0))break;a=t.typeName}t(a)}),750);return R((()=>{const e=g.current;if(e)return e.addEventListener("scroll",u),()=>{e.removeEventListener("scroll",u)}}),[r]),m.jsx(m.Fragment,{children:m.jsxs(I,{children:[m.jsx("aside",{className:"side-bar",children:m.jsx(j,{activeKey:e,onChange:e=>{var t;null==(t=document.getElementById(`anchor-${e}`))||t.scrollIntoView()},children:r.map((e=>m.jsx(j.Item,{title:e.typeName},e.typeName)))})}),m.jsx("main",{className:"main",ref:g,children:r.map((e=>m.jsx(z,{cateType:e},e.typeName)))})]})})},I=n.div`
	height: calc(100vh - ${d`65px`});
	display: flex;
	justify-content: flex-start;
	align-items: stretch;
	.side-bar {
		flex: none;
	}
	.main {
		flex: auto;
		overflow-y: scroll;
	}
`;export{B as default};
