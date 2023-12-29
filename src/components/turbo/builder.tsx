"use client";
import React, { useCallback } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  Background,
} from "reactflow";
import { FiFile } from "react-icons/fi";
import { shallow } from "zustand/shallow";

import useStore, { RFState } from "./store";

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
});

import "reactflow/dist/base.css";
import "./index.css";
import TurboNode, { TurboNodeData } from "./node";
import TurboEdge from "./edge";
import FunctionIcon from "./icon";

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
  const { nodes, edges, onNodesChange, onEdgesChange } = useStore(
    selector,
    shallow
  );

 return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <Controls
        showInteractive={false}
        className="bg-white text-black dark:bg-slate-900"
      />
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
            <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
          </marker>
        </defs>
      </svg>

      <Background className="dark:bg-slate-900 bg-slate-100" />
    </ReactFlow>
  );
};

export default TurboBuilder;
