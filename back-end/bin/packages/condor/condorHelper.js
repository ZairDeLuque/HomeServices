// Condor (Helper) - Helper to Condor Manager (convert buffer)
// Aurora Stdios Services
// @zairdeluque - The creator

//Requires
const CRx1 = require('../../utility/cesarCipherUtilities/cryptHelper').start('condorHelper')

//Async's function
async function convertArrayBufferCipher(filePath){
    return new Promise((resolve, reject) => {
        if(file){
            const bytesWrite = file.arrayBuffer();

            if(bytesWrite.length > 0){
                resolve(CRx1.createNewChallenge(bytesWrite));
            }
            else{
                resolve('No file bytes written')
            }
        }
        else{
            reject(new Error("Any function not return a file. [convertArrayBuffer]"));
        }
    })
}
