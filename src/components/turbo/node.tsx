import React, { memo, ReactNode } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { UpdateDrawer } from "../drawer-demo";
import { LockClosedIcon, LockOpen2Icon } from "@radix-ui/react-icons";
import { CheckCircle } from "lucide-react";

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
          {props.data.attachable ? <CheckCircle /> : <LockClosedIcon />}
        </div>
      </div>
      <div className="wrapper gradient">
        <div className="inner">
            <UpdateDrawer {...props} />
        </div>
        <Handle
          className="w-5 h-5"
          type="target"
          position={Position.Top}
          isConnectable={data.attachable}
        />
        <Handle
          className="bg-teal-200"
          type="source"
          position={Position.Bottom}
          isConnectable={data.attachable}
        />
      </div>
    </>
  );
};

export default memo(TurboNode);
