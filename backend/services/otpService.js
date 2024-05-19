const OTP = require('../models/otpModel');
const redisClient = require('../utils/redisClient');
const nodemailer = require('nodemailer');

// Configure the nodemailer transporter using environment variables for SMTP settings
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Function to generate and send an OTP
const generateOTP = (email, callback) => {
    // Check how many OTP requests have been made for the given email
    redisClient.get(`otp:count:${email}`, (err, count) => {
        if (err) return callback(err);
        if (count >= 3) return callback(new Error('Too many OTP requests'));

        // Check if an OTP already exists for the given email
        redisClient.get(`otp:${email}`, (err, reply) => {
            if (err) return callback(err);

            let otp;
            if (reply) {
                // If an existing OTP is found, reuse it
                const existingOtp = JSON.parse(reply);
                otp = existingOtp.otp;
            } else {
                // Otherwise, generate a new OTP
                otp = OTP.generateOTP();
            }

            // Create a new OTP instance and save it to Redis
            const otpInstance = new OTP(email, otp);
            otpInstance.save((err) => {
                if (err) return callback(err);

                // Set up the email options
                const mailOptions = {
                    from: process.env.SMTP_FROM,
                    to: email,
                    subject: 'Your OTP Code',
                    text: `Your OTP code is ${otp}`
                };

                // Send the OTP via email
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) return callback(err);

                    // Increment the OTP request count for the given email
                    redisClient.incr(`otp:count:${email}`, (err) => {
                        if (err) return callback(err);

                        // Set an expiration time for the OTP request count (1 hour TTL)
                        redisClient.expire(`otp:count:${email}`, 3600); // 1 hour TTL
                        callback(null, 'OTP sent successfully');
                    });
                });
            });
        });
    });
};

// Function to verify a given OTP
const verifyOTP = (email, otp, callback) => {
    OTP.verify(email, otp, (err, isValid) => {
        if (err) return callback(err);
        if (isValid) {
            // If OTP is valid, delete it from Redis
            redisClient.del(`otp:${email}`);
        }
        callback(null, isValid);
    });
};

module.exports = { generateOTP, verifyOTP };
