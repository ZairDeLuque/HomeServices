// Mailer - Helper in send mails (depemds 'nodemailer')
// Aurora Stdios Services
// @zairdeluque - The creator

//.env
require('dotenv').config({ path: '../../../.bin'})

//Nodemailer - Outlook
const nodemailer = require('nodejs-nodemailer-outlook')

//Export function ,
function senderVerify(MailTo, VerifyNumbers){
    return new Promise((resolve, reject) => {
        // const html = `
        // <div style="font-family: Arial, Helvetica, sans-serif;">
        // <div style="background-color: #ededed; padding: 1%; z-index: 0; border-radius:15px">
        //     <div style="font-size: 14px; text-align: justify; opacity: .7;">
        //         <p>Se solicitó un código de verificación para una cuenta en HomeServices®️ sobre este correo, esto es necesario para continuar en el proceso de creación/inicio a la cuenta. :</p>
        //     </div>
        //     <hr style="opacity: .3;">
        //     <div>
        //         <h3 style="text-align: center; margin-bottom: 0;">Código de verificación:</h3>
    
        //         <div style="text-align: center; margin-bottom: 0;">
        //             <h1 class="border-text">${VerifyNumbers[0]}  ${VerifyNumbers[1]}  ${VerifyNumbers[2]}  ${VerifyNumbers[3]}  ${VerifyNumbers[4]}  ${VerifyNumbers[5]}</h1>
        //         </div>
        //         <hr style="opacity: 0;">
        //         <div style="text-align: center;">
        //             <p style="opacity: .4; font-size: small;">Este código es privado.</p>
        //         </div>
        //         </div>
                
        //         <div style="margin-top: 3rem; font-size: x-small; text-align: center; opacity: .6;">
        //             <p>¿No haz sido tu? Puedes hacer total caso omiso de este email.</p>
        //         </div>
        //         <hr style="opacity: .3;">
        //         <div style="font-size: x-small; text-align: center; opacity: .6;">
        //             <p>"HomeServices®️ - Simple. Useful." | Aurora Studios Mexico S.A. de C.V. - Tehuacan, Puebla, MX 75790 #1930 | ${Date.now()}</p>
        //         </div>
        //     </div>
        // </div>
        // `

        nodemailer.sendEmail({
            auth: {
                user: process.env.EMAILUSER,
                pass: process.env.PASSW0RDMAILER,
                secure: true,
            },
            tls: {
                rejectUnauthorized: false
            },
            from: `HomeServices <${process.env.EMAILUSER}>`,
            to: MailTo,
            subject: 'HomeServices®️ - Verificación de cuenta',
            text: 'Solicitud de verificación de cuenta\nSe ha solicitado un código de verificación para una cuenta en HomeServices\n\n'+VerifyNumbers[0]+VerifyNumbers[1]+VerifyNumbers[2]+VerifyNumbers[3]+VerifyNumbers[4]+VerifyNumbers[5],
            // html: html,
            onError: (err) => {
                resolve(err)
            },
            onSuccess: () => {
                console.log('[INFO - MailerUtility] SenderVerify function succesfully send email.');
                resolve(true);
            }
        })
    })
}

module.exports = {
    verify: senderVerify
}