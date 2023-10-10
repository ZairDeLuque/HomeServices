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
            secure: false,
        },
        tls: {
            rejectUnauthorized: false
        },
        from: 'WorkHome®️',
        to: MailTo,
        subject: 'WorkHome®️ - Verificación de cuenta',
        html: `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
                <title>Content</title>
            </head>
            <body style="background-color: white;">
                <div class="container p-4 w-50">
                    <div class="container p-0 text-center">
                        <h1>Verificación de cuenta</h1>
                        <hr>
                        <p>Se ha solicitado un código de verificación para una cuenta en el servicio WorkHome®️ sobre el correo ${MailTo}, esto es necesario para iniciar sesión en la cuenta:</p>
                    </div>
    
                    <div class="container p-0 mt-3 text-center">
                        <h2 class="border-bottom d-inline-block p-2 border-3" style="border-color: #cc9fff !important;">Código de verificación:</h2>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="flex: 1; text-align: center;">
                                ${VerifyNumbers[0]}
                            </div>
                            <div style="flex: 1; text-align: center;">
                                ${VerifyNumbers[1]}
                            </div>
                            <div style="flex: 1; text-align: center;">
                                ${VerifyNumbers[2]}
                            </div>
                            <div style="flex: 1; text-align: center;">
                                ${VerifyNumbers[3]}
                            </div>
                            <div style="flex: 1; text-align: center;">
                                ${VerifyNumbers[4]}
                            </div>
                            <div style="flex: 1; text-align: center;">
                                ${VerifyNumbers[5]}
                            </div>
                        </div>
                        <hr class="invisible">
                        <p class="opacity-50">No se comparta con nadie.</p>
                    </div>
    
                    <div class="container p-0 mt-4 text-center opacity-75">
                        <p>¿No haz sido tu? Entra a <a href="">WorkHome®️</a> y contacte con Soporte Tecnico para recibir indicaciones de seguridad.</p>
                        <p>¿Haz sido tu? Ingrese su codigo con total seguridad en <a href="">WorkHome®️</a></p>
                        <hr>
                    </div>
                    
                    <div class="container p-0 mt-4 text-center opacity-50">
                        <p>"WorkHome®️ - Simple. Useful." | Powered by: Aurora Studios Services™ by Aurora Studios Mexico S.A. de C.V. | aurora@studios.dev | ZairDeLuque - CEO | ${Date.now()}</p>
                    </div>
                </div>
            </body>
        </html>
        `,
        onError: (err) => {
            return err
        },
        onSuccess: () => {
            return true;
        }
    })
    
    // const mailConfig = {
    //     from: 'workhome.aurora@outlook.com',
    //     to: MailTo,
    //     subject: 'WorkHome®️ - Verificación de cuenta',
        
    // }
    
    // config.sendMail(mailConfig, (err, inf) => {
    //     if(err){
    //         console.log('[ERR - MailerUtility] SenderVerify function throw error: ' + err);
    //         return;
    //     }

    //     return 'succesfully';
    // })
}

module.exports = {
    verify: senderVerify
}