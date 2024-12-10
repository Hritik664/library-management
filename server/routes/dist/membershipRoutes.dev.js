"use strict";

// backend/routes/membershipRoutes.js
var express = require('express');

var _require = require('../controllers/membershipController'),
    addMembership = _require.addMembership,
    getMemberships = _require.getMemberships;

var router = express.Router(); // POST request to add a membership

router.post('/add', addMembership); // Route to get memberships

router.get('/', getMemberships);
module.exports = router;