/**
 *
 * @param {string} arg not null and defined variable
 * @returns the type of the variable
 */

function getType(arg) {
  return arg.constructor.name;
}

module.exports = { getType };
