

import jwt from 'jsonwebtoken';
import Expert from '../models/expert.model.js';

export const verifyExpertToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ use your JWT secret
    const expert = await Expert.findById(decoded.id).select('-password');
    if (!expert) return res.status(404).json({ message: 'Expert not found' });

    req.expert = expert; // ✅ attach expert to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

