const executeCommand = require('../executeCommand');
const { isFilePresent, getType, getCommand } = require('../utils');
const { ALLOWED, TERMINAL } = require('../constants');
const path = require('path');

async function execute(language, filePath, arguments)  {
  try {
    if (language === null || language === undefined || language.trim() === "")
      throw new Error("Language cannot be null, undefined or empty");

    if (filePath === null || filePath === undefined || filePath.trim() === "")
      throw new Error("File Path cannot be null, undefined or empty");

    language = language.toLowerCase().trim();
    filePath = filePath.trim();

    if (!ALLOWED.languages.hasOwnProperty(language))
      throw new Error(`Language: ${language} is not supported yet`);

    const currOS = process.platform;
    if (!ALLOWED.platform.hasOwnProperty(currOS))
      throw new Error(`Platform: ${currOS} is not supported`);

    const fileStatus = isFilePresent(filePath);
    if (!fileStatus.exists) {
      throw new Error(fileStatus.message)
    }

    if (arguments === undefined)
      arguments = arguments;
    else if (arguments === null)
      arguments = 'null';
    else {
      const type = getType(arguments);
      if (type === "Number")
        arguments = arguments.toString();
      else if (type !== "String")
        arguments = JSON.stringify(arguments);
    }

    const dirName = path.dirname(filePath);
    const baseName = path.basename(filePath);

    switch(language) {
      case 'python':
      case 'python2':
      case 'python3':
      case 'node': {
        let command = getCommand(arguments, dirName, language, baseName);
        let result = await executeCommand(command);
        return result;
      }

      case 'c':
      case 'c++': {
        // compile the c/c++ file
        let command = getCommand('-o out', dirName, 'g++', baseName);
        await executeCommand(command);

        // run the .exe file
        command = getCommand(arguments, dirName, '', ".\\out.exe");
        const res = await executeCommand(command);

        // delete the .exe file
        command = `${TERMINAL.delete[currOS]} ${dirName}\\out.exe`;
        await executeCommand(command);

        return res;
      }

      case 'java': {
        let command = getCommand(arguments, `${dirName} && ${dirName[0]}:`, language, baseName);
        const res = await executeCommand(command);
        return res;
      }

      default:
        throw new Error(`Language: ${language} is not supported yet`);
    }
  }
  catch (err) {
    throw new Error(err.message);
  }
}

module.exports = execute;
