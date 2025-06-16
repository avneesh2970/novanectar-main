import mongoose from "mongoose";
// Define the schema
const TestContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

// Create the model
const TestContact =
  mongoose.models.TestContact ||
  mongoose.model("TestContact", TestContactSchema);

export default TestContact;
