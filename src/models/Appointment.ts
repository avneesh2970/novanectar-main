import mongoose from "mongoose"

// Define the schema
const AppointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
})

// Create the model
const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema)

export default Appointment

