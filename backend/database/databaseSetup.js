require("dotenv").config();
const mysql = require("mysql");

const dbUsername = process.env.user;
const dbPassword = process.env.password;
const dbHost = process.env.host;
const dbport = process.env.port;
const dbName = process.env.database;

const connection = mysql.createPool({
  user: dbUsername,
  password: dbPassword,
  host: dbHost,
  port: dbport,
  database: dbName,
  connectionLimit: 10,
});

module.exports = { connection };
