const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

function copyDir() {
   fs.mkdir(copyFolder, { recursive: true }, (error) => {
      if (error) {
         console.log(error);
      };

      fs.readdir(folder, { withFileTypes: true }, (error, files) => {
         if (error) {
            console.log(error);
         };

         files.forEach(file => {
            fs.copyFile(
               path.join(folder, file.name),
               path.join(copyFolder, file.name),
               (error) => {
                  if (error) {
                     console.log(error);
                  };
               });
         });
         
         console.log('The folder has been copied successfully.');
      });
   });
};
copyDir();