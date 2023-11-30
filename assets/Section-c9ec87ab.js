import{j as t,s,p as e}from"./index-c769d5fd.js";function i({children:s,title:e,leftTitle:i,rightTitle:a,contentClass:c,style:l,className:o}){return t.jsxs(n,{style:l,className:o,children:[(i||e||a)&&t.jsxs("div",{className:"section-title",children:[t.jsx("span",{className:"sction-title-left",children:i}),t.jsx("span",{className:"sction-title-center",children:e}),t.jsx("span",{className:"sction-title-right",children:a})]}),t.jsx("div",{className:`section-content ${c}`,children:s})]})}const n=s.section`
	margin-bottom: 10px;
	background: var(--color-background);
	padding: ${e`10px`};

	.section-title {
		font-size: var(--font-size-m);
		font-weight: 500;
		margin-bottom: 10px;
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;

		&-right {
			justify-self: end;
		}
	}

	.section-content {
		font-weight: 300;
		font-size: var(--font-size-xm);
	}
`;export{i as S};
