import mongoose from "mongoose";

const { Schema } = mongoose;

const ProgressEnum = ["Not Started", "In Progress", "Completed"];

const ProjectSchema = new Schema({
  project_name: { type: String, required: false},
  clerk_id: { type: String, required: true },
  business_plan_generated: { type: Boolean, default: false },
  progress: {
    executive_summary: { type: String, enum: ProgressEnum, default: "Not Started" },
    market_analysis: { type: String, enum: ProgressEnum, default: "Not Started" },
    competitive_analysis: { type: String, enum: ProgressEnum, default: "Not Started" },
    marketing_strategy: { type: String, enum: ProgressEnum, default: "Not Started" },
    financial_projection: { type: String, enum: ProgressEnum, default: "Not Started" },
    implementation_timeline: { type: String, enum: ProgressEnum, default: "Not Started" },
    business_plan_generation: { type: String, enum: ProgressEnum, default: "Not Started" },
  },
}, {
  timestamps: true,
});

// ✅ Export as a named export
export const Project = mongoose.model("Project", ProjectSchema);
