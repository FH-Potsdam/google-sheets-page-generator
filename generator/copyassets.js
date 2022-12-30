const ncp = require('ncp').ncp;
ncp.limit = 16;
const fs = require('fs');
const path = require('path');
 
module.exports = (destination) => {
  const sourcePath = '../app/public/';
  const files = ['index.html', 'global.css', 'index.html', 'presentation.html'];
  files.forEach(f => {
    fs.copyFileSync(path.join(sourcePath, f), path.join(destination, f));
  });
  const folders = ['build', 'revealjs'];
  folders.forEach(f => {
    ncp(path.join(sourcePath, f), path.join(destination, f), err => {
      if (err) {
        return console.error({f, err});
      }
    });
  });
};
