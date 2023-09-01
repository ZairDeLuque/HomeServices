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
            const returnData = {
                res: CRx0.encrypt(message, k0x),
                word: k0x
            } 
            resolve(returnData);
        }
        else{
            reject('CRx0 Not return a keyword');
            return;
        }
    })
}

async function resolveChallenge(cypher, keyword){
    return new Promise(async (resolve, reject) => {
        if(keyword.length > 0){
            resolve(CRx0.decrypt(cypher, keyword));
        }
        else{
            reject('Not keyword');
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