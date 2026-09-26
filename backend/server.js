const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Default route to fix the 'Cannot GET /' error on Render
app.get('/', (req, res) => {
    res.send('Visitor Management API is active.');
});

// Activate your authentication and visitor routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/visitors', require('./src/routes/visitorRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});