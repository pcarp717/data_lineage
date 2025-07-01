import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { 
  Controls, 
  Background, 
  applyNodeChanges, 
  applyEdgeChanges,
  addEdge
} from 'reactflow';
import CustomNode from './CustomNode.jsx';
import 'reactflow/dist/style.css';

const nodeTypes = {
  custom: CustomNode,
};

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dataflow')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setNodes(data.nodes || []);
        setEdges(data.edges || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch dataflow:", error);
        alert("Failed to load data. Please check the console for more details.");
        setLoading(false);
      });
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onSave = useCallback(() => {
    const dataflow = { nodes, edges };
    fetch('/api/dataflow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataflow),
    })
    .then(response => {
        if(response.ok) {
            alert('Data saved successfully!');
        } else {
            alert('Failed to save data.');
        }
    })
    .catch(error => {
        console.error('Error saving data:', error);
        alert('An error occurred while saving.');
    });
  }, [nodes, edges]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
        <button onClick={onSave} style={{ position: 'absolute', top: 10, right: 10, zIndex: 4 }}>Save</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
