const User = require('../models/User');

// Add New User
exports.addUser = async (req, res) => {
    const { username, password, isAdmin, isActive } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({
            username,
            password,
            isAdmin: isAdmin || false,
            isActive: isActive !== undefined ? isActive : true,
        });

        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
