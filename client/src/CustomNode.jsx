import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: 'red', width: '10px', height: '10px' }}
      />
      <div style={{ padding: '10px 20px', border: '1px solid #ddd', borderRadius: '5px', background: '#fff' }}>
        {data.label}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: 'green', width: '10px', height: '10px' }}
      />
    </>
  );
};

export default memo(CustomNode);
