const otpService = require('../services/otpService');
const logger = require('../utils/logger');

// Controller function to generate an OTP
exports.generateOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            logger.warn('Email is required for OTP generation');
            return res.status(400).json({ message: 'Email is required' });
        }
        const result = await otpService.generateOTP(email);
        logger.info(`OTP generated and sent to ${email}`);
        res.status(200).json({ message: result });
    } catch (error) {
        logger.error('Error generating OTP:', error);
        res.status(500).json({ message: 'Error generating OTP', error: error.message });
    }
};

// Controller function to verify an OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            logger.warn('Email and OTP are required for verification');
            return res.status(400).json({ message: 'Email and OTP are required' });
        }
        const isValid = await otpService.verifyOTP(email, otp);
        if (isValid) {
            logger.info(`OTP for ${email} verified successfully`);
            res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            logger.warn(`Invalid OTP for ${email}`);
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        logger.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Error verifying OTP', error: error.message });
    }
};
