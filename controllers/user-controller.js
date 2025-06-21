// controllers/userController.ts
import User from '../models/user-model.js';
import {Project} from "../models/project-model.js"; // adjust path as needed

export const getUserData = async (req, res) => {
  const {clerkId} = req.body;

  if (!clerkId) return res.status(400).json({ error: 'Missing clerkId' });

  const user = await User.findOne({ clerkId });

  if (!user) return res.status(404).json({ error: 'User not found' });

  return res.status(200).json(user);
};

export const registerClient = async (req, res) => {
  try {
    const { name, email ,clerkId,role } = req.body;

    if (!clerkId || !name || !email || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user already exists
    const existing = await User.findOne({ clerkId });

    if (existing) {
      return res.status(409).json({ 
        message: 'User already exists',
        data:existing
       });
    }

    const newUser = new User({
      clerkId:clerkId,
      name,
      email,
      role: role, 
    });

    await newUser.save();

    // 🆕 Automatically create a blank project
    const newProject = new Project({
      project_name: "",
      clerk_id: clerkId,
      business_plan_generated: false,
      progress: {
        executive_summary: "Not Started",
        market_analysis: "Not Started",
        competitive_analysis: "Not Started",
        marketing_strategy: "Not Started",
        financial_projection: "Not Started",
        implementation_timeline: "Not Started",
        business_plan_generation: "Not Started",
      },
    });

    await newProject.save();

    res.status(201).json({
      message: 'Client user registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
    
  } catch (error) {
    console.error('Error saving client user:', error);
    res.status(500).json({ message: 'Server error. Could not save user.' });
  }
};


