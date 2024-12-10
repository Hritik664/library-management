const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    memberId: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    contactAddress: {
        type: String,
        required: true,
    },
    aadharCardNo: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },
    amountPending: {
        type: Number,
        default: 0,
    },
});

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;
