"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
} from "date-fns";
import "jspdf-autotable";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  LogOut,
  Mail,
  Search,
  X,
  Eye,
  AlertTriangle,
  RefreshCw,
  Clock,
  Phone,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  BarChart3,
  PieChart,
  Activity,
  Briefcase,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  Check,
  XIcon,
  Menu,
  Home,
  CalendarClock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<any>([]);
  const [contacts, setContacts] = useState<any>([]);
  const [testContacts, setTestContacts] = useState<any>([]);
  const [jobApplications, setJobApplications] = useState<any>([]);
  const [filter, setFilter] = useState<any>("");
  const [dateFilter, setDateFilter] = useState<any>("");
  const [sortBy, setSortBy] = useState<any>("date");
  const [sortOrder, setSortOrder] = useState<any>("desc");
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<any>("overview");
  const [showFilters, setShowFilters] = useState<any>(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showMessageDialog, setShowMessageDialog] = useState<any>(false);
  const [showPdfViewer, setShowPdfViewer] = useState<any>(false);
  const [pdfUrl, setPdfUrl] = useState<any>("");
  const [animateStats, setAnimateStats] = useState<any>(false);

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Advanced pagination state
  const [appointmentsPage, setAppointmentsPage] = useState<any>(1);
  const [contactsPage, setContactsPage] = useState<any>(1);
  const [testContactsPage, setTestContactsPage] = useState<any>(1);
  const [jobApplicationsPage, setJobApplicationsPage] = useState<any>(1);
  const [itemsPerPage, setItemsPerPage] = useState<any>(10);
  const [showItemsPerPageDropdown, setShowItemsPerPageDropdown] =
    useState<any>(false);

  // Advanced filters
  const [dateRange, setDateRange] = useState<any>({ start: "", end: "" });
  const [quickDateFilter, setQuickDateFilter] = useState<any>("all");

  // Delete functionality state
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<any>(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<any>(null);
  const [deleteStatus, setDeleteStatus] = useState<any>(null);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin");
    } else {
      fetchData();
    }
  }, [router]);

  useEffect(() => {
    if (!loading) {
      setAnimateStats(true);
      const timer = setTimeout(() => setAnimateStats(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Handle click outside to close action menus and mobile sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuOpen && !(event.target as Element).closest(".relative")) {
        setActionMenuOpen(null);
      }

      // Close mobile sidebar when clicking outside
      if (
        isMobile &&
        sidebarOpen &&
        !(event.target as Element).closest(".sidebar")
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionMenuOpen, isMobile, sidebarOpen]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [appointmentsRes, contactsRes, jobApplicationsRes, testContactRes] =
        await Promise.all([
          fetch("/api/admin/appointments"),
          fetch("/api/admin/contacts"),
          fetch("/api/admin/job-applications"),
          fetch("/api/admin/test-contact"),
        ]);

      if (
        appointmentsRes.ok &&
        contactsRes.ok &&
        jobApplicationsRes.ok &&
        testContactRes.ok
      ) {
        setAppointments(await appointmentsRes.json());
        setContacts(await contactsRes.json());
        setJobApplications(await jobApplicationsRes.json());
        setTestContacts(await testContactRes.json());
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

  const handleViewMessage = (message: string) => {
    setSelectedMessage(message);
    setShowMessageDialog(true);
  };

  const handleViewPdf = (url: string) => {
    setPdfUrl(url);
    setShowPdfViewer(true);
  };

  const closeMessageDialog = () => {
    setShowMessageDialog(false);
    setSelectedMessage(null);
  };

  const closePdfViewer = () => {
    setShowPdfViewer(false);
    setPdfUrl("");
  };

  // Advanced filtering function
  const filterData = (data: any[], keys: string[]) => {
    const filtered = data.filter((item) => {
      // Text search
      const textMatch = keys.some((key) => {
        const value = item[key];
        return (
          value &&
          typeof value === "string" &&
          value.toLowerCase().includes(filter.toLowerCase())
        );
      });

      // Date filtering
      let dateMatch = true;
      if (dateFilter) {
        dateMatch =
          format(parseISO(item.date || item.createdAt), "yyyy-MM-dd") ===
          dateFilter;
      }

      // Date range filtering
      if (dateRange.start && dateRange.end) {
        const itemDate = new Date(item.date || item.createdAt);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        dateMatch = itemDate >= startDate && itemDate <= endDate;
      }

      // Quick date filters
      if (quickDateFilter !== "all") {
        const itemDate = new Date(item.date || item.createdAt);
        const now = new Date();

        switch (quickDateFilter) {
          case "today":
            dateMatch =
              format(itemDate, "yyyy-MM-dd") === format(now, "yyyy-MM-dd");
            break;
          case "week":
            dateMatch = isWithinInterval(itemDate, {
              start: startOfWeek(now),
              end: endOfWeek(now),
            });
            break;
          case "month":
            dateMatch =
              itemDate.getMonth() === now.getMonth() &&
              itemDate.getFullYear() === now.getFullYear();
            break;
        }
      }

      return textMatch && dateMatch;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy] || a.createdAt || a.date;
      let bValue = b[sortBy] || b.createdAt || b.date;

      if (sortBy === "date" || sortBy === "createdAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
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
  const filteredTestContacts = filterData(testContacts, [
    "name",
    "email",
    "subject",
  ]);

  // Pagination logic
  const paginateData = (data: any[], currentPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const paginatedAppointments = paginateData(
    filteredAppointments,
    appointmentsPage
  );
  const paginatedContacts = paginateData(filteredContacts, contactsPage);
  const paginatedJobApplications = paginateData(
    filteredJobApplications,
    jobApplicationsPage
  );
  const paginatedTestContacts = paginateData(
    filteredTestContacts,
    testContactsPage
  );

  // Advanced Pagination Controls
  const AdvancedPaginationControls = ({
    totalItems,
    currentPage,
    setPage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dataType,
  }: {
    totalItems: number;
    currentPage: number;
    setPage: (page: number) => void;
    dataType: string;
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push("...");
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push("...");
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        }
      }
      return pages;
    };

    if (totalItems === 0) return null;

    return (
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startItem}</span> to{" "}
              <span className="font-medium">{endItem}</span> of{" "}
              <span className="font-medium">{totalItems}</span> results
            </p>
            <div className="relative">
              <button
                onClick={() =>
                  setShowItemsPerPageDropdown(!showItemsPerPageDropdown)
                }
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {itemsPerPage} per page
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              {showItemsPerPageDropdown && (
                <div className="absolute bottom-full mb-1 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    {[5, 10, 25, 50, 100].map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setItemsPerPage(size);
                          setShowItemsPerPageDropdown(false);
                          // Reset to first page
                          setAppointmentsPage(1);
                          setContactsPage(1);
                          setJobApplicationsPage(1);
                        }}
                        className={`${
                          itemsPerPage === size
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-gray-900"
                        } block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {getPageNumbers().map((page, index) => (
                <span key={index}>
                  {page === "..." ? (
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                  ) : (
                    <button
                      onClick={() => setPage(page as number)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </span>
              ))}

              <button
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  // Get advanced stats
  const getAdvancedStats = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayAppointments = appointments.filter(
      (app: any) =>
        format(new Date(app.date), "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
    ).length;

    const yesterdayAppointments = appointments.filter(
      (app: any) =>
        format(new Date(app.date), "yyyy-MM-dd") ===
        format(yesterday, "yyyy-MM-dd")
    ).length;

    const thisWeekContacts = contacts.filter((contact: any) => {
      const contactDate = new Date(contact.createdAt);
      return isWithinInterval(contactDate, {
        start: startOfWeek(today),
        end: endOfWeek(today),
      });
    }).length;

    const lastWeekContacts = contacts.filter((contact: any) => {
      const contactDate = new Date(contact.createdAt);
      const lastWeekStart = startOfWeek(
        new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      );
      const lastWeekEnd = endOfWeek(
        new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      );
      return isWithinInterval(contactDate, {
        start: lastWeekStart,
        end: lastWeekEnd,
      });
    }).length;

    const thisWeekTestContacts = testContacts.filter((contact: any) => {
      const contactDate = new Date(contact.createdAt);
      return isWithinInterval(contactDate, {
        start: startOfWeek(today),
        end: endOfWeek(today),
      });
    }).length;

    const lastWeekTestContacts = testContacts.filter((contact: any) => {
      const contactDate = new Date(contact.createdAt);
      const lastWeekStart = startOfWeek(
        new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      );
      const lastWeekEnd = endOfWeek(
        new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      );
      return isWithinInterval(contactDate, {
        start: lastWeekStart,
        end: lastWeekEnd,
      });
    }).length;

    const thisMonthApplications = jobApplications.filter((app: any) => {
      const appDate = new Date(app.createdAt);
      return (
        appDate.getMonth() === today.getMonth() &&
        appDate.getFullYear() === today.getFullYear()
      );
    }).length;

    const lastMonthApplications = jobApplications.filter((app: any) => {
      const appDate = new Date(app.createdAt);
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      return (
        appDate.getMonth() === lastMonth.getMonth() &&
        appDate.getFullYear() === lastMonth.getFullYear()
      );
    }).length;

    return {
      todayAppointments,
      yesterdayAppointments,
      appointmentsTrend: todayAppointments - yesterdayAppointments,
      thisWeekContacts,
      lastWeekContacts,
      contactsTrend: thisWeekContacts - lastWeekContacts,
      thisWeekTestContacts,
      lastWeekTestContacts,
      testContactsTrend: thisWeekTestContacts - lastWeekTestContacts,
      thisMonthApplications,
      lastMonthApplications,
      applicationsTrend: thisMonthApplications - lastMonthApplications,
    };
  };

  const stats = getAdvancedStats();

  const handleDelete = async (id: string, type: string) => {
    setItemToDelete({ id, type });
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      const { id, type } = itemToDelete;
      const endpoint = `/api/admin/${type}/${id}`;
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (response.ok) {
        // Update the state based on what was deleted
        if (type === "appointments") {
          setAppointments(appointments.filter((item: any) => item._id !== id));
        } else if (type === "contacts") {
          setContacts(contacts.filter((item: any) => item._id !== id));
        } else if (type === "job-applications") {
          setJobApplications(
            jobApplications.filter((item: any) => item._id !== id)
          );
        }

        setDeleteStatus({
          success: true,
          message: `${type.slice(0, -1)} deleted successfully`,
        });
      } else {
        const errorData = await response.json();
        setDeleteStatus({
          success: false,
          message: errorData.message || `Failed to delete ${type.slice(0, -1)}`,
        });
      }
    } catch (error) {
      console.error(`Error deleting ${itemToDelete.type}:`, error);
      setDeleteStatus({
        success: false,
        message: `An error occurred while deleting`,
      });
    } finally {
      setShowDeleteConfirmation(false);
      setItemToDelete(null);

      // Clear the status message after 3 seconds
      setTimeout(() => {
        setDeleteStatus(null);
      }, 3000);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  const toggleActionMenu = (id: string) => {
    if (actionMenuOpen === id) {
      setActionMenuOpen(null);
    } else {
      setActionMenuOpen(id);
    }
  };

  // Sidebar navigation items
  const navigationItems = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      count: null,
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      count: appointments.length,
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: Mail,
      count: contacts.length,
    },
    {
      id: "jobApplications",
      label: "Job Applications",
      icon: Briefcase,
      count: jobApplications.length,
    },
    {
      id: "blogAdminAccess",
      label: "Blog Dashboard",
      icon: CalendarClock,
      count: 0,
    },
    {
      id: "testContacts",
      label: "Test Contacts",
      icon: Mail,
      count: testContacts.length,
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div
              className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0"
              style={{ clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)" }}
            ></div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Loading Dashboard
            </h3>
            <p className="text-gray-600">Fetching your data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={fetchData}
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </button>
              <button
                onClick={() => router.push("/admin")}
                className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar fixed inset-y-0 left-0 z-50 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full w-64"
            : sidebarCollapsed
            ? "translate-x-0 w-16"
            : "translate-x-0 w-64"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-14 px-3 border-b border-gray-200">
          <div
            className={`flex items-center ${
              sidebarCollapsed && !isMobile
                ? "justify-center w-full"
                : "space-x-3"
            }`}
          >
            {(!sidebarCollapsed || isMobile) && (
              <Image
                src="/logo.png"
                width={100}
                height={32}
                alt="novanectar"
                className="flex-shrink-0"
              />
            )}
            {sidebarCollapsed && !isMobile && (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-4 w-4 text-gray-600" />
            </button>
          )}
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 px-3 py-4 space-y-1">
          <div
            className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 ${
              sidebarCollapsed && !isMobile ? "text-center" : ""
            }`}
          >
            {!sidebarCollapsed || isMobile ? "Dashboard" : "•••"}
          </div>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                } ${
                  sidebarCollapsed && !isMobile
                    ? "justify-center"
                    : "justify-start"
                }`}
                title={sidebarCollapsed && !isMobile ? item.label : ""}
              >
                <Icon
                  className={`h-5 w-5 flex-shrink-0 ${
                    isActive
                      ? "text-blue-700"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {(!sidebarCollapsed || isMobile) && (
                  <>
                    <span className="ml-3 truncate">{item.label}</span>
                    {item.count !== null && (
                      <span
                        className={`ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isActive
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 p-3">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-3 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors ${
              sidebarCollapsed && !isMobile ? "justify-center" : "justify-start"
            }`}
            title={sidebarCollapsed && !isMobile ? "Logout" : ""}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {(!sidebarCollapsed || isMobile) && (
              <span className="ml-3">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Message Dialog */}
        {showMessageDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600">
                <h3 className="text-lg font-semibold text-white">
                  Message Details
                </h3>
                <button
                  onClick={closeMessageDialog}
                  className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="px-6 py-4 max-h-96 overflow-y-auto">
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage}
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex justify-end rounded-b-xl">
                <button
                  onClick={closeMessageDialog}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PDF Viewer Dialog */}
        {showPdfViewer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600">
                <h3 className="text-lg font-semibold text-white">
                  Resume Viewer
                </h3>
                <div className="flex items-center space-x-2">
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/20"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <button
                    onClick={closePdfViewer}
                    className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="h-full">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full"
                  title="Resume Viewer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600">
                <h3 className="text-lg font-semibold text-white">
                  Confirm Deletion
                </h3>
                <button
                  onClick={cancelDelete}
                  className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/20"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="px-6 py-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      Are you sure?
                    </h4>
                    <p className="text-sm text-gray-500">
                      This action cannot be undone. This will permanently delete
                      this {itemToDelete?.type.slice(0, -1)}.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-xl">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Status Notification */}
        {deleteStatus && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3 animate-in slide-in-from-top duration-300 ${
              deleteStatus.success
                ? "bg-green-100 border-l-4 border-green-500"
                : "bg-red-100 border-l-4 border-red-500"
            }`}
          >
            {deleteStatus.success ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <XIcon className="h-5 w-5 text-red-500" />
            )}
            <p
              className={`text-sm font-medium ${
                deleteStatus.success ? "text-green-800" : "text-red-800"
              }`}
            >
              {deleteStatus.message}
            </p>
          </div>
        )}

        {/* Top Navigation Bar */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-md px-4 shadow-sm">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>

          <div className="h-6 w-px bg-gray-300 mx-2 md:block hidden" />

          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="capitalize font-medium text-gray-900">
              {activeTab === "jobApplications" ? "Job Applications" : activeTab}
            </span>
          </nav>

          <div className="ml-auto flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{format(new Date(), "MMM dd, yyyy • HH:mm")}</span>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Dashboard Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">
              Comprehensive business management and analytics
            </p>
          </div>

          {/* Advanced Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
            {/* Appointments Card */}
            <div
              className={`bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 ${
                animateStats ? "animate-pulse" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 lg:p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <Calendar className="h-5 w-5 lg:h-6 lg:w-6" />
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-gray-500">
                      Today&apos;s Appointments
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xl lg:text-2xl font-bold text-gray-900">
                        {stats.todayAppointments}
                      </p>
                      <div
                        className={`flex items-center text-xs px-2 py-1 rounded-full ${
                          stats.appointmentsTrend >= 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {stats.appointmentsTrend >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(stats.appointmentsTrend)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">vs yesterday</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-100">
                <p className="text-xs lg:text-sm text-gray-600">
                  Total: {appointments.length} appointments
                </p>
              </div>
            </div>

            {/* Contacts Card */}
            <div
              className={`bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-green-100 hover:shadow-xl transition-all duration-300 ${
                animateStats ? "animate-pulse" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 lg:p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                    <Mail className="h-5 w-5 lg:h-6 lg:w-6" />
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-gray-500">
                      This Week&apos;s Contacts
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xl lg:text-2xl font-bold text-gray-900">
                        {stats.thisWeekContacts}
                      </p>
                      <div
                        className={`flex items-center text-xs px-2 py-1 rounded-full ${
                          stats.contactsTrend >= 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {stats.contactsTrend >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(stats.contactsTrend)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">vs last week</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-100">
                <p className="text-xs lg:text-sm text-gray-600">
                  Total: {contacts.length} messages
                </p>
              </div>
            </div>

            {/* Job Applications Card */}
            <div
              className={`bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-purple-100 hover:shadow-xl transition-all duration-300 ${
                animateStats ? "animate-pulse" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 lg:p-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                    <Briefcase className="h-5 w-5 lg:h-6 lg:w-6" />
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-gray-500">
                      This Month&apos;s Applications
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xl lg:text-2xl font-bold text-gray-900">
                        {stats.thisMonthApplications}
                      </p>
                      <div
                        className={`flex items-center text-xs px-2 py-1 rounded-full ${
                          stats.applicationsTrend >= 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {stats.applicationsTrend >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(stats.applicationsTrend)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">vs last month</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-100">
                <p className="text-xs lg:text-sm text-gray-600">
                  Total: {jobApplications.length} applications
                </p>
              </div>
            </div>

            {/* Total Interactions Card */}
            <div
              className={`bg-white rounded-xl shadow-lg p-4 lg:p-6 border border-orange-100 hover:shadow-xl transition-all duration-300 ${
                animateStats ? "animate-pulse" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 lg:p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white">
                    <Activity className="h-5 w-5 lg:h-6 lg:w-6" />
                  </div>
                  <div>
                    <p className="text-xs lg:text-sm font-medium text-gray-500">
                      Total Interactions
                    </p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">
                      {appointments.length +
                        contacts.length +
                        jobApplications.length}
                    </p>
                    <p className="text-xs text-gray-500">All time</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Apps: {appointments.length}</span>
                  <span>Msgs: {contacts.length}</span>
                  <span>Jobs: {jobApplications.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Filter Section */}
          {activeTab !== "overview" && (
            <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
              <div className="p-4 lg:p-6 bg-gray-50 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex flex-1 items-center space-x-4">
                    <div className="relative flex-1 max-w-md">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search by name, email, or other fields..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-700"
                      />
                    </div>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`inline-flex items-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                        showFilters
                          ? "bg-blue-50 border-blue-300 text-blue-700"
                          : ""
                      }`}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Advanced </span>Filters
                      <ChevronDown
                        className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${
                          showFilters ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700 hidden sm:block">
                        Sort by:
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="block w-24 sm:w-32 pl-3 pr-10 py-2 text-gray-700 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                      >
                        <option value="date">Date</option>
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                    <button
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {sortOrder === "asc" ? (
                        <TrendingUp className="text-black h-4 w-4" />
                      ) : (
                        <TrendingDown className="text-black h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                  <div className="mt-6 pt-6 border-t border-gray-200 animate-in slide-in-from-top duration-200 text-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quick Date Filter
                        </label>
                        <select
                          value={quickDateFilter}
                          onChange={(e) => setQuickDateFilter(e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                        >
                          <option value="all">All Time</option>
                          <option value="today">Today</option>
                          <option value="week">This Week</option>
                          <option value="month">This Month</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={dateRange.start}
                          onChange={(e) =>
                            setDateRange({
                              ...dateRange,
                              start: e.target.value,
                            })
                          }
                          className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={dateRange.end}
                          onChange={(e) =>
                            setDateRange({ ...dateRange, end: e.target.value })
                          }
                          className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => {
                            setFilter("");
                            setDateFilter("");
                            setDateRange({ start: "", end: "" });
                            setQuickDateFilter("all");
                            setSortBy("date");
                            setSortOrder("desc");
                          }}
                          className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Clear All
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content Sections */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-600" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[...appointments.slice(0, 3), ...contacts.slice(0, 2)]
                    .sort(
                      (a, b) =>
                        new Date(b.date || b.createdAt).getTime() -
                        new Date(a.date || a.createdAt).getTime()
                    )
                    .slice(0, 5)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div
                          className={`p-2 rounded-full ${
                            "date" in item
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {"date" in item ? (
                            <Calendar className="h-4 w-4" />
                          ) : (
                            <Mail className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {"date" in item ? "Appointment" : "Contact"} •{" "}
                            {format(
                              new Date(item.date || item.createdAt),
                              "MMM dd, HH:mm"
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-purple-600" />
                  Quick Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Appointments
                      </span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">
                      {appointments.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Messages
                      </span>
                    </div>
                    <span className="text-lg font-bold text-green-600">
                      {contacts.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">
                        Applications
                      </span>
                    </div>
                    <span className="text-lg font-bold text-purple-600">
                      {jobApplications.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Tables */}
          {activeTab !== "overview" && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Appointments Tab */}
              {activeTab === "appointments" && (
                <div>
                  <div className="px-4 lg:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Appointments Management
                      </h2>
                      <p className="text-sm text-gray-600">
                        Manage and track all appointment bookings
                      </p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Client Details
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact Info
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedAppointments.length > 0 ? (
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          paginatedAppointments.map((appointment, index) => (
                            <tr
                              key={appointment._id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-blue-100 rounded-lg">
                                    <Calendar className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {format(
                                        new Date(appointment.date),
                                        "MMM dd, yyyy"
                                      )}
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {appointment.customTime}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-xs lg:text-sm">
                                    {appointment.name
                                      .split(" ")
                                      .map((n: any) => n[0])
                                      .join("")
                                      .toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {appointment.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {appointment.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-900">
                                    {appointment.phone}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="relative">
                                  <button
                                    onClick={() =>
                                      toggleActionMenu(appointment._id)
                                    }
                                    className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </button>
                                  {actionMenuOpen === appointment._id && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                      <div
                                        className="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                      >
                                        <button
                                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                          onClick={() =>
                                            handleDelete(
                                              appointment._id,
                                              "appointments"
                                            )
                                          }
                                        >
                                          <Trash2 className="mr-3 h-4 w-4 text-red-500" />
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="px-4 lg:px-6 py-12 text-center"
                            >
                              <div className="flex flex-col items-center space-y-3">
                                <Calendar className="h-12 w-12 text-gray-300" />
                                <p className="text-gray-500 font-medium">
                                  No appointments found
                                </p>
                                <p className="text-gray-400 text-sm">
                                  Try adjusting your search or filter criteria
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <AdvancedPaginationControls
                    totalItems={filteredAppointments.length}
                    currentPage={appointmentsPage}
                    setPage={setAppointmentsPage}
                    dataType="appointments"
                  />
                </div>
              )}

              {/* Contacts Tab */}
              {activeTab === "contacts" && (
                <div>
                  <div className="px-4 lg:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Contact Messages
                      </h2>
                      <p className="text-sm text-gray-600">
                        View and manage customer inquiries and messages
                      </p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact Details
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Message
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedContacts.length > 0 ? (
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          paginatedContacts.map((contact, index) => (
                            <tr
                              key={contact._id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <div className="p-2 bg-green-100 rounded-lg">
                                    <Mail className="h-4 w-4 text-green-600" />
                                  </div>
                                  <span className="text-sm text-gray-900">
                                    {format(
                                      new Date(contact.createdAt),
                                      "MMM dd, yyyy"
                                    )}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-medium text-xs lg:text-sm">
                                    {contact.name
                                      .split(" ")
                                      .map((n: any) => n[0])
                                      .join("")
                                      .toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {contact.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {contact.email}
                                    </div>
                                    <div className="text-xs text-gray-400 flex items-center">
                                      <Phone className="h-3 w-3 mr-1" />
                                      {contact.contact}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {contact.subject}
                                </span>
                              </td>
                              <td className="px-4 lg:px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <p className="text-sm text-gray-900 max-w-xs truncate">
                                    {contact.message}
                                  </p>
                                  {contact.message.length > 50 && (
                                    <button
                                      onClick={() =>
                                        handleViewMessage(contact.message)
                                      }
                                      className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50 transition-colors"
                                      title="View full message"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="relative">
                                  <button
                                    onClick={() =>
                                      toggleActionMenu(contact._id)
                                    }
                                    className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50 transition-colors"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </button>
                                  {actionMenuOpen === contact._id && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                      <div
                                        className="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                      >
                                        <button
                                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                          onClick={() =>
                                            handleDelete(
                                              contact._id,
                                              "contacts"
                                            )
                                          }
                                        >
                                          <Trash2 className="mr-3 h-4 w-4 text-red-500" />
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className="px-4 lg:px-6 py-12 text-center"
                            >
                              <div className="flex flex-col items-center space-y-3">
                                <Mail className="h-12 w-12 text-gray-300" />
                                <p className="text-gray-500 font-medium">
                                  No contact messages found
                                </p>
                                <p className="text-gray-400 text-sm">
                                  Try adjusting your search or filter criteria
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <AdvancedPaginationControls
                    totalItems={filteredContacts.length}
                    currentPage={contactsPage}
                    setPage={setContactsPage}
                    dataType="contacts"
                  />
                </div>
              )}

              {/* Job Applications Tab */}
              {activeTab === "jobApplications" && (
                <div>
                  <div className="px-4 lg:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-50 to-indigo-50">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Job Applications
                      </h2>
                      <p className="text-sm text-gray-600">
                        Review and manage candidate applications
                      </p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Candidate
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Job Position
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resume
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedJobApplications.length > 0 ? (
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          paginatedJobApplications.map((application, index) => (
                            <tr
                              key={application._id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <div className="p-2 bg-purple-100 rounded-lg">
                                    <Briefcase className="h-4 w-4 text-purple-600" />
                                  </div>
                                  <span className="text-sm text-gray-900">
                                    {format(
                                      new Date(application.createdAt),
                                      "MMM dd, yyyy"
                                    )}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium text-xs lg:text-sm">
                                    {application.name
                                      .split(" ")
                                      .map((n: any) => n[0])
                                      .join("")
                                      .toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {application.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {application.email}
                                    </div>
                                    <div className="text-xs text-gray-400 flex items-center">
                                      <Phone className="h-3 w-3 mr-1" />
                                      {application.phone}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  <Briefcase className="h-3 w-3 mr-1" />
                                  {application.jobId}
                                </span>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() =>
                                    handleViewPdf(application.resume)
                                  }
                                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  <span className="hidden sm:inline">
                                    View{" "}
                                  </span>
                                  Resume
                                </button>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="relative flex items-center justify-end space-x-2">
                                  <a
                                    href={application.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:text-purple-900 p-2 rounded-full hover:bg-purple-50 transition-colors"
                                    title="Open in new tab"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                  <div className="relative">
                                    <button
                                      onClick={() =>
                                        toggleActionMenu(application._id)
                                      }
                                      className="text-purple-600 hover:text-purple-900 p-2 rounded-full hover:bg-purple-50 transition-colors"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                    {actionMenuOpen === application._id && (
                                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                        <div
                                          className="py-1"
                                          role="menu"
                                          aria-orientation="vertical"
                                        >
                                          <button
                                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() =>
                                              handleDelete(
                                                application._id,
                                                "job-applications"
                                              )
                                            }
                                          >
                                            <Trash2 className="mr-3 h-4 w-4 text-red-500" />
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className="px-4 lg:px-6 py-12 text-center"
                            >
                              <div className="flex flex-col items-center space-y-3">
                                <Briefcase className="h-12 w-12 text-gray-300" />
                                <p className="text-gray-500 font-medium">
                                  No job applications found
                                </p>
                                <p className="text-gray-400 text-sm">
                                  Try adjusting your search or filter criteria
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <AdvancedPaginationControls
                    totalItems={filteredJobApplications.length}
                    currentPage={jobApplicationsPage}
                    setPage={setJobApplicationsPage}
                    dataType="jobApplications"
                  />
                </div>
              )}
              {/* blog admin dashboard access */}
              {activeTab === "blogAdminAccess" && (
                <div>
                  <div className="px-4 lg:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-purple-50 to-indigo-50">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        blog admin access
                      </h2>
                      <div className="mt-12">
                        <Link
                          href="/blog-admin/active-users"
                          className="inline-block px-6 py-3 text-white font-semibold bg-blue-600 rounded-xl shadow hover:bg-blue-700 transition duration-300"
                        >
                          Active Access
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "testContacts" && (
                <div>
                  <div className="px-4 lg:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Test Contact Messages
                      </h2>
                      <p className="text-sm text-gray-600">
                        View and manage test customer inquiries and messages
                      </p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact Details
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Message
                          </th>
                          <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedTestContacts.length > 0 ? (
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          paginatedTestContacts.map((contact, index) => (
                            <tr
                              key={contact?._id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <div className="p-2 bg-green-100 rounded-lg">
                                    <Mail className="h-4 w-4 text-green-600" />
                                  </div>
                                  <span className="text-sm text-gray-900">
                                    {format(
                                      new Date(contact?.createdAt),
                                      "MMM dd, yyyy"
                                    )}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-medium text-xs lg:text-sm">
                                    {contact?.name
                                      .split(" ")
                                      .map((n: any) => n[0])
                                      .join("")
                                      .toUpperCase()}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {contact.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {contact.email}
                                    </div>
                                    <div className="text-xs text-gray-400 flex items-center">
                                      <Phone className="h-3 w-3 mr-1" />
                                      {contact?.contact}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {contact?.subject}
                                </span>
                              </td>
                              <td className="px-4 lg:px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <p className="text-sm text-gray-900 max-w-xs truncate">
                                    {contact?.message}
                                  </p>
                                  {contact?.message?.length > 50 && (
                                    <button
                                      onClick={() =>
                                        handleViewMessage(contact.message)
                                      }
                                      className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50 transition-colors"
                                      title="View full message"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="relative">
                                  <button
                                    onClick={() =>
                                      toggleActionMenu(contact?._id)
                                    }
                                    className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50 transition-colors"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </button>
                                  {actionMenuOpen === contact?._id && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                      <div
                                        className="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                      >
                                        <button
                                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                          onClick={() =>
                                            handleDelete(
                                              contact?._id,
                                              "contacts"
                                            )
                                          }
                                        >
                                          <Trash2 className="mr-3 h-4 w-4 text-red-500" />
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className="px-4 lg:px-6 py-12 text-center"
                            >
                              <div className="flex flex-col items-center space-y-3">
                                <Mail className="h-12 w-12 text-gray-300" />
                                <p className="text-gray-500 font-medium">
                                  No test contact messages found
                                </p>
                                <p className="text-gray-400 text-sm">
                                  Try adjusting your search or filter criteria
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <AdvancedPaginationControls
                    totalItems={filteredTestContacts.length}
                    currentPage={testContactsPage}
                    setPage={setTestContactsPage}
                    dataType="testContacts"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
