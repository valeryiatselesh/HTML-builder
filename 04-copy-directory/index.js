const fs = require('fs/promises');
const path = require('path');

const folder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

async function copyDir() {
   try {
      await fs.rm(copyFolder, { recursive: true, force: true });
      await fs.mkdir(copyFolder, { recursive: true });
      const files = await fs.readdir(folder, { withFileTypes: true })

      files.forEach(file => {
         fs.copyFile(
            path.join(folder, file.name),
            path.join(copyFolder, file.name)
         );
      });

      console.log('The folder has been copied successfully.');

   } catch (error) {
      console.log(error);
   }
};
copyDir();