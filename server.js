const express = require('express');

const server = express();
const port = 3000;


server.use(express.static('files'));
server.get("/files/", (req, res) => {
  res.send('Hai Werld!')
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`); // Tell yourself the port number to prevent mistakes in the future.
});