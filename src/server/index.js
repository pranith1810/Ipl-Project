let config = require("./config.js");
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

connection.connect((err) => {
    if (err) {
        throw new Error('Connection to database failed!!!'+err);
    }
    else {
        console.log('Connection to database successful!!');
    }
});

module.exports = {connection}


