const otpService = require('../services/otpService');

const generateOTP = (req, res) => {
    const { email } = req.body;
    otpService.generateOTP(email, (err, message) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message });
    });
};

const verifyOTP = (req, res) => {
    const { email, otp } = req.body;
    otpService.verifyOTP(email, otp, (err, isValid) => {
        if (err) {
            return res.status(500).json({ message: 'Error verifying OTP' });
        }
        if (isValid) {
            res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    });
};

module.exports = { generateOTP, verifyOTP };
