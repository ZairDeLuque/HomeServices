// Category's Controller
// HomeServices Web Services
// @apocalixdeluque - The creator

//Requires
const { Connection } = require('../../utility/mysqlUtilities/connectionManager')

//Function
async function recolectAllCategorys(req, res){
    let cn;

    try{
        cn = await Connection();

        const sql = 'SELECT * FROM ctg0x';

        const [result] = await cn.execute(sql);

        if(result.length > 0){
            res.status(200).json({
                ok: true,
                data: result
            })
        }
        else{
            res.status(200).json({
                ok: false,
                data: null
            })
        }
    }
    catch{
        console.log('[ERR] Recolect all categorys error.')
        return;
    }
    finally{
        if(cn){
            cn.end();
        }
    }
}

module.exports = {
    all: recolectAllCategorys
}