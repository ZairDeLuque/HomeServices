

const mysql = require('mysql2/promise');


async function ccn(){

    try{
        const base = mysql.createPool({
            host: 'localhost',
            port: '3306',
            user: 'root',
            database: 'homework',
            password: '353535'
        });
        console.log("Bd Connect");
        return base;
    }

    catch (err) {
        console.log("no connection error: " + err);
    }

}
module.exports = ccn();


