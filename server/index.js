const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Endpoint to get the dataflow
app.get('/api/dataflow', (req, res) => {
  fs.readFile(DB_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading database file:', err);
      return res.status(500).send('Error reading data');
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to save the dataflow
app.post('/api/dataflow', (req, res) => {
  const dataflow = req.body;
  fs.writeFile(DB_PATH, JSON.stringify(dataflow, null, 2), (err) => {
    if (err) {
      console.error('Error writing to database file:', err);
      return res.status(500).send('Error saving data');
    }
    res.status(200).send('Data saved successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
