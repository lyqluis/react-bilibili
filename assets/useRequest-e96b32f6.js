const a=window.React.useState,e=window.React.useEffect,n=window.React.useMemo,t={manual:!1,ready:!0,params:[],pollingInterval:0,deps:[]},s=(s,l)=>{const[c,o]=a(!1),[r,d]=a(!1),[i,u]=a(null),[p,w]=a(null);l=Object.assign(t,l);const{manual:m,params:y,ready:f,pollingInterval:g,deps:h}=l,R=async()=>{try{o(!0),d(!1),w(null);const a=await s(...y);u(a)}catch(a){w(a)}finally{o(!1),d(!0)}};e((()=>{m||R()}),[m,...h]);const v=n((()=>i),[i]);return{loading:c,data:i,finished:r,err:p,request:R,cachedData:v}};export{s as u};
