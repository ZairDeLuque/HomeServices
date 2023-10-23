// MySQL - Helper in create pool connection
// Aurora Stdios Services
// @zairdeluque - The creator

//.env
require('dotenv').config({ path: './.env'})

//Requires
const mysql = require('mysql2/promise');

//Export
async function Connection(){
    try{
        const CNx0 = await mysql.createConnection({
            host: process.env.HOSTSQL,
            port: process.env.DBPORT,
            user: process.env.USERSQL,
            password: process.env.PASSWORDSQL,
            database: process.env.DBSQL
        })
        return CNx0;
    }
    catch(err){
        console.log("[ERR] Utility mysql DBx0 throw error: " + err);
        throw err;
    }
}

module.exports = { Connection };