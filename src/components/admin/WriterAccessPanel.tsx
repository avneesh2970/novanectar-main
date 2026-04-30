"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, ExternalLink, Loader2, RefreshCw, Shield, Trash2, UserCircle2 } from "lucide-react";

interface ActiveWriter {
  _id: string;
  username: string;
  loginTime: string;
  updatedAt: string;
  sessionType: "owner" | "guest";
}

export default function WriterAccessPanel() {
  const [writerName, setWriterName] = useState("");
  const [accessLink, setAccessLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeWriters, setActiveWriters] = useState<ActiveWriter[]>([]);

  const loadActiveWriters = async () => {
    try {
      setIsRefreshing(true);
      setError("");

      const response = await fetch("/api/blog/active-guest-login", {
        cache: "no-store",
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to load writer access");
      }

      setActiveWriters(
        (result.activeUsers as ActiveWriter[]).filter((user) => user.sessionType === "guest"),
      );
    } catch (loadError) {
      console.error(loadError);
      setError(loadError instanceof Error ? loadError.message : "Failed to load writer access");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    void loadActiveWriters();
  }, []);

  const handleGenerateAccess = async () => {
    const trimmedName = writerName.trim();

    if (!trimmedName) {
      setError("Writer name is required.");
      return;
    }

    try {
      setIsGenerating(true);
      setError("");
      setSuccessMessage("");
      setCopySuccess(false);

      const response = await fetch("/api/blog/generate-guest-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guestName: trimmedName }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to generate access link");
      }

      setAccessLink(result.link);
      setSuccessMessage(`Access link created for ${trimmedName}.`);
      setWriterName("");
      await loadActiveWriters();
    } catch (generateError) {
      console.error(generateError);
      setError(generateError instanceof Error ? generateError.message : "Failed to generate access link");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = async () => {
    if (!accessLink) {
      return;
    }

    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(accessLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch (copyError) {
      console.error(copyError);
      setError("Failed to copy the access link.");
    } finally {
      setIsCopying(false);
    }
  };

  const handleRevokeWriter = async (username: string) => {
    try {
      setError("");
      const response = await fetch("/api/blog/remove-active-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to revoke writer access");
      }

      setSuccessMessage(`Access revoked for ${username}.`);
      await loadActiveWriters();
    } catch (revokeError) {
      console.error(revokeError);
      setError(revokeError instanceof Error ? revokeError.message : "Failed to revoke writer access");
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Writer authorization</h2>
              <p className="mt-1 text-sm text-gray-600">
                Generate a secure sign-in link for a writer to access the content dashboard.
              </p>
            </div>
            <Shield className="h-8 w-8 text-purple-600" />
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="writerName" className="block text-sm font-medium text-gray-700">
                Writer name
              </label>
              <input
                id="writerName"
                type="text"
                value={writerName}
                onChange={(event) => setWriterName(event.target.value)}
                placeholder="Enter the writer name"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleGenerateAccess}
                disabled={isGenerating}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-purple-300"
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
                {isGenerating ? "Generating..." : "Generate Access"}
              </button>

              <Link
                href="/blog-admin/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <ExternalLink className="h-4 w-4" />
                Open Content Dashboard
              </Link>
            </div>

            {accessLink && (
              <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                <label className="block text-sm font-medium text-purple-900">Generated access link</label>
                <div className="mt-2 flex flex-col gap-3 md:flex-row">
                  <input
                    type="text"
                    value={accessLink}
                    readOnly
                    className="min-w-0 flex-1 rounded-xl border border-purple-200 bg-white px-4 py-3 text-sm text-gray-700 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    disabled={isCopying}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-3 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isCopying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Copy className="h-4 w-4" />}
                    {copySuccess ? "Copied" : "Copy Link"}
                  </button>
                </div>
              </div>
            )}

            {successMessage && <p className="text-sm font-medium text-green-600">{successMessage}</p>}
            {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Active writers</h2>
              <p className="mt-1 text-sm text-gray-600">Review active writer sessions and revoke access when needed.</p>
            </div>

            <button
              type="button"
              onClick={() => void loadActiveWriters()}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {activeWriters.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
                No writer sessions are active right now.
              </div>
            ) : (
              activeWriters.map((writer) => (
                <div
                  key={writer._id}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-purple-100 p-2 text-purple-700">
                      <UserCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{writer.username}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        Signed in: {new Date(writer.loginTime).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Last update: {new Date(writer.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => void handleRevokeWriter(writer.username)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Revoke
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
