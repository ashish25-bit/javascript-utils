const fs = require('fs');
const path = require('path');

function isFilePresent(filePath) {
  if (path.extname(filePath) === '')
    return { exists: false, message: `required file path, provided directory: ${filePath}` };

  if (fs.existsSync(filePath))
    return { exists: true, message: null };
  return { exists: false, message: `${filePath} is not present` };
}

module.exports = { isFilePresent };
