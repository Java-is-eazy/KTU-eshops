const { hashPassword } = require("./hashing");
const { getUserByUsername, createUser } = require("../database/controller");
const { generateToken } = require("./token");

const tryLogin = async (username, password) => {
  try {
    if (!username || !password) {
      throw Error("Please fill in all fields");
    }

    const hashedPassword = hashPassword(username, password);

    const user = await getUserByUsername(username);
    if (!user) {
      throw Error("User does not exist");
    }

    if (user.password !== hashedPassword) {
      throw Error("Incorrect password");
    }
    return {
      username: user.username,
      token: generateToken({ role: user.role, id: user.id }),
    };
  } catch (error) {
    throw Error(error.message);
  }
};
const register = async (username, password, email, phone) => {
  try {
    if (!username || !password) {
      throw Error("Please fill in all fields");
    }

    const hashedPassword = hashPassword(username, password);

    const user = await getUserByUsername(username);
    if (user) {
      throw Error("User already exists");
    }

    await createUser(username, hashedPassword, email, phone);
  } catch (error) {
    throw error;
  }
};

module.exports = { tryLogin, register };
