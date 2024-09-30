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
  useReactFlow,
} from "@xyflow/react";
import CreateNode from "../Sidebar/CreateNode";
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../store/AppContext";
import { v4 } from "uuid";
import SayMessageNode from "../Nodes/SayMessage/SayMessage";
import CheckPointNode from "../Nodes/CheckPoint/CheckPoint";
import ForwardCallNode from "../Nodes/ForwardCall/ForwardCall";
import HttpApiNode from "../Nodes/HttpApi/HttpApi";
import ListenNode from "../Nodes/Listen/Listen";
import SetVariableNode from "../Nodes/SetVariable/SetVariable";
import ShortCutNode from "../Nodes/ShortCut/ShortCut";
import SplitBaseOnNode from "../Nodes/SplitBaseOn/SplitBaseOn";

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

const Flow: React.FC<any> = (props: any) => {
  const { type, setType } = useContext(AppContext);

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
      props.setNodes(newNode);
    },
    [screenToFlowPosition, type]
  );
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      defaultEdgeOptions={defaultEdgeOptions}
      nodeTypes={nodeTypes} // Truyền nodeTypes vào ReactFlow
      onDrop={onDrop}
    >
      <CreateNode />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      <Controls />
      <MiniMap />

      {/* <button
    style={{
      position: "absolute",
      right: "10px",
      top: "10px",
      zIndex: "10",
    }}
    onClick={() => createNode("sayMessageNode")}
  >
    Create Node SayMessage
  </button>
  <button
    style={{
      position: "absolute",
      right: "10px",
      top: "40px",
      zIndex: "10",
    }}
    onClick={() => createNode("Listen")}
  >
    Create Node Listen
  </button> */}
    </ReactFlow>
  );
};

export default Flow;
