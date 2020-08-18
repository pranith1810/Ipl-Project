let config = require("./config.js");
let mysql = require('mysql');

let connection = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = {connection};


