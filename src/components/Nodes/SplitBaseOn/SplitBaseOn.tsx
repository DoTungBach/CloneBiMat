import { Handle, Position } from "@xyflow/react";

const SplitBaseOnNode = (data: any) => {
  return (
    <div style={{ padding: 10, backgroundColor: "lightblue", borderRadius: 5 }}>
      <Handle type="target" position={Position.Top} />
      <div>{data.label || "SplitBaseOnNode"}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default SplitBaseOnNode;
