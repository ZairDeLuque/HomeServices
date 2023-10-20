// Mailer - Helper in send mails (depemds 'nodemailer')
// Aurora Stdios Services
// @zairdeluque - The creator

//.env
require('dotenv').config({ path: '../../../.bin'})

//Nodemailer - Outlook
const nodemailer = require('nodejs-nodemailer-outlook')

//Export function ,
function senderVerify(MailTo, VerifyNumbers){
    nodemailer.sendEmail({
        auth: {
            user: process.env.EMAILUSER,
            pass: process.env.PASSW0RDMAILER,
            secure: true,
        },
        tls: {
            rejectUnauthorized: false
        },
        from: 'HomeServices®️',
        to: MailTo,
        subject: 'HomeServices®️ - Verificación de cuenta',
        html: `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Content</title>
            </head>
            <style>
                .dropped-shadow-tiny{
                    box-shadow: rgba(63, 63, 63, 0.2) 0px 3px 8px; overflow: hidden;
                }
                .border-text{
                    display: inline-block;
                    border-top: 0px;
                    border-left: 0px;
                    border-right: 0px;
                    border-bottom: 2px;
                    border-color: #c592ff;   
                    border-style: solid;
                    padding-bottom: 7px;
                }
            </style>
            <body style="font-family: Arial, Helvetica, sans-serif; height: 100%; padding: 0%; margin: 0%;">
                <div>
                    <nav class="dropped-shadow-tiny" style="display: flex; padding: 10px 20px 10px 20px; z-index: 1; justify-content: center;">
                        <img src="https://www.home-services.store/assets/mainlogo.png" alt="Logo" style="height: 40px; width: auto; ">
                    </nav>

                    <div style="background-color: #ededed; padding: 1%; z-index: 0;">
                        <div style="font-size: 14px; text-align: justify; opacity: .7;">
                            <p>Se solicitó un código de verificación para una cuenta en HomeServices®️ sobre el correo ${MailTo}, esto es necesario para continuar en el proceso de creación/inicio a la cuenta. :</p>
                        </div>
                        <hr style="opacity: .3;">
                        <div>
                            <h3 style="text-align: center; margin-bottom: 0;">Código de verificación:</h3>
                            <!-- <div style="display: flex; justify-content: space-between; margin-top: .7rem; color: #39007a;">
                                <div style="flex: 1; text-align: center; padding: 1%;">
                                    <h1>1</h1ss=>
                                </div>
                                <div style="flex: 1; text-align: center; padding: 1%;">
                                    <h1>1</h1lass=>
                                </div>
                                <div style="flex: 1; text-align: center; padding: 1%;">
                                    <h1>1</h1class=>
                                </div>
                                <div style="flex: 1; text-align: center; padding: 1%;">
                                    <h1>1</h1class=>
                                </div>
                                <div style="flex: 1; text-align: center; padding: 1%;">
                                    <h1>1</h1>
                                </div>
                                <div style="flex: 1; text-align: center; padding: 1%;">
                                    <h1>1</h1>
                                </div>
                            </div> -->
                            <div style="text-align: center; margin-bottom: 0;">
                                <h1 class="border-text">${VerifyNumbers[0]}  ${VerifyNumbers[1]}  ${VerifyNumbers[2]}  ${VerifyNumbers[3]}  ${VerifyNumbers[4]}  ${VerifyNumbers[5]}</h1>
                            </div>
                            <hr style="opacity: 0;">
                            <div style="text-align: center;">
                                <p style="opacity: .4; font-size: small;">Este código es privado.</p>
                            </div>
                        </div>
                        
                        <div style="margin-top: 3rem; font-size: x-small; text-align: center; opacity: .6;">
                            <p>¿No haz sido tu? Puedes hacer total caso omiso de este email.</p>
                            <p>¿Haz sido tu? Ingrese su código en <a href="https://www.home-services.store">HomeServices®️</a></p>
                        </div>
                        <hr style="opacity: .3;">
                        <div style="font-size: x-small; text-align: center; opacity: .6;">
                            <p>"HomeServices®️ - Simple. Useful." | Aurora Studios Mexico S.A. de C.V. - Tehuacan, Puebla, MX 75790 #1930 | ${Date.now()}</p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
        `,
        onError: (err) => {
            return err
        },
        onSuccess: () => {
            console.log('[SUCC - MailerUtility] SenderVerify function succesfully send email to: ' + MailTo);
        }
    })
}

module.exports = {
    verify: senderVerify
}