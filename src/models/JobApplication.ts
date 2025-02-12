import mongoose from "mongoose"

const JobApplicationSchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resume: { type: String, required: true }, // This will now store the Cloudinary URL
  coverLetter: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const JobApplication = mongoose.models.JobApplication || mongoose.model("JobApplication", JobApplicationSchema)

export default JobApplication
