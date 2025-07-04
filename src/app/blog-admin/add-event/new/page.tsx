"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Save, ImageIcon, X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function AddEvent() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState(""); // added
  const [venue, setVenue] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");
      formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "");

      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url);
        } else {
          reject(new Error("Upload failed"));
        }
      };
      xhr.onerror = () => reject(new Error("Upload failed"));
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`);
      xhr.send(formData);
    });
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("blogLoggedIn");
    if (!isLoggedIn) {
      router.push("/blog-admin");
    }
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size exceeds 5MB limit");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !eventDate.trim() || !eventTime.trim() || !venue.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setSaving(true);

    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
      }

      const eventData = {
        title,
        description,
        eventDate,
        eventTime,
        venue,
        featuredImage: imageUrl,
      };

      const response = await fetch("/api/event/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error("Failed to create event");

      toast.success("Event created successfully");
      router.push("/blog-admin/add-event");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create event");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-800">
      <header className="border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link href="/blog-admin/add-event" className="text-purple-600 hover:text-purple-800 mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Add New Event</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
            {imagePreview ? (
              <div className="relative">
                <Image src={imagePreview} alt="Event Image" width={500} height={256} className="w-full h-64 object-cover rounded-lg" />
                <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-red-500">
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 mb-1">Click to upload</p>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          </div>

          {/* Event Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Time</label>
            <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
            <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="w-full px-3 py-2 border rounded" />
          </div>

          {/* Content */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={5} className="w-full px-3 py-2 border rounded" />
          </div> */}

          {/* Submit */}
          <div className="flex justify-end">
            <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-purple-400">
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Add Event</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
