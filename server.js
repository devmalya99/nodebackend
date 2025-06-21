// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db.js'; 
import userRoute from './routes/user-route.js'

import mongoose from 'mongoose';
// import chatRoute from './routes/chat.routes.js' 
// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  console.log("🔍 Incoming content-type:", req.headers["content-type"]);
  console.log("📦 Raw body:", req.body);
  next();
});



// //user route
app.use('/api/v1/user', userRoute);

// // Health check route
app.get('/health', (req, res) => {
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
        console.log(`🔍 Health check: http://localhost:${PORT}/health`);
    });
}).catch(err => {
    console.error('❌ Server initialization failed:', err);
    process.exit(1);
});
