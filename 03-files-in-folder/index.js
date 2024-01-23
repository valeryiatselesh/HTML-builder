const fs = require('fs/promises');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, {withFileTypes: true})
   .then((files) => {
      files.forEach(file => {
         const filePath = path.join(folder, file.name);
         if(file.isFile()) {
            fs.stat(filePath)
               .then(stat => {
                  if(stat.isFile()) {
                     let fileSize;
                     fileSize = stat.size / 1024;
                     console.log(`${file.name.split('.')[0]}-${path.extname(filePath).slice(1)}-${fileSize}kb`);
                  }
               })
               .catch((error) => console.log(error));
         }
      })
   })
   .catch((error) => console.log(error));