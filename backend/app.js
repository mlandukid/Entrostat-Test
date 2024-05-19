require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const otpRoutes = require('./routes/otpRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use('/api/otp', otpRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// For any other route, serve the frontend's index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
