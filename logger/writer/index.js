const { TYPES, MSG_TYPES, PRINT_TYPES } = require("../constants");
const error = require("../error-handling");
const { getType, getLevelInfo, removeProperties } = require('../utils');

class Writer {
  #logType;
  #messageType;
  #fileDestination;

  /**
   *
   * @param {Object} obj must include property type(log type), messageType(default="plain") and fileDestination if type="file"
   */
  constructor(obj) {
    // check for null and undefined argument object
    error.checkForNullOrUndefined(
      obj,
      "argument passed to the constructor of Writer class cannot be"
    );

    // check for log type property in the argument object
    error.checkProperty(obj, "type", "argument obj to Writer class");

    // check the data type of the obj.type, should be string
    error.checkType(obj.type, TYPES.string, "obj.type for Writer class");

    // the values can only be json or plain text
    // check for valid values
    if (!Object.keys(PRINT_TYPES).includes(obj.type)) {
      throw new Error(
        `obj.type can only be [${Object.keys(PRINT_TYPES).join(", ")}]  received '${obj.type}'`
      );
    }
    this.#logType = obj.type;

    // check for message type property in the argument object
    // if not present then leave it as default
    // if present validate the property and then assign
    this.#messageType = MSG_TYPES.plain; // default value
    if (obj.hasOwnProperty("messageType")) {
      if (
        getType(obj.messageType) === TYPES.string &&
        Object.keys(MSG_TYPES).includes(obj.messageType)
      )
        this.#messageType = obj.messageType;
    }

    // if the log type is file
    // then the argument object should contain file destination
    // not verifying the file path here
    // validating the file path here.
    this.#fileDestination = null;
    if (obj.type === PRINT_TYPES.file) {
      error.checkProperty(
        obj,
        "fileDestination",
        "argument object which is required for logType='file' in Writer class",
        true
      );

      error.checkType(
        obj.fileDestination,
        TYPES.string,
        "obj.fileDestination for Writer class"
      );

      this.#fileDestination = obj.fileDestination;
    }
  }

  /**
   *
   * @returns returns the log type(string) of the current writer object
   */
  getLogType() {
    return this.#logType;
  }

  /**
   * 
   * @param {object} obj this object consists of message, currLevel, level, meta data
   */
  Console(obj) {
    const info = getLevelInfo(obj.currLevel);

    const formatObj = {
      logType: this.#logType,
      messageType: this.#messageType,
      stack: null,
      info,
      ...removeProperties(obj, [ 'currLevel', 'level' ])
    };
    console.log("console", formatObj)
  }

  /**
   *
   * @param {Object} object with mandatory properties: message, level, currLevel
   */
  File(obj) {
    const info = getLevelInfo(obj.currLevel);

    const formatObj = {
      logType: this.#logType,
      messageType: this.#messageType,
      fileDestination: this.#fileDestination,
      stack: null,
      info,
      ...removeProperties(obj, [ 'currLevel', 'level' ])
    };
    console.log("file", formatObj)
  }
}

module.exports = Writer;

