const request = require("request");
const args = process.argv.slice(2);
const fileURL = args[0] === undefined ? "" : args[0]
const destination = args[1]
const port = 3000;

console.log(`http://localhost:${port}/${fileURL}`)

request(`http://localhost:${port}/${fileURL}`, (error, response, body) => {
  if(error) {
    throw Error(error);
  }

  if(response.statusCode !== 200) {
    throw Error(response);
  }
  
  const data = JSON.parse(body);
  if(Array.isArray(data)) {
    console.log(`Files available:`);
    console.log(data.join("\n"));
    console.log("To download a file, use its name + extension as an argument... Example: node client.js <Filename><.txt>")
  }
});