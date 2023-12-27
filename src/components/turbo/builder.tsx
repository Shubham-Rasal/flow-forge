'use client'
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

import "reactflow/dist/base.css";
import "./index.css";
import TurboNode, { TurboNodeData } from "./node";
import TurboEdge from "./edge";
import FunctionIcon from "./icon";

const initialNodes: Node<TurboNodeData>[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      attachable: true,
      description: "what is the main goal?",
      goal: "complete the project",
      time: "12:00",
      date: new Date(),
      type: "daily",
    },
    type: "turbo",
  },
  {
    id: "2",
    position: { x: 250, y: 0 },
    data: {
      attachable: true,
      description: "what is the main goal?",
      goal: "complete the project this is a test for long text can it accomodate it",
      time: "12:00",
      date: new Date(),
      type: "daily",
    },
    type: "turbo",
  },
  {
    id: "3",
    position: { x: 0, y: 250 },
    data: {
      attachable: true,
      description: "what is the main goal?",
      goal: "complete the project",
      time: "12:00",
      date: new Date(),
      type: "weekly",
    },
    type: "turbo",
  },
  {
    id: "4",
    position: { x: 250, y: 250 },
    data: {
      attachable: true,
      description: "what is the main goal?",
      goal: "complete the project",
      time: "12:00",
      date: new Date(),
      type: "daily",
    },
    type: "turbo",
  },
  {
    id: "5",
    position: { x: 500, y: 125 },
    data: {
      attachable: true,
      description: "what is the main goal?",
      goal: "complete the project",
      time: "12:00",
      date: new Date(),
      type: "quarterly",
    },
    type: "turbo",
  },
  {
    id: "6",
    position: { x: 750, y: 125 },
    data: {
      attachable: true,
      description: "what is the main goal?",
      goal: "complete the project",
      time: "12:00",
      date: new Date(),
      type: "yearly",
    },
    type: "turbo",
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
  },
];

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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
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
      <Controls showInteractive={false} className="bg-white text-black dark:bg-slate-900" />
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
