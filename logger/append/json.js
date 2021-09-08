const fs = require("fs");

/**
 *
 * @param {Object} object must contain filepath, message
 */
function appendToJSON({ filePath, message }) {
  try {
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
