const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  paymentDate: Date,
});

module.exports = mongoose.model('Payment', paymentSchema);
