const fs = require('fs/promises');
const path = require('path');

const folder = path.join(__dirname, 'styles');
const copyFolder = path.join(__dirname, 'project-dist');
const bundleFile = path.join(copyFolder, 'bundle.css');

async function mergeStyles() {
   try {
      await fs.mkdir(folder, { recursive: true });
      const files = await fs.readdir(folder);
      const cssFiles = files.filter(file => path.extname(file) == '.css');
      let compiledStyles = '';
      for (let cssFile of cssFiles) {
         const filePath = path.join(folder, cssFile);
         const content = await fs.readFile(filePath, 'utf8');
         compiledStyles += content + '\n';
      };
      await fs.writeFile(bundleFile, compiledStyles, 'utf8');
   } catch (error) {
      console.log(error);
   };
}
mergeStyles();