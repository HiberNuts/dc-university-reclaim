import{r as l,i as r,j as e,C as c,S as i}from"./index-25d3d03b.js";function x(){const[s,n]=l.useState(null);return l.useEffect(()=>{r().then(t=>{(t==null?void 0:t.error)==!1&&n(t.data)})},[]),e.jsx("div",{className:"w-full mt-4 flex flex-col bg-shardeumWhite p-[12px] sm:p-[80px] text-black items-center  justify-center align-middle",children:e.jsxs("div",{className:"flex flex-col w-full space-y-12",children:[e.jsx("p",{className:"font-helvetica-neue-bold text-[64px]  items-center text-center  ",children:"Upcoming Contest"}),e.jsx("div",{className:"flex justify-center items-center",children:s?e.jsx(c,{id:s._id,...s}):e.jsx(i,{})})]})})}export{x as default};
