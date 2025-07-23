import mongoose from "mongoose";

// Define the sub-schema for individual messages.
const MessageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  content: { type: String, required: true },
  isUser: { type: Boolean, required: true },
  type: { type: String, default: "message" },
  isLoading: { type: Boolean, default: false }
}, { _id: false });

// Define a sub-schema for the message-related data,
// which now includes chat_type, messages, and type_embedding.
const MessageDataSchema = new mongoose.Schema({
  chat_type: { type: String, required: true },
  messages: { type: [MessageSchema], default: [] },
  type_summarised_data:{ type: String, default: "" }
}, { _id: false });



// Define the main ChatSession schema with the redesigned fields.
const ChatSessionSchema = new mongoose.Schema({
  clerk_id: { type: String, required: true },
  project_id: { type: String, required: true },
  all_summarised_data: { type: String, default: ""},
  message_Data: { type: MessageDataSchema, required: true }
}, { 
  timestamps: true  // Automatically manages createdAt and updatedAt
});

export default mongoose.model("ChatSession", ChatSessionSchema);

