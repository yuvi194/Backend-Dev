const fs = require('fs');
const path = require('path');

const sourceFolder = './source';
const targetFolder = './target';

// Target folder banana agar exist na kare
if (!fs.existsSync(targetFolder)) {
  fs.mkdirSync(targetFolder);
}

fs.readdir(sourceFolder, (err, files) => {
  if (err) {
    console.log('Error reading source folder');
    return;
  }

  files.forEach((file) => {
    const srcPath = path.join(sourceFolder, file);
    const destPath = path.join(targetFolder, file);

    fs.stat(srcPath, (err, stats) => {
      if (err) return;

      if (stats.isFile()) {
        fs.copyFile(srcPath, destPath, (err) => {
          if (err) {
            console.log('Copy error:', file);
          } else {
            console.log('Copied:', file);
          }
        });
      }
    });
  });
});