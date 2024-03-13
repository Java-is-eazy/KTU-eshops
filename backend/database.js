const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'db4free.net',
    port: '3306',
    user: 'ktueshopdb',
    password: 'DBpassword',
    database: 'ktueshopdb1'
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
