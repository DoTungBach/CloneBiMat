import React, { useCallback, useState } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MarkerType,
  MiniMap,
  Node,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { v4 } from "uuid";
import data from "./data.json";
import { ChakraProvider } from "@chakra-ui/react";
import CreateNode from "./components/Sidebar/CreateNode";
import TextUpdaterNode from "./components/Nodes/SayMessage/SayMessage"; // Component tùy chỉnh

const defaultEdgeOptions = {
  animated: true,
  type: "smoothstep",
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

const nodeTypes = {
  textUpdater: TextUpdaterNode, // Đảm bảo nodeTypes có component
};

const App: React.FC = () => {
  const initialNodes: Node[] =
    data.scenario_visual["22a73f88-d5fd-4e09-b8a7-224c4552f9f2"].nodes;
  const initialEdges: Edge[] =
    data.scenario_visual["22a73f88-d5fd-4e09-b8a7-224c4552f9f2"].edges;

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  function createNode() {
    const id = v4();
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: "textUpdater", // Đặt type cho node
        data: { label: "New Custom Node" }, // Dữ liệu hiển thị
        position: { x: 100, y: 100 },
      },
    ]);
  }

  return (
    <ReactFlowProvider>
      <ChakraProvider>
        <div style={{ width: "100%", height: "100vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            defaultEdgeOptions={defaultEdgeOptions}
            nodeTypes={nodeTypes} // Truyền nodeTypes vào ReactFlow
          >
            <CreateNode />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            <Controls />
            <MiniMap />

            <button
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                zIndex: "10",
              }}
              onClick={createNode}
            >
              Create Node
            </button>
          </ReactFlow>
        </div>
      </ChakraProvider>
    </ReactFlowProvider>
  );
};

export default App;
