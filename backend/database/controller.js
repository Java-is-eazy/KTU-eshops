const { configDotenv } = require("dotenv");
const { connection } = require("../database/databaseSetup");

const getItems = () => {
  return new Promise((resolve, reject) => {
    try {
      connection.query("SELECT * FROM Products", (error, results) => {
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
const deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        "DELETE FROM Users WHERE id = ?",
        [id],
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

const reportUser = (user_id, username, reason) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        "INSERT INTO `user_reports` (sender, complaint, receiver) VALUES (? , ? , ?)",
        [user_id, reason, username],
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

const getListingByID = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM `Products` WHERE id = ?",
      [id],
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

const deleteListing = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM `Products` WHERE id = ?", [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const createItem = (user_id, title, price, description, image) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        "INSERT INTO `Products` (user_id, title, description, price, image, category) VALUES (?, ?, ?, ?, ?, 'Other')",
        [user_id, title, description, price, image],
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

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM Users WHERE email = ?",
      [email],
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

const createPasswordRecoveryRequest = (userid, string) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        "INSERT INTO password_recovery (userid, string_column) VALUES (?, ?)",
        [userid, string],
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

const changePassword = (string, email, newPassword) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        "UPDATE password_recovery pr " +
          "INNER JOIN Users u ON pr.userid = u.id " +
          "SET pr.status = FALSE, u.password = ? " +
          "WHERE pr.string_column = ? AND u.email = ?",
        [newPassword, string, email],
        (error, results) => {
          if (error) {
            reject(error);
          } else if (results.affectedRows === 0) {
            resolve({
              message: "Unable to find the password recovery for this account",
            });
          } else {
            resolve({
              message: "Password updated successfully",
            });
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getItems,
  createUser,
  getUserByUsername,
  deleteUser,
  reportUser,
  deleteListing,
  createItem,
  createPasswordRecoveryRequest,
  changePassword,
  getUserByEmail,
  changePassword,
  getListingByID,
  deleteUserById
};
