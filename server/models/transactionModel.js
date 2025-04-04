
const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    transactionType: {
      type: String,
      required: [true, 'Please add a transaction type'],
      enum: ['purchase', 'sale', 'payment'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add an amount'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'completed', 'failed'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
