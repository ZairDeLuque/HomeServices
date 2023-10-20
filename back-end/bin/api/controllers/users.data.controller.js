// User.data Controller
// Homeservices Web Services
// @ZairDeLuque - The creator

//Requires
const bcrypt = require('bcrypt')
const { Connection } = require('../../utility/mysqlUtilities/connectionManager')
const Cipher = require('../../utility/cesarCipherUtilities/cryptHelper').start('users.data')

//Function: Save user data
//
async function createUserCredentials(req, res){
    let cn;

    try{
        //Generate body const
        const body = req.body;

        //Create connection promise
        cn = await Connection();

        //Crypt information
        const hashEmail = await bcrypt.hash(body.e2x, 12);
        const hashPassword = await bcrypt.hash(body.p3x, 12);
        const cryptFN = await Cipher.createNewChallenge(body.fn4x)

        //Prepare query
        const SQL = 'INSERT INTO ud0x (uuid0x0, power0x1, email0x2, pass0x3, fullname0x4, verify0x5, pp0x6) VALUES (?,?,?,?,?,?,?)';
        const values = [body.u0x, body.pw1x, hashEmail, hashPassword, cryptFN, '0', 'notassign'];

        const [result] = await cn.execute(SQL, values);

        //Results?
        if(result.affectedRows === 1){
            res.status(200).json({
                result: true,
                agent: 'users.data',
                required: req.ip,
                owner: hashEmail
            })
        }
        else{
            res.status(500).json({
                result: false,
                agent: 'users.data',
                required: req.ip,
            })
        }
    }
    catch (e){
        console.error('[ERR] Error in createUserCredentials:', e)
        return;
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function compareUserCredentials(req, res){
    let cn;

    try{
        //Generate body const
        const body = req.body;

        //Create connection promise
        cn = await Connection();

        //Hashses
        const hashEmail = await bcrypt.hash(body.e1x, 12);
        const hashPassword = await bcrypt.hash(body.p2x, 12);

        //Prepare query
        const SQL = 'SELECT * FROM ud0x WHERE email0x2 = ? AND pass0x3 = ?'
        const values = [hashEmail, hashPassword]

        const [rows] = await cn.execute(SQL, values);

        console.log(rows)

        //Results?
        if(rows.length > 0){

            if(hashEmail !== rows[0].email0x2){
                res.status(200).json({
                    result: 'Dirección de correo electrónico incorrecta.',
                    agent: 'users.data',
                    required: req.ip,
                    allowed: false
                })
                return;
            }

            if(hashPassword !== rows[0].pass0x3){
                res.status(200).json({
                    result: 'Contraseña incorrecta.',
                    agent: 'users.data',
                    required: req.ip,
                    allowed: false
                })
                return;
            }

            res.status(200).json({
                result: 'Bienvenido al sistema.',
                agent: 'users.data',
                required: req.ip,
                allowed: true
            })
        }       
    }
    catch (e){
        console.error('[ERR] Error in createUserCredentials:', e)
        return;
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

module.exports = {
    create: createUserCredentials,
    compare: compareUserCredentials
}