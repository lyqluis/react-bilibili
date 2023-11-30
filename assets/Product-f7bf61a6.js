import{b2 as e,V as t,M as i,K as n,U as s,b3 as a,Q as r,av as o,T as c,s as l,j as d,I as p,ac as m,q as u,c as x,u as f,b4 as h,x as v,aS as g,b5 as b}from"./index-5222d580.js";import{u as j}from"./useRequest-e96b32f6.js";import{h as w}from"./mall-e3abfd69.js";import{S as N}from"./Section-cfccf90d.js";import{S as y}from"./stepper-bc3256ba.js";import{u as k}from"./use-gesture-react.esm-cbba5b86.js";import{b as z}from"./bound-6644a254.js";import{c as $}from"./mallHelper-1dc680bd.js";import"./input-b261d64e.js";const R=e(window.React.useEffect),S=window.React,C=window.React.memo,E="adm-page-indicator",M={color:"primary",direction:"horizontal"},I=C((e=>{const s=t(M,e),a=[];for(let t=0;t<s.total;t++)a.push(S.createElement("div",{key:t,className:i(`${E}-dot`,{[`${E}-dot-active`]:s.current===t})}));return n(s,S.createElement("div",{className:i(E,`${E}-${s.direction}`,`${E}-color-${s.color}`)},a))})),T=window.React,L="adm-step",O=window.React,V="adm-steps",A=O.createElement("span",{className:"adm-step-icon-dot"}),F={current:0,direction:"horizontal"},P=s((e=>{const s=t(F,e),{direction:a,current:r}=s,o=i(V,`${V}-${a}`);return n(s,O.createElement("div",{className:o},O.Children.map(s.children,((e,t)=>{var i;if(!O.isValidElement(e))return e;const n=e.props;let s=n.status||"wait";t<r?s=n.status||"finish":t===r&&(s=n.status||"process");const a=null!==(i=n.icon)&&void 0!==i?i:A;return O.cloneElement(e,{status:s,icon:a})}))))}),{Step:e=>{const{title:t,description:s,icon:a,status:r="wait"}=e;return n(e,T.createElement("div",{className:i(`${L}`,`${L}-status-${r}`)},T.createElement("div",{className:`${L}-indicator`},T.createElement("div",{className:`${L}-icon-container`},a)),T.createElement("div",{className:`${L}-content`},T.createElement("div",{className:`${L}-title`},t),!!s&&T.createElement("div",{className:`${L}-description`},s))))}}),D=window.React,H=e=>n(e,D.createElement("div",{className:"adm-swiper-item",onClick:e.onClick},e.children)),q=window.React.useEffect,B=window.React.useRef,U=window.React.useState;const _=window.React,K=window.React.forwardRef,Q=window.React.useEffect,W=window.React.useImperativeHandle,Y=window.React.useMemo,G=window.React.useRef,J=window.React.useState,X="adm-swiper",Z={mousedown:"onMouseDown",mousemove:"onMouseMove",mouseup:"onMouseUp"},ee={defaultIndex:0,allowTouchMove:!0,autoplay:!1,autoplayInterval:3e3,loop:!1,direction:"horizontal",slideSize:100,trackOffset:0,stuckAtBoundary:!0,rubberband:!0,stopPropagation:[]};let te;function ie(e,t){const i=e%t;return i<0?i+t:i}const ne=s(K(a(((e,s)=>{const a=t(ee,e),[l]=J({}),d="vertical"===a.direction,p=a.slideSize/100,m=a.trackOffset/100,{validChildren:u,count:x}=Y((()=>{let e=0;return{validChildren:_.Children.map(a.children,(t=>_.isValidElement(t)?t.type!==H?null:(e++,t):null)),count:e}}),[a.children]);return 0!==x&&u?()=>{let e=a.loop;p*(x-1)<1&&(e=!1);const t=G(null);function f(){const e=t.current;if(!e)return 0;return(d?e.offsetHeight:e.offsetWidth)*a.slideSize/100}const[h,v]=J(a.defaultIndex);R((()=>{var e;null===(e=a.onIndexChange)||void 0===e||e.call(a,h)}),[h]);const[g,b,j]=function(e){const[t,i]=U(e),n=B(t);return q((()=>{n.current=t}),[t]),[t,i,n]}(!1);function w(e){let t=0,i=x-1;return a.stuckAtBoundary&&(t+=m/p,i-=(1-p-m)/p),z(e,t,i)}const[{position:N},y]=r((()=>({position:100*w(h),config:{tension:200,friction:30},onRest:()=>{if(j.current)return;if(!e)return;const t=N.get(),i=ie(t,100*x);i!==t&&y.start({position:i,immediate:!0})}})),[x]),$=G(null);const S=k((e=>{if($.current=e.cancel,!e.intentional)return;if(e.first&&!te&&(te=l),te!==l)return;te=e.last?void 0:l;const t=f();if(!t)return;const i=d?1:0,n=e.offset[i],s=e.direction[i],a=e.velocity[i];if(b(!0),e.last){const e=Math.floor(n/t),i=e+1,r=Math.round((n+2e3*a*s)/t);C(z(r,e,i)),window.setTimeout((()=>{b(!1)}))}else y.start({position:100*n/t,immediate:!0})}),{transform:([e,t])=>[-e,-t],from:()=>{const e=f();return[N.get()/100*e,N.get()/100*e]},triggerAllEvents:!0,bounds:()=>{if(e)return{};const t=f(),i=w(0)*t,n=w(x-1)*t;return d?{top:i,bottom:n}:{left:i,right:n}},rubberband:a.rubberband,axis:d?"y":"x",preventScroll:!d,pointer:{touch:!0}});function C(t,i=!1){const n=Math.round(t),s=e?ie(n,x):z(n,0,x-1);v(s),y.start({position:100*(e?n:w(n)),immediate:i})}function E(){C(Math.round(N.get()/100)+1)}function M(){C(Math.round(N.get()/100)-1)}W(s,(()=>({swipeTo:C,swipeNext:E,swipePrev:M}))),o((()=>{const e=u.length-1;h>e&&C(e,!0)}));const{autoplay:T,autoplayInterval:L}=a;Q((()=>{if(!T||g)return;let e;return e=window.setTimeout((function t(){e=window.setTimeout(t,L),E()}),L),()=>{e&&window.clearTimeout(e)}}),[T,L,g,x]);const O={"--slide-size":`${a.slideSize}%`,"--track-offset":`${a.trackOffset}%`},V=Object.assign({},a.allowTouchMove?S():{}),A={};for(const i of a.stopPropagation){A[Z[i]]=function(e){e.stopPropagation()}}const F=function(e,t){const i=Object.keys(e),n=Object.keys(t),s=new Set([...i,...n]),a={};return s.forEach((i=>{const n=e[i],s=t[i];a[i]="function"==typeof n&&"function"==typeof s?function(...e){n(...e),s(...e)}:n||s})),a}(V,A);return n(a,_.createElement("div",{className:i(X,`${X}-${a.direction}`),style:O},_.createElement("div",Object.assign({ref:t,className:i(`${X}-track`,{[`${X}-track-allow-touch-move`]:a.allowTouchMove}),onClickCapture:e=>{var t;j.current&&e.stopPropagation(),null===(t=$.current)||void 0===t||t.call($),j.current=!1}},F),e?_.createElement("div",{className:`${X}-track-inner`},_.Children.map(u,((e,t)=>_.createElement(c.div,{className:`${X}-slide`,style:{[d?"y":"x"]:N.to((e=>{let i=100*t-e;const n=100*x,s=n/2;return i=ie(i+s,n)-s,`${i}%`})),[d?"top":"left"]:`-${100*t}%`}},e)))):_.createElement(c.div,{className:`${X}-track-inner`,style:{[d?"y":"x"]:N.to((e=>-e+"%"))}},_.Children.map(u,(e=>_.createElement("div",{className:`${X}-slide`},e))))),void 0===a.indicator?_.createElement("div",{className:`${X}-indicator`},_.createElement(I,Object.assign({},a.indicatorProps,{total:x,current:h,direction:a.direction}))):a.indicator(x,h)))}:null}))),{Item:H}),se=({className:e,title:t,children:i,rightIcon:n,onClick:s,hasMore:a,contentClass:r})=>d.jsxs(ae,{className:e,onClick:s,children:[d.jsx("div",{className:"cell-label",children:t}),d.jsx("div",{className:`cell-content ${r}`,children:i}),d.jsx("div",{className:"cell-right",children:a&&d.jsx(p,{name:"more",className:"right-svg"})})]}),ae=l.div`
	padding: 10px 0;
	display: flex;
	align-items: center;
	.cell-label {
		margin-right: 10px;
		min-width: 40px;
		font-size: var(--font-size-xm);
		font-weight: 500;
		color: var(--color-font-grey);
	}
	.cell-content {
		display: flex;
		flex: 1 1;
		overflow: hidden;
	}
	.cell-right {
		.right-svg {
			width: var(--font-size-m);
			height: var(--font-size-m);
			color: var(--color-font-grey);
		}
	}
`,re=window.React.useState,oe=window.React.useEffect,ce=window.React.useMemo,le=()=>{var e,t,i,n,s,a,r,o;const{id:c}=m(),{data:l,finished:k}=j((()=>w(c))),[z,R]=re(null),[S,C]=re(!1),[E,M]=re(!1),[I,T]=re(!1),L=u(),O=x(),V=f(h),[A,F]=re(null),[D,H]=re(1),q=ce((()=>null==z?void 0:z.itemsSkuListVO),[z]),B=(null==q?void 0:q.itemsSkuList.length)>4,[U,_]=ce((()=>q?[q.itemsSkuList,B?q.itemsSkuList.slice(0,3):q.itemsSkuList]:[[],[]]),[q,B]),K=(null==(t=null==(e=null==z?void 0:z.activityInfoVO)?void 0:e.couponList)?void 0:t.length)>0,Q=(null==(i=null==z?void 0:z.progressActivityInfoVO)?void 0:i.length)>0,W=null==(n=null==z?void 0:z.advState)?void 0:n.preSale;return oe((()=>{k&&R(l.data)}),[l,k]),oe((()=>{F(W?U[0]:U.find((e=>e.stock>0)))}),[U]),k&&z?d.jsxs(de,{children:[d.jsxs(N,{className:"img-content",children:[d.jsxs("header",{className:"page-header",children:[d.jsx("div",{className:"back-btn",onClick:()=>L(-1),children:d.jsx(p,{name:"back",className:"back-svg"})}),d.jsxs("div",{className:"right-btn",onClick:()=>L("/shop/cart"),children:[d.jsx(p,{name:"cart",className:"back-svg"}),V>0&&d.jsx("span",{className:"cart-count",children:V})]})]}),d.jsx(ne,{loop:!0,children:z.img.map(((e,t)=>d.jsx(ne.Item,{children:d.jsx("div",{className:"product-img",children:d.jsx(v,{src:e})})},t)))}),d.jsxs("div",{className:"titles",children:[d.jsxs("div",{className:"price",children:[W?"定金 ":"","¥",d.jsx("b",{children:W?null==(s=null==z?void 0:z.advState)?void 0:s.deposit:z.price}),W?" 起":""]}),d.jsxs("div",{className:"title",children:[d.jsx("p",{className:"name",children:z.name}),d.jsxs("div",{className:"like",children:[d.jsx(p,{name:"heart",className:"like-svg"}),z.itemsLikeVO.count]})]}),(null==(a=null==z?void 0:z.itemTags)?void 0:a.length)>1&&d.jsx("div",{className:"rank-tags line-top-1px",children:z.itemTags.map((e=>d.jsx("p",{className:"tag",children:e.name},e.name)))})]})]}),(Q||K)&&d.jsxs(N,{children:[K&&d.jsx(d.Fragment,{children:d.jsx(se,{title:"优惠",hasMore:!0,onClick:()=>T(!0),children:z.activityInfoVO.couponList.slice(0,2).map((e=>d.jsx("p",{className:"coupon ellipsis-line-1",children:e.showName},e.couponId)))})}),Q&&d.jsx(d.Fragment,{children:d.jsx(se,{title:"活动",hasMore:!0,onClick:()=>T(!0),children:z.progressActivityInfoVO.slice(0,1).map((e=>d.jsxs("p",{className:"content-item",children:[d.jsx("span",{className:"activity-name",children:e.activityName}),d.jsx("span",{className:"activity-des",children:e.description})]},e.activityId)))})}),(Q||K)&&d.jsx(g,{visible:I,onMaskClick:()=>T(!1),bodyStyle:{borderTopLeftRadius:"10px",borderTopRightRadius:"10px"},children:d.jsxs(ue,{children:[d.jsx("header",{children:"详细信息"}),(null==(r=null==z?void 0:z.progressActivityInfoVO)?void 0:r.length)>0&&d.jsxs("div",{className:"section-wrapper",children:[d.jsx("p",{className:"title",children:"促销活动"}),d.jsx("div",{className:"content",children:z.progressActivityInfoVO.map((e=>d.jsxs("p",{children:[d.jsx("span",{className:"activity-name",children:e.activityName}),d.jsx("span",{className:"activity-des",children:e.description})]},e.activityId)))})]}),K&&d.jsxs("div",{className:"section-wrapper",children:[d.jsx("p",{className:"title",children:"优惠券"}),d.jsx("div",{className:"content",children:z.activityInfoVO.couponList.map((e=>d.jsxs("div",{className:"coupon-box",children:[d.jsxs("div",{className:"coupon-des",children:[d.jsxs("p",{className:"coupon-des-price",children:["¥",d.jsx("span",{children:e.discount})]}),d.jsx("p",{className:"coupon-des-detail",children:e.couponTypeDesc})]}),d.jsxs("div",{className:"coupon-right",children:[d.jsxs("div",{className:"coupon-info .ellipsis-line-1",children:[d.jsx("p",{className:"coupon-info-name",children:e.showName}),d.jsxs("p",{className:"coupon-info-expire",children:["有效期：",$(e)]})]}),d.jsx("div",{className:"coupon-btn",children:"可领取"})]})]},e.couponId)))})]})]})})]}),d.jsxs(N,{children:[z.attrList.length>0&&d.jsxs(d.Fragment,{children:[d.jsx(se,{title:"参数",hasMore:!0,onClick:()=>C(!0),children:z.attrList.map(((e,t)=>d.jsx("p",{className:"content-item",children:e.attrName},t)))}),d.jsx(g,{visible:S,onMaskClick:()=>C(!1),bodyStyle:{borderTopLeftRadius:"10px",borderTopRightRadius:"10px"},children:d.jsxs(pe,{children:[d.jsx("header",{children:"参数详细"}),z.attrList.map(((e,t)=>d.jsx(se,{title:e.attrName,contentClass:"attr-content",children:Array.isArray(e.attrValue)?e.attrValue.map((e=>e)):e.attrValue},t)))]})})]}),q&&d.jsxs(d.Fragment,{children:[d.jsxs(se,{title:q.specs[0],hasMore:!0,onClick:()=>M(!0),children:[_.map(((e,t)=>d.jsx("div",{className:"content-item",children:d.jsx(v,{src:`${e.img}@1c.webp`,className:"sku-img"})},t))),B&&d.jsx("div",{className:"content-item",children:d.jsx("div",{className:"sku-img sku-img-more",children:`共${q.itemsSkuList.length}款可选`})})]}),d.jsx(g,{visible:E,onMaskClick:()=>M(!1),bodyStyle:{borderTopLeftRadius:"10px",borderTopRightRadius:"10px"},children:d.jsxs(me,{children:[d.jsxs("div",{className:"img-price",children:[d.jsx("div",{className:"popup-img-wrapper",children:d.jsx(v,{src:null==A?void 0:A.img,alt:"",width:"100%",height:100})}),d.jsxs("div",{className:"price-wrapper",children:[d.jsxs("div",{className:"price",children:[W?"定金：":"","¥",d.jsx("b",{children:W?null==A?void 0:A.deposit:null==A?void 0:A.price})]}),A&&d.jsxs("div",{className:"price",children:[W?"预售价":"预估到手"," ¥",d.jsx("b",{children:A.price*D})]})]})]}),d.jsxs("div",{className:"selectors",children:[d.jsx("p",{children:q.specs[0]}),d.jsx("div",{className:"selectors-wrapper",children:U.map((e=>d.jsx("p",{className:`selector ${A===e&&"active"} ${e.stock<1&&!W&&"disabled"}`,onClick:()=>{(e.stock>1||W)&&F(e)},children:e.specValues[0]},e.id)))})]}),d.jsxs("div",{className:"num-picker-wrapper line-bottom-1px line-top-1px",children:[d.jsxs("p",{children:["数量确认",z.restriction&&d.jsxs("span",{className:"extra-info",children:["（每人限购",z.restriction,"件）"]})]}),d.jsx(y,{defaultValue:1,min:1,max:Math.min(null==z?void 0:z.restriction,null==A?void 0:A.stock),onChange:e=>H(e)})]}),d.jsxs("div",{className:"btns",children:[d.jsx("button",{className:"btn btn-outline",onClick:()=>{O(b({...A,productInfo:z,number:D})),M(!1)},children:"加购物车"}),d.jsx("button",{className:"btn btn-solid",children:"立即购买"})]})]})})]}),W&&d.jsx(d.Fragment,{children:d.jsx(se,{title:d.jsxs(d.Fragment,{children:["预售",d.jsx("br",{}),"流程"]}),children:d.jsx("div",{className:"steps-wrapper",children:d.jsx(P,{children:null==(o=z.advState)?void 0:o.state.map(((e,t,i)=>{var n;const{year:s,month:a,day:r}=e.timeNode,o=`${s}.${a}${r?"."+r:""}`,c=e.active,l=null==(n=i[t+1])?void 0:n.active,p=c&&l?"finish":c&&!l?"process":"wait";return d.jsx(P.Step,{title:e.process,description:d.jsx("p",{className:e.active?"active":"",children:o}),status:p},e.process)}))})})})}),d.jsx("div",{className:"rank-tags line-top-1px",children:z.commitmentTag.map((e=>d.jsx("p",{className:"tag",children:e.name},e.name)))})]}),z.mobileDesc&&d.jsx(N,{leftTitle:"商品详情",contentClass:"product-info-content",children:d.jsx("div",{dangerouslySetInnerHTML:{__html:z.mobileDesc}})}),d.jsx(N,{leftTitle:"运费说明",children:d.jsx("span",{children:"不满足包邮条件的订单，江浙沪地区 10 元运费，其他地区 15 元，实际订单运费请以结算页显示为准。可配送区域为中国大陆地区 (除特殊偏远地区)，收件地址在此之外的区域请勿下单。"})})]}):d.jsx("p",{children:"loading product"})},de=l.div`
	background: var(--color-background-grey);
	header.page-header {
		position: absolute;
		top: 10px;
		left: 10px;
		right: 10px;
		z-index: 1;
		display: flex;
		justify-content: space-between;

		.right-btn,
		.back-btn {
			flex: none;
			padding: 5px;
			border-radius: 50%;
			background: #ededed;
			display: flex;
			justify-content: center;
			align-items: center;
			.back-svg {
				width: 20px;
				height: 20px;
				color: var(--color-font-grey);
			}
		}
		.right-btn {
			position: relative;
			.cart-count {
				position: absolute;
				right: 0;
				top: -7px;
				padding: 0 2px;
				background: var(--color-main-4);
				border-radius: 50%;
				color: #fff;
				width: 15px;
				height: 15px;
				text-align: center;
				font-size: var(--font-size-xs);
			}
		}
	}

	.img-content {
		padding: 0;
		.titles {
			padding: 10px;
			.price {
				font-size: var(--font-size-xm);
				font-weight: 500;
				color: var(--color-main-4);
				b {
					font-size: var(--font-size-xl);
				}
			}
			.title {
				display: flex;
				padding-bottom: 10px;
				.name {
					font-size: var(--font-size-m);
					font-weight: 500;
				}
				.like {
					margin-left: 10px;
					font-size: var(--font-size-s);
					.like-svg {
						width: 20px;
					}
				}
			}
			.tag {
				background: var(--color-main-detail);
				color: #fff;
				font-size: var(--font-size-xm);
			}
		}
	}

	.content-item {
		margin-left: 10px;
		&:first-child {
			margin: 0;
		}

		.activity-name {
			padding: 0 2px;
			font-size: var(--font-size-xxs);
			border: 1px solid var(--color-main-4);
			color: var(--color-main-4);
		}
		.activity-des {
			margin-left: 5px;
			font-size: var(--font-size-xxs);
		}
	}

	.coupon {
		margin-left: 5px;
		font-size: var(--font-size-xxs);
		background: var(--color-main-negative);
		padding: 2px 3px;
		color: var(--color-main-5);
		border-radius: var(--radius);
		font-weight: 400;
		&:first-child {
			margin: 0;
		}
	}

	.sku-img {
		width: 50px;
		height: 50px;
		border-radius: var(--radius);
		background: var(--color-background-grey);
		&-more {
			padding: 5px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: var(--font-size-s);
			text-align: center;
		}
	}
	.rank-tags {
		width: 100%;
		padding-top: 10px;
		display: flex;
		flex-wrap: wrap;
		.tag {
			flex: none;
			margin-bottom: 5px;
			margin-right: 5px;
			padding: 3px;
			border-radius: var(--radius);
			font-size: var(--font-size-s);
			font-weight: 400;
			background: var(--color-border);
			color: var(--color-font-grey);
		}
	}

	.section-title {
		font-size: var(--font-size-xm);
	}
	.product-info-content {
		width: 100%;
		overflow-x: hidden;
		img {
			width: 100%;
		}
	}

	.steps-wrapper {
		margin-right: 5px;
		border-radius: var(--radius);
		width: 100%;
		background: linear-gradient(
			90.01deg,
			#e47ca247 2.19%,
			rgba(255, 251, 245, 0.1) 115.35%
		);
		.adm-step {
			--line-to-next-color: #fff;
			--icon-color: #fff;
		}
		.adm-step-status-process {
			--icon-color: var(--color-main);
		}
		.adm-step-content {
			font-weight: 500;
			.adm-step-title {
				font-size: var(--font-size-xs);
			}
			.adm-step-description {
				font-size: var(--font-size-xxs);
				.active {
					color: var(--color-main);
				}
			}
		}
	}
`,pe=l.div`
	padding: 10px 20px;
	min-height: 80vh;
	header {
		text-align: center;
	}
	.attr-content {
		font-size: var(--font-size-xm);
	}
`,me=l.div`
	padding: 10px 20px;
	max-height: 60vh;
	position: relative;

	.img-price {
		display: flex;
		margin-bottom: 10px;
		.popup-img-wrapper {
			background: var(--color-background);
			width: 100px;
			box-shadow: var(--shadow);
			border-radius: var(--radius);
			position: absolute;
			transform: translateY(-50%);
			overflow: hidden;
			img {
				width: 100%;
			}
		}
		.price-wrapper {
			margin-left: 120px;
			.price {
				font-size: var(--font-size-xm);
				font-weight: 500;
				color: var(--color-main-4);
				b {
					font-size: var(--font-size-xl);
				}
			}
		}
	}
	.selectors {
		font-size: var(--font-size-xm);
		font-weight: 500;
		&-wrapper {
			margin-top: 10px;
			display: flex;
			flex-wrap: wrap;
			.selector {
				margin-right: 10px;
				margin-bottom: 10px;
				padding: 5px 10px;
				border-radius: 20px;
				border: 1px var(--color-border) solid;
				color: var(--color-font-grey);
				font-size: var(--font-size-xm);
				font-weight: 400;
				&.active {
					border-color: var(--color-main);
					color: var(--color-main);
				}
				&.disabled {
					background: var(--color-border);
				}
			}
		}
	}
	.num-picker-wrapper {
		margin: 10px 0;
		padding: 10px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: var(--font-size-xm);
		font-weight: 500;
		.extra-info {
			font-size: var(--font-size-s);
			font-weight: 300;
		}
		.num-picker {
			display: flex;
		}
	}
	.btns {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.btn {
			flex-grow: 1;
			padding: 10px;
			font-size: var(--font-size-m);
			border-radius: 30px;
			margin: 5px;
			margin-right: 10px;
			outline: 0;
			border: 0;
			background: var(--color-background);
			&-outline {
				outline: 1px solid var(--color-main);
				color: var(--color-main);
			}
			&-solid {
				background: var(--color-main);
				color: var(--color-background);
			}
		}
	}
`,ue=l.div`
	padding: 10px 20px;
	min-height: 60vh;
	max-height: 80vh;
	overflow-y: scroll;
	header {
		text-align: center;
	}
	.section-wrapper {
		margin: 10px 0;
		.title {
			font-size: var(--font-size-xm);
			font-weight: 500;
		}
		.content {
			.activity-name {
				padding: 0 2px;
				font-size: var(--font-size-s);
				border: 1px solid var(--color-main-4);
				color: var(--color-main-4);
			}
			.activity-des {
				margin-left: 5px;
				font-size: var(--font-size-s);
			}
			.coupon-box {
				display: flex;
				margin: 5px 0;
				box-shadow: 0 0 3px 1px #efefef;
				border-radius: var(--radius);
				.coupon-des {
					flex: none;
					width: 100px;
					padding: 15px 5px;
					background: var(--color-main-negative);
					display: flex;
					flex-direction: column;
					justify-content: center;
					text-align: center;
					align-items: center;
					border-radius: var(--radius) 0 0 var(--radius);
					overflow: hidden;

					&-price {
						font-weight: 500;
						span {
							font-size: 30px;
						}
					}
					&-detail {
						font-size: var(--font-size-s);
						font-weight: 500;
					}
				}
				.coupon-right {
					position: relative;
					flex: auto;
					border-radius: 0 var(--radius) var(--radius) 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					// border-1px
					&:after {
						position: absolute;
						content: "";
						top: 0;
						left: 0;
						width: 200%;
						height: 200%;
						border: 1px var(--color-border) solid;
						border-left: 0;
						border-radius: 0 calc(2 * var(--radius)) calc(2 * var(--radius)) 0;
						transform: scale(0.5);
						transform-origin: 0 0;
					}
					.coupon-info {
						margin-left: 5px;
						&-name {
							font-size: var(--font-size-xm);
							font-weight: 500;
						}
						&-expire {
							font-size: var(--font-size-xs);
							color: var(--color-font-grey);
						}
					}
					.coupon-btn {
						position: relative;
						margin: 0 10px;
						flex: none;
						font-size: var(--font-size-s);
						padding: 5px;
						color: var(--color-main-4);
						&::after {
							content: "";
							position: absolute;
							top: 0;
							left: 0;
							width: 200%;
							height: 200%;
							border: 1px solid var(--color-main-4);
							border-radius: calc(var(--radius) * 2);
							transform: scale(0.5);
							transform-origin: 0 0;
						}
					}
				}
			}
		}
	}
`;export{le as default};
