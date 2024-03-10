const express = require("express");
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', 
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.json("Hello World");
});
app.get("/items", (req, res) => {
  const filePath = path.join(__dirname, 'items-placeholder.json');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading the JSON file');
    } else {
      res.json(JSON.parse(data));
    }
  });
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

