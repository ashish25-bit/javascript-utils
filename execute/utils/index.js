const fs = require('fs');
const path = require('path');

/**
 *
 * @param {string} arg not null and defined variable
 * @returns the type of the variable
 */

function getType(arg) {
  return arg.constructor.name;
}

/**
 *
 * @param {string/undefined} arguments
 * @param {string} dirName
 * @param {string} language
 * @param {string} baseName
 * @returns
 */
function getCommand(arguments, dirName, language, baseName) {
  let command;
  if (arguments === undefined)
    command = `cd ${dirName} && ${language} ${baseName}`;
  else
    command = `cd ${dirName} && ${language} ${baseName} ${arguments}`;

  return command;
}

/**
 *
 * @param {string} filePath path to the file or folder
 * @returns boolean, checks whether the path is present in the system
 */
function isFilePresent(filePath) {
  if (path.extname(filePath) === '')
    return { exists: false, message: `required file path, provided directory: ${filePath}` };

  if (fs.existsSync(filePath))
    return { exists: true, message: null };
  return { exists: false, message: `${filePath} is not present` };
}

module.exports = { isFilePresent, getType, getCommand };
