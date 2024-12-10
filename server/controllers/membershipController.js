// backend/controllers/membershipController.js

const Membership = require('../models/Membership');

// Add Membership
exports.addMembership = async (req, res) => {
    const { firstName, lastName, contactName, contactAddress, aadharCardNo, startDate, endDate, membershipType } = req.body;

    try {
        const newMembership = new Membership({
            firstName,
            lastName,
            contactName,
            contactAddress,
            aadharCardNo,
            startDate,
            endDate,
            membershipType,
        });

        await newMembership.save();
        res.status(201).json({ message: "Membership added successfully", membership: newMembership });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const Membership = require('../models/Membership');

// Fetch the list of all memberships
exports.getMemberships = async (req, res) => {
    try {
        const memberships = await Membership.find();  // Fetch all memberships from the database
        res.status(200).json(memberships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
