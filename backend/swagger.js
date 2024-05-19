const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Entrostat OTP API',
    version: '1.0.0',
    description: 'A Entrostat themed OTP API'
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 8080}/api`
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
