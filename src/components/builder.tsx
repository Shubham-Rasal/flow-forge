"use client";
import React, { useCallback, useState } from "react";
import "reactflow/dist/style.css";
import ReactFlow, {
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  addEdge,
  Connection,
  Edge,
} from "reactflow";
import CustomNode from "./custom-node";
import TurboBuilder from "./turbo/builder";

const nodeTypes = {
  custom: CustomNode,
};

export const initialNodes = [
  {
    id: "1",
    type: "custom",
    data: { name: "Jane Doe", job: "CEO", emoji: "😎" },
    position: { x: 0, y: 50 },
  },
  {
    id: "2",
    type: "custom",
    data: { name: "Tyler Weary", job: "Designer", emoji: "🤓" },

    position: { x: -200, y: 200 },
  },
  {
    id: "3",
    type: "custom",
    data: { name: "Kristi Price", job: "Developer", emoji: "🤩" },
    position: { x: 200, y: 200 },
  },
];

export const initEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
  },
];



export const Builder = () => {


  const [nodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: "100%" }}>
      {/* <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        fitView
        onConnect={onConnect}
      >
        <Controls />
        <Background />
      </ReactFlow> */}
      <TurboBuilder />
    </div>
  );
};
