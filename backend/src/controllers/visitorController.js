const Pass = require('../models/Pass');
const CheckLog = require('../models/CheckLog');
const sendPassNotification = require('../utils/mailer');
const QRCode = require('qrcode');
const mongoose = require('mongoose');

exports.registerVisitor = async (req, res) => {
    try {
        const { name, email, purpose, validUntil } = req.body;
        
        // Create the pass
        const newPass = await Pass.create({
            visitorId: new mongoose.Types.ObjectId(), // Mock ID generation
            purpose,
            validUntil
        });

        // Generate QR Code containing the Pass ID
        const qrData = String(newPass._id);
        const qrCodeUrl = await QRCode.toDataURL(qrData);
        newPass.qrCodeUrl = qrCodeUrl;
        await newPass.save();

        // Send Email Notification (safely handles if credentials aren't set yet)
        if (email) {
            await sendPassNotification(email, `Your pass ID is ${newPass._id}. Purpose: ${purpose}`);
        }

        res.status(201).json({ message: 'Pass generated', pass: newPass });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register visitor' });
    }
};

exports.scanPass = async (req, res) => {
    try {
        const { qrData } = req.body;
        const pass = await Pass.findById(qrData);

        if (!pass || pass.status === 'Expired' || new Date() > new Date(pass.validUntil)) {
            return res.status(400).json({ error: 'Invalid or expired pass' });
        }

        // Log the check-in
        const log = await CheckLog.create({ passId: pass._id, action: 'Check-In' });
        res.status(200).json({ message: 'Check-in successful', log });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Scan failed' });
    }
};

exports.getLogs = async (req, res) => {
    try {
        // Fetches logs and sorts by newest first
        const logs = await CheckLog.find().sort({ timestamp: -1 });
        res.status(200).json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
};