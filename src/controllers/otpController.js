const otpService = require('../services/otpService');

const requestOtp = async (req, res) => {
  const { email } = req.body;
  try {
    await otpService.requestOtp(email);
    res.status(200).send('OTP sent successfully');
  } catch (error) {
    res.status(500).send('Error requesting OTP: ' + error.message);
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    await otpService.verifyOtp(email, otp);
    res.status(200).send('OTP verified successfully');
  } catch (error) {
    res.status(400).send('Error verifying OTP: ' + error.message);
  }
};

module.exports = {
  requestOtp,
  verifyOtp,
};
