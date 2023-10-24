// User.data Controller
// Homeservices Web Services
// @ZairDeLuque - The creator

//Requires
const bcrypt = require('bcrypt')
const { Connection } = require('../../utility/mysqlUtilities/connectionManager')
const Cipher = require('../../utility/cesarCipherUtilities/cryptHelper').start('users.data')
const jwt = require('jsonwebtoken')

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

        //Prepare query
        const SQL = 'SELECT * FROM ud0x'

        const [rows] = await cn.execute(SQL);

        //Results?
        if(rows.length > 0){
            for(let i = 0; i < rows.length; i++){
                const compareEmail = await bcrypt.compare(body.e0x, rows[i].email0x2.toString('utf-8'))
                const comparePass = await bcrypt.compare(body.p1x, rows[i].pass0x3.toString('utf-8'))

                if(compareEmail && comparePass){
                    res.status(200).json({
                        result: 'Bienvenido(a) de vuelta ' + await Cipher.resolveChallenge(rows[i].fullname0x4.toString('utf-8')),
                        agent: 'users.data',
                        required: req.ip,
                        uuid: rows[i].uuid0x0,
                        allowed: true
                    })
                }
                else if(compareEmail && !comparePass){
                    res.status(200).json({
                        result: 'Contraseña incorrecta. Verifique sus credenciales.',
                        agent: 'users.data',
                        required: req.ip,
                        allowed: false
                    })
                }
                else{
                    res.status(200).json({
                        result: 'Correo electrónico incorrecto. Verifique sus credenciales.',
                        agent: 'users.data',
                        required: req.ip,
                        allowed: false
                    })
                }
            }
        }
        else{
            res.status(200).json({
                result: 'No hay credenciales similares.',
                agent: 'users.data',
                required: req.ip,
                allowed: false
            })
        }
    }
    catch (e){
        console.error('[ERR] Error in createUserCredentials:', e)
        throw e;
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function createToken(user){
    const payload = {
        fullname: await Cipher.resolveChallenge(user.fullname0x4.toString('utf-8'))
    }
}

module.exports = {
    create: createUserCredentials,
    compare: compareUserCredentials
}