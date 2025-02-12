"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Link from "next/link";

// Define types for our data
type Appointment = {
  _id: string;
  date: string;
  customTime: string;
  name: string;
  email: string;
  phone: string;
};

type Contact = {
  _id: string;
  name: string;
  email: string;
  contact: string;
  subject: string;
  message: string;
  createdAt: string;
};

type JobApplication = {
  _id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [filter, setFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin");
    } else {
      fetchData();
    }
  }, [router]);

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const appointmentsRes = await fetch("/api/admin/appointments");
      const contactsRes = await fetch("/api/admin/contacts");
      const jobApplicationsRes = await fetch("/api/admin/job-applications");

      if (appointmentsRes.ok && contactsRes.ok && jobApplicationsRes.ok) {
        setAppointments(await appointmentsRes.json());
        setContacts(await contactsRes.json());
        setJobApplications(await jobApplicationsRes.json());
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    router.push("/admin");
  };

  // Filter function
  const filterData = (data: any[], keys: string[]) => {
    return data.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        return (
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(filter.toLowerCase()) &&
          (!dateFilter ||
            format(parseISO(item.date || item.createdAt), "yyyy-MM-dd") ===
              dateFilter)
        );
      })
    );
  };

  const filteredAppointments = filterData(appointments, [
    "name",
    "email",
    "phone",
  ]);
  const filteredContacts = filterData(contacts, ["name", "email", "subject"]);
  const filteredJobApplications = filterData(jobApplications, [
    "name",
    "email",
    "jobId",
  ]);

  // Function to download data as CSV
  const downloadCSV = (data: any[], filename: string) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(data[0]).join(",") +
      "\n" +
      data.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to download data as PDF
  const downloadPDF = (data: any[], filename: string) => {
    const doc: any = new jsPDF();
    doc.autoTable({
      head: [Object.keys(data[0])],
      body: data.map(Object.values),
    });
    doc.save(`${filename}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <p className="text-gray-700">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {/* Filter inputs */}
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Filter by name, email, or other fields..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-grow p-2 border rounded text-gray-700"
              />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="p-2 border rounded text-gray-700"
              />
            </div>

            {/* Appointments Section */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Appointments
                </h2>
                <div>
                  <button
                    onClick={() =>
                      downloadCSV(filteredAppointments, "appointments")
                    }
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 mr-2"
                  >
                    Download CSV
                  </button>
                  <button
                    onClick={() =>
                      downloadPDF(filteredAppointments, "appointments")
                    }
                    className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 text-left text-gray-700">Date</th>
                      <th className="p-2 text-left text-gray-700">Time</th>
                      <th className="p-2 text-left text-gray-700">Name</th>
                      <th className="p-2 text-left text-gray-700">Email</th>
                      <th className="p-2 text-left text-gray-700">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment._id} className="border-b">
                        <td className="p-2 text-gray-700">
                          {format(new Date(appointment.date), "yyyy-MM-dd")}
                        </td>
                        <td className="p-2 text-gray-700">
                          {appointment.customTime}
                        </td>
                        <td className="p-2 text-gray-700">
                          {appointment.name}
                        </td>
                        <td className="p-2 text-gray-700">
                          {appointment.email}
                        </td>
                        <td className="p-2 text-gray-700">
                          {appointment.phone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Contacts Section */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Contacts
                </h2>
                <div>
                  <button
                    onClick={() => downloadCSV(filteredContacts, "contacts")}
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 mr-2"
                  >
                    Download CSV
                  </button>
                  <button
                    onClick={() => downloadPDF(filteredContacts, "contacts")}
                    className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 text-left text-gray-700">Date</th>
                      <th className="p-2 text-left text-gray-700">Name</th>
                      <th className="p-2 text-left text-gray-700">Email</th>
                      <th className="p-2 text-left text-gray-700">Subject</th>
                      <th className="p-2 text-left text-gray-700">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact._id} className="border-b">
                        <td className="p-2 text-gray-700">
                          {format(new Date(contact.createdAt), "yyyy-MM-dd")}
                        </td>
                        <td className="p-2 text-gray-700">{contact.name}</td>
                        <td className="p-2 text-gray-700">{contact.email}</td>
                        <td className="p-2 text-gray-700">{contact.subject}</td>
                        <td className="p-2 text-gray-700">
                          {contact.message.substring(0, 50)}...
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Job Applications Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Job Applications
                </h2>
                <div>
                  <button
                    onClick={() =>
                      downloadCSV(filteredJobApplications, "job_applications")
                    }
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 mr-2"
                  >
                    Download CSV
                  </button>
                  <button
                    onClick={() =>
                      downloadPDF(filteredJobApplications, "job_applications")
                    }
                    className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2 text-left text-gray-700">Date</th>
                      <th className="p-2 text-left text-gray-700">Job ID</th>
                      <th className="p-2 text-left text-gray-700">Name</th>
                      <th className="p-2 text-left text-gray-700">Email</th>
                      <th className="p-2 text-left text-gray-700">Phone</th>
                      <th className="p-2 text-left text-gray-700">
                        see resume
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobApplications.map((application) => (
                      <tr key={application._id} className="border-b">
                        <td className="p-2 text-gray-700">
                          {format(
                            new Date(application.createdAt),
                            "yyyy-MM-dd"
                          )}
                        </td>
                        <td className="p-2 text-gray-700">
                          {application.jobId}
                        </td>
                        <td className="p-2 text-gray-700">
                          {application.name}
                        </td>
                        <td className="p-2 text-gray-700">
                          {application.email}
                        </td>
                        <td className="p-2 text-gray-700">
                          {application.phone}
                        </td>
                        <td className="p-2 text-blue-500">
                          <Link
                            href={application.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Resume
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
