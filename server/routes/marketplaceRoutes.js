
const express = require('express');
const router = express.Router();
const {
  getMarketplaceItems,
  getMyMarketplaceItems,
  getMarketplaceItemById,
  createMarketplaceItem,
  updateMarketplaceItem,
  deleteMarketplaceItem,
  purchaseMarketplaceItem,
} = require('../controllers/marketplaceController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getMarketplaceItems)
  .post(protect, createMarketplaceItem);

router.route('/me')
  .get(protect, getMyMarketplaceItems);

router.route('/:id')
  .get(protect, getMarketplaceItemById)
  .put(protect, updateMarketplaceItem)
  .delete(protect, deleteMarketplaceItem);

router.route('/:id/purchase')
  .post(protect, purchaseMarketplaceItem);

module.exports = router;
