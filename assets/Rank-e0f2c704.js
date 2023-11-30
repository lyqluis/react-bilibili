import{a as n,u as a,as as t,c as e,at as i,j as s,L as r,s as o,q as l,ac as d}from"./index-c769d5fd.js";import{T as c}from"./index-8318b1af.js";import{L as m}from"./index-9f127002.js";import{u as h}from"./useRequest-e96b32f6.js";import{L as f}from"./ListCard-f6049623.js";import"./bound-6644a254.js";import"./use-resize-effect-45bd73a3.js";import"./traverse-react-node-3518b090.js";const u=()=>n({method:"get",url:"/ranking_channels"}).catch((n=>{})),p=a=>n({method:"get",url:"/ranking",params:{rid:a}}).catch((n=>{})),x=window.React.useEffect;function j({channel:n,onClick:o}){const{data:l,finished:d}=h(p,{params:[n.rid>0?n.rid:""]}),c=a(t(n.name)),u=e();x((()=>{const{name:a}=n;d&&u(i({channel:a,data:l.data.list}))}),[l]);const j=new Array(20).fill(null).map(((n,a)=>s.jsxs(m.Item,{children:[s.jsx("span",{className:"rank-num",children:a+1}),s.jsx(r,{})]},a)));return d?s.jsx(g,{children:s.jsx(m,{children:(null==c?void 0:c.length)>0&&c.map(((n,a)=>s.jsxs(m.Item,{arrow:!1,onClick:o,children:[s.jsx("span",{className:"rank-num",children:a+1}),s.jsx(f,{item:n})]},n.aid)))})}):s.jsx(g,{children:s.jsx(m,{children:j})})}const g=o.div`
	.adm-list-item-content-main {
		display: grid;
		grid-template-columns: 15px 1fr;
		grid-gap: 5px;
	}

	.rank-num {
		flex: none;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: var(--font-size-xm);
		font-style: italic;
		color: var(--color-font-grey);
	}

	.adm-list-item {
		&:nth-child(1),
		&:nth-child(2),
		&:nth-child(3) {
			.rank-num {
				font-weight: 600;
				color: var(--color-main-5);
			}
		}
	}
`,k=window.React.useState,y=window.React.useEffect;function v(){const{loading:n,data:a,finished:t}=h(u),[e,i]=k([]),[r,o]=k(null),m=l(),{channelName:f}=d();return y((()=>{if(t){const n=a.data;n.unshift({title:"总榜",name:"all",rid:0}),i(n)}}),[a]),y((()=>{if(e.length){let n=r??e[0];f!==n.name&&(n=e.find((n=>n.name===f))??e[0]),o(n)}}),[f,e]),r?s.jsx(w,{children:s.jsx(c,{activeKey:r.rid.toString(),onChange:n=>{const a=e.find((a=>a.rid==n)),t="all"===a.name?"":`/${a.name}`;m(`/rank${t}`)},style:{position:"sticky",top:0},children:e.map((n=>s.jsx(c.Tab,{title:n.title,children:s.jsx(j,{channel:n})},n.rid.toString())))})}):s.jsx("h1",{children:"loading"})}const w=o.div`
	.adm-tabs-header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: var(--color-background);
	}
	.adm-tabs-content {
		padding: 0;
	}
`;export{v as default};
