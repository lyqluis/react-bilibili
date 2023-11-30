import{c as a,u as e,an as n,ao as t,$ as i,ap as s,j as d,a2 as r,z as c,s as o,p as l,aq as m,ar as h,q as p,ac as f,ai as u}from"./index-b58dd535.js";import{T as j}from"./index-dc6fb727.js";import{S as g}from"./Section-b6a3a8d2.js";import{u as x}from"./useRequest-e96b32f6.js";import"./bound-6644a254.js";import"./use-resize-effect-141f9116.js";import"./traverse-react-node-7b3dd3aa.js";const w=window.React.useState,v=window.React.useEffect,b=(0,window.React.forwardRef)((({channel:o,active:l},p)=>{const f=a(),u=e(n(o.name)),[j,b]=w(!0),[R,$]=w(0),{data:y,finished:T}=x(t,{params:[o.rid]}),z=i(8);if(v((()=>{const{name:a}=o;T&&f(s({channel:a,section:"recommends",data:y.data}))}),[y]),v((()=>{l&&window.scrollTo(0,0)}),[l]),!l)return null;const{recommends:k,latests:q}=u;return d.jsxs(S,{ref:p,children:[d.jsx(g,{leftTitle:"热门推荐",children:k.length<=0?z:k.slice(0,8).map((a=>d.jsx(r,{item:a},a.aid)))}),d.jsx(g,{leftTitle:"最新视频",children:q.map((a=>d.jsx(r,{item:a},a.aid)))}),d.jsx(c,{loadMore:async()=>{const a=await m(o.rid,R+1),{data:e,isDuplicated:n}=h(q,a.data.archives,"aid");f(s({channel:o.name,section:"latests",data:e}));const{count:t,num:i,size:d}=a.data.page;$(i),b(t-i*d>0&&!n)},hasMore:j})]})})),S=o.div`
	.section-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: ${l`10px`};
	}
`,R=b,$=window.React.useState,y=window.React.useEffect;function T(){var a;const n=p(),{channelName:t,childChannelName:i}=f(),s=e(u("channels")),[r,c]=$(s[0]),[o,l]=$(null==(a=s[0])?void 0:a.children[0]);return y((()=>{let a=o,e=r;t!==e.name&&(e=s.find((a=>a.name===t)),c(e)),a=i?e.children.find((a=>a.name===i)):e.children[0],l(a)}),[t,i]),d.jsx(z,{children:d.jsx(j,{activeKey:r.rid.toString(),onChange:a=>{const e=s.find((e=>e.rid==a));n(`/channel/${e.name}`)},children:s.map((a=>d.jsx(j.Tab,{title:a.title,children:d.jsx(j,{activeKey:o.rid.toString(),onChange:e=>{const t=a.children.find((a=>a.rid==e));n(`/channel/${a.name}${t.rid===r.rid?"":"/"+t.name}`)},children:a.children.map((a=>d.jsx(j.Tab,{title:a.title,children:d.jsx(R,{channel:a,active:a===o})},a.rid.toString())))})},a.rid.toString())))})})}const z=o.div`
	.adm-tabs-header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: var(--color-background);
		height: ${l`37.98px`};
	}
	.adm-tabs-content {
		padding-top: 0;
		padding-left: 0;
		padding-right: 0;

		.adm-tabs-header {
			top: ${l`37.98px`};
		}
	}
`;export{T as default};
