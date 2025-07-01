# Technical Specification: Data Lineage MVP

This document outlines the technical details for the Minimum Viable Product (MVP).

### 1. Technology Stack

- **Frontend:** React, React Flow
- **Backend:** Node.js, Express.js
- **Database:** JSON file (`db.json`)

### 2. Data Model

The core data will be stored in a single `db.json` file with two main arrays: `nodes` and `edges`.

#### Nodes

A `node` represents a system, a process, or a report in the data flow.

```json
{
  "id": "string",         // Unique identifier (e.g., 'system-1')
  "position": {         // Position on the React Flow canvas
    "x": "number",
    "y": "number"
  },
  "data": {             // Data associated with the node
    "label": "string",      // The display name of the node (e.g., 'PolicyCenter')
    "notes": "string"       // User-added notes and documentation
  }
}
```

#### Edges

An `edge` represents the connection or data flow between two nodes.

```json
{
  "id": "string",         // Unique identifier (e.g., 'edge-1-2')
  "source": "string",     // The `id` of the source node
  "target": "string",     // The `id` of the target node
  "label": "string"       // Optional label to describe the flow (e.g., 'Sum all')
}
```

### 3. API Endpoints

The Express.js server will provide a simple REST API.

- **`GET /api/dataflow`**
  - **Description:** Retrieves the entire data flow structure.
  - **Response Body:**
    ```json
    {
      "nodes": [/* array of node objects */],
      "edges": [/* array of edge objects */]
    }
    ```

- **`POST /api/dataflow`**
  - **Description:** Saves the entire data flow structure.
  - **Request Body:**
    ```json
    {
      "nodes": [/* array of node objects */],
      "edges": [/* array of edge objects */]
    }
    ```
  - **Response:**
    - `200 OK` on success.
    - `500 Internal Server Error` on failure.
