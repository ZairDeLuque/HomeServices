// User.data Controller
// Homeservices Web Services
// @MariaSantanaa - The creator

//Requires
const { Connection } = require('../../utility/mysqlUtilities/connectionManager')
const Cipher = require('../../utility/cesarCipherUtilities/cryptHelper').start('users.notifications')
const { DateTime } = require('luxon')

//Helpers
function reformatDate(date){
    return new Promise((resolve, reject) => {
        try{
            const newDate = DateTime.fromISO(date).toFormat('yyyy-MM-dd HH:mm');

            resolve(newDate);
        }
        catch(e){
            console.log('[ERR] reformatDate failed. Reason: ', e);
            reject(e);
        }
    })
}

//Function export
async function getNotifications(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const query = `SELECT * FROM n0x WHERE own0x0 = ? ORDER BY date0x6 DESC`;
        const values = [body._id];

        const [result] = await cn.execute(query, values);

        if(result.length > 0){
            let arrayRes = [];

            for(let i = 0; i < result.length; i++){
                const agree = {
                    _read: result[i].read0x7,
                    id: result[i].id0x1,
                    title: result[i].title0x2,
                    subtitle: result[i].subtitle0x3.toString('utf-8'),
                    severity: result[i].severity0x4,
                    dir: result[i].dir0x5.toString('utf-8'),
                    date0x6: result[i].date0x6
                }

                arrayRes.push(agree)
            }

            res.status(200).json({
                ok: true,
                notifications: arrayRes
            })
        }
        else{
            res.status(204).json({
                ok: false
            })
        }
    }
    catch(e){
        console.log('[ERR] getNotifications failed. Reason: ', e);
        res.status(500).json({
            ok: false,
            error: e
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function deleteNotifications(req, res){
    let cn; 
    
    try{
        const body = req.body;

        cn = await Connection();

        const sql = 'DELETE FROM n0x WHERE id0x1 = ?';
        const values = [body._id];

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows === 1){
            res.status(200).json({
                ok: true,
                message: 'Notificación eliminada con éxito.'
            })
        }
        else{
            res.status(400).json({
                ok: false,
                message: 'No se pudo eliminar la notificación.'
            })
        }
    }
    catch(err){
        console.log('[ERR] deleteNotifications failed. Reason: ', err);
        res.status(500).json({
            ok: false,
            error: err
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function getAll(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const query = `SELECT * FROM n0x WHERE own0x0 = ?`;
        const values = [body._id];

        const [result] = await cn.execute(query, values);

        if(result.length > 0){
            res.status(200).json({
                ok: true,
                result: result.length
            })
        }
        else{
            res.status(200).json({
                ok: true,
                result: 0
            })
        }
    }
    catch(err){
        console.log('[ERR] getAll failed. Reason: ', err);
        res.status(500).json({
            ok: false,
            error: err
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

module.exports = {
    get: getNotifications,
    delete: deleteNotifications,
    length: getAll
}