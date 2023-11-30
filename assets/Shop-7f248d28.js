import{u as s,n as a,o as e,c as t,q as i,t as o,v as n,j as r,I as l,w as d,x as c,y as m,z as p,A as x,B as h,s as u,p as g}from"./index-c769d5fd.js";import{g as f,a as j}from"./mall-3fb9feba.js";import{S as v}from"./SearchHistory-d5ec7810.js";import{u as b}from"./useRequest-e96b32f6.js";import{P as w,S as y,W as N}from"./ShopSearch-05132022.js";import"./input-a2f64204.js";import"./bound-6644a254.js";import"./index-9f127002.js";import"./mallHelper-25190a61.js";import"./Section-c9ec87ab.js";const k=window.React.useState,z=window.React.useEffect,S=window.React.useMemo,R=x(6);function q(){var x,u,g;const[q,B]=k(!1),C=s(a("index")),M=s(e),$=t(),F=i(),{data:H,finished:A,request:E}=b(f,{manual:!0}),[I,P]=k(!1),[W,D]=k((null==(x=null==C?void 0:C.feeds)?void 0:x.pageNum)??1),[G,J]=k(!1);z((()=>{o(C)||E()}),[C]),z((()=>{if(A){const s=H.data.vo;$(n(s))}}),[H,A]);const K=S((()=>M.map((s=>r.jsx(w,{className:"item",product:s},s.id)))),[M]);return q?r.jsx(U,{children:r.jsx(y,{onBack:()=>B(!1)})}):r.jsxs(U,{children:[r.jsxs("div",{className:"index-header",children:[r.jsx("div",{className:"left-logo",children:"会员购"}),r.jsx(v,{showCancelButton:!0,onFocus:()=>B(!0)}),r.jsx("div",{className:"right-logo",children:r.jsx(l,{name:"cart",className:"svg"})})]}),r.jsxs("ul",{className:"tabs",children:[(null==(u=null==C?void 0:C.tabs)?void 0:u.length)>0?null==(g=C.tabs)?void 0:g.filter((s=>/category=/.test(s.jumpUrl))).map((s=>r.jsxs("div",{className:"tab",onClick:()=>{const a=d(s.jumpUrl);/category=/.test(a)&&F(`/shop/list?${a}`)},children:[s.imageUrl&&r.jsx(c,{lazy:!0,fit:"cover",width:"100%",src:`${s.imageUrl}@1c.webp`,placeholder:r.jsx(m,{})}),r.jsx("span",{children:s.name})]},s.name))):R.map((s=>s)),r.jsxs("p",{className:"tab tab-more",onClick:()=>F("/shop/allcategory"),children:[r.jsx(l,{name:"more",className:"tab-more-svg"}),r.jsx("span",{children:"全部分类"})]})]}),r.jsx(N,{onRender:()=>J(!1),onRenderFinished:()=>{J(!0),P(!0)},children:K}),G&&r.jsx(p,{loadMore:async()=>{const s=await j(W+1);$(h(s.data.vo)),D((a=>{var e,t;return(null==(t=null==(e=s.data)?void 0:e.vo)?void 0:t.pageNum)??a+1}))},hasMore:I})]})}const U=u.div`
	.index-header {
		background: var(--color-background);
		padding: ${g`10px`};
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left-logo {
			font-size: var(--font-size-l);
			font-weight: 500;
			color: var(--color-main);
			margin-right: 10px;
		}
		.right-logo {
			margin-left: 10px;
			display: flex;
			align-items: center;
			.svg {
				width: var(--font-size-xl);
			}
		}
		.adm-search-bar {
			flex: auto;
		}
	}

	.tabs {
		margin: 10px 0;
		padding: 0 5px;
		display: flex;
		overflow: auto;
		.tab {
			margin: 0 5px;
			flex: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 50px;
			font-size: var(--font-size-s);
			img {
				width: 100%;
			}
			&-more {
				width: auto;
				justify-content: flex-end;
				&-svg {
					height: 50px;
				}
			}

			.tab-img-skeleton {
				width: 100%;
				height: 50px;
				border-radius: 50%;
			}
			.tab-title-skeleton {
				margin: 0;
				margin-top: 2px;
				width: 100%;
				height: var(--font-size-s);
			}
		}

		/* scrollbar */
		::-webkit-scrollbar {
			display: none;
		}
		scrollbar-width: none;
	}

	.products {
	}
`;export{q as default};
