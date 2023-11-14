const { Connection } = require('../../utility/mysqlUtilities/connectionManager')

//Promise
function generateRandomNumberString() {
    return new Promise((resolve, reject) => {
        let randomNumberString = '';
        for (let i = 0; i < 6; i++) {
            randomNumberString += Math.floor(Math.random() * 10);
        }
        resolve(randomNumberString);
    });
}

async function createNewTemporal(req, res){
    let cn;

    try{
        cn = await Connection();

        const body = req.body;

        if(body){
            const id = await generateRandomNumberString();
            const sql = 'INSERT INTO tm0x (id0x0, remited0x1, sender0x2, theme0x3, lastmessage0x4) VALUES (?,?,?,?,?)'
            const values = [id, body.r0x, body.s0x, body._t0, body._lm0];

            const [result] = await cn.execute(sql, values);

            if(result.affectedRows === 1){
                res.status(201).json({
                    ok: true
                })
            }
            else{
                res.status(500).json({
                    ok: false
                })
            }
        }
        else{
            res.status(400).json({
                ok: false,
                message: 'No se envio un cuerpo en el metodo POST'
            })
        }
    }
    catch (e){
        res.status(500).json({
            ok: false,
            message: e
        })
    }
    finally{
        if(cn){
            cn.end()
        }
    }
}

module.exports = {
    create: createNewTemporal
}