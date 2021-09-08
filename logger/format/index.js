const { OPTIONS, MSG_TYPES, PRINT_TYPES, TYPES } = require("../constants");
const { getType } = require('../utils');

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
 * @param {object} object
 */
function format({ logType, color, info, message, messageType, formatter, stack, timestamp, meta }) {

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

      if (meta !== undefined && meta !== "")
        obj["meta"] = meta;

      console.log(obj)
    }

    process.stdout.write(OPTIONS.reset);
  }

  else if (logType === PRINT_TYPES.file) {
    console.log('written in file')
  }
}

module.exports = { format, defaultFormatter };
