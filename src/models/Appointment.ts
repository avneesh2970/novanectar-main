import mongoose from "mongoose";

// Define the schema
const AppointmentSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  customTime: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the model
const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
