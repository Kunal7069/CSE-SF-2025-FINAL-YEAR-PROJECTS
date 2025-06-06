
import express from 'express';
import { addReview, getServiceReviews } from '../controllers/review.controller.js';
import { verifyExpertToken } from '../middleware/auth.middleware.js';
import { deleteReview } from '../controllers/review.controller.js';


const router = express.Router();

router.delete('/delete/:reviewId', verifyExpertToken, deleteReview);
// router.delete('/:reviewId', verifyExpertToken, deleteReview);
router.post('/add', verifyExpertToken, addReview); // ✅ Expert must be logged in
router.get('/:serviceId', getServiceReviews);

export default router;
