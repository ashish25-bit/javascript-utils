const fs = require("fs");
const { EOL } = require("os");
const { getType } = require("../utils");
const { TYPES } = require("../constants");

/**
 *
 * @param {object} object must consist of filePath and message
 */
function appendToFile({ filePath, message }) {
  try {
    if (message === undefined) {
      message = "undefined";
    }
    else if (message === null || getType(message) === TYPES.object) {
      message = JSON.stringify(message);
    }

    message = message + EOL + EOL;

    fs.appendFileSync(filePath, message);
  }
  catch (err) {
    throw new Error(err);
  }
}

module.exports = appendToFile;
