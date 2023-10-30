//Timezone
const { DateTime } = require('luxon')

//Database Manager
const { Connection } = require('../../utility/mysqlUtilities/connectionManager')

//Mailer Manager
const mailerUtility = require('../../utility/mailerUtilities/mailerManager')

//Cipher Manager
const Cipher = require('../../utility/cesarCipherUtilities/cryptHelper').start('verification-controller')

//Bcrypt
const bcrypt = require('bcrypt')

//Utility function
function generateNumbers(){
    return new Promise((resolve, reject) => {
        const arrayReturn = [];
        for (let i = 0; i < 6; i++) {
            const randomNum = Math.floor(Math.random() * 10);
            arrayReturn.push(randomNum);
        }
        resolve(arrayReturn);
    });
}

//Utility function
function isCodeExpired(value){
    return new Promise(async (res, rej) => {
        let cn;

        try{
            const valueSimplify = `${value[0]}${value[1]}${value[2]}${value[3]}${value[4]}${value[5]}`

            cn = await Connection();

            const [rows] = await cn.execute('SELECT * FROM v0x WHERE code0x0 = ?', [valueSimplify])

            if(rows.length > 0){
                // for(let i = 0; i < rows.length; i++){
                //     const dateMinus = DateTime.now().setZone('America/Mexico_City').minus({ hours: 24 });
                //     if (rows[i].date0x2 <= dateMinus.toSQL() && rows[i].date0x2 >= DateTime.now().setZone('America/Mexico_City').toSQL()) {
                //         await cn.execute('DELETE FROM v0x WHERE code0x0 = ?', [valueSimplify]);
                //     }
                // }
                res(true);
            }
            else{
                res(false);
            }
        }
        catch (err){
            rej(err);
        }
        finally{
            if(cn){
                cn.end();
            }
        }
    })
}

//Utility function
async function saveondatabase(value, to){
    return new Promise(async (resolve, reject) => {
        let connection; 

        try {
            connection = await Connection();

            const valueSimplify = `${value[0]}${value[1]}${value[2]}${value[3]}${value[4]}${value[5]}`
            
            const [rows] = await connection.execute('SELECT * FROM v0x WHERE code0x0 = ?', [valueSimplify])

            if(rows.length > 0){
                resolve('exists')
            }
            else{
                const dateFormated = DateTime.now().setZone('America/Mexico_City').toFormat('yyyy-MM-dd HH:mm:ss');

                const sql = 'INSERT INTO v0x (code0x0, email0x1, date0x2) VALUES (?,?,?)';
                const values = [valueSimplify, to, dateFormated]

                const [res] = await connection.execute(sql, values);

                if(res.affectedRows > 0){
                    console.log('[INFO] Verification code saved on database.')
                    resolve('resolve');
                }
                else{
                    reject('error');
                }
            }
        }
        catch (err){
            reject(err);
        }
        finally {
            if(connection){
                connection.end();
            }
        }
    })
}

//Utils
async function errorSendCode(value){
    return new Promise(async (res, rej) => {
        let cn;

        try{
            const valueSimplify = `${value[0]}${value[1]}${value[2]}${value[3]}${value[4]}${value[5]}`

            cn = await Connection();

            const [rows] = await cn.execute('SELECT * FROM v0x WHERE code0x0 = ?', [valueSimplify])

            if(rows.length > 0){
                const [result] = await cn.execute('DELETE FROM v0x WHERE code0x0 = ?', [valueSimplify]);
                
                if(result.affectedRows > 0){
                    res(true);
                }
                else{
                    res(false);    
                }
            }
            else{
                res(false);
            }
        }
        catch (err){
            rej(err);
        }
        finally{
            if(cn){
                cn.end();
            }
        }
    })
}

//Function
async function evaluateEmail(req, res){
    let cn;
    
    try{
        const body = req.body;
        const fn = await Cipher.createNewChallenge(body._fn);

        cn = await Connection();

        //Prepare query
        const SQL = 'SELECT email0x2 FROM ud0x WHERE fullname0x4 = ?'
        const values = [fn]

        const [rows] = await cn.execute(SQL, values);

        if(rows.length > 0){
            for(let i = 0; i < rows.length; i++){
                const compareEmail = await bcrypt.compare(body._e0x1, rows[i].email0x2.toString('utf-8'))

                if(compareEmail){
                    res.status(200).json({result: true})
                }
                else{
                    res.status(200).json({result: false, message: 'La dirección no esta vinculada a ' + body._fn + ', verifique la dirección.'})
                }
            }
        }
        else{
            res.status(200).json({result: false, message: 'La dirección no esta vinculada a ' + body._fn + ', verifique la dirección.'})
        }
    }
    catch (e){
        console.log('[ERR] EvaluateEmail failed. Reason: ' + e);
        
    }
}

//Export function
async function sendNewMail(req, res){
    try{
        //Generate body const
        const body = req.body;

        //Generate verify code random
        const verifyCode = await generateNumbers();
        const valueSimplify = `${verifyCode[0]}${verifyCode[1]}${verifyCode[2]}${verifyCode[3]}${verifyCode[4]}${verifyCode[5]}`

        //Save on database
        const saved = await saveondatabase(verifyCode, body.h0x);

        //If saved continue
        if(saved === 'resolve'){
            //Send email with code
            const mailer = await mailerUtility.verify(body.e1x, verifyCode);

            //If returns true bool continue
            if(mailer === true){
                res.status(200).json({result: 'Correo de verificación enviado con éxito. Compruebe su bandeja de mensajería.', saved: true, code: valueSimplify})
            }
            //Or delete code in database and send error json
            else{
                await errorSendCode(verifyCode)
                res.status(500).json({error: 'El código de verificación no se envió debido a un error de servidor.'})
            }
        }
        //Or send error json
        else{
            res.status(500).json({error: 'El código de verificación no se envió debido a un error de servidor.'})
        }
    }
    catch(err){
        console.log('[ERR] SendNewMail error: ' + err);
    }
}

//Export function
async function insertCode(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const [result] = await cn.execute('DELETE FROM v0x WHERE code0x0 = ?', [body.c0x]);
        
        if(result.affectedRows > 0){
            const [result2] = await cn.execute('UPDATE ud0x SET verify0x5 = 1 WHERE uuid0x0 = ?', [body._uuid])

            if(result2.affectedRows > 0){
                res.status(200).json({result: 'Verificación finalizada con éxito.', complete: true})
            }
            else{
                res.status(500).json({result: 'Fallo al intentar finalizar la verificación.', complete: false})
            }
        }
        else{
            res.status(500).json({result: 'Fallo al intentar finalizar la verificación.', complete: false})            
        }

    }
    catch (e){
        console.log('[ERR] InsertCode failed. Reason: ' + e);
        res.status(500).json({result: e, complete: false})
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

module.exports = {
    newCode: sendNewMail,
    evaluateEmail: evaluateEmail,
    insertCode: insertCode
}