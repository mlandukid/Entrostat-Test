const request = require('supertest');
const app = require('../app'); // Assume app.js exports the Express app

describe('OTP API', () => {
    it('should generate OTP', async () => {
        const response = await request(app)
            .post('/api/otp/generate')
            .send({ email: 'test@example.com' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('OTP sent successfully');
    });

    it('should verify OTP', async () => {
        await request(app)
            .post('/api/otp/generate')
            .send({ email: 'test@example.com' });

        const otp = '123456'; // Simulate the OTP value

        const response = await request(app)
            .post('/api/otp/verify')
            .send({ email: 'test@example.com', otp });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('OTP verified successfully');
    });
});
