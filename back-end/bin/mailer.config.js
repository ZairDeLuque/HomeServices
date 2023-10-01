// Mailer - Helper in send mails (depemds 'nodemailer')
// Aurora Stdios Services
// @zairdeluque - The creator

//.env
require('dotenv').config({ path: '../.env'})

//Nodemailer req
const nodemailer = require('nodemailer');

const transportist = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    },
    secure: false,
})

module.exports = transportist;