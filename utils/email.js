const sendEmail = (to, subject, text) => {
    const nodemailer = require('nodemailer');


    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    let mailOptions = {
        from: 'fridge.magician@gmail.com',
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
const sendWelcomeEmail = (to) => {
    const subject = "Welcome to Fridge Magician"
    const text = `Hi,

    Welcome to Fridge Magician. We’re thrilled to see you here!
    
    We’re confident that Fridge Magician will help you organise your fridge stock in no time.
    
    You can find more of our guides here to learn more about Fridge Magician.
    
    Take care!
    Fridge Magician Development Team`
    sendEmail(to, subject, text)
}
module.exports = { 
    sendWelcomeEmail
};
