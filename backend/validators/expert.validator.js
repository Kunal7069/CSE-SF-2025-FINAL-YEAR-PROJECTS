import { body } from 'express-validator';

// ----------------------
// Expert Signup Validation
// ----------------------
export const validateSignup = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('A valid email address is required'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

// ----------------------
// Expert Signin Validation
// ----------------------
export const validateSignin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('A valid email address is required'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
];
