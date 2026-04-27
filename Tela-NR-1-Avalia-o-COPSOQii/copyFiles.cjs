const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync('copsoq-compass/src/components/dashboard', 'src/components/dashboard');
copyRecursiveSync('copsoq-compass/src/data', 'src/data');
copyRecursiveSync('copsoq-compass/src/lib/exports.ts', 'src/lib/exports.ts');
console.log('Copied files successfully!');
