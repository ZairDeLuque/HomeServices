//Timezone
const { DateTime } = require('luxon')

//Database Manager
const { Connection } = require('../../utility/mysqlUtilities/connectionManager')

//Mailer Manager
const mailerUtility = require('../../utility/mailerUtilities/mailerManager')

//Utility function
function generateNumbers(){
    return new Promise((resolve, reject) => {
        const arrayReturn = [];
        for (let i = 0; i < 6; i++) {
            const randomNum = Math.floor(Math.random() * 10);
            array.push(randomNum);
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
        let cn; 

        try {
            cn = await Connection();

            const valueSimplify = `${value[0]}${value[1]}${value[2]}${value[3]}${value[4]}${value[5]}`
            
            const [rows] = cn.execute('SELECT * FROM v0x WHERE code0x0 = ?', [valueSimplify])

            if(rows.length > 0){
                resolve('exists')
            }
            else{
                const dateFormated = DateTime.now().setZone('America/Mexico_City')

                const sql = 'INSERT INTO v0x (code0x0, email0x1, date0x2) VALUES (?,?,?)';
                const values = [valueSimplify, to, dateFormated.toSQL()]

                const [res] = await cn.execute(sql, values);

                if(res){
                    resolve(true);
                }
                else{
                    reject(false);
                }
            }
        }
        catch (err){
            rej(err);
        }
        finally {
            if(cn){
                cn.end();
            }
        }
    })
}

async function errorSendCode(value){
    return new Promise(async (res, rej) => {
        let cn;

        try{
            const valueSimplify = `${value[0]}${value[1]}${value[2]}${value[3]}${value[4]}${value[5]}`

            cn = await Connection();

            const [rows] = await cn.execute('SELECT * FROM v0x WHERE code0x0 = ?', [valueSimplify])

            if(rows.length > 0){
                for(let i = 0; i < rows.length; i++){
                    if (rows[i].code0x0 === valueSimplify) {
                        await cn.execute('DELETE FROM v0x WHERE code0x0 = ?', [valueSimplify]);
                    }
                }
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

//Export function
async function sendNewMail(req, res){
    try{
        const body = req.body;

        const verifyCode = await generateNumbers();

        const saved = saveondatabase(verifyCode, body.to);
        
        if(saved === true){
            const mailer = mailerUtility.verify(body.to, verifyCode);

            if(mailer === true){
                res.status(200).json({result: 'Correo de verificación enviado con éxito. Compruebe su bandeja de mensajería.', saved: true})
            }
            else{
                res.status(500).json({error: 'El código de verificación no se envió debido a un error de servidor.'})
            }
        }
        else{
            res.status(500).json({error: 'El código de verificación no se envió debido a un error de servidor.'})
        }
    }
    catch(err){
    
    }
}