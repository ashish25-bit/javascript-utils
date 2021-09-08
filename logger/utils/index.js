const { PRINT_TYPES, TYPES, LEVEL, COLORS } = require("../constants");

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
    const newObj = removeProperties(obj, ["writers"]);

    if (meta !== undefined && meta !== "")
      newObj.meta = meta;

    if (writer.getLogType() === PRINT_TYPES.console) writer.Console(newObj);
    else if (writer.getLogType() === PRINT_TYPES.file) writer.File(newObj);
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

/**
 *
 * @param {number} currLevel log level
 * @returns the color corresponding to log level
 */
function getLevelInfo(currLevel) {
  const levels = Object.keys(LEVEL);
  const curr = levels[currLevel];

  if (COLORS.hasOwnProperty(curr)) return { name: curr, code: COLORS[curr] };
  return { name: curr, code: COLORS.default };
}

/**
 *
 * @param {object} obj the obejct which needs to be modified
 * @param {array} elems the properties which needs to be removed
 * @returns
 */
 function removeProperties(obj, elems) {
  if (elems === undefined || elems === null) return;

  if (obj === undefined || obj === null) return;

  if (getType(obj) !== TYPES.object) return;

  if (getType(elems) !== TYPES.array) return;

  for (const prop of elems) {
    const { [prop]: remove, ...tempObj } = obj;
    obj = tempObj;
  }

  return obj;
}

module.exports = { getType, printLogs, removeProperties, getLevelInfo };
