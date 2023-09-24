// Condor - The server file manager based on Node.js
// Aurora Stdios Services
// @zairdeluque - The creator

//Requires
const SQ0x1 = require('../../utility/mysqlUtilities/connectionManager');
const Cx0 = require('../../utility/cesarCipherUtilities/cryptHelper').start('condorManager')
const fs = require('fs');

//Exports functions to be used by other files
const condorExports = {
    //Function to convert
    sendToSql: function(reqFile){
        

        const query = {
            sql: 'INSERT INTO ? (imgBytes, idOwner'
        }

        SQ0x1.DBx0.query()
    } 
}