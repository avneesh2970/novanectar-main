import mongoose from "mongoose";
// Define the schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

// Create the model
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export default Contact;