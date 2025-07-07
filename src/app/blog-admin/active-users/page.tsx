"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ActiveUsersPage = () => {
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [guestName, setGuestName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  // Fetch active users
  const fetchActiveUsers = async () => {
    const res = await fetch("/api/blog/active-guest-login");
    const data = await res.json();
    if (data.success) {
      setActiveUsers(data.activeUsers);
    }
  };

  useEffect(() => {
    fetchActiveUsers();
  }, []);

  // Generate guest login link
  const handleGenerateLink = async () => {
    if (!guestName) {
      alert("Please enter a guest name.");
      return;
    }
    const res = await fetch("/api/blog/generate-guest-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guestName }),
    });
    const data = await res.json();
    console.log("data: ", data)
    if (data.success) {
      setGeneratedLink(data.link);
    }
  };

  // Remove active user (force logout)
  const handleLogoutUser = async (username: string) => {
    const confirmLogout = confirm(
      `Are you sure you want to log out ${username}?`
    );
    if (!confirmLogout) return;

    const res = await fetch("/api/blog/remove-active-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    if (data.success) {
      alert(`Logged out ${username}`);
      fetchActiveUsers();
    } else {
      alert("Failed to log out user");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Active Blog Panel Users</h1>
      <Link href="/admin/dashboard" className="text-blue-500 mb-6 inline-block">
        ← Back to Dashboard
      </Link>

      {/* Guest link generator */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          Generate Guest Login Link
        </h2>
        <input
          type="text"
          placeholder="Enter guest name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="border p-2 mr-3 rounded text-gray-800"
        />
        <button
          onClick={handleGenerateLink}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Link
        </button>

        {generatedLink && (
          <div className="mt-4">
            <p className="font-medium">Generated Link:</p>
            <input
              type="text"
              readOnly
              value={generatedLink}
              className="border p-2 w-full mt-2 rounded text-gray-800"
            />
            <button
              onClick={() => navigator.clipboard.writeText(generatedLink)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>

      {/* Active Users List */}
      <h2 className="text-xl font-semibold mb-3">Currently Active Users</h2>
      {activeUsers.length === 0 ? (
        <p>No active users currently.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Session Type</th>
              <th className="border px-4 py-2">Login Time</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeUsers.map((user: any) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2 capitalize">
                  {user.sessionType}
                </td>
                <td className="border px-4 py-2">
                  {new Date(user.loginTime).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleLogoutUser(user.username)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Log Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActiveUsersPage;
