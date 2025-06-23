import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  content: { type: String, required: true },
  isUser: { type: Boolean, required: true },
  type: { type: String, default: "message" },
  isLoading: { type: Boolean, default: false }
}, { _id: false });

const ChatSessionSchema = new mongoose.Schema({
  clerk_id: { type: String, required: true },
  chat_type: { type: String, required: true },
  embedding: { type: [Number], default: [] },
  messages: { type: [MessageSchema], default: [] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model("ChatSession", ChatSessionSchema);
