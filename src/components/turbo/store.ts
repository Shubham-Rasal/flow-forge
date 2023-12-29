import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import { create } from "zustand";
import { TurboNodeData } from "./node";

export type RFState = {
  nodes: Node<TurboNodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [
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
        goal: "complete the dsa project.",
        time: "12:00",
        date: new Date(),
        type: "daily",
      },
      type: "turbo",
    },
  ],

  edges: [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
    },
  ],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
}));

export default useStore;
