


const ccn = require('../db/bd.js');

const registro = async (req, res ) => {

    try {
        const base = await ccn();
        const {correo, pass, user} = req.body;
        const [rows] = await base.query('insert into registro (correo, pass, user) values (?, ?, ?)', [correo, pass, user]);
        if(rows.affectedRows > 0){
            res.send('en base de datos')
        }
    } catch (error) {
        res.json({Error: "Los Datos No Fueron Aceptados"});
    }
}

module.exports = {
    registro,
}


