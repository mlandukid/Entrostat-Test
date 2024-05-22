const request = require('supertest');
const app = require('../app'); // Assume app.js exports the Express app
const redisClient = require('../utils/redisClient');
const OTP = require('../models/otpModel');

jest.mock('../utils/redisClient');
jest.mock('nodemailer');

describe('OTP API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should generate OTP', async () => {
        redisClient.getAsync.mockResolvedValue(null);
        redisClient.incrAsync.mockResolvedValue(1);
        redisClient.setAsync.mockResolvedValue('OK');
        redisClient.expireAsync.mockResolvedValue(1);

        const response = await request(app)
            .post('/otp/generate')
            .send({ email: 'test@example.com' });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('OTP sent successfully');
    });

    it('should verify OTP', async () => {
        const otp = OTP.generateOTP();
        const hashedOTP = OTP.hashOTP(otp);
        redisClient.getAsync.mockResolvedValue(JSON.stringify({ email: 'test@example.com', otp: hashedOTP }));
        redisClient.delAsync.mockResolvedValue(1);

        const response = await request(app)
            .post('/otp/verify')
            .send({ email: 'test@example.com', otp });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('OTP verified successfully');
    });

    it('should return error for invalid OTP', async () => {
        redisClient.getAsync.mockResolvedValue(null);

        const response = await request(app)
            .post('/otp/verify')
            .send({ email: 'test@example.com', otp: '123456' });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid OTP');
    });

    it('should return error for too many OTP requests', async () => {
        redisClient.getAsync.mockResolvedValue(process.env.OTP_REQUEST_LIMIT_PER_HOUR);

        const response = await request(app)
            .post('/otp/generate')
            .send({ email: 'test@example.com' });

        expect(response.statusCode).toBe(429);
        expect(response.body.message).toBe('Too many OTP requests');
    });
});
