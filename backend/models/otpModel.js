const redisClient = require('../utils/redisClient');
const crypto = require('crypto');

class OTP {
    constructor(email, otp) {
        this.email = email;
        this.otp = otp;
    }
    
    // Generate a random 6-digit OTP
    static generateOTP() {
        return crypto.randomBytes(3).toString('hex').padStart(6, '0');
    }
     
    // Save the OTP instance to Redis with an expiry time
    async save() {
        const key = `otp:${this.email}`;
        await redisClient.setAsync(key, JSON.stringify(this));
        await redisClient.expireAsync(key, process.env.OTP_EXPIRY_SECONDS);
    }
    
    // Verify if the given OTP is valid for the specified email
    static async verify(email, otp) {
        const key = `otp:${email}`;
        const data = await redisClient.getAsync(key);
        if (!data) return false;

        const otpInstance = JSON.parse(data);
        return otpInstance.otp === otp;
    }
}

module.exports = OTP;

