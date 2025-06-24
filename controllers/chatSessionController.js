import ChatSession from "../models/ChatSessionModel.js";

export const saveChatSession = async (req, res) => {
  try {
    const { clerk_id,project_id, chat_type, all_summarised_data, message_Data } = req.body;

    if (!clerk_id || !project_id || !message_Data.chat_type ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const chatSession = new ChatSession({
      clerk_id,
      project_id,
      all_summarised_data: all_summarised_data || "",
      message_Data
    });

    const savedSession = await chatSession.save();
    return res.status(201).json(savedSession);
  } catch (error) {
    console.error("Error saving chat:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getChatByClerkAndType = async (req, res) => {
  try {
    const { clerk_id,project_id, chat_type } = req.params;

    const chat = await ChatSession.findOne({
      clerk_id,
      project_id,
      "message_Data.chat_type": chat_type
    }).sort({ createdAt: -1 }); // timestamps key is 'createdAt'

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error fetching chat by clerk_id and chat_type:", error);
    res.status(500).json({ message: "Server error" });
  }
};
