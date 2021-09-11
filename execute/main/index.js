const { isFilePresent } = require('../utils');

async function execute(language, filePath, arguments)  {
  try {
    if (language === null || language === undefined || language.trim() === "")
      throw new Error("Language cannot be null, undefined or empty");

    if (filePath === null || filePath === undefined || filePath.trim() === "")
      throw new Error("File Path cannot be null, undefined or empty");

    language = language.toLowerCase().trim();
    filePath = filePath.trim();

    const fileStatus = isFilePresent(filePath);
    if (!fileStatus.exists) {
      throw new Error(fileStatus.message)
    }

    if (
      language !== "node" &&
      language !== "python" &&
      language !== "python2" &&
      language !== "python3" &&
      language !== "c++" &&
      language !== 'c' &&
      language !== 'java'
    )
      throw new Error("Allowed languages are: Java, Python(2/3), Node, C, C++")

    console.log(language, filePath, arguments);
  }
  catch (err) {
    throw new Error(err.message);
  }
}

module.exports = execute;
