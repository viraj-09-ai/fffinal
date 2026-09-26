// File path: src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/login', authController.login);

// Helper route to create your first Admin user for testing
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

module.exports = router;