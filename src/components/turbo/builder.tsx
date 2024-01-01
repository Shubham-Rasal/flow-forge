"use client";
import React, { useCallback, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  ControlButton,
  BackgroundVariant,
  OnConnectStart,
  OnConnectEnd,
  addEdge,
} from "reactflow";
import { shallow } from "zustand/shallow";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useFlowStore, RFState } from "./store";

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

import "reactflow/dist/base.css";
import "./index.css";
import TurboNode, { TurboNodeData } from "./node";
import TurboEdge from "./edge";
import FunctionIcon from "./icon";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { PlusCircleIcon } from "lucide-react";
import { CreateDrawer } from "../create-drawer";

const nodeTypes = {
  turbo: TurboNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

const defaultEdgeOptions = {
  type: "turbo",
  markerEnd: "edge-circle",
};

const TurboBuilder = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowStore(selector, shallow);

  return (
    <div className="relative h-screen w-full dark:bg-neutral-950  justify-center items-center">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Controls
          showInteractive={true}
          className="bg-white text-black dark:bg-slate-900"
        >
          <CreateDrawer />
        </Controls>
        <svg>
          <defs>
            <linearGradient id="edge-gradient">
              <stop offset="0%" stopColor="#ae53ba" />
              <stop offset="100%" stopColor="#2a8af6" />
            </linearGradient>

            <marker
              id="edge-circle"
              viewBox="-5 -5 10 10"
              refX="0"
              refY="0"
              markerUnits="strokeWidth"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
            >
              <circle
                stroke="#2a8af6"
                strokeOpacity="0.75"
                r="2"
                cx="0"
                cy="0"
              />
            </marker>
          </defs>
        </svg>

        <Background
          className="bg-transparent"
          variant={BackgroundVariant.Dots}
        />
      </ReactFlow>
    </div>
  );
};

export default TurboBuilder;
