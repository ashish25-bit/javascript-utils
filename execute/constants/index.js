const TERMINAL = {
  delete: {
    darwin: 'rm',
    linux: 'rm',
    win32: 'del'
  }
};
Object.freeze(TERMINAL);

const ALLOWED = {
  languages: {
    'python': true,
    'python2': true,
    'python3': true,
    'node': true,
    'c++': true,
    'c': true,
    'java': true,
  },
  platform: {
    darwin: true,
    linux: true,
    win32: true
  },
};
Object.freeze(ALLOWED);

module.exports = { TERMINAL, ALLOWED };
