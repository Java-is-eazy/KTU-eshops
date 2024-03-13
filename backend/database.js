require('dotenv').config();
const mysql = require('mysql');

const dbUsername = process.env.user;
const dbPassword = process.env.password;
const dbHost = process.env.host;
const dbport = process.env.port;
const dbName = process.env.database;

const connection = mysql.createConnection({
   user: dbUsername,
   password: dbPassword,
   host: dbHost,
   port: dbport,
   database: dbName
})

connection.connect();

connection.query(`select * from Products`, (err, result, field) =>{
    if(err)
    {
        return console.log(err);
    }
    return console.log(result);
})

connection.end()
