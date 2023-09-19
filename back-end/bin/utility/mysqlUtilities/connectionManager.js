// MySQL - Helper in create pool connection
// Aurora Stdios Services
// @zairdeluque - The creator

//.env
require('dotenv').config({ path: './.env'})

//Requires
const mysql = require('mysql2/promise');

//Export
async function DBx0(){
    try{
        const CNx0 = mysql.createPool({
            host: process.env.HOSTSQL,
            port: process.env.DBPORT,
            user: process.env.USERSQL,
            password: process.env.PASSWORDSQL,
            database: process.env.DBSQL
        })
        console.log("[INFO] Utility mysql DBx0 success.");
        return CNx0;
    }
    catch(err){
        console.log("[ERR] Utility mysql DBx0 throw error: " + err);
    }
}

module.exports = DBx0();