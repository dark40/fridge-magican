const sendEmail = (email) => {
    const nodemailer = require('nodemailer');


    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "b5ad1032dccb59",
            pass: "c990b2b06fa496"
        }
    });

    let mailOptions = {
        from: 'fridge.magician@gmail.com',
        to: email,
        subject: 'Welcome to Fridge Magician',
        text: `Hi,

    Welcome to Fridge Magician. We’re thrilled to see you here!
    
    We’re confident that Fridge Magician will help you organise your fridge stock in no time.
    
    You can find more of our guides here to learn more about Fridge Magician.
    
    Take care!
    Fridge Magician Development Team`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendEmail;