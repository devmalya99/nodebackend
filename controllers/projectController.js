// controllers/projectController.js
import { Project } from "../models/project-model.js"; // adjust path if needed

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
    const progressUpdates = req.body.progress;

    if (!projectId || !progressUpdates) {
      return res.status(400).json({ message: "Missing projectId or progress data" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: { progress: progressUpdates } },
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

