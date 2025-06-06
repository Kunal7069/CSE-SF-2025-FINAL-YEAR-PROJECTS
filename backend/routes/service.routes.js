import express from 'express';
import {
  addService,
  updateService,
  deleteService,
  getAllServices,
  getExpertServices,
  getServiceById,
} from '../controllers/service.controller.js';
import { verifyExpertToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Route to get all services (with optional search query)
router.get('/all', getAllServices);

// Route to get a specific service by ID
router.get('/:id', getServiceById);

// Route to get all services of a specific expert
router.get('/expert/:expertId', getExpertServices);


router.post('/add', verifyExpertToken, addService);
router.put('/update/:id', verifyExpertToken, updateService);
router.delete('/delete/:id', verifyExpertToken, deleteService);
export default router;




