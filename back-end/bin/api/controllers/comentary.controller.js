// Commentary's Controller
// Homeservices Web Services
// @ZairDeLuque - The creator

//Requires
const { Connection } = require('../../utility/mysqlUtilities/connectionManager')
const Cipher = require('../../utility/cesarCipherUtilities/cryptHelper').start('commentary')
const { DateTime } = require('luxon')

function generateRandomNumberString() {
    return new Promise((resolve, reject) => {
        let randomNumberString = '';
        for (let i = 0; i < 6; i++) {
            randomNumberString += Math.floor(Math.random() * 10);
        }
        resolve(randomNumberString);
    });
}

async function CreateNewCommentary(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const Crypted = await Cipher.createNewChallenge(body.text)
        const dateFormated = DateTime.now().setZone('America/Mexico_City').toFormat('yyyy-MM-dd HH:mm:ss');
        const ID = await generateRandomNumberString();

        const sql = 'INSERT INTO c0x (owner0x0, payloader0x1, content0x2, date0x3, customid0x4) VALUES (?, ?, ?, ?, ?)';
        const val = [body._uuid, body.id, Crypted, dateFormated, ID]

        const [result] = await cn.execute(sql, val);

        if(result.affectedRows > 0){
            res.status(200).json({
                status: true,
                message: 'Comentario creado con éxito. Atento a tus respuestas!'
            })
        }
        else{
            res.status(400).json({
                status: false,
                message: 'Error al crear el comentario. Posiblemente es nuestro error, intenta de nuevo.'
            })
        }
    }
    catch (e){
        res.status(500).json({
            status: false,
            message: e
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function getLabelByUUID(uuid){
    return new Promise(async (resolve, reject) => {
        let cn;

        try{
            cn = await Connection();

            const sql = 'SELECT fullname0x4 FROM ud0x WHERE uuid0x0 = ?';
            const values = [uuid];

            const [result] = await cn.execute(sql, values);

            if(result.length === 1){
                const resolved = await Cipher.resolveChallenge(result[0].fullname0x4.toString('utf-8'))

                resolve(resolved[0])
            }
            else{
                resolve('undefined')
            }
        }
        catch (e){
            reject(e)
        }
        finally{
            if(cn){
                cn.end();
            }
        }
    })
}

async function GetCommentarys(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const sql = 'SELECT * FROM c0x WHERE payloader0x1 = ?';
        const val = [body.id]

        const [result] = await cn.execute(sql, val);

        if(result.length > 0){
            let arrayRes = [];

            for(let i = 0; i < result.length; i++){
                const agree = {
                    label: await getLabelByUUID(result[i].owner0x0),
                    content: await Cipher.resolveChallenge(result[i].content0x2.toString('utf-8')),
                    date: result[i].date0x3,
                    id: result[i].customid0x4
                }

                arrayRes.push(agree)
            }

            res.status(200).json({
                status: true,
                content: arrayRes
            })
        }
        else{
            res.sendStatus(204);
        }
    }
    catch (e){
        res.status(500).json({
            status: false,
            error: e,
            message: 'No se han podido cargar los comentarios de esta publicación.'
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

module.exports = {
    create: CreateNewCommentary,
    get: GetCommentarys
}