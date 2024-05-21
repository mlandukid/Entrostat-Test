const redisClient = require('../utils/redisClient');
const crypto = require('crypto');

class OTP {
    constructor(email, otp) {
        this.email = email;
        this.otp = otp;
    }

    // Generate a random 6-digit OTP
    static generateOTP() {
        // Ensure OTP can start with 0 and is always 6 digits
        return Math.floor(100000 + Math.random() * 900000).toString().padStart(6, '0');
    }

    // Hash the OTP
    static hashOTP(otp) {
        return crypto.createHash('sha256').update(otp).digest('hex');
    }

    // Save the OTP instance to Redis with an expiry time
    async save() {
        const key = `otp:${this.email}`;
        const hashedOTP = OTP.hashOTP(this.otp);
        await redisClient.setAsync(key, JSON.stringify({ email: this.email, otp: hashedOTP }));
        await redisClient.expireAsync(key, process.env.OTP_EXPIRY_SECONDS);
    }

    // Verify if the given OTP is valid for the specified email
    static async verify(email, otp) {
        const key = `otp:${email}`;
        const data = await redisClient.getAsync(key);
        if (!data) return false;

        const otpInstance = JSON.parse(data);
        const hashedOTP = OTP.hashOTP(otp);
        return otpInstance.otp === hashedOTP;
    }

    // Check if OTP already exists within 24 hours
    static async isOTPUnique(email, otp) {
        const key = `otp_history:${email}`;
        const existingOTPs = await redisClient.lrangeAsync(key, 0, -1);
        const hashedOTP = OTP.hashOTP(otp);
        return !existingOTPs.includes(hashedOTP);
    }

    // Save OTP to history
    static async saveOTPToHistory(email, otp) {
        const key = `otp_history:${email}`;
        const hashedOTP = OTP.hashOTP(otp);
        await redisClient.lpushAsync(key, hashedOTP);
        await redisClient.expireAsync(key, 24 * 60 * 60); // 24 hours
    }
}

module.exports = OTP;

