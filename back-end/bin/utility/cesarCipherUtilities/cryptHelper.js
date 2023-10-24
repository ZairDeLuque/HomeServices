// Cesar Cipher (Helper) - Helper to cryptManager
// Aurora Stdios Services
// @zairdeluque - The creator

//Requires
const CRx0 = require('./cryptManager').start('cryptHelper');

//Helper
async function generateNewKeyword(){
    return new Promise((resolve, reject) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let token = '';

        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters[randomIndex];
        }

        resolve(token);
    });
}

async function createNewChallenge(message){
    return new Promise(async (resolve, reject) => {
        const k0x = await generateNewKeyword();

        if(k0x.length > 0){
            const RETURN = await CRx0.encrypt(message, 12)
            resolve(RETURN);
        }
        else{
            reject('CRx0 Not return a keyword');
            return;
        }
    })
}

async function resolveChallenge(cypher){
    return new Promise(async (resolve, reject) => {
        const RETURN = await CRx0.decrypt(cypher, 12);
        
        if(RETURN){
            resolve(RETURN);
        }
        else{
            reject('Not return');
            return;
        }
    })
}

module.exports = {
    start: function(reason){
        console.log(`[INFO] Starting crypto helper utility in ${reason}.`)

        return { 
            createNewChallenge: createNewChallenge,
            resolveChallenge: resolveChallenge
        }
    }
}