const request = require('request')

const findCLIENTIP = () => {
   return new Promise((resolve, reject) => {
        try{
            request('https://api.ipify.org?format=json', (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const result = JSON.parse(body);
                    const publicIP = result.ip;
                    
                    resolve(publicIP);
                } else {
                    resolve(null)
                }
            });
        }
        catch{
            reject('No ip found.')
        }
   })
}

module.exports = { findCLIENTIP }