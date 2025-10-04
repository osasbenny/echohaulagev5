import express from 'express';
import {
  getAllUsers,
  getAllShipments,
  updateShipmentStatus,
  getRevenueReport,
  getShipmentStatistics,
  createServiceZone,
  updateServiceZone,
  getServiceZones,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin authorization
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.get('/shipments', getAllShipments);
router.put('/shipments/:id/status', updateShipmentStatus);
router.get('/reports/revenue', getRevenueReport);
router.get('/reports/shipments', getShipmentStatistics);

router.route('/service-zones')
  .get(getServiceZones)
  .post(createServiceZone);

router.put('/service-zones/:id', updateServiceZone);

export default router;
