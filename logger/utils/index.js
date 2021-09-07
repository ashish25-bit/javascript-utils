const { PRINT_TYPES } = require('../constants');

/**
 *
 * @param {Object} obj the custom options object for logger
 * @param {Number} currLevel current log message level
 * @param {string} message the message that needs to be logged
 * @param {string} meta extra information about the log
 */
 function printLogs(obj, currLevel, message, meta) {
  if (obj.level < currLevel) return;

  obj.currLevel = currLevel;
  obj.message = message;

  for (const writer of obj.writers) {
    if (meta !== undefined && meta !== "")
      obj.meta = meta;

    if (writer.getLogType() === PRINT_TYPES.console) writer.Console(obj);
    else if (writer.getLogType() === PRINT_TYPES.file) writer.File(obj);
  }
}

/**
 *
 * @param {string} arg not null and defined variable
 * @returns the type of the variable
 */

function getType(arg) {
  return arg.constructor.name;
}

module.exports = { getType, printLogs };
