// Cesar Cipher - Credentials encrypted by password length
// Aurora Stdios Services
// @zairdeluque - The creator

//Export functions to be used by other files
const cipherCesar = {
    // Function to encrypt UTF-8 data based on the length of a password (Cesar Cipher)
    //
    // Example:
    //
    // const text = 'Hello World' - Length of text is 11
    // const password = 'ABC' - Length of password is 3
    //
    // encrypt(text, password)
    //
    // Output: ©ÇÏÍÑ¸ÑÕÍÆ
    //
    encrypt: async function(text, password) {
        return new Promise((resolve, reject) => {
            const cifradoCesar = (texto, desplazamiento) => {
                const regex = /[a-zA-Z]/g;
    
                return texto.replace(regex, (match) => {
                    const isUpperCase = match === match.toUpperCase();
                    const baseCharCode = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
                    const charCode = match.charCodeAt(0);
                    const shiftedCharCode = ((charCode - baseCharCode + desplazamiento) % 26 + 26) % 26 + baseCharCode;
                    return String.fromCharCode(shiftedCharCode);
                });
            };
    
            const textoCifrado = cifradoCesar(text, password);
    
            resolve(textoCifrado);
        });
    },
    // Function to decrypt UTF-8 data based on the length of a password (Cesar Cipher)
    //
    // Example:
    //
    // const text = '©ÇÏÍÑ¸ÑÕÍÆ'
    // const password = 'ABC' - Length of password is 3
    //
    // decrypt(text, password)
    //
    // Output: Hello world
    //
    decrypt: async function(text, password) {
        return new Promise((resolve, reject) => {
            
            const descifradoCesar = (texto, desplazamiento) => {
                const regex = /[a-zA-Z]/g;
    
                return texto.replace(regex, (match) => {
                    const isUpperCase = match === match.toUpperCase();
                    const baseCharCode = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
                    const charCode = match.charCodeAt(0);
                    // Aplicamos el desplazamiento negativo en el descifrado
                    const shiftedCharCode = ((charCode - baseCharCode - desplazamiento) % 26 + 26) % 26 + baseCharCode;
                    return String.fromCharCode(shiftedCharCode);
                });
            };
    
            const textoDescifrado = descifradoCesar(text, password);
    
            resolve(textoDescifrado);
        });
    }
};

const moduleExports = {
    start: function(reason){
        console.log(`[INFO] Starting cryptManager utility module in ${reason}`)

        return {
            encrypt: cipherCesar.encrypt,
            decrypt: cipherCesar.decrypt
        };
    },
}

module.exports = moduleExports;
