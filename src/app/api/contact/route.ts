import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
};

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

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const newContact = new Contact(body);
    await newContact.save();

    return NextResponse.json({ message: 'Contact form submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json({ message: 'Error submitting contact form' }, { status: 500 });
  }
}

