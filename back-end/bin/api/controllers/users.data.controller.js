// User.data Controller
// Homeservices Web Services
// @ZairDeLuque - The creator

//Requires
const bcrypt = require('bcrypt')
const { Connection } = require('../../utility/mysqlUtilities/connectionManager')
const Cipher = require('../../utility/cesarCipherUtilities/cryptHelper').start('users.data')
const jwt = require('jsonwebtoken')
const { DateTime } = require('luxon')

//Tool: Secure equals credentials
async function isequalscredentials(email, cn){
    return new Promise(async (result, reject) => {
        try{
            //Prepare query
            const SQL = 'SELECT power0x1,email0x2 FROM ud0x'

            const [rows] = await cn.execute(SQL);

            if(rows.length > 0){
                for(let i = 0; i < rows.length; i++){
                    const compareEmail = await bcrypt.compare(email, rows[i].email0x2.toString('utf-8'))

                    if(compareEmail){
                        result({bool: true, provider: rows[i].power0x1})
                    }
                    else{
                        result({bool: false})
                    }
                }
            }
            else{
                result({bool: false})
            }
        }
        catch (e){
            reject(e);
        }
    })
}

//Function: Save user data
async function createUserCredentials(req, res){
    let cn;

    try{
        //Generate body const
        const body = req.body;
        
        //Create connection promise
        cn = await Connection();
    
        //Already logged?
        const isAlready = await isequalscredentials(body.e2x, cn);

        if(isAlready.bool === true){

            let msg;

            if(isAlready.provider === 'GOOGLE'){
                msg = 'El correo electrónico esta relacionado con otra cuenta Google. ¿Olvido su contraseña?';
            }
            else{
                msg = 'El correo electrónico esta relacionado con otra cuenta HomeServices. ¿Olvido su contraseña?'
            }

            res.status(200).json({
                result: msg,
                agent: 'users.data',
                required: req.ip,
                already: true
            })
        }
        else{
    
            //Crypt information
            const hashEmail = await bcrypt.hash(body.e2x, 12);
            const hashPassword = await bcrypt.hash(body.p3x, 12);
            const cryptFN = await Cipher.createNewChallenge(body.fn4x)
    
            //Prepare query
            const dateFormated = DateTime.now().setZone('America/Mexico_City').toFormat('yyyy-MM-dd HH:mm:ss');
            const SQL = 'INSERT INTO ud0x (uuid0x0, power0x1, email0x2, pass0x3, fullname0x4, verify0x5, pp0x6, date0x8) VALUES (?,?,?,?,?,?,?,?)';
            const values = [body.u0x, body.pw1x, hashEmail, hashPassword, cryptFN, '0', body.pp5x, dateFormated];
    
            const [result] = await cn.execute(SQL, values);
    
            //Results?
            if(result.affectedRows === 1){
                res.status(200).json({
                    result: true,
                    agent: 'users.data',
                    required: req.ip,
                    already: false
                })
            }
            else{
                res.status(500).json({
                    result: null,
                    agent: 'users.data',
                    required: req.ip,
                    already: false
                })
            }
        }

    }
    catch (e){
        console.error('[ERR] Error in createUserCredentials:', e)
        res.status(500).json({
            result: null,
            agent: 'users.data',
            required: req.ip,
            already: false
        });
        return;
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

//Function: Compare user credentials and return token
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

                    const userData = rows[i];

                    const token = await createToken(userData);

                    res.status(200).json({
                        result: 'Bienvenido(a) de vuelta ' + await Cipher.resolveChallenge(rows[i].fullname0x4.toString('utf-8')),
                        agent: 'users.data',
                        required: req.ip,
                        uuid: userData.uuid0x0,
                        token: token,
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

//Tool: Create token
async function createToken(user){
    return new Promise(async (result, reject) => {
        try{
            const payload = {
                uuid: user.uuid0x0,
                email: user.email0x2.toString('utf-8'),
                fullname: await Cipher.resolveChallenge(user.fullname0x4.toString('utf-8')),
                verify: user.verify0x5,
                picprofile: user.pp0x6.toString('utf-8'),
                type: user.type0x7
            }
        
            const token_RESULT = jwt.sign(payload, 'aurorastudios');
    
            result(token_RESULT);
        }
        catch{
            reject('Token invalid')
        }
    })
}

//Function: Obtain full info to UUID
async function obtainFullData(req, res){
    let cn;

    try{
        //Generate body const
        const body = req.body;

        //Create connection promise
        cn = await Connection();

        //Prepare query
        const SQL = 'SELECT * FROM ud0x WHERE uuid0x0 = ?'
        const Values = [body._uuid]

        const [rows] = await cn.execute(SQL, Values);

        //Results?
        if(rows.length > 0){

            const { power0x1, fullname0x4, verify0x5, pp0x6, type0x7, date0x8 } = rows[0]

            const array = {
                _p0x1: power0x1,
                _v0x2: verify0x5,
                _t0x3: type0x7,
                fn0x4: await Cipher.resolveChallenge(fullname0x4.toString('utf-8')),
                pp0x5: pp0x6.toString('utf-8'),
                date0x6: date0x8
            };

            res.status(200).json({
                result: array,
                agent: 'users.data'
            })
        }
        else{
            res.status(200).json({
                result: 'UUID invalida, no es posible encontrarlo en la base de datos.',
                agent: 'users.data',
                required: req.ip,
                exists: false
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

module.exports = {
    create: createUserCredentials,
    compare: compareUserCredentials,
    getdata: obtainFullData
}