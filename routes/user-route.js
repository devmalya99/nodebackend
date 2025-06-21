// routes/user.ts
import express from 'express';
import { getUserData,registerClient } from'../controllers/user-controller.js'

const router = express.Router();

router.post('/find-user', getUserData);

router.post('/register', registerClient);

export default router;
