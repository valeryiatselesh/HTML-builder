const {exit, stdin, stdout} = process;

const fs = require('fs');
const path = require('path');

const writableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Write your text, please:\n');

stdin.on('data', (data) => {
   if (data.toString() === 'exit\n') {
      exit();
   }
   writableStream.write(data);
});

process.on('exit', () => {
   stdout.write('Thank you! Goodbye.');
});

process.on('SIGINT', () => {
   process.exit();
});