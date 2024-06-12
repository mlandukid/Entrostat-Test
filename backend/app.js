require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const otpRoutes = require('./routes/otpRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/otp', otpRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Serve static files from the Angular 'dist/entrostat-frontend' directory
app.use(express.static(path.join(__dirname, 'dist/frontend')));

// For any other route that does not start with '/api', serve the Angular app's index.html file
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, 'dist/frontend', 'index.html'));
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
