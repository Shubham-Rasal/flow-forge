import React, { memo, ReactNode } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { UpdateDrawer } from "../drawer-demo";
import { LockClosedIcon, LockOpen2Icon } from "@radix-ui/react-icons";

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

const TurboNode = (props: NodeProps<TurboNodeData>) => {
  return (
    <>
      <div className="cloud gradient">
        <div className="bg-white dark:bg-slate-900">
          {props.data.attachable ? <LockOpen2Icon /> : <LockClosedIcon />}
        </div>
      </div>
      <div className="wrapper gradient">
        <div className="inner bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
          <UpdateDrawer {...props} />
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </div>
      </div>
    </>
  );
};

export default memo(TurboNode);
