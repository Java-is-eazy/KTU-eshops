const crypto = require("crypto");

const hashPassword = (username, password) => {
  const combinedString = `${username}${password}`;
  const hash = crypto.createHash("sha256");
  hash.update(combinedString);
  const hashedPassword = hash.digest("hex");
  return hashedPassword;
};

module.exports = { hashPassword };
