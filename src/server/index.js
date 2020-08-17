let fs = require("fs");
let iplFunctions = require("./ipl.js");
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
        console.error('Error while connecting to database' + err);
    }
    else {
        console.log('Connection to database successful!!');
    }
});

module.exports = {connection}


