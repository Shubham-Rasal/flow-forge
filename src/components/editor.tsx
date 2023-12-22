import React from "react";
import { Editor } from "novel";

const NovelEditor = () => {
  return (
    <div className='flex max-h-screen absolute'>
      <Editor className='bg-teal-950 text-slate-200 max-h-fit'/>
    </div>
  );
};

export default NovelEditor;
