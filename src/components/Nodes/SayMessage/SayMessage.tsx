import React from "react";
import { Handle, Position } from "@xyflow/react";

const SayMessageNode = ({ data }: any) => {
  return (
    <div style={{ padding: 10, backgroundColor: "lightblue", borderRadius: 5 }}>
      <Handle type="target" position={Position.Top} />
      <div>{data.label || "Say Message"}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default SayMessageNode;
