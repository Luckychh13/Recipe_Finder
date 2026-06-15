const fs = require('fs');
const path = require('path');

// Recursively get all files in a directory, ignoring node_modules and .env
function getAllFiles(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    // Ignore node_modules folder and .env files
    if (stat.isDirectory() && file !== 'node_modules') {
      getAllFiles(fullPath, files);
    } else if (stat.isFile() && !file.endsWith('.env')) {
      files.push(fullPath);
    }
  });
  return files;
}

// Change this to your frontend folder path
const frontendDir = path.join(__dirname, 'client'); 
const outputFile = path.join(__dirname, 'frontend_all_files.txt');

const files = getAllFiles(frontendDir);

let output = '';

files.forEach(file => {
  output += `===== ${file} =====\n`;
  output += fs.readFileSync(file, 'utf-8') + '\n\n';
});

fs.writeFileSync(outputFile, output);

console.log(`All frontend files written to ${outputFile}`);
