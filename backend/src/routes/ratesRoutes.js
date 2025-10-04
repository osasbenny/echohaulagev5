import express from 'express';
import {
  calculateRate,
  getServices,
  getTransitTime,
} from '../controllers/ratesController.js';

const router = express.Router();

router.post('/calculate', calculateRate);
router.get('/services', getServices);
router.post('/transit-time', getTransitTime);

export default router;
