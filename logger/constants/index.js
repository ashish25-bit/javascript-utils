const TYPES = {
  number: "Number",
  bool: "Boolean",
  array: "Array",
  string: "String",
  object: "Object",
  writer: "Writer",
  function: "Function",
};
Object.freeze(TYPES);

const LEVEL = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};
Object.freeze(LEVEL);

const PRINT_TYPES = {
  console: "console",
  file: "file",
};
Object.freeze(PRINT_TYPES);

const MSG_TYPES = {
  plain: "plain",
  json: "json",
};
Object.freeze(MSG_TYPES);

const OPTIONS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
};
Object.freeze(OPTIONS);

const foregroundColors = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};
Object.freeze(foregroundColors);

const backgroundColors = {
  black: "\x1b[40m",
  red: "\x1b[41m",
  green: "\x1b[42m",
  yellow: "\x1b[43m",
  blue: "\x1b[44m",
  magenta: "\x1b[45m",
  cyan: "\x1b[46m",
  white: "\x1b[47m",
};
Object.freeze(backgroundColors);

const COLORS = {
  error: foregroundColors.red,
  warn: foregroundColors.yellow,
  info: foregroundColors.blue,
  debug: foregroundColors.green,
  default: foregroundColors.white,
};
Object.freeze(COLORS);

module.exports = {
  TYPES,
  LEVEL,
  MSG_TYPES,
  PRINT_TYPES,
  OPTIONS,
  COLORS,
};
