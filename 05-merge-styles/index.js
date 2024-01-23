const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'styles');
const copyFolder = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(folder, { withFileTypes: true }, (error, files) => {
   if (error) {
      console.log(error);
   };

   files.forEach(file => {
      const filePath = path.join(folder, file.name);

      if (path.extname(filePath) == '.css') {
         fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) {
               console.log(error);
            }
            fs.appendFile(copyFolder, data, 'utf8', (error) => {
               if (error) {
                  console.log(error);
               };
            });
         });
      };

   });
});