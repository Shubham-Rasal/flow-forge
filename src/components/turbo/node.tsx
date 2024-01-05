import React, { memo, ReactNode } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { UpdateDrawer } from "../drawer-demo";
import { LockClosedIcon, LockOpen2Icon } from "@radix-ui/react-icons";

export type TurboNodeData = {
  type: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  date: Date;
  time: string;
  description: string;
  goal: string;
  attachable: boolean;
};

const TurboNode = (props: NodeProps<TurboNodeData>) => {
  const { data } = props;
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
        </div>
      </div>
          <Handle className="bg-red-200  text-white" type="target" position={Position.Top} isConnectable={data.attachable} />
          <Handle className="bg-teal-200 w-5 h-5" type="source" position={Position.Bottom} isConnectable={data.attachable} />
    </>
  );
};

export default memo(TurboNode);
