const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: '127.0.0.1',
    port: 2500,
    auth: {
        user: 'inbucket',
        pass: 'inbucket'
    }
});

const mailOptions = {
    from: 'no-reply@entrostat.xyz',
    to: 'test@example.com',
    subject: 'Test Email',
    text: 'This is a test email from Node.js'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error:', error);
    }
    console.log('Message sent: %s', info.messageId);
});
