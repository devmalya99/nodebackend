// routes/user.ts
import express from 'express';
import {saveChatSession,getChatByClerkAndType } from'../controllers/chatSessionController.js'

const router = express.Router();

// Get chat by clerk_id and chat_type
router.post("/chat-session/save", saveChatSession);
router.get("/:clerk_id/:project_id/:chat_type", getChatByClerkAndType);



export default router;
