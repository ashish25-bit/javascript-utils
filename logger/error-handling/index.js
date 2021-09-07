const { getType } = require("../utils");

class ErrorHandling {
  /**
   *
   * @param {string} arg value to be checked
   * @param {string} message message if error needs be thrown
   * @returns throws error
   */
  checkForNullOrUndefined(arg, message) {
    if (arg !== null && arg !== undefined) return;

    throw new Error(`${message} ${arg}`);
  }

  /**
   *
   * @param {string} arg the value needed to checked
   * @param {string} type required type
   * @param {string} name name of the value
   * @returns throws error
   */
  checkType(arg, type, name) {
    if (getType(arg) === type) return;

    throw new Error(
      `Required ${type} data for ${name}, received ${getType(arg)}`
    );
  }

  /**
   *
   * @param {Object} obj the object
   * @param {string} property the property which needs to be checked
   * @param {string} name name of the object
   * @param {boolean} checkForNull default is false
   * @returns throws error
   */
  checkProperty(obj, property, name, checkForNull = false) {
    if (checkForNull) {
      if (obj === null) throw new Error(`${name} cannot be null`);
    }

    if (obj.hasOwnProperty(property)) return;

    throw new Error(`${property} property is missing from ${name}`);
  }
}

const error = new ErrorHandling();

module.exports = error;
