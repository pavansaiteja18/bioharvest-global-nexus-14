
const mongoose = require('mongoose');

const marketplaceItemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please add quantity'],
    },
    status: {
      type: String,
      enum: ['available', 'pending', 'sold'],
      default: 'available',
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MarketplaceItem', marketplaceItemSchema);
