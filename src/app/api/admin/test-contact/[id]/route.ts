import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import TestContact from "@/models/TestContacts";

export async function DELETE(request: NextRequest, context: any) {
  try {
    await connectDB();

    const { id } = context.params;

    // Validate the ID
    if (!id || id === "undefined") {
      return NextResponse.json(
        { message: "Invalid contact ID" },
        { status: 400 }
      );
    }

    const deletedContact = await TestContact.findByIdAndDelete(id);

    if (!deletedContact) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Contact deleted successfully",
      deletedContact,
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { message: "Error deleting contact" },
      { status: 500 }
    );
  }
}
