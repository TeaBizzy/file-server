const express = require('express');
const fs = require('fs');

const server = express();
const port = 3000;


server.use(express.static('files'));

server.get("/", (req, res) => {
  getFilePaths((files) => {res.send(JSON.stringify(files))});
});

const getFilePaths = function(callback) {
  fs.readdir('./files', (error, files) => {
    console.log(files);
    callback(files);
  });
};

server.listen(port, () => {
  console.log(`Server running on port ${port}`); // Tell yourself the port number to prevent mistakes in the future.
});