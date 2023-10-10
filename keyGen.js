const crypto = require("crypto");

const keyGen = (size = 32) => {
  return crypto.randomBytes(size).toString("hex");
};
module.exports = { keyGen };
