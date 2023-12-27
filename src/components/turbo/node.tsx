import React, { memo, ReactNode } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { FiCloud } from "react-icons/fi";
import { DrawerDemo } from "../drawer-demo";

// type: z.enum(goalTypes),
//   date: z.date().optional(),
//   time: z.string().optional(),
//   description: z.string().optional(),
//   goal: z.string(),
//   attachable: z.boolean(),

export type TurboNodeData = {
  type: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  date: Date;
  time: string;
  description: string;
  goal: string;
  attachable: boolean;
};

const TurboNode = ({ data }: NodeProps<TurboNodeData>) => {
  return (
    <>
      <div className="cloud gradient">
        <div className="bg-white dark:bg-slate-900">
          <FiCloud />
        </div>
      </div>
      <div className="wrapper gradient">
        <div className="inner bg-white dark:bg-slate-900">
          <DrawerDemo {...data} />
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </div>
      </div>
    </>
  );
};

export default memo(TurboNode);
