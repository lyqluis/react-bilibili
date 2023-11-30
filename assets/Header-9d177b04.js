import{s as e,p as t,j as i,I as s}from"./index-87bdad0d.js";const a=({left:e,center:t,right:a,leftIcon:l="back",title:r,rightIcon:c,onClickLeft:h,onClickRight:d})=>i.jsxs(n,{className:"line-bottom-1px",children:[i.jsx("div",{className:"header-left",onClick:h,children:e??(l&&i.jsx(s,{name:l,className:"svg"}))}),i.jsx("div",{className:"header-center",children:t??r}),i.jsx("div",{className:"header-right",onClick:d,children:a??(c&&i.jsx(s,{name:c,className:"svg"}))})]}),n=e.div`
	height: 100%;
	position: relative;
	display: flex;
	align-items: center;

	.header-left,
	.header-right {
		position: absolute;
		top: 0;
		bottom: 0;
		display: flex;
		/* justify-content: center; */
		align-items: center;
		padding: ${t`10px`};
	}
	.header-left {
		left: 0;
	}
	.header-right {
		right: 0;
	}

	.svg {
		width: ${t`20px`};
		height: ${t`20px`};
	}

	.header-center {
		max-width: 60%;
		margin: 0 auto;
		/* height: 100%; */
		/* display: flex;
		justify-content: center;
		align-items: center; */
	}
`;export{a as H};
