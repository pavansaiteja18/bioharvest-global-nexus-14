
const asyncHandler = require('express-async-handler');
const Transaction = require('../models/transactionModel');

// @desc    Get user transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id });
  res.status(200).json(transactions);
});

// @desc    Create new transaction
// @route   POST /api/transactions
// @access  Private
const createTransaction = asyncHandler(async (req, res) => {
  const { transactionType, amount, description, status } = req.body;

  if (!transactionType || !amount || !description) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const transaction = await Transaction.create({
    user: req.user.id,
    transactionType,
    amount,
    description,
    status: status || 'pending',
  });

  res.status(201).json(transaction);
});

// @desc    Update transaction status
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    res.status(404);
    throw new Error('Transaction not found');
  }

  // Check if user owns the transaction
  if (transaction.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTransaction);
});

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
};
