"use strict";

const { TYPES, LEVEL } = require("../constants");
const error = require("../error-handling");
const { getType, printLogs } = require('../utils');
const { defaultFormatter } = require("../format");

/**
 * 
 * @param {Object} obj this object includes color(default=false), level(default="info"), array<writers>(required),
                       timestamp(default=null), formatter(default=defaultFormatter)
 * @returns a log class for printing messages
 */
function logger(obj) {
  const customOptions = {
    level: 2,
    color: false,
    timestamp: null,
    formatter: defaultFormatter,
    meta: "",
  };

  // if object is not passed or is null
  error.checkForNullOrUndefined(obj, "Argument to function logger cannot be");

  // the type of the argument should be 'Object'
  error.checkType(obj, TYPES.object, "object to fuction logger");

  // obj.writers should be an array of writer object
  error.checkType(obj.writers, TYPES.array, "obj.writers for logger function");

  if (obj.writers.length === 0)
    throw new Error(
      `Atleast one writer object is needed in writers, currently has zero`
    );

  // check whether all the entries in object.writers is a writer class
  for (const writer of obj.writers)
  error.checkType(writer, TYPES.writer, "obj.writers array elements");

  // check if this property is provided by the user
  // leave as default value if it is null or undefined
  if (
    obj.color !== undefined &&
    obj.color !== null &&
    getType(obj.color) === TYPES.bool
  )
    customOptions.color = obj.color;

  // check if this property is provided by the user
  // leave as default value if it is null or undefined
  if (
    obj.level !== undefined &&
    obj.level !== null &&
    getType(obj.level) === TYPES.string
  ) {
    if (Object.keys(LEVEL).includes(obj.level)) customOptions.level = LEVEL[obj.level];
  }

  // check whether the formatter is given
  if (
    obj.hasOwnProperty('formatter') &&
    obj.formatter !== undefined && obj.formatter !== null &&
    getType(obj.formatter) === TYPES.function
  ) {
    const formatterResult = obj.formatter({ timestamp: obj.timestamp, level: 'debug', message: 'debug message', stack: null });
    if (formatterResult !== undefined && formatterResult !== null)
      customOptions.formatter = obj.formatter;
  }

  customOptions["writers"] = obj.writers;
  customOptions.meta = obj.defaultMeta || "";

  return class log {
    constructor() {
      if (this.constructor === log)
        throw new Error('log class is abstract, it cannot be instantiated');
    }

    /**
     * logs warning message to the console/file
     * @param {string} message 
     */
    static error({ message, meta }) {
      try {
        printLogs(customOptions, LEVEL.error, message, meta);
      }
      catch(err) {
        console.log(err.message)
      }
    }

    /**
     * logs warning message to the console/file
     * @param {string} message
     */
    static warn({ message, meta }) {
      try {
        printLogs(customOptions, LEVEL.warn, message, meta);
      }
      catch(err) {
        console.log(err.message)
      }
    }

    /**
     * logs information message to the console/file
     * @param {string} message
     */
    static info({ message, meta }) {
      try {
        printLogs(customOptions, LEVEL.info, message, meta);
      }
      catch(err) {
        console.log(err.message)
      }
    }

    /**
     * logs warning message to the console/file
     * @param {string} message
     */
    static http({ message, meta }) {
      try {
        printLogs(customOptions, LEVEL.http, message, meta);
      }
      catch(err) {
        console.log(err.message)
      }
    }

    /**
     *
     * @param {string} message
     */
    static verbose({ message, meta }) {
      try {
        printLogs(customOptions, LEVEL.verbose, message, meta);
      }
      catch(err) {
        console.log(err.message)
      }
    }

    /**
     *
     * @param {string} message
     */
    static debug({ message, meta }) {
      try {
        printLogs(customOptions, LEVEL.debug, message, meta);
      }
      catch(err) {
        console.log(err.message)
      }
    }

    /**
     *
     * @param {string} message
     */
    static silly({ message, meta }) {
      try {
        printLogs(customOptions, LEVEL.silly, message, meta);
      }
      catch(err) {
        console.log(err.message)
      }
    }
  };
}

module.exports = logger;
