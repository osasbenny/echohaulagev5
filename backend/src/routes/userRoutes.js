import express from 'express';
import {
  getProfile,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

router.route('/addresses')
  .post(protect, addAddress);

router.route('/addresses/:addressId')
  .put(protect, updateAddress)
  .delete(protect, deleteAddress);

export default router;
