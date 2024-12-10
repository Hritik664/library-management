const express = require('express');
const router = express.Router();
const Membership = require('../models/Membership');

// Get all memberships
router.get('/master-list', async (req, res) => {
    try {
        const memberships = await Membership.find({});
        res.status(200).json(memberships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
