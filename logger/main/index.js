"use strict";

const { TYPES, LEVEL } = require("../constants");
const error = require("../error-handling");
const { getType } = require('../utils');

function logger(obj) {
  const customOptions = {
    level: 2,
    color: false,
    timestamp: null,
    formatter: null,
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
      console.log(message, meta, LEVEL.error)
    }

    /**
     * logs warning message to the console/file
     * @param {string} message
     */
    static warn({ message, meta }) {
      console.log(message, meta, LEVEL.warn)
    }

    /**
     * logs information message to the console/file
     * @param {string} message
     */
    static info({ message, meta }) {
      console.log(message, meta, LEVEL.info)
    }

    /**
     * logs warning message to the console/file
     * @param {string} message
     */
    static http({ message, meta }) {
      console.log(message, meta, LEVEL.http)
    }

    /**
     *
     * @param {string} message
     */
    static verbose({ message, meta }) {
      console.log(message, meta, LEVEL.verbose)
    }

    /**
     *
     * @param {string} message
     */
    static debug({ message, meta }) {
      console.log(message, meta, LEVEL.debug)
    }

    /**
     *
     * @param {string} message
     */
    static silly({ message, meta }) {
      console.log(message, meta, LEVEL.silly)
    }
  };
}

module.exports = logger;
