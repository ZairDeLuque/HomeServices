// Mailer - Helper in send mails (depemds 'nodemailer')
// Aurora Stdios Services
// @zairdeluque - The creator

//.env
require('dotenv').config({ path: '../../../.bin'})

//Nodemailer - Custom Email
const nodemailer = require('nodemailer')

//Export function ,
function senderVerify(MailTo, VerifyNumbers){
    return new Promise((resolve, reject) => {
        const html = `
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
                    <div style="font-size: 14px; text-align: center; opacity: .7;">
                        <p>Se solicitó un código de verificación para una cuenta en HomeServices®️ sobre el correo ${MailTo}, esto es necesario para continuar en el proceso de creación/inicio a la cuenta. :</p>
                    </div>
                    <hr style="opacity: .3;">
                    <div>
                        <h3 style="text-align: center; margin-bottom: 0;">Código de verificación:</h3>
                        <div style="text-align: center; margin-bottom: 0;">
                            <h1>${VerifyNumbers[0]}  ${VerifyNumbers[1]}  ${VerifyNumbers[2]}  ${VerifyNumbers[3]}  ${VerifyNumbers[4]}  ${VerifyNumbers[5]}</h1>
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
                        <p>"HomeServices®️ - Simple. Useful." | Aurora Studios Mexico S.A. de C.V. - Tierra Blanca, Veracruz, MX 95110 | ${Date.now()}</p>
                    </div>
                </div>
            </div>
        </body>
        `

        const email = process.env.EMAILUSER;
        const pass = process.env.PASSW0RDMAILER;

        const transporter = nodemailer.createTransport({
            host: 'smtp.titan.email',
            port: 465,
            secure: true,
            auth: {
                user: email,
                pass: pass 
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        transporter.sendMail({
            from: `HomeServices <${process.env.EMAILUSER}>`,
            to: MailTo,
            subject: 'HomeServices®️ - Verificación de cuenta',
            html: html
        }, (err, info) => {
            if(err){
                console.error(`[ERROR - MailerUtility] Error sending verify mail ${err}`)
                reject(err)
            }
            else{
                console.info(`[INFO - MailerUtility] Successfully sent verify mail!`)
                resolve(true)
            }
        })
    })
}

module.exports = {
    verify: senderVerify
}