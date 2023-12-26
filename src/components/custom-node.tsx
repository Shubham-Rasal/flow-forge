import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { DrawerDemo } from "./drawer-demo";

type CustomNodeProps = {
  data: {
    name: string;
    job: string;
    emoji: string;
  };
};

function CustomNode({ data }: CustomNodeProps) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      {/* <DrawerDemo /> */}

      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
    </div>
  );
}

export default memo(CustomNode);
