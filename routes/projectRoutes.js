import express from "express";
import { getProjectsByClerkId, updateProjectProgress } from "../controllers/projectController.js";

const router = express.Router();

router.get("/:clerkId", getProjectsByClerkId);
router.patch("/:projectId/progress", updateProjectProgress);

export default router;
