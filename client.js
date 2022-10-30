const request = require("request");
const fs = require('fs');
const readline = require("readline");
const { resolveNaptr } = require("dns");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const args = process.argv.slice(2);
const fileURL = args[0] === undefined ? "" : args[0]
let filePath = args[1]
const port = 3000;

console.log(`http://localhost:${port}/${fileURL}`)

const isValidPath = function(path) {
  const regex = new RegExp(/^(\/?[a-z0-9]+)+$/);
  if (typeof(filePath) !== "string" || filePath.length < 1 || regex.test(filePath)) {
    return false;
  }
  return true;
};

request(`http://localhost:${port}/${fileURL}`, (error, response, body) => {
  if(error) {
    throw Error(error);
  }

  if(response.statusCode !== 200) {
    throw Error(response);
  }

  
  if(fileURL === "") {
    const data = JSON.parse(body);
    console.log(`Files available:`);
    console.log(data.join("\n"));
    console.log("To download a file, use it's name + extension as an argument... Example: node client.js <Filename><.txt>")
    process.exit();
  }

  filePath = `${filePath}${response.request.path}`

  if(filePath === undefined) {
    throw Error("No destination provided for file to be written to. Please try again with a valid path as the 2nd argument.")
  }

  if (isValidPath() === false) {
    console.log(`File path: ${filePath} contains invalid characters. Please retry with a new path.`);
    process.exit();
  }

    // Check if the file already exists
    if (fs.existsSync(`${filePath}`)) {
      console.log(`WARNING a file already exists at: ${filePath}, do you want to overwrite it?`);
  
      rl.question("Do you want to overwrite this file?? (Y / any to exit.) \n", (userResponse) => {
        if (userResponse.toUpperCase() !== "Y") { // Convert the response to upper so any "y" response is accepted.
          console.log("No file written. Terminating program!");
          process.exit();
        }
  
        fs.writeFile(`${filePath}`, body, onWritingDone); // Writes the file to the filepath
        rl.close(); // Make sure we close this!
      });
  
    } else {
      fs.writeFile(`${filePath}`, body, onWritingDone); // Writes the file to the filepath
    }
    
});

// Logs a message for the user to know the file was written successfully.
const onWritingDone = function() {
  const fileStats = fs.statSync(filePath).size;
  console.log(`Downloaded and saved ${fileStats} bytes to ${filePath}`);
  process.exit();
};