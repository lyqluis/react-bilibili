import{a as e,ba as i,bb as t,bc as s,q as n,ac as a,j as r,x as o,a7 as d,I as l,a5 as c,a2 as h,z as u,s as f,p as m}from"./index-b58dd535.js";import{H as p}from"./Header-cee3ca8b.js";import{E as g}from"./ellipsis-ad9ae571.js";import"./use-resize-effect-141f9116.js";class v{constructor(e,i,t,s){this.mediaInfo=e,this.mediaSource=i,this.el=t,this.mediaUrl=s,this.sourceBuffer=i.addSourceBuffer(e.mimeCodec),this.sidx=[],this.initialData={},this.currentSegmentIndex=0,this.inited=!1,this.cleared=!0,this.buffer=10,this.seeking=!1,this.queue=[],this.fetchQueue=[],this.onSourceBufferUpdateEnd(),this.init(),this.el.addEventListener("error",(()=>{}))}async init(){this.cleared=!1,this.inited=!1,await this.addSegment("initialization")}clear(){this.sourceBuffer.buffered.start(0);const e=this.sourceBuffer.buffered.end(0);this.cleared=!0,this.sourceBuffer.remove(0,e),this.queue=[],this.fetchQueue=[]}changeBuffer(e){this.currentSegmentIndex=this.findSegmentIndex(e),this.clear()}onSourceBufferUpdateEnd(){this.sourceBuffer.addEventListener("updateend",(async()=>{if(!this.cleared)return this.inited?void(this.sourceBuffer.buffered.length?this.loadMoreBuffer():await this.addSegment(this.currentSegmentIndex)):(await this.addSegment("index_range"),void(this.inited=!0));this.init()}))}async addSegment(i="initialization"){const t="initialization"===i,s="index_range"===i;if(this.initialData[i]){const e=this.initialData[i];return void this.sourceBuffer.appendBuffer(e)}if(t||s)i=this.mediaInfo.segment_base[i];else if("number"==typeof i){if(i>this.sidx.length-1)return;i=this.sidx[i].range}if(this.fetchQueue.includes(i))return;this.fetchQueue.push(i);const n=await e({url:this.mediaUrl,method:"post",headers:{range:`bytes=${i}`},data:{baseUrl:this.mediaInfo.baseUrl},responseType:"arraybuffer"});if(1===this.queue.length||this.queue.length>2){const e=this.queue.at(-1);if(parseInt(e.match(/-(\d*)/)[1])!==parseInt(i.match(/(\d*)-/)[1])-1&&this.length>=2)return}else if(!this.queue.length){if(0!==parseInt(i.match(/(\d*)-/)[1]))return}t||s?(s&&(this.sidx=x(n.data,this.mediaInfo.segment_base)),this.initialData[i]=n.data):this.currentSegmentIndex++,this.sourceBuffer.appendBuffer(n.data),this.queue.push(i)}findSegmentIndex(e){const t=this.sidx.findIndex((i=>i.startTime>e))-1;return i(t,0,this.sidx.length-1)}async loadMoreBuffer(e){const{currentTime:i}=this.el,t=this.findSegmentIndex(i);e=e??this.buffer,this.currentSegmentIndex-t<=e&&await this.addSegment(this.currentSegmentIndex)}getBufferRange(){return{start:this.sourceBuffer.buffered.start(0),end:this.sourceBuffer.buffered.end(0)}}}const x=(e,i)=>{const t=new DataView(e);let s,n=0;for(;(!s||"sidx"!==s.type)&&n<t.byteLength;)s=b(t,n),n+=s.len;n-=s.len,s=j(t,n);const a=s;let r=parseInt(i.index_range.split("-")[1])+1,o=0;return a.entries.map((e=>{const i=r,t=parseInt(r)+e.referenced_size-1;e.range=`${i}-${t}`,r=t+1;const n=e.timescale=s.timescale,a=e.duration=e.subsegment_duration/n;return e.startTime=o,o+=a,e}))},b=(e,i)=>{const t={};t.len=e.getUint32(i),i+=4;let s=e.getInt32(i);return t.type=function(e){for(var i="",t=0;t<e.length;t+=2)i+=String.fromCharCode(parseInt(e.substr(t,2),16));return i}(s.toString(16)).replace(/^\s\s*/,"").replace(/\s\s*$/,""),i+=4,t},j=(e,i)=>{const t=b(e,i);i+=8,t.version=e.getUint8(i),i+=4,t.reference_ID=e.getUint32(i),i+=4,t.timescale=e.getUint32(i),i+=4,t.earliest_presentation_time=e.getUint32(i),i+=4,t.first_offset=e.getUint32(i),i+=4,t.reserved=e.getUint16(i),i+=2,t.reference_count=e.getUint16(i),i+=2,t.entries=[];let s=t.reference_count;for(;s--;){let s={},n=e.getUint32(i);i+=4,s.reference_type=n>>31&1,s.referenced_size=2147483647&n,s.subsegment_duration=e.getUint32(i),i+=4,n=e.getUint32(i),i+=4,s.starts_with_SAP=n>>31&1,s.SAP_type=n>>29&7,s.SAP_delta_time=268435455&n,t.entries.push(s)}return t};class w{constructor(e,i){this.el=e,this.bvid=i,this.bufferTime=2,this.mediaInfo={video:null,audio:null,playInfo:null},this.buffers=[],this.removeBuffers={video:[],audio:[]},this.playing=!1,this.seeking=!1,this.e={onSourceOpen:this.onSourceOpen.bind(this),onSeeking:this.onSeeking.bind(this),onTimeUpdate:t(this.onTimeUpdate.bind(this),900)}}init({videoInfo:e,audioInfo:i,playInfo:t}){this.url=`https://bili.naozishigehaodongxi.tk/video/${this.bvid}`,this.mediaSource=new MediaSource;const n=e.mimeCodec=`${e.mimeType}; codecs="${e.codecs}"`,a=i.mimeCodec=`${i.mimeType}; codecs="${i.codecs}"`;this.mediaInfo.video=e,this.mediaInfo.audio=i,this.mediaInfo.playInfo=t,(s(n)||s(a))&&this.el&&this.mediaSource&&(this.el.src=URL.createObjectURL(this.mediaSource),this.mediaSource.addEventListener("sourceopen",this.e.onSourceOpen))}destroy(){this.mediaSource.removeEventListener("sourceopen",this.e.onSourceOpen),this.el.removeEventListener("seeking",this.e.onSeeking),this.el.removeEventListener("timeupdate",this.e.onTimeUpdate),this.el.src=null}onSourceOpen(){const e=new v(this.mediaInfo.video,this.mediaSource,this.el,this.url),i=new v(this.mediaInfo.audio,this.mediaSource,this.el,this.url);this.buffers.push(e,i),this.el.addEventListener("seeking",this.e.onSeeking),this.el.addEventListener("timeupdate",this.e.onTimeUpdate)}onTimeUpdate(e){if(this.seeking)return;const{currentTime:i}=e.target;this.buffers.map((e=>{const{end:t}=e.getBufferRange();t-i<this.bufferTime&&e.loadMoreBuffer()}))}onSeeking(e){this.seeking=!0;const{currentTime:i}=e.target;this.buffers.map((e=>{const{start:t,end:s}=e.getBufferRange();(i<t||i>=s)&&e.changeBuffer(i)})),this.seeking=!1}}const y=window.React.useState,S=window.React.useRef,N=window.React.useEffect,z=()=>{var i,t,s,f,m,v,x,b,j,z,k,_,B,U,T,V,$,E,L,C,R,q,D,O,M,Q,A,P,H,Y,X;const F=n(),{bvid:G}=a(),J=S(null),K=S(null),[W,Z]=y(null),ee=null==(s=null==(t=null==(i=null==W?void 0:W.View)?void 0:i.honor_reply)?void 0:t.honor)?void 0:s.find((e=>4===e.type)),ie=null==(v=null==(m=null==(f=null==W?void 0:W.View)?void 0:f.honor_reply)?void 0:m.honor)?void 0:v.find((e=>3===e.type));return N((()=>((async()=>{const i=await(t=G,e({method:"get",url:"/video/detail",params:{id:t}}).catch((e=>{})));var t;const{View:s}=i.data,n=await((i,t)=>e({method:"get",url:"/video/online",params:{bvid:i,cid:t}}).catch((e=>{})))(G,s.cid);s.online=n.data,Z(i.data)})(),(async()=>{const i=K.current=new w(J.current,G),t=await(s=G,e({method:"get",url:`/video/${s}`}).catch((e=>{})));var s;i.init(t)})(),()=>{K.current&&K.current.destroy()})),[G]),r.jsxs(I,{children:[r.jsx("header",{children:r.jsx(p,{title:"video page",onClickLeft:()=>F(-1)})}),r.jsxs("video",{ref:J,width:"100%",height:"auto",controls:!0,children:[r.jsx("source",{type:"application/dash+xml"}),"Your browser does not support the video tag."]}),r.jsxs("h3",{children:[r.jsxs("div",{className:"up-card",children:[r.jsx("div",{className:"up-avatar",children:r.jsx(o,{src:null==(b=null==(x=null==W?void 0:W.Card)?void 0:x.card)?void 0:b.face,width:"100%",height:"100%"})}),r.jsxs("div",{className:"up-info",children:[r.jsx("p",{className:"up-info-name",children:null==(z=null==(j=null==W?void 0:W.Card)?void 0:j.card)?void 0:z.name}),r.jsxs("p",{className:"up-info-stat",children:[r.jsxs("span",{children:[d(null==(k=null==W?void 0:W.Card)?void 0:k.follower,!0),"粉丝"]}),r.jsxs("span",{children:[null==(_=null==W?void 0:W.Card)?void 0:_.archive_count," 视频"]})]})]}),r.jsx("div",{className:"right-btns",children:r.jsx("div",{className:"btn",children:"关注 / 已关注"})})]}),r.jsxs("div",{className:"video-title",children:[ee?r.jsxs("div",{className:"hot-tag",children:[r.jsx(l,{name:"hot",className:"hot-tag-icon"}),ee.desc]}):null,null==(B=null==W?void 0:W.View)?void 0:B.title]}),ie?r.jsxs("div",{className:"top-tag",children:[r.jsx(l,{name:"hot",className:"top-tag-icon"}),ie.desc,r.jsx("div",{className:"right-btn",onClick:()=>F("/rank"),children:r.jsx(l,{name:"more",className:"top-tag-icon-right"})})]}):null,W&&r.jsxs("div",{className:"desc",children:[r.jsxs("p",{className:"desc-index",children:[r.jsxs("span",{className:"desc-index-detail",children:[r.jsx(l,{name:"play_count",className:"desc-index-detail-icon"}),r.jsx("span",{children:d(null==(T=null==(U=null==W?void 0:W.View)?void 0:U.stat)?void 0:T.view)})]}),r.jsxs("span",{className:"desc-index-detail",children:[r.jsx(l,{name:"danmaku",className:"desc-index-detail-icon"}),r.jsx("span",{children:null==($=null==(V=null==W?void 0:W.View)?void 0:V.stat)?void 0:$.danmaku})]}),r.jsxs("span",{className:"desc-index-detail",children:[r.jsx(l,{name:"watching",className:"desc-index-detail-icon"}),r.jsxs("span",{children:[null==(L=null==(E=null==W?void 0:W.View)?void 0:E.online)?void 0:L.total,"人正在看"]})]}),r.jsx("span",{className:"desc-index-detail",children:c(null==(C=null==W?void 0:W.View)?void 0:C.ctime,{connector:".",needTime:!0,needYear:!0,needToday:!0})})]}),r.jsx("div",{className:"desc-text",children:r.jsx(g,{content:null==(R=null==W?void 0:W.View)?void 0:R.desc,expandText:"展开",collapseText:"收起"})})]}),r.jsxs("div",{className:"three-btns",children:[r.jsxs("div",{className:"three-btns-btn",children:[r.jsx(l,{name:"good_fill",className:"three-btns-btn-icon"}),r.jsx("p",{children:d(null==(D=null==(q=null==W?void 0:W.View)?void 0:q.stat)?void 0:D.like)})]}),r.jsxs("div",{className:"three-btns-btn",children:[r.jsx(l,{name:"coin_fill",className:"three-btns-btn-icon"}),r.jsx("p",{children:d(null==(M=null==(O=null==W?void 0:W.View)?void 0:O.stat)?void 0:M.coin)})]}),r.jsxs("div",{className:"three-btns-btn",children:[r.jsx(l,{name:"collection_fill",className:"three-btns-btn-icon"}),r.jsx("p",{children:d(null==(A=null==(Q=null==W?void 0:W.View)?void 0:Q.stat)?void 0:A.favorite)})]}),r.jsxs("div",{className:"three-btns-btn",children:[r.jsx(l,{name:"good_fill",className:"three-btns-btn-icon dislike"}),r.jsx("p",{children:d(null==(H=null==(P=null==W?void 0:W.View)?void 0:P.stat)?void 0:H.dislike)})]}),r.jsxs("div",{className:"three-btns-btn",children:[r.jsx(l,{name:"share_fill",className:"three-btns-btn-icon"}),r.jsx("p",{children:d(null==(X=null==(Y=null==W?void 0:W.View)?void 0:Y.stat)?void 0:X.share)})]})]}),(null==W?void 0:W.Tags)&&r.jsx("div",{className:"tags",children:null==W?void 0:W.Tags.map((e=>r.jsx("div",{className:"tag",children:e.tag_name},e.tag_id)))})]}),r.jsxs("div",{className:"related-videos line-top-1px",children:[r.jsx("p",{className:"video-list-title",children:"相关推荐"}),r.jsx("div",{className:"video-list",children:null==W?void 0:W.Related.map((e=>r.jsx(h,{item:e},e.aid)))}),r.jsx(u,{hasMore:!1})]})]})},I=f.div`
	header {
		height: ${m`45px`};
		background: var(--color-background);
		z-index: 1;
	}
	video {
		background: var(--color-background);
		position: sticky;
		top: 0;
		z-index: 1;
		box-shadow: 0 5px 5px 2px rgba(0, 0, 0, 0.1);
	}
	.up-card {
		margin: 10px 0;
		padding: 0 12px;
		display: flex;
		align-items: center;
		position: relative;

		.up-avatar {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.up-info {
			margin-left: 12px;
			&-name {
				font-size: var(--font-size-xm);
				color: var(--color-main-4);
			}
			&-stat {
				span {
					margin-right: 10px;
					font-size: var(--font-size-xs);
					color: var(--color-font-grey);
				}
			}
		}
		.right-btns {
			position: absolute;
			right: 12px;
		}
	}
	.video-title {
		padding: 0 12px;
		display: flex;
		align-items: center;
		font-size: var(--font-size-m);
		.hot-tag {
			margin-right: 5px;
			padding: 2px 7px;
			display: flex;
			align-items: center;
			font-size: var(--font-size-s);
			color: var(--color-main-4);
			background: var(--color-background-grey);
			border-radius: 10px;
			&-icon {
				margin-right: 3px;
				color: var(--color-main-4);
				width: var(--font-size-xs);
				height: var(--font-size-xs);
			}
		}
	}
	.top-tag {
		margin: 10px 12px;
		padding: 7px;
		display: flex;
		align-items: center;
		font-size: var(--font-size-s);
		font-weight: 600;
		color: var(--color-main-4);
		background: #f8c0da44;
		border-radius: var(--radius);
		position: relative;
		&-icon {
			margin-right: 5px;
			color: var(--color-main-4);
			width: var(--font-size-s);
			height: var(--font-size-s);
		}
		&-icon-right {
			position: absolute;
			right: 7px;
			color: var(--color-main-4);
			width: var(--font-size-s);
			height: var(--font-size-s);
		}
	}
	.desc {
		padding: 0 12px;
		font-size: var(--font-size-s);
		color: var(--color-font-grey);
		--adm-color-primary: var(--color-main-4);

		&-index {
			display: flex;
			align-items: center;

			&-detail {
				display: flex;
				align-items: center;
				margin-right: 7px;
				font-weight: 300;

				&-icon {
					width: var(--font-size-xm);
					height: var(--font-size-xm);
					color: var(--color-font-grey);
					margin-right: 3px;
				}
			}
		}
		&-text {
			white-space: pre-wrap;
			font-weight: 400;
		}
	}
	.three-btns {
		margin: 10px 0;
		padding: 0 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			&-icon {
				width: ${m`22px`};
				height: ${m`22px`};
				color: var(--color-font-grey);
			}
			.dislike {
				transform: scaleX(-1) rotate(180deg);
			}
			p {
				font-size: var(--font-size-s);
				color: var(--color-font-grey);
				margin: 5px auto;
			}
		}
	}
	.tags {
		padding: 0 12px;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.tag {
			margin: 5px 10px 5px 0;
			padding: 3px 10px;
			font-size: var(--font-size-s);
			color: var(--color-font-grey);
			background: var(--color-background-grey);
			border-radius: 20px;
		}
	}
	.related-videos {
		margin-top: 10px;
		padding: 12px;
		.video-list {
			display: grid;
			grid-template-columns: auto auto;
			grid-gap: ${m`10px`};
			&-title {
				font-size: var(--font-size-xm);
				font-weight: 400;
				margin-bottom: 10px;
			}
		}
	}
`;export{z as default};
