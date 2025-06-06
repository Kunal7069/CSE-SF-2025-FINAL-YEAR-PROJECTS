import express from 'express';
import {
  signUpExpert,
  signInExpert,
  getExpertById,
  updateExpertProfile,
} from '../controllers/expert.controller.js';

import { validateSignup, validateSignin } from '../validators/expert.validator.js';
import { validationResult } from 'express-validator';

import { verifyExpertToken } from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// ------------------------------
// Middleware to Handle Validation Errors
// ------------------------------
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ------------------------------
// Expert Auth Routes
// ------------------------------
router.post('/signup', validateSignup, handleValidation, signUpExpert);
router.post('/signin', validateSignin, handleValidation, signInExpert);

// ------------------------------
// Expert Profile Routes
// ------------------------------
router.put(
  '/update-profile',
  verifyExpertToken,          // ✅ JWT Auth Middleware
  upload.single('photo'),     // ✅ Multer Middleware for file field "photo"
  updateExpertProfile         // ✅ Controller logic
);

router.get('/:id', getExpertById);

export default router;
