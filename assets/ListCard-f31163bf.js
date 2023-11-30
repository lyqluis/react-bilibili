import{q as i,a6 as a,j as s,x as e,I as n,a7 as o,a5 as t,s as r,p as l}from"./index-87bdad0d.js";function c({item:r,isHistory:l=!1}){var c,m,p;const x=i(),u=l?r.progress<0?"已看完":"专栏"===r.badge?"专栏":0===r.progress&&0===r.duration?"直播":`${a(r.progress)}/${a(r.duration)}`:a(r.duration);return s.jsxs(d,{onClick:()=>{x(`/video/${r.bvid}`)},children:[s.jsxs("div",{className:"item-pic",children:[s.jsx(e,{lazy:!0,fit:"cover",width:"100%",height:"100%",src:`${r.pic??r.cover}@480w_270h_1c.webp`}),r.is_union_video&&s.jsx("div",{className:"pic-tag",children:"合作"}),s.jsx("div",{className:"pic-duration",children:(null==r?void 0:r.length)??u})]}),s.jsxs("div",{className:"item-info",children:[s.jsx("p",{className:"item-info-title multi-ellipsis-line-2",dangerouslySetInnerHTML:{__html:r.title}}),s.jsxs("div",{className:"item-info-detail",children:[s.jsxs("p",{className:"creator",children:[s.jsx(n,{name:"up",className:"icon"}),r.author??(null==(c=null==r?void 0:r.owner)?void 0:c.name)??r.author_name]}),s.jsxs("p",{className:"state",children:[!l&&s.jsxs("span",{className:"play-amount",children:[s.jsx(n,{name:"play_count",className:"icon"}),o(r.play??(null==(m=null==r?void 0:r.stat)?void 0:m.view))]}),!l&&s.jsxs("span",{className:"danmaku-amount",children:[s.jsx(n,{name:"danmaku",className:"icon"}),o(r.danmaku??(null==(p=null==r?void 0:r.stat)?void 0:p.danmaku)??r.video_review)]}),l&&s.jsxs("span",{className:"danmaku-amount",children:[s.jsx(n,{name:"history",className:"icon"}),t(r.view_at)]})]})]})]})]})}const d=r.div`
	display: flex;

	.item-pic {
		flex: none;
		position: relative;
		width: ${l`139.98px`};
		height: ${l`85.98px`};
		border-radius: var(--radius);
		overflow: hidden;
		margin-right: ${l`10px`};

		.pic-tag,
		.pic-duration {
			position: absolute;
			right: 5px;
			color: var(--color-background);
			font-size: var(--font-size-xs);
			font-weight: 100;
			padding: 0 2px;
			border-radius: 3px;
		}
		.pic-tag {
			top: 5px;
			background: var(--color-main);
		}
		.pic-duration {
			bottom: 5px;
			background: rgba(0, 0, 0, 0.5);
		}
	}

	.item-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		&-title {
			font-size: var(--font-size-xm);
		}

		&-detail {
			font-size: var(--font-size-xs);
			color: var(--color-font-grey);

			.icon {
				width: var(--font-size-m);
				height: var(--font-size-m);
				color: var(--color-font-grey);
				margin-right: 2px;
			}

			.creator {
				display: flex;
			}

			.state {
				display: flex;
				font-weight: 300;

				span {
					display: flex;
					align-items: center;
					margin-right: 10px;
				}
			}
		}
	}
`;export{c as L};
