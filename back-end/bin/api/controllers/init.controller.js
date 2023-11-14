const { Connection } = require('../../utility/mysqlUtilities/connectionManager')

function hostAlready(req, res){
    console.log(`[LOG] Request: (${req.ip}) to '${req.url}': [${req.method}].`);
    res.status(200).send('HomeServices status active. <br><br>API Version: 0.6-rcb001211 | Aurora Services: 134.43.10.203-chocolate');
}

function errorDir(req, res){
    console.log(`[LOG] Request: (${req.ip}) to '${req.url}': [Not found].`);
    res.status(404).send('HS-Server: Not Found.');
}

async function ServerGuard(req, res){
    let cn;

    try{
        cn = await Connection();

        //Prepare query
        const SQL = 'SELECT * FROM status0x WHERE main0x = ?';
        const values = [0]

        //Execute query
        const [result] = await cn.execute(SQL, values);

        //If return 1 row, is maintenance active
        if(result.length > 0){
            res.status(200).json({active: false, title: 'HomeServices®️ se esta tomando un descanso', reason: 'Aurora Studios esta en un arduo trabajo de mantenimiento para el sitio y servidores, visita las redes de Aurora Studios para saber mas información.'})
        }
        //Or any other type to error
        else{
            //New values
            const values2 = [1];

            //Execute query
            const [result2] = await cn.execute(SQL, values2);

            //Ir return 1 row, is error services
            if(result2.length > 0){
                res.status(200).json({active: false, title: result2[0].title0x, reason: result2[0].reason0x})
            }
            //Finally not return anything, the server state already good.
            else{
                res.status(200).json({active: true})
            }
        }
    }
    catch (err){
        res.status(200).json({active: false, title: 'Base de datos fuera de linea:(', reason: 'Aurora Studios Services no puede conectar con la base de datos de HomeServices®️. Estamos trabajando para restablecer el servicio.'})
        console.log('[ERR - ServerGuard] ' + err);
    }
    finally{
        if(cn){
            cn.end()
        }
    }
}

module.exports = {
    main: hostAlready,
    notfound: errorDir,
    server: ServerGuard 
}
