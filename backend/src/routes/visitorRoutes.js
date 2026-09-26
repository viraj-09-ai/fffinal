const express = require('express');
const router = express.Router();
const { registerVisitor, scanPass, getLogs } = require('../controllers/visitorController');

// Define API endpoints
router.post('/register', registerVisitor);
router.post('/scan', scanPass);
router.get('/logs', getLogs);

module.exports = router;