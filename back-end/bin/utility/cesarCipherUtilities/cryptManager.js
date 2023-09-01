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
    encrypt: function(text, password) {
        let textCrypted = '';
        
        const lengthText = text.length;
        const lengthPassword = password.length;

        for(let i = 0; i < lengthText; i++){
            const char = text.charCodeAt(i);
            const charCry = password.charCodeAt(i % lengthPassword);
            const charCrypted = String.fromCharCode(char + charCry);
            textCrypted += charCrypted;
        }

        return textCrypted;
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
    decrypt: function(text, password) {
        let textDecrypted = '';

        const lengthText = text.length;
        const lengthPassword = password.length;

        for(let i = 0; i < lengthText; i++){
            const char = text.charCodeAt(i);
            const charDecry = password.charCodeAt(i % lengthPassword);
            const charDecrypted = String.fromCharCode(char - charDecry);
            textDecrypted += charDecrypted;
        }

        return textDecrypted;
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
