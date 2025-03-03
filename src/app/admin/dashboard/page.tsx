"use client";

import React, { useEffect, useState } from "react";
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

  // Add pagination state variables after the existing state declarations
  const [appointmentsPage, setAppointmentsPage] = useState(1)
  const [contactsPage, setContactsPage] = useState(1)
  const [jobApplicationsPage, setJobApplicationsPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

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


  // Add pagination logic after the filtering functions
  // Paginate function to slice the data based on current page
  const paginateData = (data: any[], currentPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.slice(startIndex, endIndex)
  }

  // Paginated data for each section
  const paginatedAppointments = paginateData(filteredAppointments, appointmentsPage)
  const paginatedContacts = paginateData(filteredContacts, contactsPage)
  const paginatedJobApplications = paginateData(filteredJobApplications, jobApplicationsPage)

  // Function to generate pagination controls
  const PaginationControls = ({
    totalItems,
    currentPage,
    setPage,
  }: {
    totalItems: number
    currentPage: number
    setPage: (page: number) => void
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    return (
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span> to{" "}
          <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            Previous
          </button>
          {totalPages <= 5 ? (
            // Show all pages if 5 or fewer
            [...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))
          ) : (
            // Show limited pages with ellipsis for many pages
            <>
              {[...Array(Math.min(3, currentPage))].map((_, i) => {
                const pageNum = i + 1
                return pageNum < currentPage - 1 && i === 0 ? (
                  <React.Fragment key={pageNum}>
                    <button
                      onClick={() => setPage(pageNum)}
                      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                      {pageNum}
                    </button>
                    {currentPage > 3 && <span className="px-2">...</span>}
                  </React.Fragment>
                ) : pageNum >= currentPage - 1 ? (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1 rounded ${
                      currentPage === pageNum ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                ) : null
              })}
              {currentPage < totalPages - 1 && (
                <>
                  {currentPage < totalPages - 2 && <span className="px-2">...</span>}
                  <button
                    onClick={() => setPage(totalPages)}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </>
          )}
          <button
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    )
  }

  // Update the itemsPerPage handler
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value))
    // Reset to first page when changing items per page
    setAppointmentsPage(1)
    setContactsPage(1)
    setJobApplicationsPage(1)
  } 


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
                    {paginatedAppointments.map((appointment) => (
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
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Show</span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="border rounded p-1 text-sm"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="text-sm text-gray-700">entries</span>
                </div>
                <PaginationControls
                  totalItems={filteredAppointments.length}
                  currentPage={appointmentsPage}
                  setPage={setAppointmentsPage}
                />
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
                    {paginatedContacts.map((contact) => (
                      <tr key={contact._id} className="border-b">
                        <td className="p-2 text-gray-700">
                          {format(new Date(contact.createdAt), "yyyy-MM-dd")}
                        </td>
                        <td className="p-2 text-gray-700">{contact.name}</td>
                        <td className="p-2 text-gray-700">{contact.email}</td>
                        <td className="p-2 text-gray-700">{contact.subject}</td>
                        <td className="p-2 text-gray-700">
                          {/* {contact.message.substring(0, 50)}... */}
                          {contact.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <PaginationControls
                  totalItems={filteredContacts.length}
                  currentPage={contactsPage}
                  setPage={setContactsPage}
                />
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
                    {paginatedJobApplications.map((application) => (
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
              <div className="mt-4">
                <PaginationControls
                  totalItems={filteredJobApplications.length}
                  currentPage={jobApplicationsPage}
                  setPage={setJobApplicationsPage}
                />
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
