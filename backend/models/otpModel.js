const redisClient = require('../utils/redisClient');

class OTP {
    constructor(email, otp) {
        this.email = email;
        this.otp = otp;
        this.createdAt = Date.now();
    }

    // Method to save the OTP instance to Redis with a TTL of 30 minutes
    save(callback) {
        const key = `otp:${this.email}`;
        redisClient.setex(key, 1800, JSON.stringify(this), callback);  // 30 minutes TTL
    }

    // Static method to verify if a given OTP matches the stored OTP for an email
    static verify(email, otp, callback) {
        const key = `otp:${email}`;
        redisClient.get(key, (err, reply) => {
            if (err) {
                callback(err, false);  // If there's an error, return the error and false
            } else if (reply) {
                const otpInstance = JSON.parse(reply);
                if (otpInstance.otp === otp) {
                    callback(null, true);  // If OTP matches, return true
                } else {
                    callback(null, false);  // If OTP does not match, return false
                }
            } else {
                callback(null, false);  // If no OTP is found, return false
            }
        });
    }

    // Static method to generate a random 6-digit OTP
    static generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString().padStart(6, '0');
    }
}

module.exports = OTP;
