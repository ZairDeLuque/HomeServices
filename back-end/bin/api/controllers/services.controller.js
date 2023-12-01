// Services Controller
// HomeServices Web Services
// @apocalixdeluque - The creator

//Requires
const { Connection } = require('../../utility/mysqlUtilities/connectionManager')
const { DateTime } = require('luxon')
const Cipher = require('../../utility/cesarCipherUtilities/cryptHelper').start('services')

async function addNewService(req, res){
    let cn;

    try{
        const body = req.body;
        
        cn = await Connection();

        const dateFormated = DateTime.now().setZone('America/Mexico_City').toFormat('yyyy-MM-dd HH:mm:ss');
        const sql = 'INSERT INTO s0x (uuid0x0, owner0x1, category0x2, name0x3, description0x4, price0x5, ttp0x6, date0x7, status0x8, priceB0x9, explicit0x10) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        const values = [body._uuid0x, body._own0x, body.ctg0x, body.n0x, body.desc0x, body.pr0x, body.ttp0x, dateFormated, 0, body.prb0x, body.e0x]

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
            const values = [body._uuid, body.allImages[i].blob]

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
            const sql2 = 'SELECT * FROM s_p0x WHERE uuid0x0 = ?'
            const values2 = [body._uuid0x]

            const [result2] = await cn.execute(sql2, values2);

            if(result2.length > 0){

                const returned = result.map(info => ({
                    owner0x1: info.owner0x1,
                    category0x2: info.category0x2,
                    name0x3: info.name0x3,
                    description0x4: info.description0x4.toString('utf-8'),
                    price0x5: info.price0x5,
                    ttp0x6: info.ttp0x6,
                    date0x7: info.date0x7,
                    priceB0x9: info.priceB0x9,
                    explicit0x10: info.explicit0x10
                }));

                const returned2 = [];

                for(let i = 0; i < result2.length; i++){
                    returned2.push({
                        blob: result2[i].blob0x1.toString('utf-8')
                    })
                }

                res.status(200).json({
                    result: returned,
                    pics: returned2,
                    getter: true
                })
            }
            else{
                res.status(500).json({
                    result: 'Las fotografías de esta publicación están desaparecidas. Intentaremos localizarlas.',
                    getter: true
                })
            }
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

async function isMyPublish(req, res){
    let cn;

    try{
        const body = req.body;
        
        cn = await Connection();

        const sql = 'SELECT * FROM s0x WHERE uuid0x0 = ?'
        const values = [body._uuid]

        const [result] = await cn.execute(sql, values);

        if(result.length === 1){
            if(result[0].owner0x1 === body._owner){
                res.status(200).json({
                    isMy: true
                })
            }
            else{
                res.status(200).json({
                    isMy: false
                })
            }
        }
        else{
            res.status(500).json({
                result: 'Duplicated UUID.',
                getter: false
            })
        }
    }
    catch (e){
        console.log('[ERR] isMyPublish error. Reason: ' + e)
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

                resolve(resolved)
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

async function paymentInfoA(req, res){
    let cn;

    try{
        const body = req.body;
        
        cn = await Connection();

        const sql = 'SELECT * FROM s0x WHERE uuid0x0 = ?'
        const values = [body._uuid]

        const [result] = await cn.execute(sql, values);

        if(result.length === 1){

            const owner = await getLabelByUUID(result[0].owner0x1);

            res.status(200).json({
                name: result[0].name0x3,
                ofterby: owner,
                extras: result
            })
        }
        else{
            res.status(500).json({
                result: 'Duplicated UUID.',
                getter: false
            })
        }
    }
    catch (e){
        console.log('[ERR] PaymentInfoA error. Reason: ' + e)
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

//Sellers portal

async function nextStep(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const sql = 'UPDATE q0x SET completed0x12 = ? WHERE id_shop0x4 = ?'
        const values = [body._status, body._uuid]

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows === 1){
            res.status(200).json({
                updated: true
            })
        }
        else{
            res.status(500).json({
                updated: false,
                message: 'Posible duplicidad de ID o inexistencia.'
            })
        
        }
    }
    catch(e){
        console.log('[ERR] nextStep error. Reason: ' + e)
        res.status(500).json({
            updated: false,
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras actualizábamos tu servicio.'
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }

}

async function listTop5(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const sql = 'SELECT article0x0, COUNT(*) AS total_pedidos FROM q0x WHERE owner0x1 = ? GROUP BY article0x0 ORDER BY total_pedidos ' + body.activity + ' LIMIT 5'
        const values = [body._own]

        const [result] = await cn.execute(sql, values);

        if(result.length > 0){

            let response = [];

            for(let i = 0; i < result.length; i++){
                const sql2 = 'SELECT uuid0x0, category0x2, name0x3, price0x5, date0x7, status0x8, priceB0x9, explicit0x10 FROM s0x WHERE owner0x1 = ? AND uuid0x0 = ?'
                const values2 = [body._own, result[i].article0x0]

                const [result2] = await cn.execute(sql2, values2);

                if(result2.length > 0){
                    response.push(result2[i])
                }
            }

            res.status(200).json({
                result: response,
                getter: true
            })
        }
        else{
            res.status(200).json({
                result: 'No se encontraron servicios.',
                nothing: true
            })
        }
    }
    catch(e){
        console.log('[ERR] listAllProducts error. Reason: ' + e)
        res.status(500).json({
            result: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras buscábamos información de tus servicios.',
            getter: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function listAllProducts(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const sql = 'SELECT uuid0x0, category0x2, name0x3, price0x5, date0x7, status0x8, priceB0x9, explicit0x10 FROM s0x WHERE owner0x1 = ? ORDER BY date0x7 DESC'
        const values = [body._own]

        const [result] = await cn.execute(sql, values);

        if(result.length > 0){
            res.status(200).json({
                result: result,
                getter: true
            })
        }
        else{
            res.status(200).json({
                result: 'No se encontraron servicios.',
                nothing: true
            })
        }
    }
    catch(e){
        console.log('[ERR] listAllProducts error. Reason: ' + e)
        res.status(500).json({
            result: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras buscábamos información de tus servicios.',
            getter: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function DeleteRequest(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const sql = 'DELETE FROM s0x WHERE uuid0x0 = ?'
        const values = [body._uuid]

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows === 1){
            res.status(200).json({
                deleted: true
            })
        }
        else{
            res.status(500).json({
                deleted: false,
                message: 'Posible duplicidad de UUID o inexistencia.'
            })
        
        }
    }
    catch(e){
        console.log('[ERR] DeleteRequest error. Reason: ' + e)
        res.status(500).json({
            deleted: false,
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras eliminábamos tu servicio.'
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

function generateRandomNumberString() {
    return new Promise((resolve, reject) => {
        let randomNumberString = '';
        for (let i = 0; i < 12; i++) {
            randomNumberString += Math.floor(Math.random() * 10);
        }
        resolve(randomNumberString);
    });
}

async function shopStepA(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        //Cipher data
        const formA = await Cipher.createNewChallenge(body.fA0x)
        const formB = await Cipher.createNewChallenge(body.fB0x)
        const formC = await Cipher.createNewChallenge(body.fC0x)
        const formD = await Cipher.createNewChallenge(body.fD0x)
        const formE = await Cipher.createNewChallenge(body.fE0x)
        const formF = await Cipher.createNewChallenge(body.fF0x)

        const id_shop = 'HS-' + await generateRandomNumberString();
        const dateFormated = DateTime.now().setZone('America/Mexico_City').toFormat('yyyy-MM-dd HH:mm:ss');
        const sql = 'INSERT INTO q0x (article0x0, owner0x1, shopper0x2, subprice0x3, id_shop0x4, formA0x5, formB0x6, formC0x7, formD0x8, formE0x9 ,formF0x10, date0x11, completed0x12, multiplebuys0x13) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        const values = [body.a0x, body.o0x, body.s0x, body.sp0x, id_shop, formA, formB, formC, formD, formE, formF, dateFormated, 0, body._multiple]

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows > 0){
            res.status(200).json({
                success: true
            })
        }
        else{
            res.status(500).json({
                message: 'Desafortunadamente tu información no se guardo, por lo tanto no se podrá procesar tu solicitud.',
                success: false
            })
        }
    }
    catch(e){
        console.log('[ERR] shopStepA error. Reason: ' + e)
        res.status(500).json({
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras procesábamos tu solicitud.',
            success: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function UncompleteTasks(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection()

        const sql = 'SELECT * FROM q0x WHERE owner0x1 = ? AND (completed0x12 >= 0 AND completed0x12 <= 2 OR completed0x12 = 7 OR completed0x12 = 8) '
        const values = [body._uuid]

        const [result] = await cn.execute(sql, values);

        if(result.length > 0){
            let apprend = [];

            for(let i = 0; i < result.length; i++){
                const aprendiz = {
                    article0x0: result[i].article0x0,
                    owner0x1: result[i].owner0x1,
                    shopper0x2: result[i].shopper0x2,
                    subprice0x3: result[i].subprice0x3,
                    id_shop0x4: result[i].id_shop0x4,
                    formA0x5: await Cipher.resolveChallenge(result[i].formA0x5),
                    formB0x6: result[i].formB0x6,
                    formC0x7: await Cipher.resolveChallenge(result[i].formC0x7),
                    formD0x8: result[i].formD0x8,
                    formE0x9: result[i].formE0x9,
                    formF0x10: await Cipher.resolveChallenge(result[i].formF0x10.toString('utf-8')),
                    date0x11: result[i].date0x11,
                    completed0x12: result[i].completed0x12,
                    multiple0x13: result[i].multiplebuys0x13
                }

                apprend.push(aprendiz)
            }

            res.status(200).json({
                result: apprend,
                get: true
            })
        }
        else{
            res.status(200).json({
                nothing: true
            })
        }
    }
    catch(e){
        console.log('[ERR] UncompleteTasks error. Reason: ' + e)
        res.status(500).json({
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras procesábamos tu solicitud.',
            get: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function InvoiceData(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection()

        const sql = 'SELECT name0x3, price0x5, priceB0x9 FROM s0x WHERE uuid0x0 = ?'
        const values = [body._uuid]

        const [result] = await cn.execute(sql, values);

        if(result.length > 0){
            res.status(200).json({
                info: result,
                get: true
            })
            
            // const sql2 = 'SELECT powered0x3 FROM pay0x WHERE uuidshop0x4 = ? AND payer0x1 = ?'
            // const values2 = [body._uuid, body._payer]

            // const [result2] = await cn.execute(sql2, values2);

            // if(result2.length === 1){
            // }
            // else{
            //     res.status(200).json({
            //         get: false
            //     })
            // }
        }
        else{
            res.status(200).json({
                get: false
            })
        
        }
    }
    catch (err){
        console.log('[ERR] InvoiceData error. Reason: ' + err)
        res.status(500).json({
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras procesábamos tu solicitud.',
            get: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function obtaineableInfo(UUID){
    return new Promise(async (resolve, reject) => {
        let cn;

        try{

            cn = await Connection();

            const sql = 'SELECT fullname0x4 FROM ud0x WHERE uuid0x0 = ?'
            const values = [UUID]

            const [result] = await cn.execute(sql, values);

            if(result.length > 0){
                resolve(Cipher.resolveChallenge(result[0].fullname0x4.toString('utf-8')))
            }
            else{
                resolve('Not Founded')
            }
        }
        catch(e){
            console.log('[ERR] obtaineableInfo error. Reason: ' + e)
            reject(e)
        }
        finally{
            if(cn){
                cn.end();
            }
        }
    })
}

async function MyOwnServices(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection()

        const sql = 'SELECT * FROM q0x WHERE shopper0x2 = ? ORDER BY date0x11 DESC'
        const values = [body._uuid]

        const [result] = await cn.execute(sql, values);

        if(result.length > 0){

            const sql2 = 'SELECT uuid0x0, name0x3, price0x5, priceB0x9 FROM s0x WHERE uuid0x0 = ?'
            const values2 = [result[0].article0x0]

            const [result2] = await cn.execute(sql2, values2);

            if(result2.length > 0){
                let arrayAOutput = [];

                for(let i = 0; i < result.length; i++){
                    const { article0x0, owner0x1, subprice0x3, id_shop0x4, formA0x5, formB0x6, formC0x7, formD0x8, formE0x9, formF0x10, date0x11, completed0x12, multiplebuys0x13 } = result[i];

                    const array = {
                        data0: await obtaineableInfo(owner0x1),
                        data1: article0x0,
                        data2: subprice0x3,
                        data3: id_shop0x4,
                        data4: await Cipher.resolveChallenge(formA0x5),
                        data5: formB0x6,
                        data6: await Cipher.resolveChallenge(formC0x7),
                        data7: formD0x8,
                        data8: formE0x9,
                        data9: await Cipher.resolveChallenge(formF0x10.toString('utf-8')),
                        data10: date0x11,
                        data11: completed0x12,
                        data12: multiplebuys0x13
                    }

                    arrayAOutput.push(array)
                }

                res.status(200).json({
                    resultQ: arrayAOutput,
                    resultS: result2,
                    get: true
                })
            }
            else{
                res.status(200).json({
                    nothing: true
                })
            }
        }
        else{
            res.status(200).json({
                nothing: true
            })
        }
    }
    catch(e){
        console.log('[ERR] MyOwnServices error. Reason: ' + e)
        res.status(500).json({
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras procesábamos tu solicitud.',
            get: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }

}

async function cancelPurchase(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection()

        const sql = 'UPDATE q0x SET completed0x12 = 4 WHERE id_shop0x4 = ?'
        const values = [body._id]

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows === 1){
            res.status(200).json({
                canceled: true
            })
        }
        else{
            res.status(403).json({
                canceled: false,
                message: 'Posible duplicidad de UUID o inexistencia.'
            })
        
        }
    }
    catch(e){
        console.log('[ERR] cancelPurchase error. Reason: ' + e)
        res.status(500).json({
            canceled: false,
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras cancelábamos tu servicio.'
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }

}

async function cancelPurchase2(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection()

        const sql = 'UPDATE q0x SET completed0x12 = 6 WHERE id_shop0x4 = ?'
        const values = [body._id]

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows === 1){
            res.status(200).json({
                canceled: true
            })
        }
        else{
            res.status(403).json({
                canceled: false,
                message: 'Posible duplicidad de UUID o inexistencia.'
            })
        
        }
    }
    catch(e){
        console.log('[ERR] cancelPurchase2 error. Reason: ' + e)
        res.status(500).json({
            canceled: false,
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras cancelábamos tu servicio.'
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }

}

async function getPublishWithUUID(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection()

        const sql = 'SELECT * FROM s0x WHERE owner0x1 = ?'
        const values = [body._uuid]

        const [result] = await cn.execute(sql, values);

        if(result.length === 1){
            let resArr = [];

            for(let i = 0; i < result.length; i++){
                const { uuid0x0, category0x2, name0x3, description0x4, price0x5, ttp0x6, date0x7, status0x8, priceB0x9, explicit0x10 } = result[i];

                const apprend = {
                    data0: uuid0x0,
                    data1: category0x2,
                    data2: name0x3,
                    data3: description0x4.toString('utf-8'),
                    data4: price0x5,
                    data5: ttp0x6,
                    data6: date0x7,
                    data7: status0x8,
                    data8: priceB0x9,
                    data9: explicit0x10
                }

                resArr.push(apprend)
            }

            res.status(200).json({
                result: resArr,
                get: true
            })
        }
        else{
            res.status(200).json({
                get: false
            })
        }
    }
    catch(e){
        console.log('[ERR] getPublishWithUUID error. Reason: ' + e)
        res.status(500).json({
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras procesábamos tu solicitud.',
            get: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }

}

async function getPublishWithLocation(req, res) {
    let cn;

    try {
        const body = req.body;

        cn = await Connection();

        const sql = 'SELECT state0x0, city0x1 FROM ud_p0x WHERE owner0x2 = ?';
        const values = [body._uuid];

        const [result] = await cn.execute(sql, values);

        if (result.length === 1) {
            const sql2 = 'SELECT owner0x2 FROM ud_p0x WHERE state0x0 = ? AND city0x1 = ?';
            const values2 = [result[0].state0x0, result[0].city0x1];

            const [result2] = await cn.execute(sql2, values2);

            let allResults = [];

            for (let i = 0; i < result2.length; i++) {
                const sql3 = 'SELECT * FROM s0x WHERE owner0x1 = ?';
                const values3 = [result2[i].owner0x2];

                const [result3] = await cn.execute(sql3, values3);

                if (result3.length > 0) {
                    let resArr = [];

                    for (let j = 0; j < result3.length; j++) {
                        const {
                            uuid0x0,
                            category0x2,
                            name0x3,
                            description0x4,
                            price0x5,
                            ttp0x6,
                            date0x7,
                            status0x8,
                            priceB0x9,
                            explicit0x10
                        } = result3[j];

                        const apprend = {
                            data0: uuid0x0,
                            data1: category0x2,
                            data2: name0x3,
                            data3: description0x4.toString('utf-8'),
                            data4: price0x5,
                            data5: ttp0x6,
                            data6: date0x7,
                            data7: status0x8,
                            data8: priceB0x9,
                            data9: explicit0x10
                        };

                        resArr.push(apprend);
                    }

                    allResults = allResults.concat(resArr);
                }
            }

            if (allResults.length > 0) {
                res.status(200).json({
                    result: allResults,
                    get: true
                });
            } else {
                res.status(200).json({
                    get: false
                });
            }
        } else {
            res.status(200).json({
                get: false
            });
        }
    } catch (e) {
        console.log('[ERR] getPublishWithUUID error. Reason: ' + e);
        res.status(500).json({
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras procesábamos tu solicitud.',
            get: false
        });
    } finally {
        if (cn) {
            cn.end();
        }
    }
}

async function powerSearch(req, res){
    let cn;

    try{
        cn = await Connection()

        const sql = 'SELECT name0x3 FROM s0x'
        const [result] = await cn.execute(sql);

        if(result.length > 0){
            res.status(200).json({
                data: result,
                get: true
            })
        }
        else{
            res.status(200).json({
                get: false
            })
        }
    }
    catch(e){
        console.log('[ERR] powerSearch error. Reason: ' + e)
        res.status(500).json({
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras procesábamos tu solicitud.',
            get: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function generateRandomSearch(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection()

        let sql, values;

        if(body._template){
            sql = 'SELECT * FROM s0x WHERE name0x3 LIKE ? ' + body._template
            values = ['%' + body._search + '%']
        }
        else{
            sql = 'SELECT * FROM s0x WHERE name0x3 LIKE ? AND explicit0x10 = \'y\''
            values = ['%' + body._search + '%']
        }

        const [result] = await cn.execute(sql, values);

        if(result.length > 0){
            let resArr = [];

            for (let j = 0; j < result.length; j++) {
                const {
                    uuid0x0,
                    category0x2,
                    name0x3,
                    description0x4,
                    price0x5,
                    ttp0x6,
                    date0x7,
                    status0x8,
                    priceB0x9,
                    explicit0x10
                } = result[j];

                const apprend = {
                    data0: uuid0x0,
                    data1: category0x2,
                    data2: name0x3,
                    data3: description0x4.toString('utf-8'),
                    data4: price0x5,
                    data5: ttp0x6,
                    data6: date0x7,
                    data7: status0x8,
                    data8: priceB0x9,
                    data9: explicit0x10
                };

                resArr.push(apprend);
            }

            res.status(200).json({
                data: resArr,
                total: resArr.length,
                success: true
            })
        }
        else{
            res.status(200).json({
                success: false
            })
        }
    }
    catch(e){
        console.log('[ERR] generateRandomSearch error. Reason: ' + e)
        res.status(500).json({
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras procesábamos tu solicitud.',
            success: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function itsMyInvitation(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection()

        const sql = 'SELECT * FROM as0x WHERE payloader0x0 = ? AND idshop0x1 = ?'
        const values = [body._uuid, body._idshop]

        const [result] = await cn.execute(sql, values);

        if(result.length === 1){
            res.status(200).json({
                its: true
            })
        }
        else{
            res.status(200).json({
                its: false
            })
        }
    }
    catch(e){
        console.log('[ERR] itsMyInvitation error. Reason: ' + e)
        res.status(500).json({
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras procesábamos tu solicitud.',
            its: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function confirmInvitation(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const sql = 'SELECT * FROM as0x WHERE idshop0x1 = ?';
        const values = [body._idshop];

        const [result] = await cn.execute(sql, values)

        if(result.length === 1){
            const sql2 = 'UPDATE q0x SET completed0x12 = 3 WHERE id_shop0x4 = ?';
            const values2 = [body._idshop]

            const [result2] = await cn.execute(sql2, values2)

            if(result2.affectedRows === 1){
                const sql3 = 'DELETE FROM as0x WHERE idshop0x1 = ?';
                const values3 = [body._idshop];

                const [result3] = await cn.execute(sql3, values3);

                if(result3.affectedRows === 1){
                    res.status(200).json({
                        success: true
                    })
                }
                else{
                    res.status(200).json({
                        success: false
                    })
                }
            }
            else{
                res.status(200).json({
                    success: false
                })
            }
        }
        else{
            const sql2 = 'INSERT INTO as0x (payloader0x0, idshop0x1) VALUES (?,?)';
            const values = [body._uuid, body._idshop];

            const [result2] = await cn.execute(sql2, values);

            if(result2.affectedRows === 1){
                
                let sql3

                if(body._sp){
                    sql3 = 'UPDATE q0x SET completed0x12 = 7 WHERE id_shop0x4 = ?';
                }
                else{
                    sql3 = 'UPDATE q0x SET completed0x12 = 8 WHERE id_shop0x4 = ?';
                }

                const values3 = [body._idshop];

                const [result3] = await cn.execute(sql3, values3);

                if(result3.affectedRows === 1){
                    res.status(200).json({
                        agree: true
                    })
                }
            }
            else{
                res.status(200).json({
                    agree: false
                })
            }
        }
    }
    catch(e){
        console.log('[ERR] confirmInvitation error. Reason: ' + e)
        res.status(500).json({
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras procesábamos tu solicitud.',
            success: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function getShopsandCosts(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const sql = 'SELECT SUM(subprice0x3) as SM, COUNT (*) as TS FROM q0x WHERE owner0x1 = ? AND (completed0x12 = 3 OR completed0x12 = 5)'
        const values = [body._uuid]

        const [result] = await cn.execute(sql, values);

        if(result.length > 0){
            res.status(200).json({
                data: result,
                success: true
            })
        }
        else{
            res.status(200).json({
                success: false
            })
        }
    }
    catch(e){
        console.log('[ERR] getShopsandCosts error. Reason: ' + e)
        res.status(500).json({
            success: false
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

//Main
async function getTopServices(req, res) {
    let cn;

    try {
        cn = await Connection();

        const sql = 'SELECT article0x0, COUNT(*) AS total_pedidos FROM q0x GROUP BY article0x0 ORDER BY total_pedidos DESC'

        const [result] = await cn.execute(sql);

        if (result.length > 0) {
            let allResults = [];

            for (let i = 0; i < result.length; i++) {
                const sql2 = 'SELECT * FROM s0x WHERE uuid0x0 = ?';
                const values2 = [result[i].article0x0];

                const [result2] = await cn.execute(sql2, values2);

                if (result2.length > 0) {
                    let resArr = [];

                    for (let j = 0; j < result2.length; j++) {
                        const {
                            uuid0x0,
                            category0x2,
                            name0x3,
                            description0x4,
                            price0x5,
                            ttp0x6,
                            date0x7,
                            status0x8,
                            priceB0x9,
                            explicit0x10
                        } = result2[j];

                        const apprend = {
                            data0: uuid0x0,
                            data1: category0x2,
                            data2: name0x3,
                            data3: description0x4.toString('utf-8'),
                            data4: price0x5,
                            data5: ttp0x6,
                            data6: date0x7,
                            data7: status0x8,
                            data8: priceB0x9,
                            data9: explicit0x10
                        };

                        resArr.push(apprend);
                    }

                    allResults = allResults.concat(resArr);
                }
            }

            if (allResults.length > 0) {
                res.status(200).json({
                    result: allResults,
                    get: true
                });
            } else {
                res.status(200).json({
                    get: false
                });
            }
        }
        else {
            const sql2 = 'SELECT * FROM s0x';

            const [result2] = await cn.execute(sql2);

            if (result2.length > 0) {
                let resArr = [];

                for (let j = 0; j < result2.length; j++) {
                    const {
                        uuid0x0,
                        category0x2,
                        name0x3,
                        description0x4,
                        price0x5,
                        ttp0x6,
                        date0x7,
                        status0x8,
                        priceB0x9,
                        explicit0x10
                    } = result2[j];

                    const apprend = {
                        data0: uuid0x0,
                        data1: category0x2,
                        data2: name0x3,
                        data3: description0x4.toString('utf-8'),
                        data4: price0x5,
                        data5: ttp0x6,
                        data6: date0x7,
                        data7: status0x8,
                        data8: priceB0x9,
                        data9: explicit0x10
                    };

                    resArr.push(apprend);
                }

                res.status(200).json({
                    result: resArr,
                    get: true
                });
            }
        }
    } catch (e) {
        console.log('[ERR] getPublishWithUUID error. Reason: ' + e);
        res.status(500).json({
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras procesábamos tu solicitud.',
            get: false
        });
    } finally {
        if (cn) {
            cn.end();
        }
    }
}

async function getNewServices(req, res) {
    let cn;

    try {
        cn = await Connection();

        const dateFormated = DateTime.now().setZone('America/Mexico_City').toFormat('yyyy-MM-dd HH:mm:ss');
        const yearMonth = DateTime.fromFormat(dateFormated, 'yyyy-MM-dd HH:mm:ss').toFormat('yyyy-MM');
        const sql = `SELECT * FROM s0x WHERE DATE_FORMAT(date0x7, '%Y-%m') = '${yearMonth}'`;

        const [result] = await cn.execute(sql);

        if (result.length > 0) {
            let resArr = [];

            for (let j = 0; j < result.length; j++) {
                const {
                    uuid0x0,
                    category0x2,
                    name0x3,
                    description0x4,
                    price0x5,
                    ttp0x6,
                    date0x7,
                    status0x8,
                    priceB0x9,
                    explicit0x10
                } = result[j];

                const apprend = {
                    data0: uuid0x0,
                    data1: category0x2,
                    data2: name0x3,
                    data3: description0x4.toString('utf-8'),
                    data4: price0x5,
                    data5: ttp0x6,
                    data6: date0x7,
                    data7: status0x8,
                    data8: priceB0x9,
                    data9: explicit0x10
                };

                resArr.push(apprend);
            }

            res.status(200).json({
                result: resArr,
                get: true
            });
        }
        else {
            res.status(200).json({
                get: false
            });
        }
    } catch (e) {
        console.log('[ERR] getPublishWithUUID error. Reason: ' + e);
        res.status(500).json({
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras procesábamos tu solicitud.',
            get: false
        });
    } finally {
        if (cn) {
            cn.end();
        }
    }
}

async function getTodayServices(req, res) {
    let cn;

    try {
        cn = await Connection();
        
        const todayStart = DateTime.now().setZone('America/Mexico_City').startOf('day');
        const todayEnd = DateTime.now().setZone('America/Mexico_City').endOf('day');

        const sql = `SELECT * FROM s0x WHERE date0x7 >= '${todayStart.toISO()}' AND date0x7 <= '${todayEnd.toISO()}'`;

        const [result] = await cn.execute(sql);

        if (result.length > 0) {
            let resArr = [];

            for (let j = 0; j < result.length; j++) {
                const {
                    uuid0x0,
                    category0x2,
                    name0x3,
                    description0x4,
                    price0x5,
                    ttp0x6,
                    date0x7,
                    status0x8,
                    priceB0x9,
                    explicit0x10
                } = result[j];

                const apprend = {
                    data0: uuid0x0,
                    data1: category0x2,
                    data2: name0x3,
                    data3: description0x4.toString('utf-8'),
                    data4: price0x5,
                    data5: ttp0x6,
                    data6: date0x7,
                    data7: status0x8,
                    data8: priceB0x9,
                    data9: explicit0x10
                };

                resArr.push(apprend);
            }

            res.status(200).json({
                result: resArr,
                get: true
            });
        }
        else {
            res.status(200).json({
                get: false
            });
        }
    } catch (e) {
        console.log('[ERR] getPublishWithUUID error. Reason: ' + e);
        res.status(500).json({
            message: 'Ha ocurrido un error en la base de datos de Aurora Studios mientras procesábamos tu solicitud.',
            get: false
        });
    } finally {
        if (cn) {
            cn.end();
        }
    }
}

module.exports = {
    add: addNewService,
    addPics: saveImagesConverted,
    getNavbar: powerSearch,
    getInfoService: getInfoServiceByUUID,
    getInfoWithUUID: getPublishWithUUID,
    getWithLocation: getPublishWithLocation,
    isMyPublish: isMyPublish,
    paymentA: paymentInfoA,
    SPgetAllProducts: listAllProducts,
    SPgetTops: listTop5,
    SPuncomplete: UncompleteTasks,
    SPnext: nextStep,
    SPcancel: cancelPurchase2,
    invitation: confirmInvitation,
    invitation2: itsMyInvitation,
    deleteReq: DeleteRequest,
    shopA: shopStepA,
    invoice: InvoiceData,
    ownedA: MyOwnServices,
    ownedB: cancelPurchase,
    searchWithFilter: generateRandomSearch,
    getSmartData: getShopsandCosts,
    getTopMain: getTopServices,
    getNewMain: getNewServices,
    getTodayMain: getTodayServices
}