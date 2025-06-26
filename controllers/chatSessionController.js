import ChatSession from "../models/ChatSessionModel.js";

export const saveChatSession = async (req, res) => {
  try {
    const { clerk_id,project_id, chat_type, all_summarised_data, message_Data } = req.body;

    if (!clerk_id || !project_id || !message_Data.chat_type ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("Incoming req.body:", req.body);


    const chatSession = new ChatSession({
      clerk_id,
      project_id,
      all_summarised_data,
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

export const updateTypeSummarisedData = async (req, res) => {
  try {
    const { clerk_id, project_id, chat_type } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Missing content in request body" });
    }

    const chatSession = await ChatSession.findOne({
      clerk_id,
      project_id,
      "message_Data.chat_type": chat_type
    });

    if (!chatSession) {
      return res.status(404).json({ message: "Chat session not found" });
    }

    // Append new content to existing type_summarised_data
    const currentSummary = chatSession.message_Data.type_summarised_data || "";
    chatSession.message_Data.type_summarised_data = currentSummary + content;

    const updatedSession = await chatSession.save();

    return res.status(200).json(updatedSession);
  } catch (error) {
    console.error("Error appending to type_summarised_data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

