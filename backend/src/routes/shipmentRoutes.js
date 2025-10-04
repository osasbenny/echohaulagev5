import express from 'express';
import {
  createShipment,
  getShipments,
  getShipmentById,
  trackShipment,
  updateShipment,
  cancelShipment,
  addTrackingUpdate,
} from '../controllers/shipmentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createShipment)
  .get(protect, getShipments);

router.get('/track/:trackingNumber', trackShipment);

router.route('/:id')
  .get(protect, getShipmentById)
  .put(protect, updateShipment)
  .delete(protect, cancelShipment);

router.post(
  '/:id/tracking',
  protect,
  authorize('admin', 'agent'),
  addTrackingUpdate
);

export default router;
