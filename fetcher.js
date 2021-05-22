const arg = process.argv.slice(2);
const fs = require('fs');
const request = require('request');

const url = arg[0];
const file = arg[1];
//requests body info from url if error, error message will be printed to the console
request(url, (error,response,body) => {
  if (error) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  }
  if (body) {
    //writes the info that was requested to the file specified
    fs.writeFile(file, body, err => {
      if (err) {
        console.error(err);
        return;
      } 
    });
    //gets all the stats about the file
   fs.stat(file, (err, stats) => {
      if (err) {
        console.log(`File doesn't exist.`);
      } else {
        // console.log(stats.blksize);
       console.log(`Downloaded and saved ${stats.blksize} bytes to ${file}`);
      }
    });
  }
});
  
