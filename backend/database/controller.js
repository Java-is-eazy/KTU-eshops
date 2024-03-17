const { connection } = require("../database/databaseSetup");

const getItems = () => {
  const query = "SELECT * FROM Products";
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const createUser = (username, password, email, role) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO Users (username, password, email, role) VALUES (?, ?, ?, ?)",
      [username, password, email, role],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      }
    );
  });
};

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM Users WHERE username = ?",
      [username],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null); // User not found
          }
        }
      }
    );
  });
};

module.exports = { getItems, createUser, getUserByUsername };
