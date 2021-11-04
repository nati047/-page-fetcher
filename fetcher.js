const request = require('request');
const fs = require('fs');

//get url and local file path from command line arguments
let localPath = process.argv[3];
let url = process.argv[2];

const done = (count) => console.log(`Downloaded and saved ${count} bytes to ${localPath}`);
const finalMessage = () => {
  fs.readFile(localPath, 'utf8', (err, data) => {

    if (err) {
      console.error(err);
      return;
    }
    let count = data.length;
    done(count);
  });

};

request(url, (error, response, body) => {   // retrive the data from given url

  let content = body;

  fs.writeFile(localPath, content, err => {  // write data on local file
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully

    finalMessage();
  });

});