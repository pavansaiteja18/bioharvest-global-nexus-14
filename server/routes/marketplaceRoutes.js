import express from 'express';
import {
  getMarketplaceItems,
  getMyMarketplaceItems,
  getMarketplaceItemById,
  createMarketplaceItem,
  updateMarketplaceItem,
  deleteMarketplaceItem,
  purchaseMarketplaceItem,
} from '../controllers/marketplaceController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

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

export default router;
