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
async function isequalscredentials(email){
    return new Promise(async (resolve, reject) => {

        let cn;

        try{
            cn = await Connection();

            //Prepare query
            const SQL = 'SELECT power0x1, email0x2 FROM ud0x'

            const [result] = await cn.execute(SQL);

            if(result.length > 0){
                for(let i = 0; i < result.length; i++){
                    const compareEmail = await bcrypt.compare(email, result[i].email0x2.toString('utf-8'))

                    if(compareEmail === true){
                        resolve({bool: true})
                        break;
                    }
                    else{
                        resolve({bool: false})
                        break;
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
        finally{
            if(cn){
                cn.end();
            }
        }
    })
}

async function test(req, res){
    // let cn;

    // try{
    //     cn = await Connection();

    //     const response = await isequalscredentials(req.body.email, cn)

    //     res.send(response);
    // }
    // catch (err){
    //     throw err;
    // }
    // finally{
    //     if(cn){
    //         cn.end();
    //     }
    // }
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
        const isAlready = await isequalscredentials(body.e2x);

        if(isAlready.bool === true){
            res.status(200).json({
                result: 'El correo electrónico esta relacionado con otra cuenta HomeServices. ¿Olvido su contraseña?',
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
            const SQL = 'INSERT INTO ud0x (uuid0x0, power0x1, email0x2, pass0x3, fullname0x4, verify0x5, pp0x6, date0x8, new0x9) VALUES (?,?,?,?,?,?,?,?,?)';
            const values = [body.u0x, body.pw1x, hashEmail, hashPassword, cryptFN, '0', body.pp5x, dateFormated, 1];
    
            const [result] = await cn.execute(SQL, values);
    
            //Results?
            if(result.affectedRows === 1){
                res.status(200).json({
                    result: true,
                    new: 1
                })
            }
            else{
                res.status(500).json({
                    result: null
                })
            }
        }

    }
    catch (e){
        console.error('[ERR] Error in createUserCredentials:', e)
        res.status(500).json({
            result: e
        });
        return;
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function createUserCredentials_2(req, res){
    let cn;

    try{
        const body = req.body;
        cn = await Connection();

        const sCrypt = await Cipher.createNewChallenge(body.s0x);
        const cCrypt = await Cipher.createNewChallenge(body.c1x);

        const sql = 'INSERT INTO ud_p0x(state0x0, city0x1, owner0x2) VALUES (?,?,?)';
        const values = [sCrypt, cCrypt, body.u3x];

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows === 1){
            const [result2] = await cn.execute('UPDATE ud0x SET new0x9 = 0, type0x7 = ? WHERE uuid0x0 = ?', [body.u2x, body.u3x]);

            if(result2.affectedRows === 1){
                res.status(200).json({
                    result: true,
                    already: true
                })
            }
            else{
                res.status(500).json({
                    result: null,
                    already: false
                })
            }
        }
        else{
            res.status(500).json({
                result: null,
                already: false
            })
        }
    }
    catch (e){
        console.log('[ERR] Error in createUserCredentials_2. Reason:', e)
        res.status(500).json({
            result: e,
            already: false
        });
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

//Function: Compare user credentials and return token
async function compareUserCredentials(req, res) {
    let cn;

    try {
        // Generate body const
        const body = req.body;

        // Create connection promise
        cn = await Connection();

        // Prepare query
        const SQL = 'SELECT * FROM ud0x';

        const [rows] = await cn.execute(SQL);

        let responseSent = false;

        // Results?
        if (rows.length > 0) {
            for (let i = 0; i < rows.length; i++) {
                const compareEmail = await bcrypt.compare(
                    body.e0x,
                    rows[i].email0x2.toString('utf-8')
                );
                const comparePass = await bcrypt.compare(
                    body.p1x,
                    rows[i].pass0x3.toString('utf-8')
                );

                if (compareEmail && comparePass) {
                    const userData = rows[i];
                    const token = await createToken(userData);

                    res.status(200).json({
                        result:
                            'Bienvenido(a) de vuelta ' +
                            (await Cipher.resolveChallenge(
                                rows[i].fullname0x4.toString('utf-8')
                            )),
                        isnew: rows[i].new0x9,
                        uuid: userData.uuid0x0,
                        token: token,
                        allowed: true,
                    });
                    responseSent = true;
                    break; // Exit the loop once a response is sent
                } else if (compareEmail && !comparePass) {
                    res.status(200).json({
                        result:
                            'Contraseña incorrecta. Verifique sus credenciales.',
                        allowed: false,
                    });
                    responseSent = true;
                    break; // Exit the loop once a response is sent
                }
            }
        }

        if (!responseSent) {
            res.status(200).json({
                result:
                    'Correo electrónico incorrecto. Verifique sus credenciales.',
                allowed: false,
            });
        }
    } catch (e) {
        console.error('[ERR] Error in compareUserCredentials:', e);
        throw e;
    } finally {
        if (cn) {
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

async function getSmartData(req, res){
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
            const { fullname0x4, pp0x6, verify0x5 } = rows[0]

            const array = {
                fn0x0: await Cipher.resolveChallenge(fullname0x4.toString('utf-8')),
                pp0x1: pp0x6.toString('utf-8'),
                rep0x2: 1,
                verify0x3: verify0x5
            };

            res.status(200).json({
                result: array,
                exists: true
            })
        }
        else{
            res.status(200).json({
                result: 'UUID invalida, no es posible encontrarlo en la base de datos.',
                exists: false
            })
        }
    }
    catch (e){
        console.error('[ERR] Error in getSmartData:', e)
        throw e;
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function getNameSmart(req, res){
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
            const { fullname0x4 } = rows[0]

            const array = {
                fn0x0: await Cipher.resolveChallenge(fullname0x4.toString('utf-8')),
            };

            res.status(200).json({
                result: array.fn0x0,
                exists: true
            })
        }
        else{
            res.status(200).json({
                result: 'UUID invalida, no es posible encontrarlo en la base de datos.',
                exists: false
            })
        }
    }
    catch (e){
        console.error('[ERR] Error in getNameSmart:', e)
        throw e;
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

//Promise
function generateRandomNumberString() {
    return new Promise((resolve, reject) => {
        let randomNumberString = '';
        for (let i = 0; i < 12; i++) {
            randomNumberString += Math.floor(Math.random() * 10);
        }
        resolve(randomNumberString);
    });
}

//Function for Sellers Portal
async function createNewRequest(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const ID = await generateRandomNumberString();
        const sql = 'INSERT INTO ws0x (name0x0, age0x1, genre0x2, date0x3, crp0x4, rc0x5, blob0x6, hsA0x7, hsB0x8, hsC0x9, status, uuid, id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
        const values = [body.n0x, body.a0x, body.g0x, body.d0x, body.c0x, body.r0x, body.b0x, body.h0x, body.h1x, body.h2x, 0, body._u0x, ID];

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows === 1){
            res.status(200).json({
                result: 'Tu solicitud ha sido enviada con éxito. Nos pondremos en contacto contigo ante cualquier situación.',
                saved: true
            })
        }
        else{
            res.status(500).json({
                result: 'No se pudo enviar tu solicitud. Es posible que sea nuestro problema, intente mas tarde.',
                saved: false
            })
        }
    }
    catch (e){
        console.log('[ERR] Error in createNewRequest. Reason:', e)
        res.status(500).json({
            result: e,
            saved: false
        });
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

module.exports = {
    create: createUserCredentials,
    createTwo: createUserCredentials_2,
    createRequest: createNewRequest,
    compare: compareUserCredentials,
    getdata: obtainFullData,
    getSmart: getSmartData,
    getName: getNameSmart,
    test: test
}