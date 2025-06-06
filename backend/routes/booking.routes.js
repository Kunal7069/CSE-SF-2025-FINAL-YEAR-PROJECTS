import express from 'express';
import { confirmBooking } from '../controllers/booking.Controller.js';
import { verifyExpertToken } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/confirm', verifyExpertToken, confirmBooking);
export default router;
