import ChatSession from "../models/ChatSessionModel.js";

export const saveChatSession = async (req, res) => {
  try {
    const { clerk_id, chat_type, messages, embedding } = req.body;

    if (!clerk_id || !chat_type || !messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const chat = await ChatSession.create({
      clerk_id,
      chat_type,
      embedding: embedding || [],
      messages
    });

    res.status(201).json(chat);
  } catch (error) {
    console.error("Error saving chat:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getChatByClerkAndType = async (req, res) => {
  try {
    const { clerk_id, chat_type } = req.params;

    const chat = await ChatSession.findOne({ clerk_id, chat_type }).sort({ created_at: -1 });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error fetching chat by clerk_id and chat_type:", error);
    res.status(500).json({ message: "Server error" });
  }
};

