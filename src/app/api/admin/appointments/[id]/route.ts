import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";

export async function DELETE(request: NextRequest, context: any) {
  try {
    await connectDB();

    const { id } = context.params;

    // Validate the ID
    if (!id || id === "undefined") {
      return NextResponse.json(
        { message: "Invalid appointment ID" },
        { status: 400 }
      );
    }

    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return NextResponse.json(
        { message: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Appointment deleted successfully",
      deletedAppointment,
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { message: "Error deleting appointment" },
      { status: 500 }
    );
  }
}
