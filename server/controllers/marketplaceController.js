
const asyncHandler = require('express-async-handler');
const MarketplaceItem = require('../models/marketplaceModel');

// @desc    Get all marketplace items
// @route   GET /api/marketplace
// @access  Private
const getMarketplaceItems = asyncHandler(async (req, res) => {
  // Add filters based on query params
  const filters = {};
  
  if (req.query.category) {
    filters.category = req.query.category;
  }
  
  if (req.query.status) {
    filters.status = req.query.status;
  }

  const items = await MarketplaceItem.find(filters).populate('user', 'name email');
  res.status(200).json(items);
});

// @desc    Get user's marketplace items
// @route   GET /api/marketplace/me
// @access  Private
const getMyMarketplaceItems = asyncHandler(async (req, res) => {
  const items = await MarketplaceItem.find({ user: req.user.id });
  res.status(200).json(items);
});

// @desc    Get marketplace item by ID
// @route   GET /api/marketplace/:id
// @access  Private
const getMarketplaceItemById = asyncHandler(async (req, res) => {
  const item = await MarketplaceItem.findById(req.params.id).populate('user', 'name email');
  
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  
  res.status(200).json(item);
});

// @desc    Create new marketplace item
// @route   POST /api/marketplace
// @access  Private
const createMarketplaceItem = asyncHandler(async (req, res) => {
  const { name, description, price, quantity, category, imageUrl } = req.body;

  if (!name || !description || !price || !quantity || !category) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const item = await MarketplaceItem.create({
    user: req.user.id,
    name,
    description,
    price,
    quantity,
    category,
    imageUrl: imageUrl || '',
    status: 'available',
  });

  res.status(201).json(item);
});

// @desc    Update marketplace item
// @route   PUT /api/marketplace/:id
// @access  Private
const updateMarketplaceItem = asyncHandler(async (req, res) => {
  const item = await MarketplaceItem.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  // Check if user owns the item
  if (item.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedItem = await MarketplaceItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedItem);
});

// @desc    Delete marketplace item
// @route   DELETE /api/marketplace/:id
// @access  Private
const deleteMarketplaceItem = asyncHandler(async (req, res) => {
  const item = await MarketplaceItem.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  // Check if user owns the item
  if (item.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await item.deleteOne();

  res.status(200).json({ id: req.params.id });
});

// @desc    Purchase marketplace item 
// @route   POST /api/marketplace/:id/purchase
// @access  Private
const purchaseMarketplaceItem = asyncHandler(async (req, res) => {
  const item = await MarketplaceItem.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  // Check if item is available
  if (item.status !== 'available') {
    res.status(400);
    throw new Error('Item is not available for purchase');
  }

  // Check if there's enough quantity
  const { quantity } = req.body;
  
  if (!quantity || quantity <= 0) {
    res.status(400);
    throw new Error('Please specify a valid quantity');
  }

  if (quantity > item.quantity) {
    res.status(400);
    throw new Error('Not enough quantity available');
  }

  // Update item quantity or status
  if (quantity === item.quantity) {
    item.status = 'sold';
    item.quantity = 0;
  } else {
    item.quantity -= quantity;
  }

  const updatedItem = await item.save();

  // TODO: Create a transaction record for this purchase
  // This would be implemented in a real application

  res.status(200).json(updatedItem);
});

module.exports = {
  getMarketplaceItems,
  getMyMarketplaceItems,
  getMarketplaceItemById,
  createMarketplaceItem,
  updateMarketplaceItem,
  deleteMarketplaceItem,
  purchaseMarketplaceItem,
};
