const mailer = require("nodemailer");
require('dotenv').config();

module.exports = (email, nome, mensagem) => {
    const smtpTransport = mailer.createTransport({
        service: 'gmail',
        auth: {
            type:'OAuth2',
            user: process.env.EMAIL,
            pass: process.env.PASS,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
        
    })

    const mail = {
        from: process.env.EMAIL,
        to: email,
        subject: `Recuperação de senha do Bolso Sábio`,
        text: mensagem,
    }

    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
        .then(response => {
            smtpTransport.close();
            return resolve(response);
        })
        .catch(error => {
            smtpTransport.close();
            return reject(error);
        })
    })
}



