const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const morgan = require("morgan");
const cors = require("cors");
const cloudinary = require('cloudinary').v2;

dotenv.config();
connectDB();


// Configure Cloudinary
cloudinary.config({
  cloud_name: 'xxxx',
  api_key: 'xxxx',
  api_secret: 'xxxx',
});


const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());
//middlewares
app.use(cors({
    origin: '*', // Or specify the frontend's IP
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }));

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/post', require('./routes/postRoutes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
