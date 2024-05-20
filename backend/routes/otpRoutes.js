const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

/**
 * @swagger
 * /api/otp/generate:
 *   post:
 *     summary: Generate an OTP for an email
 *     description: Generate a one-time password for the provided email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP generated successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/generate', otpController.generateOTP);

/**
 * @swagger
 * /api/otp/verify:
 *   post:
 *     summary: Verify an OTP for an email
 *     description: Verify the one-time password for the provided email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 *       500:
 *         description: Internal Server Error
 */
router.post('/verify', otpController.verifyOTP);

module.exports = router;
