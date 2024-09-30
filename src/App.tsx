import React, { useCallback, useContext, useRef, useState } from "react";
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
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { v4 } from "uuid";
import data from "./data.json";
import { ChakraProvider } from "@chakra-ui/react";
import CreateNode from "./components/Sidebar/CreateNode";
import SayMessageNode from "./components/Nodes/SayMessage/SayMessage"; // Component tùy chỉnh
import AppContextProvider, { AppContext } from "./store/AppContext";
import CheckPointNode from "./components/Nodes/CheckPoint/CheckPoint";
import ForwardCallNode from "./components/Nodes/ForwardCall/ForwardCall";
import HttpApiNode from "./components/Nodes/HttpApi/HttpApi";
import ListenNode from "./components/Nodes/Listen/Listen";
import SetVariableNode from "./components/Nodes/SetVariable/SetVariable";
import ShortCutNode from "./components/Nodes/ShortCut/ShortCut";
import SplitBaseOnNode from "./components/Nodes/SplitBaseOn/SplitBaseOn";

const defaultEdgeOptions = {
  animated: true,
  type: "smoothstep",
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

const nodeTypes = {
  sayMessageNode: SayMessageNode,
  checkPointNode: CheckPointNode,
  forwardCallNode: ForwardCallNode,
  httpApiNode: HttpApiNode,
  listenNode: ListenNode,
  setVariableNode: SetVariableNode,
  shortCutNode: ShortCutNode,
  splitBaseOnNode: SplitBaseOnNode,
};

const App: React.FC = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const { type, setType } = useContext(AppContext);

  const initialNodes: Node[] =
    data.scenario_visual["22a73f88-d5fd-4e09-b8a7-224c4552f9f2"].nodes;
  const initialEdges: Edge[] =
    data.scenario_visual["22a73f88-d5fd-4e09-b8a7-224c4552f9f2"].edges;

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const { screenToFlowPosition } = useReactFlow();

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

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      if (!type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: v4(),
        type,
        position,
        data: { label: `${type} node` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes} // Truyền nodeTypes vào ReactFlow
      >
        <CreateNode />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default () => {
  return (
    <AppContextProvider>
      <ReactFlowProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ReactFlowProvider>
    </AppContextProvider>
  );
};
