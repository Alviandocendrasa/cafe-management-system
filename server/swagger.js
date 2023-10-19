const swaggerJSDoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSIT314 API Documentation',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://127.0.0.1:3140/'
      }
    ]
  },
  apis: ["./routes/*.js"]
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec