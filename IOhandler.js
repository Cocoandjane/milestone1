/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: 
 * Author: 
 * 
 */

const unzipper = require('unzipper'),
  fs = require("fs"),
  PNG = require('pngjs').PNG,
  path = require('path');

const unzip = (pathIn, pathOut) => {
  fs.createReadStream(pathIn)
  .pipe(unzipper.Extract({path: pathOut}))
  console.log("Extraction operation complete");
}

  // unzip("myfile.zip", "jane")



/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */


/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */
const readDir = dir => {
  let goodFiles = [];
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.log("no files, giving up", err)
        reject(err);
      } else {
        for (const file of files) {
          if (file.includes("png")) { 
            goodFiles.push(file);
          }
        }
        console.log(goodFiles);
        resolve(goodFiles);
      }
    });
  })  
};

readDir("./jane").then(files => {
  // grayScale(files[0], "grayscaled")

  for(const f of files) {
    // console.log(f);
    grayScale(f, `./grayscaled/${f}`) `adasdadasd${f}` ("adadsdas1+1" + f)
  }
})

/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  console.log("we got here", pathIn)
  fs.createReadStream(`./jane/${pathIn}`)
  // fs.createReadStream("./jane/in2.png")
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  // .on("error", () => {})
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x ) << 2;
        var g = (this.data[idx] + this.data[idx + 1]+ this.data[idx + 2]) / 3;
        // invert color

          this.data[idx] =  g// R
          this.data[idx + 1] = g// G
          this.data[idx + 2] = g; // B
        // and reduce opacity
          // this.data[idx + 3] = this.data[idx + 3] >> 1;
      }
    }
    this.pack().pipe(fs.createWriteStream(pathOut));
    // this.pack().pipe(fs.createWriteStream("./grayscaled/in2.png"));
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale
};