// backend/routes/membershipRoutes.js

const express = require('express');
const { addMembership, getMemberships } = require('../controllers/membershipController');
const router = express.Router();

// POST request to add a membership
router.post('/add', addMembership);
// Route to get memberships
router.get('/', getMemberships);



module.exports = router;
