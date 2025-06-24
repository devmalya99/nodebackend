// controllers/projectController.js
import { Project } from "../models/project-model.js"; // adjust path if needed


// POST /projects
export const createProject = async (req, res) => {
  try {
    const { project_name, clerk_id } = req.body;

    if (!project_name || !clerk_id) {
      return res.status(400).json({ 
        message: "project_name and clerk_id are required" });
    }

    const newProject = new Project({
      project_name,
      clerk_id
      // progress fields and timestamps will be set with default values
    });

    await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error creating project" });
  }
};


// GET /projects/:clerkId
export const getProjectsByClerkId = async (req, res) => {
  try {
    const { clerkId } = req.params;

    if (!clerkId) {
      return res.status(400).json({ message: "Missing clerkId in params" });
    }

    const projects = await Project.find({ clerk_id: clerkId });

    res.status(200).json({ message: "Projects fetched", data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server error fetching projects" });
  }
};

// PATCH /projects/:projectId/progress
export const updateProjectProgress = async (req, res) => {
  try {
    const { projectId } = req.params;
    const progressFieldUpdate  = req.body;

    if (!projectId || !progressFieldUpdate || Object.keys(progressFieldUpdate).length === 0) {
      return res.status(400).json({ message: "Missing projectId or progress data" });
    }

    // Dynamically convert to dot notation: { "progress.business_plan_generation": "In Progress" }
    const updateObject = {};
    for (const key in progressFieldUpdate) {
      updateObject[`progress.${key}`] = progressFieldUpdate[key];
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: updateObject },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project progress updated",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "Server error updating progress" });
  }
};

