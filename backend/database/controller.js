const { connection } = require("../database/databaseSetup");

const getItems = () => {
  return new Promise((resolve, reject) => {
    try {
      connection.query("SELECT * FROM Items", (error, results) => {
        if (error) {
          throw Error(error);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const createUser = (username, password, email, phone) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        "INSERT INTO Users (username, password, email, phone) VALUES (?, ?, ?, ?)",
        [username, password, email, phone],
        (error, results) => {
          if (error) {
            throw Error(error);
          } else {
            resolve(results);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM Users WHERE username = ?",
      [username],
      (error, results) => {
        try {
          if (error) {
            throw error;
          } else {
            if (results.length > 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

const deleteUser = (username) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        "DELETE FROM Users WHERE username = ?",
        [username],
        (error, results) => {
          if (error) {
            throw Error(error);
          } else {
            resolve(results);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { getItems, createUser, getUserByUsername, deleteUser };
