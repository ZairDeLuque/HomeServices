// Category's Controller
// HomeServices Web Services
// @apocalixdeluque - The creator

//Requires
const { Connection } = require('../../utility/mysqlUtilities/connectionManager')
const { DateTime } = require('luxon')

async function addNewService(req, res){
    let cn;

    try{
        const body = req.body;
        
        cn = await Connection();

        const dateFormated = DateTime.now().setZone('America/Mexico_City').toFormat('yyyy-MM-dd HH:mm:ss');
        const sql = 'INSERT INTO s0x (uuid0x0, owner0x1, category0x2, name0x3, description0x4, price0x5, ttp0x6, date0x7, status0x8) VALUES (?,?,?,?,?,?,?,?,?)'
        const values = [body._uuid0x, body._own0x, body.ctg0x, body.n0x, body.desc0x, body.pr0x, body.ttp0x, dateFormated, 0]

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows === 1){
            res.status(200).json({
                result: 'Se ha enviado a revision correctamente, este pendiente de su bandeja de notificaciones.',
                saved: true
            })
        }
        else{
            res.status(500).json({
                result: 'Ha ocurrido un error al intentar enviar a revision la publicación. Intente mas tarde.',
                saved: false
            })
        }
    }
    catch (e){
        console.log('[ERR] addNewService error. Reason: ' + e)
        res.status(500).json({
            result: 'Ha ocurrido un error en la base de datos de Aurora Studios.',
            saved: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function saveImagesConverted(req, res){
    let cn;

    try{
        const body = req.body;
        
        cn = await Connection();
        
        let resultBool = false;

        for(let i = 0; i < body.lengthPics; i++){
            const sql = 'INSERT INTO s_p0x (uuid0x0, blob0x1) VALUES (?,?)'
            const values = [body._uuid, body.allImages[i]]

            const [result] = await cn.execute(sql, values);
            
            if(result.affectedRows === 0){
                resultBool = true;
                break;
            }
        }

        if(resultBool === false){
            res.status(200).json({
                result: 'Se ha enviado a revision correctamente, se le notificara cuando su publicación este activa.',
                saved: true
            })
        }
        else{
            res.status(500).json({
                result: 'Ha ocurrido un error al intentar enviar a revision la publicación. Intente mas tarde.',
                saved: false
            })
        }

    }
    catch (e){
        console.log('[ERR] addNewService error. Reason: ' + e)
        res.status(500).json({
            result: 'Ha ocurrido un error en la base de datos de Aurora Studios.',
            saved: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function getInfoServiceByUUID(req, res){
    let cn;

    try{
        const body = req.body;
        
        cn = await Connection();

        const sql = 'SELECT * FROM s0x WHERE uuid0x0 = ?'
        const values = [body._uuid0x]

        const [result] = await cn.execute(sql, values);

        if(result.length === 1){
            // const sql2 = 'SELECT * FROM s_p0x WHERE uuid0x0 = ?'
            // const values2 = [body._uuid0x]

            // const [result2] = await cn.execute(sql2, values2);

            // if(result2.length > 0){

                const returned = result.map(info => ({
                    owner0x1: info.owner0x1,
                    category0x2: info.category0x2,
                    name0x3: info.name0x3,
                    description0x4: info.description0x4.toString('utf-8'),
                    price0x5: info.price0x5,
                    ttp0x6: info.ttp0x6,
                    date0x7: info.date0x7,
                }));

                // const returned2 = [];

                // for(let i = 0; i < result2.length; i++){
                //     returned2.push({
                //         number: i,
                //         blob: result2[i].blob0x1.toString('utf-8')
                //     })
                // }

                res.status(200).json({
                    result: returned,
                    // pics: returned2,
                    getter: true
                })
            // }
            // else{
            //     res.status(500).json({
            //         result: 'Las fotografías de esta publicación están desaparecidas. Intentaremos localizarlas.',
            //         getter: true
            //     })
            // }
        }
        else{
            res.status(500).json({
                result: 'Duplicated UUID.',
                getter: false
            })
        }
    }
    catch (e){
        console.log('[ERR] addNewService error. Reason: ' + e)
        res.status(500).json({
            result: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras buscábamos información del servicio.',
            getter: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

module.exports = {
    add: addNewService,
    addPics: saveImagesConverted,
    getInfoService: getInfoServiceByUUID
}