import express from 'express';
import { ChatManager } from '../controllers/cognitiveController.js';
const chatController = new ChatManager()
const router = express.Router();

// Recieve chat from user

router.post("/chat", chatController.handleChatRequest)



export { router };
