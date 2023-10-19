require("dotenv").config();

const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger")

const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/authRoutes")
const bidRoutes = require("./routes/bidRoutes")

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// routes
app.use("/api/auth", authRoutes);
app.use("/api/bids/", bidRoutes)

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3140;
const DB = process.env.NODE_ENV == "production" ? process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD) : null;

mongoose.connect(DB || 'mongodb://127.0.0.1:27017/csit314').then(con => {
    console.log('DB connection successful')
})


app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});