// MySQL - Helper in create pool connection
// Aurora Stdios Services
// @zairdeluque - The creator

//.env
require('dotenv').config({ path: './.env'})

//Requires
const mysql = require('mysql2');

//Export
const DBx0 = mysql.createPool({
    host: process.env.HOSTSQL,
    user: process.env.USERSQL,
    password: process.env.PASSWORDSQL,
    database: process.env.DBSQL
})

module.exports = {
    DBx0: DBx0
}