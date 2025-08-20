// routes/user.ts
import express from 'express';
import { assignCoachToClient, getUserData,registerClient, getUserDataByEmail } from'../controllers/user-controller.js'

const router = express.Router();

router.get('/find-user/:clerkId', getUserData);

router.post('/register', registerClient);

router.post('/assign-coach', assignCoachToClient);

router.get('/find-email/:email', getUserDataByEmail);

export default router;
