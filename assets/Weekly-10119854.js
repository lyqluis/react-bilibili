import{d as e,u as s,ay as t,c as n,az as a,j as i,aA as r,s as l,L as o,aB as c,aC as d,aD as m,aE as u}from"./index-5222d580.js";import{u as x}from"./useRequest-e96b32f6.js";import{L as p}from"./index-fc3d5f27.js";import{L as w}from"./ListCard-4b3d2f60.js";const f=window.React.useState,j=window.React.useRef,h=window.React.useEffect,b=({list:e=[],loading:s})=>{const t=new Array(8).fill(null).map(((e,s)=>i.jsx(p.Item,{children:i.jsx(o,{})},s)));return s?i.jsx(p,{children:t}):i.jsx(p,{children:e.length>0&&e.map((e=>i.jsx(p.Item,{arrow:!1,children:i.jsx(w,{item:e})},e.aid)))})},y=()=>{const{data:l,finished:o}=x(c),[p,w]=e(),y=s(t("weekly")),v=s(t("weeklyInfo")),z=s(t("allWeeklyList")),[L,R]=f(!0),I=j(),N=n();return h((()=>{if(o){const{list:e}=l.data;N(a(e));if(!p.get("number")){const s=e[0];w({number:s.number})}}}),[l]),h((()=>{R(!0);const e=p.get("number");e&&(async e=>{try{const s=await d(e),{config:t,list:n,reminder:a}=s.data;N(m(n)),N(u({...t,reminder:a})),R(!1)}catch(s){}})(e)}),[p]),i.jsxs(k,{children:[i.jsx(r,{ref:I,className:"line-bottom-1px",children:i.jsx(r.Item,{title:i.jsxs("div",{className:"weekly-selector-title",children:[i.jsx("span",{children:v.subject}),i.jsx("span",{className:"weekly-selector-title-number",children:v.label})]}),children:i.jsx(g,{children:z.length>0&&z.map((e=>i.jsxs("div",{className:"weekly-issue"+(e.number===v.number?" active":""),onClick:()=>{w({number:e.number}),I.current.close()},children:[i.jsx("span",{children:e.subject}),i.jsx("span",{children:e.name})]},e.number)))})},"weekly-number")}),i.jsx(b,{list:y,loading:L})]})},g=l.div`
	height: 40vh;
	overflow: scroll;
	color: var(--color-font-grey);
	font-size: var(--font-size-xm);
	padding: 0 15px;

	.weekly-issue {
		width: 100%;
		margin: 5px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 300;

		&.active {
			color: var(--color-main);
		}
	}
`,k=l.div`
	.adm-dropdown {
		position: sticky;
		top: 0;
		background: var(--color-background);
		z-index: 9;

		.adm-dropdown-nav {
			.adm-dropdown-item {
				&-title {
					width: 100%;
					padding: 10px 20px;
					justify-content: space-between;

					&-text {
						width: 100%;

						.weekly-selector-title {
							display: flex;
							justify-content: space-between;
							&-number {
								font-size: var(--font-size-xm);
								font-weight: 300;
							}
						}
					}
				}
			}
		}
	}
`;export{y as default};
