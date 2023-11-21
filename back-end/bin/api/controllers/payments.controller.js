// Payments Controller
// HomeServices Web Services
// @ZairDeLuque - The creator

//Requires
const mpAPI = require('mercadopago')
require('dotenv').config({path: '../../../.env'})
const { Connection } = require('../../utility/mysqlUtilities/connectionManager')
const stripeAPI = require('stripe')

//Mercado Pago payments
function getTransitionID(preference_id){
    return new Promise(async (resolve, reject) => {
        let cn; 

        try{
            cn = await Connection();

            const sql = 'SELECT transID0x0 FROM pay0x';
            
            const [result] = await cn.execute(sql);

            if(result.length > 0){
                for(let i = 0; i < result.length; i++){
                    const comparable = result[i].transID0x0;

                    if(preference_id.includes(comparable)){
                        resolve(comparable)
                    }
                }
            }
            else{
                reject('No hay transacciones registradas.')
            }
        }
        catch(err){
            console.log('[ERR] Get transition ID as failed: ' + err);
            reject(err)
        }
        finally{
            if(cn){
                cn.end();
            }
        }
    })
}

async function saveInformationTicket(data, collectorID){
    let cn;

    try{
        cn = await Connection();

        const sql = "INSERT INTO pay0x (transID0x0, payer0x1, status0x2, powered0x3, uuidshop0x4, price0x5) VALUES (?,?,?,?,?,?)";
        const values = [collectorID, data._payer, 'created', 'MPAGO', data._uitem, data._price]

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows > 0){
            return true;
        }
        else{
            return false;
        }
    }
    catch(err){
        console.log('[ERR] Save ticket information as failed: ' + err);
        return;
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function UpdateInformationTicket(collector_id, newstatus){
    let cn;

    try{
        cn = await Connection();

        const sql = 'UPDATE pay0x SET status0x2 = ? WHERE transID0x0 = ?';
        const values = [newstatus, collector_id]

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows > 0){
            return true;
        }
        else{
            return false;
        }
    }
    catch(err){
        console.log('[ERR] Update ticket information as failed: ' + err);
        return;
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function createPayment(req, res){
    const ACCESS_TOKEN = process.env.MERCADO_PAGO_TOKEN;
    
    const body = req.body;
    const thisURL = 'http://192.168.30.186:3000/api/v1/post/payments/mp/'

    if(body){

        mpAPI.configure({
            access_token: ACCESS_TOKEN
        })
    
        const result = await mpAPI.preferences.create({
            items: [
                {
                    title: body._item,
                    unit_price: body._price,
                    currency_id: 'MXN',
                    quantity: body._qual,
                }
            ],
            payer: {
                name: body._payer
            },
            back_urls: {
                success: thisURL + 'success',
                failure: thisURL + 'failure',
                pending: thisURL + 'pending',
            },
            notification_url: "https://f25e-187-146-13-153.ngrok.io/api/v1/post/payments/mp/webhook"
        })

        if(result){
            const save = await saveInformationTicket(body, result.body.collector_id);

            if(save === true){
                res.status(200).json({
                    authorized: true,
                    important: result.body.init_point,
                    collectorID: result.body.collector_id,
                    saved: true,
                })
            }
            else{
                res.status(200).json({
                    access: false,
                    message: 'Aurora Studios Services no ha conseguido crear el ticket.',
                    saved: false
                })
            }
        }
    }

};

async function onFailedMP(req, res){
    const queryRaw = req.query;
    
    try{
        const c = await getTransitionID(queryRaw.preference_id);

        if(c){
            UpdateInformationTicket(c, 'cancelled')
        }

        res.sendStatus(204);
    }
    catch (err){
        res.sendStatus(500).json({error: err.message})
    }
}

async function webHookMP(req, res){
    const queryRaw = req.query;

    try{
        if(queryRaw.type === 'payment'){
            const data = await mpAPI.payment.findById(queryRaw['data.id'])

            if(data.response.status === 'approved'){
                UpdateInformationTicket(data.body.collector_id, data.response.status)
            }
            else{
                UpdateInformationTicket(data.body.collector_id, 'rejected')
            }
        }

        res.sendStatus(201);
    }
    catch (err){
        console.log('[ERR] Mercado Pago WebHook as failed: ' + err)
        res.sendStatus(500).json({error: err.message})
    }
}

async function checkStatusTransition(req, res){
    let cn; 
    
    try{
        const body = req.body;

        cn = await Connection();

        const sql = 'SELECT status0x2 FROM pay0x WHERE transID0x0 = ?';
        const values = [body.id]

        const [result] = await cn.execute(sql, values);

        if(result.length > 0){
            res.status(200).json({
                status: result[0].status0x2
            })
        }
        else{
            res.status(500).json({
                status: 'not found'
            })
        }
    }
    catch (e){
        console.log('[ERR] Check status transition as failed: ' + e);
        res.status(500).json({
            status: 'error'
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

//Global Stripe Token
const TOKEN = process.env.STRIPE_TOKEN;

const stp = new stripeAPI.Stripe(TOKEN);

//Stripe Helper
async function saveInformationTicketStripe(data, idPayment){
    let cn;

    try{
        cn = await Connection();

        const sql = "INSERT INTO pay0x (transID0x0, payer0x1, status0x2, powered0x3, uuidshop0x4, price0x5) VALUES (?,?,?,?,?,?)";
        const values = [idPayment, data._payer, 'created', 'STRIPE', data._uitem, data._price]

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows > 0){
            return true;
        }
        else{
            return false;
        }
    }
    catch(err){
        console.log('[ERR] Save ticket information (Stripe) as failed: ' + err);
        return;
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

function convertToCents(amount) {
    return new Promise((resolve, reject) => {
        if (typeof amount !== 'number') {
            reject(new Error('Amount must be a number'));
        }
        
        const cents = amount * 100;
        resolve(cents);
    });
}

//Stripe payments
async function createPaymentStripe(req, res){
    const body = req.body;

    if(body){
        try{
            const price_unit = await convertToCents(body._price);

            const session = await stp.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            product_data: {
                                name: body._item,
                                description: 'HOMESERVICES-AURORAMX'
                            },
                            currency: 'mxn',
                            unit_amount: price_unit,
                        },
                        quantity: body._qual
                    }
                ],
                mode: 'payment',
                success_url: 'http://localhost:4200/api/v1/payments/stripe/success?payloader='+body._item,
                cancel_url: 'http://localhost:4200/api/v1/payments/stripe/cancel?payloader='+body._item,
            })

            if(session){
                const save = await saveInformationTicketStripe(body, body._item);

                if(save === true){
                    res.status(200).json({
                        authorized: true,
                        session: session.url,
                        saved: true
                    })
                }
                else{
                    res.status(500).json({
                        authorized: false,
                        message: 'No hemos conseguido registrar el pago en la base de datos. Intente mas tarde.',
                        saved: false
                    })
                }
            }

        }
        catch(err){
            console.log('[ERR] Create payment (Stripe) as failed: ' + err);
            res.status(500).json({
                authorized: false, message: 'Aurora Studios Services no ha podido crear el pago desde Stripe. Intente mas tarde.'
            })
        }
    }

}

async function UpdateInformationTicketStripe(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const sql = 'UPDATE pay0x SET status0x2 = ? WHERE transID0x0 = ?';
        const values = ['approved', body.id]

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows > 0){
            res.status(200).json({
                authorized: true,
                message: 'El pago ha sido aprobado con exito.'
            })
        }
        else{
            res.status(500).json({
                authorized: false,
                message: 'No hemos conseguido comprobar el estado del pago. Contacte con soporte.'
            })
        }
    }
    catch(err){
        console.log('[ERR] Update ticket information as failed: ' + err);
        res.status(500).json({
            authorized: false,
            message: 'Ha ocurrido un error al intentar actualizar el estado del pago. Intente mas tarde.'
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function DeleteInformationTicketStripe(req, res){
    let cn;

    try{
        const body = req.body;

        cn = await Connection();

        const sql = 'DELETE FROM pay0x WHERE transID0x0 = ?';
        const values = [body.id]

        const [result] = await cn.execute(sql, values);

        if(result.affectedRows > 0){
            res.status(200).json({
                delete: true,
                message: 'El pago no se realizo y el ticket registrado se elimino.'
            })
        }
        else{
            res.status(500).json({
                delete: false,
                message: 'No hemos conseguido eliminar el ticket de pago. Probablemente no existió o no se registro.'
            })
        }
    }
    catch(err){
        console.log('[ERR] Update ticket information as failed: ' + err);
        res.status(500).json({
            delete: false,
            message: 'Ha ocurrido un error al intentar borrar el ticket de pago. Intente mas tarde.'
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

async function createOrderSuccessPaypal(req, res){
    let cn;

    try{
        const data = req.body;

        cn = await Connection();

        const sql = "INSERT INTO pay0x (transID0x0, payer0x1, status0x2, powered0x3, uuidshop0x4, price0x5) VALUES (?,?,?,?,?,?)";
        const values = [data._transaction, data._payer, 'approved', 'PAYPAL', data._uitem, data._price]

        const [result] = await cn.execute(sql, values);

        if (result.affectedRows === 1){
            res.status(200).json({
                authorized: true,
                message: 'El pago ha sido aprobado con exito.'
            })
        }
        else{
            res.status(500).json({
                authorized: false,
                message: 'No hemos conseguido comprobar el estado del pago. Contacte con soporte.'
            })
        }
    }
    catch (e){
        console.log('[ERR] Create order success (Paypal) as failed: ' + e);
        res.status(500).json({
            authorized: false,
            message: 'Ha ocurrido un error al intentar actualizar el estado del pago. Intente mas tarde.'
        })
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

module.exports = {
    MPcreate: createPayment,
    MPhook: webHookMP,
    MPfail: onFailedMP,
    Check: checkStatusTransition,
    SPcreate: createPaymentStripe,
    SPupdate: UpdateInformationTicketStripe,
    SPdelete: DeleteInformationTicketStripe,
    PPAdd: createOrderSuccessPaypal
}