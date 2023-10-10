const crypto = require("crypto");
const { keyGen } = require("./keyGen");

const getHMAC = (message) => {
  const secret = keyGen(32);
  const HMAC = crypto
    .createHmac("sha3-256", secret)
    .update(message)
    .digest("hex");
  return { HMAC, secret };
};
module.exports = { getHMAC };
