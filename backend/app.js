import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorMiddleware.js';
import expertRoutes from './routes/expert.routes.js';
import serviceRoutes from './routes/service.routes.js';
import reviewRoutes from './routes/review.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import contactRoutes from "./routes/contact.routes.js";
import path from 'path';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));

// Routes
app.use("/api/contact", contactRoutes);
app.use('/api/expert', expertRoutes);
app.use('/api/service', serviceRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/booking', bookingRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
