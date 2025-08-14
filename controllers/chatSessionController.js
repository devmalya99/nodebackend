import ChatSession from "../models/ChatSessionModel.js";

export const saveChatSession = async (req, res) => {
   console.log(req)
  try {
    const { clerk_id, project_id, chat_type } = req.params;

    // Validate required fields
    if (!clerk_id || !project_id || !chat_type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const { content } = req.body; // Expected to be an array of message objects
    
    if(!content) return res.status(400).json({ message: "Missing content in request body" });

    console.log("✅Content received:", content);

    // Validate content
    if (!Array.isArray(content) || content.length === 0) {
      return res.status(400).json({ message: "Missing or invalid content in request body" });
    }

    // Find existing chat session
    let chatSession = await ChatSession.findOne({ 
      clerk_id, 
      project_id, 
      "message_Data.chat_type": chat_type 
    });

    if (chatSession) {
      const existingMessages = chatSession.message_Data.messages || [];

      // Normalize IDs to string for consistent comparison
      const existingIds = new Set(existingMessages.map(m => String(m.id)));
      const newMessages = content.filter(m => !existingIds.has(String(m.id)));

      if (newMessages.length > 0) {
        chatSession.message_Data.messages.push(...newMessages);
        const updatedSession = await chatSession.save();
        return res.status(200).json(updatedSession);
      } else {
        return res.status(200).json(chatSession); // No new messages
      }

    } else {
      // Create new session
      const newChatSession = new ChatSession({
        clerk_id,
        project_id,
        all_summarised_data: "",
        message_Data: {
          chat_type,
          messages: content,
          type_summarised_data: ""
        }
      });

      const savedSession = await newChatSession.save();
      return res.status(201).json(savedSession);
    }

  } catch (error) {
    console.error("Error saving chat session:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




export const getChatByClerkAndType = async (req, res) => {
   console.log(req)
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
   console.log(req)
  try {
    const { clerk_id, project_id, chat_type } = req.params;

    if(!clerk_id || !project_id || !chat_type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Missing content in request body" });
    }

    console.log("type summarised data recieved from ai backend ", content);

    const chatSession = await ChatSession.findOne({
      clerk_id,
      project_id,
      "message_Data.chat_type": chat_type
    });

    if (!chatSession) {
      return res.status(404).json({ message: "Chat session not found" });
    }

    // Append new content to existing type_summarised_data
    
   
     // Initialize if undefined and append new content
    chatSession.message_Data.type_summarised_data = 
      (chatSession.message_Data.type_summarised_data || '') + '\n' + content;

    const updatedSession = await chatSession.save();
    return res.status(200).json(updatedSession);

  } catch (error) {
    console.error("Error appending to type_summarised_data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

