const { exec }= require('child_process');

async function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) return reject(stderr);
      else resolve(stdout);
    });
  });
}

module.exports = executeCommand;
