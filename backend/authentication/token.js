const jsonwebtoken = require("jsonwebtoken");

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  const token = jsonwebtoken.sign(user, secret);
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (decoded.iat > Math.floor(Date.now() / 1000) - 60 * 60 * 24) {
      return decoded;
    } else {
      return "Token Expired";
    }
  } catch (error) {
    return false;
  }
};

module.exports = { generateToken, verifyToken };
