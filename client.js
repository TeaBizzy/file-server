const request = require("request");

request('http://localhost:3000/wtf', (error, response, body) => {
  console.log(body);
});