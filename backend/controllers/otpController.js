const otpService = require('../services/otpService');


// Controller function to generate an OTP
exports.generateOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const result = await otpService.generateOTP(email);
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: 'Error generating OTP', error: error.message });
    }
};


// Controller function to verify an OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }
        const isValid = await otpService.verifyOTP(email, otp);
        if (isValid) {
            res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error: error.message });
    }
};



