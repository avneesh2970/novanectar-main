import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/dbConnect"
import JobApplication from "@/models/JobApplication"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const { id } = params

    // Validate the ID
    if (!id || id === "undefined") {
      return NextResponse.json({ message: "Invalid job application ID" }, { status: 400 })
    }

    const deletedJobApplication = await JobApplication.findByIdAndDelete(id)

    if (!deletedJobApplication) {
      return NextResponse.json({ message: "Job application not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Job application deleted successfully",
      deletedJobApplication,
    })
  } catch (error) {
    console.error("Error deleting job application:", error)
    return NextResponse.json({ message: "Error deleting job application" }, { status: 500 })
  }
}
