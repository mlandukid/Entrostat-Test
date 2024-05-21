const OTP = require('../models/otpModel');
const redisClient = require('../utils/redisClient');
const nodemailer = require('nodemailer');
const { promisify } = require('util');

// Configure the nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Promisify Redis client methods for async/await usage
redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
redisClient.setAsync = promisify(redisClient.set).bind(redisClient);
redisClient.incrAsync = promisify(redisClient.incr).bind(redisClient);
redisClient.expireAsync = promisify(redisClient.expire).bind(redisClient);
redisClient.delAsync = promisify(redisClient.del).bind(redisClient);
redisClient.lpushAsync = promisify(redisClient.lpush).bind(redisClient);
redisClient.lrangeAsync = promisify(redisClient.lrange).bind(redisClient);

const generateOTP = async (email) => {
    try {
        const count = await redisClient.getAsync(`otp:count:${email}`);
        if (count >= process.env.OTP_REQUEST_LIMIT_PER_HOUR) {
            throw new Error('Too many OTP requests');
        }

       // Generate a new OTP if none exists or if the existing OTP is not unique
        let otp = await redisClient.getAsync(`otp:${email}`);
        if (!otp || !(await OTP.isOTPUnique(email, otp))) {
            otp = OTP.generateOTP();
        }
        const otpInstance = new OTP(email, otp);
        await otpInstance.save();
        await OTP.saveOTPToHistory(email, otp);
        
         // Configure the email options
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

        await redisClient.incrAsync(`otp:count:${email}`);
        await redisClient.expireAsync(`otp:count:${email}`, 3600);

        return 'OTP sent successfully';
    } catch (error) {
        console.error('Error generating OTP:', error);
        throw new Error('Error generating OTP');
    }
};

const verifyOTP = async (email, otp) => {
    try {
        const isValid = await OTP.verify(email, otp);
        if (isValid) {
            await redisClient.delAsync(`otp:${email}`);
        }
        return isValid;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw new Error('Error verifying OTP');
    }
};

module.exports = { generateOTP, verifyOTP };



