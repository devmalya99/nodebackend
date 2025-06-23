// routes/user.ts
import express from 'express';
import {saveChatSession, getChatByClerkAndType, } from'../controllers/chatSessionController.js'

const router = express.Router();

// Get chat by clerk_id and chat_type
router.get("/save", saveChatSession);
router.get("/:clerk_id/:chat_type", getChatByClerkAndType);


export default router;
