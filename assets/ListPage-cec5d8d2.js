import{ac as a,u as s,aP as e,aQ as i,c as t,q as d,j as o,aR as n,a2 as l,z as r,s as c,p as u,a4 as m}from"./index-b58dd535.js";import{b as p}from"./user-84956fac.js";import{H as v}from"./Header-cee3ca8b.js";const j=window.React.useState,x=window.React.useEffect,f=()=>{var c,u,f,w;const[g,M]=j(!0),{userId:R,fav_id:y}=a(),z=s(e(y)),H=Math.ceil(((null==(u=null==(c=null==z?void 0:z.content)?void 0:c.medias)?void 0:u.length)??0)/i),[I,$]=j(H+1),_=t(),b=d();if(x((()=>{z||b(`/user/${R}`)}),[R,y]),x((()=>{window.scrollTo(0,0)}),[]),z)return o.jsx(h,{children:o.jsxs(n,{header:o.jsx(v,{title:z.title,onClickLeft:()=>b(-1)}),children:[o.jsx("div",{className:"video-list",children:null==(f=null==z?void 0:z.content)?void 0:f.medias.map((a=>o.jsx(l,{item:a},a.aid)))}),o.jsx(r,{loadMore:()=>(async a=>{M(!0);const s=await p(a,i,I),e=z.content.medias.slice();e.push(...s.data.medias),_(m({id:a,content:{...s.data,medias:e}})),$((a=>a+1)),M(!1)})(parseInt(y)),hasMore:null==(w=null==z?void 0:z.content)?void 0:w.has_more})]})})},h=c.div`
	.video-list {
		padding: 10px;
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: ${u`10px`};
	}
`;export{f as default};
