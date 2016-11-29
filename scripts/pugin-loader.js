const fs = require('fs'),
      exec = require('child_process').exec,
      pugin = require('../../pugin.json'),
      path = require('path');

let count = Object.keys(pugin).length;

for (const k in pugin) {
  if(count -= 1, pugin.hasOwnProperty(k)) {
    for (let i = 0; i < pugin[k].length; i++) {
      const wholepath = path.resolve(__dirname, `../../${pugin[k][i]}`);
      if (fs.lstatSync(wholepath).isFile()) {
        pugin[k][i] = wholepath;
      }
      if (fs.lstatSync(wholepath).isDirectory()) {
        pugin[k][i] = `${wholepath}/.`;
      }
    }
  }
  if(count === 0) {
    call();
  }
}

function call() {
  for (const task in pugin) {
    exec(`make ${task} GET_FROM=${pugin[task]}`, (error, stdout, stderr) => {
      if (error) {
        console.log('Error:', error);
      }
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.log('Stderr:', stderr);
      }
    });
  }
}
