require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const otpController = require('./src/controllers/otpController');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/request-otp', otpController.requestOtp);
app.post('/verify-otp', otpController.verifyOtp);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
