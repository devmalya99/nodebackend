// controllers/userController.ts
import User from "../models/user-model.js";
import { Project } from "../models/project-model.js"; // adjust path as needed

export const getUserData = async (req, res) => {
   console.log(req)
  const { clerkId } = req.params;

  if (!clerkId) return res.status(400).json({ error: "Missing clerkId" });

  const user = await User.findOne({ clerkId });

  if (!user) return res.status(404).json({ error: "User not found" });

  return res.status(200).json(user);
};

export const registerClient = async (req, res) => {
  console.log(req)
  try {
    const { name, email, clerkId, role } = req.body;

    if (!clerkId || !name || !email || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user already exists
    const existing = await User.findOne({ clerkId });

    if (existing) {
      return res.status(409).json({
        message: "User already exists",
        data: existing,
      });
    }

    const newUser = new User({
      clerkId: clerkId,
      name,
      email,
      role: role,
    });

    await newUser.save();

    res.status(201).json({
      message: "Client user registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error saving client user:", error);
    res.status(500).json({ message: "Server error. Could not save user." });
  }
};

//controller to assign coach to client
export const assignCoachToClient = async (req, res) => {
   console.log(req)
  try {
    const { clientClerkId, coachClerkId } = req.body;

    if (!clientClerkId || !coachClerkId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Step 1: Check if client exists
    const client = await User.findOne({ clerkId: clientClerkId });

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    const updatedClient = await User.findOneAndUpdate(
      { clerkId: clientClerkId },
      { coachId: coachClerkId },
      { new: true }
    );

    return res.status(200).json({
      message: "Coach assigned successfully",
      client: updatedClient,
    });
  } catch (error) {
    console.error("Error assigning coach to client:", error);
    res.status(500).json({ message: "Server error. Could not assign coach." });
  }
};



export const getUserDataByEmail = async (req, res) => {
   
  const { email } = req.params;

  if (!email) return res.status(400).json({ error: "Missing email" });

  const data = await User.findOne({ email });

  if (!data) return res.status(404).json({ error: "User not found" });

  return res.status(200).json(data);
};