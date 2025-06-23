import express from "express";
import {createProject, getProjectsByClerkId, updateProjectProgress } from "../controllers/projectController.js";

const router = express.Router();

router.post("/create", createProject);
router.get("/:clerkId", getProjectsByClerkId);
router.patch("/:projectId/updateProgress", updateProjectProgress);

export default router;
