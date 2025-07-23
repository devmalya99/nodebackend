// routes/user.ts
import express from 'express';
import {saveChatSession,getChatByClerkAndType, updateTypeSummarisedData } from'../controllers/chatSessionController.js'

const router = express.Router();

// Get chat by clerk_id and chat_type
router.post("/chat-session/save/:clerk_id/:project_id/:chat_type", saveChatSession);
router.get("/:clerk_id/:project_id/:chat_type", getChatByClerkAndType);
router.put("/save-type-summary/:clerk_id/:project_id/:chat_type", updateTypeSummarisedData);


export default router;
