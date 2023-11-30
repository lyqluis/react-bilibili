import{q as n,u as a,ai as e,j as s,I as i,s as r}from"./index-b58dd535.js";function t(){const r=n(),t=a(e("channels"));return s.jsx(l,{children:t.map((n=>s.jsxs("div",{className:"channel",onClick:()=>r(`/channel/${n.name}`),children:[s.jsx(i,{name:`channels-${n.name}`}),s.jsx("p",{children:n.title},n.name)]},n.name)))})}const l=r.div`
	display: grid;
	flex-wrap: grid;
	grid-template-columns: repeat(4, 1fr);
	padding: 10px;

	.channel {
		display: grid;
		justify-items: center;
		align-items: center;
		margin: 10px;

		p {
			margin: 5px;
			font-size: var(--font-size-xm);
		}
	}
`;export{t as default};
