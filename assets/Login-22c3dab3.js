import{aH as e,s as a,p as r,u as o,ab as t,c as s,q as i,aI as n,ah as l,aJ as c,j as d,I as g,aK as m,aL as u,aM as h,aN as p,a0 as f,aO as v}from"./index-87bdad0d.js";const x=window.React.useState,w=window.React.useEffect,y=window.React.useRef,j=({from:e,to:a})=>{const[r,f]=x(null),[v,j]=x(!1),q=y(null),k=o(t("qrcode")),N=86038===(null==r?void 0:r.code),I=86090===(null==r?void 0:r.code),z=0===(null==r?void 0:r.code),R=v||N||I,$=v||N,_=s(),L=i(),A=async()=>{try{j(!0);const e=await m(),{url:a,qrcode_key:r}=e.data,o=await u(a),{qrimg:t}=o.data;_(h({key:r,url:a,img:t})),j(!1)}catch(e){}};w((()=>{k.key||A()}),[]);w((()=>(k.img&&k.key&&k.url&&(q.current=setInterval((()=>{(async e=>{try{const a=await p(e);f(a.data)}catch(a){}})(k.key)}),1e3)),()=>{clearInterval(q.current)})),[k]),w((()=>{N&&clearInterval(q.current)}),[N]),w((()=>{z&&(n(r.refresh_token),_(l(!0)),_(c()),L(e,{replace:!0}))}),[z]);return d.jsxs(b,{children:[d.jsx(g,{name:"logo",className:"login-logo"}),d.jsxs("div",{className:"qrcode-wrapper",children:[(null==k?void 0:k.img)&&d.jsx("img",{src:k.img,alt:"qrcode_url"}),R&&d.jsx("div",{className:"qrcode-refresh",onClick:async()=>{N&&(await(async()=>{_(h({key:null,url:null,img:null})),f(null)})(),A())},children:$&&d.jsx(g,{name:"refresh",className:"qrcode-refresh-svg"+(v?" qrcode-refresh-svg-rotate":"")})})]}),d.jsx("p",{className:"qrcode-p",children:"请打开 App 扫码登陆"}),(null==r?void 0:r.message)&&d.jsx("p",{className:"qrcode-detail",children:r.message})]})},q=e`
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(360deg);
	}
`,b=a.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	width: 80%;
	margin: 0 auto;
	background: var(--color-main-negative);
	border-radius: 10px;
	box-shadow: var(--shadow);

	.login-logo {
		width: 100%;
		height: 50px;
		margin: 20px;
		color: var(--color-main);
	}

	.qrcode-wrapper {
		position: relative;
		line-height: 0;
		width: ${r`200px`};
		height: ${r`200px`};
		border-radius: var(--radius);
		overflow: hidden;

		img {
			width: 100%;
		}

		.qrcode-refresh {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			backdrop-filter: blur(5px);
			background: rgba(0, 0, 0, 0.7);
			display: grid;
			align-items: center;
			justify-items: center;

			&-svg {
				color: var(--color-font-grey);
				color: var(--color-background);
				width: 30%;
				height: 30%;

				&-rotate {
					animation: ${q} var(--duration) ease-in-out;
				}
			}
		}
	}

	.qrcode-p {
		margin: 10px;
		margin-top: 20px;
		font-size: var(--font-size-m);
		font-weight: 900;
		color: var(--color-main-5);
	}
	.qrcode-detail {
		font-size: var(--font-size-xm);
	}
`,k=()=>{var e,a;const r=o(t("isLoggedIn")),s=f(),i=(null==(a=null==(e=s.state)?void 0:e.from)?void 0:a.pathname)||"/";return r?d.jsx(v,{to:"/user",state:{from:s},replace:!0}):d.jsx(N,{children:d.jsx(j,{from:i})})},N=a.div`
	height: calc(100vh - ${r`65px`});
	display: grid;
	align-items: center;
	justify-items: center;
`;export{k as default};
