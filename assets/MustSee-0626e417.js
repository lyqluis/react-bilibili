import{j as s,L as a,u as e,ay as t,aF as i,c as r,aG as n}from"./index-b58dd535.js";import{L as l}from"./index-dc19943f.js";import{L as m}from"./ListCard-e5835cc4.js";import{u as d}from"./useRequest-e96b32f6.js";const o=window.React.useEffect,j=new Array(10).fill(null).map(((e,t)=>s.jsx(l.Item,{children:s.jsx(a,{})},t))),u=()=>{const a=e(t("mustSeeList")),{data:u,finished:c}=d(i,a),f=r();return o((()=>{c&&f(n(u.data.list))}),[u]),a.length?s.jsx(l,{children:(null==a?void 0:a.length)>0&&a.map((a=>s.jsx(l.Item,{arrow:!1,children:s.jsx(m,{item:a})},a.aid)))}):s.jsx(l,{children:j})};export{u as default};
