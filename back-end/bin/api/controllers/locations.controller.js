const ipManager = require('../../utility/ipUtilities/ipManager')
const request = require('request');

require('dotenv').config({path: '../../../.env'})

async function searchUserLocation(req, res){

    const TOKEN = process.env.IPINFO_TOKEN;

    const clientIP = await ipManager.findCLIENTIP();

    if(clientIP !== null){
        request(`https://ipinfo.io/${clientIP}/json?token=${TOKEN}`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const result = JSON.parse(body);
            res.status(200).json({ result: result, founded: true });
        } else {
            res.status(500).json({ result: 'No se pudo obtener la IP pública.', founded: false });
        }
    });
    }
}

module.exports = {
    search: searchUserLocation
}