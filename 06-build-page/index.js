const { readdir, mkdir, writeFile, readFile, copyFile, stat } = require('fs').promises;
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');

const indexHTMLPath = path.join(projectDist, 'index.html');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');

const stylesPath = path.join(__dirname, 'styles');
const compiledStylesPath = path.join(projectDist, 'style.css');

const sourceAssets = path.join(__dirname, 'assets');
const destinationAssets = path.join(projectDist, 'assets');

async function createProjectDist(path) {
   await mkdir(path, { recursive: true });
}

async function createHTML() {
   const templateFileContent = await readFile(templatePath, 'utf-8');

   const components = await readdir(componentsPath);

   let newTemplate = templateFileContent;

   for (const component of components) {
      if (path.extname(component) === '.html') {
         const tag = component.split('.html').join('');
         const componentPath = path.join(componentsPath, component);
         const componentContent = await readFile(componentPath, 'utf-8');
         newTemplate = newTemplate.replace(`{{${tag}}}`, componentContent);
      }
   }
   await writeFile(path.join(indexHTMLPath), newTemplate);
}

async function createStyles() {
   const files = await readdir(stylesPath);
   const cssFiles = files.filter((file) => path.extname(file) === '.css');

   const css = await Promise.all(
      cssFiles.map((file) => readFile(path.join(stylesPath, file), 'utf-8')),
   );

   await writeFile(compiledStylesPath, css.join('\n'));
}

async function copyDir(sourceDir, destinationDir) {
   const files = await readdir(sourceDir);

   for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(destinationDir, file);

      const stats = await stat(sourcePath);

      if (stats.isDirectory()) {
         await createProjectDist(destinationPath);
         await copyDir(sourcePath, destinationPath);
      } else {
         await copyFile(sourcePath, destinationPath);
      }
   }
}

async function build() {
   try {
      createHTML();
      createStyles();
      createProjectDist(destinationAssets);
      copyDir(sourceAssets, destinationAssets);
      console.log('The project-dist folder was successfully created!');
   } catch (error) {
      console.error(error);
   }
};

build();