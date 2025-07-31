// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js'; 
import userRoute from './routes/user-route.js'
import projectRoute from './routes/projectRoutes.js'
import chatRoute from './routes/chatRoutes.js'
import mongoose from 'mongoose';

dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Enhance CORS configuration
app.use(cors());


// // Handle preflight requests
// app.options('*', cors());


// Add this right after your CORS middleware
app.use((req, res, next) => {
  console.log(`📍 ${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

//user route
app.use('/api/v1/user', userRoute);

//project route
app.use('/api/v1/projects', projectRoute);

// //chat route
 app.use('/api/v1/chats', chatRoute);

// // Health check route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        //console.log(`🔍 Health check: http://localhost:${PORT}/health`);
    });
}).catch(err => {
    console.error('❌ Server initialization failed:', err);
    process.exit(1);
});
