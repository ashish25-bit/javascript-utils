const path = require('path');
const { OPTIONS, MSG_TYPES, PRINT_TYPES, TYPES } = require("../constants");
const { getType } = require('../utils');
const { appendToFile, appendToJSON } = require("../append");

/**
 * this is default get message for
 * @param {object} object this object has message and level properties both required
 * @returns return the formatted 
 */
function defaultFormatter({ timestamp, message, level, meta }) {
  let result = "";

  if (timestamp) {
    let t = JSON.stringify(timestamp());
    t = t.substring(1, t.length - 1);
    result += "time: " + t + "\n";
  }

  result = result + level + ": " + message;

  if (meta !== undefined && meta !== "") {
    const type = getType(meta);
    if (
      type === TYPES.string ||
      type === TYPES.number ||
      type === TYPES.bool
    )
      result = result + "(meta: " + meta + ")";
    else
      result = result + "(meta: " + JSON.stringify(meta) + ")";
  }

  return result;
}

/**
 *
 * @param {object} object object consists of logType[console, file], color[true, false],
                          info({ code, levelName }), message, messageType[json, plain],
                          meta, fileDesination(if logType is file)
 */
function format({ logType, color, info, message, messageType, formatter, stack, timestamp, meta, fileDestination }) {

  // if the message if of object/array type and
  // log type is console and message type is plain
  // then stringify the message
  const base = formatter({ level: info.name, message, stack, timestamp, meta });

  if (logType === PRINT_TYPES.console) {
    if (color) process.stdout.write(info.code);

    if (messageType === MSG_TYPES.plain) {
      console.log(base);
    }

    else if (messageType === MSG_TYPES.json) {
      const obj = {};

      obj['level'] = info.name;

      if (timestamp) {
        obj['timestamp'] = timestamp();
      }

      if (formatter === defaultFormatter)
        obj['message'] = message;
      else
        obj['message'] = base;

      if (meta !== undefined && meta !== "")
        obj["meta"] = meta;

      console.log(obj)
    }

    process.stdout.write(OPTIONS.reset);
  }

  else if (logType === PRINT_TYPES.file) {
    if (fileDestination === null || fileDestination === undefined)
      return;

    const extName = path.extname(fileDestination);

    if (extName === ".txt") {
      appendToFile({ filePath: fileDestination, message: base })
    }
    else if (extName === '.json') {
      if (messageType === MSG_TYPES.plain) {
        appendToJSON({ filePath: fileDestination, message: base });
        return;
      }

      // logType, color, info, message, messageType, formatter, stack, timestamp, meta, fileDestination
      const obj = {
        level: info.name,
        message: base,
      };
      if (timestamp) {
        obj['timestamp'] = timestamp();
      }

      if (meta !== '' && meta !== undefined)
        obj['meta'] = meta;

      if (stack) {
        stack = stack.split('\n').map(msg => msg.trim());
        obj["stack"] = stack;
      }

      appendToJSON({ filePath: fileDestination, message: obj })
    }
  }
}

module.exports = { format, defaultFormatter };
