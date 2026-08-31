const express = require('express');
const app = express();

// ENV initaition
const dotenv = require('dotenv');
dotenv.config();

// cookie parser initiation
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Intiating HELMET
const helmet = require('helmet');
app.use(helmet());

// CORS Initiation
const cors = require('cors');
app.use(cors({
    origin: "*",
    allowedHeaders: [""],
    methods: ["POST", "GET", "PUT", "DELETE"],
}));

// DB Initaion
const db = require('./src/config/db');
db();

//Router initiation
const authRouter = require('./src/routes/authRoutes.route');
app.use('/api', authRouter);

//Content initiation
const contentRoutes = require('./src/routes/contentRoutes.route');
app.use("/seo", contentRoutes);

// Global Error Handler 
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    })
});

// PORT initiation
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`connected on the PORT http://localhost:${PORT}`);
});

