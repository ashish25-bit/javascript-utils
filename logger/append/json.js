const fs = require("fs");

/**
 *
 * @param {Object} object must contain filepath, message
 */
function appendToJSON({ filePath, message }) {
  try {
    // first checking whether the file is present in the given path
    // if not then make the file
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '');
    }

    let data = fs.readFileSync(filePath, "utf8");

    if (data.trim() === "") {
      data = {
        logs: [],
      };

      data = JSON.stringify(data);

      fs.writeFileSync(filePath, data);
    }

    data = JSON.parse(data);
    data["logs"].push(message);

    fs.writeFileSync(filePath, JSON.stringify(data));
  }
  catch (err) {
    throw new Error(err);
  }
}

module.exports = appendToJSON;
