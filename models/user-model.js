// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['client', 'coach', 'admin'],
      default: 'client',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
