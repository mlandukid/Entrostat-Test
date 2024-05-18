const pool = require('../config/config');
const nodemailer = require('nodemailer');

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString().padStart(6, '0');
};

const sendOtpEmail = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  });

  console.log('Message sent: %s', info.messageId);
};

const requestOtp = async (email) => {
  const otp = generateOTP();
  const expirationTime = Date.now() + process.env.OTP_EXPIRATION * 1000;

  await pool.query(
    'INSERT INTO otps (email, otp, expires_at) VALUES ($1, $2, to_timestamp($3) at time zone \'UTC\') ON CONFLICT (email) DO UPDATE SET otp = $2, expires_at = to_timestamp($3) at time zone \'UTC\'',
    [email, otp, expirationTime / 1000]
  );

  await sendOtpEmail(email, otp);
};

const verifyOtp = async (email, otp) => {
  const result = await pool.query(
    'SELECT * FROM otps WHERE email = $1 AND otp = $2 AND expires_at > now()',
    [email, otp]
  );

  if (result.rows.length === 0) {
    throw new Error('Invalid or expired OTP');
  }

  await pool.query('DELETE FROM otps WHERE email = $1', [email]);
  return true;
};

module.exports = {
  requestOtp,
  verifyOtp,
};
