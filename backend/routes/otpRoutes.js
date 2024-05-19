const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

/**
 * @swagger
 * /api/otp/generate:
 *   post:
 *     description: Generate an OTP for an email
 *     parameters:
 *       - in: body
 *         name: email
 *         description: Email to generate OTP for
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: OTP generated successfully
 */
router.post('/generate', otpController.generateOTP);

/**
 * @swagger
 * /api/otp/verify:
 *   post:
 *     description: Verify an OTP for an email
 *     parameters:
 *       - in: body
 *         name: email
 *         description: Email to verify OTP for
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - otp
 *           properties:
 *             email:
 *               type: string
 *             otp:
 *               type: string 
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */
router.post('/verify', otpController.verifyOTP);

module.exports = router;
