require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const otpRoutes = require('./routes/otpRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

const app = express();

app.use(bodyParser.json());

app.use('/api/otp', otpRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send('Welcome to the Entrostat OTP API!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
