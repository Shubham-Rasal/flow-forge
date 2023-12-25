import React from "react";

const Background = () => {
  return (
    <div
      className="absolute inset-0 -z-10 h-screen w-full items-center px-5 py-24
    bg-slate-100 [background:radial-gradient(125%_125%_at_40%_10%,#f1f5f9_60%,#63e_100%)]
    dark:[background:radial-gradient(125%_125%_at_30%_10%,#000_50%,#63e_100%)]"
    ></div>
  
  );
};

export default Background;
