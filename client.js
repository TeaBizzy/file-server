const request = require("request");

request('http://localhost:3000/sample.txt', (error, response, body) => {
  if(error) {
    throw Error(error);
  }

  if(response.statusCode !== 200) {
    throw Error(response);
  }
  
  console.log(body);
});