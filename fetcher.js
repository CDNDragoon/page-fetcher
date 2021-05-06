const request = require('request');
const fs = require('fs');

console.clear();

const page = process.argv[2];
const path = process.argv[3];

// > node fetcher.js http://www.example.edu/ ./index.html
//   Downloaded and saved 3261 bytes to ./index.html

const filename = `${path}/${page.split('.')[1]}.txt`

request(page, (error, response, body) => {
  if (error) console.log(error);
  if (!response.statusCode === 200) console.log(response.statusCode);
  fs.writeFile(filename, body, {recurisve: true}, err => {
    if (!err) {
      console.log(`Downloaded and saved ${getFilesizeInBytes(filename)} bytes to ${filename}`);
    }
  });
});

function getFilesizeInBytes(filename) {
  const stats = fs.statSync(filename)
  const fileSizeInBytes = stats["size"]
  return fileSizeInBytes
}