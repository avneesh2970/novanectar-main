"use client";

import type React from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Save, ImageIcon, X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import BlogEditor from "@/components/blogs/blog-editor";
import Image from "next/image";

export default function EditBlogPost({ params }: any) {
  // Unwrap params using React.use with proper typing
  const unwrappedParams = params instanceof Promise ? use(params) : params;
  const id = unwrappedParams.id;

  const router = useRouter();
  const [postId, setPostId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(""); // Added author state
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set the post ID from unwrapped params
  useEffect(() => {
    if (id) {
      setPostId(id);
    }
  }, [id]);

  // Then use the ID to fetch the post
  useEffect(() => {
    // const isLoggedIn = sessionStorage.getItem("blogLoggedIn");
    // if (!isLoggedIn) {
    //   router.push("/blog-admin");
    //   return;
    // }

    if (postId) {
      fetchPost();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, postId]);

  const fetchPost = async () => {
    if (!postId) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/blog/posts/${postId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }

      const post = await response.json();

      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setAuthor(post.author || ""); // Set author from post data
      setCategories(post.categories || []);
      setMetaTitle(post.metaTitle || "");
      setMetaDescription(post.metaDescription || "");

      if (post.featuredImage) {
        setCurrentImage(post.featuredImage);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      toast.error("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size exceeds 5MB limit");
        return;
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed."
        );
        return;
      }

      setFeaturedImage(file);
      setCurrentImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFeaturedImage(null);
    setCurrentImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setCategories(
      categories.filter((category) => category !== categoryToRemove)
    );
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
      );
      formData.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
      );

      // Create a custom XMLHttpRequest to track upload progress
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round(
              (event.loaded / event.total) * 100
            );
            setUploadProgress(percentComplete);
          }
        });

        xhr.onload = () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            setIsUploading(false);
            resolve(response.secure_url);
          } else {
            setIsUploading(false);
            reject(new Error("Upload failed"));
          }
        };

        xhr.onerror = () => {
          setIsUploading(false);
          reject(new Error("Upload failed"));
        };

        xhr.open(
          "POST",
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
        );
        xhr.send(formData);
      });
    } catch (error) {
      setIsUploading(false);
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postId) {
      toast.error("Post ID is missing");
      return;
    }

    if (!title.trim() || !content.trim() || !excerpt.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate author field
    if (!author.trim()) {
      toast.error("Please enter an author name");
      return;
    }

    setSaving(true);

    try {
      let imageUrl = currentImage;

      // Upload new image if selected
      if (featuredImage) {
        try {
          // Try Cloudinary upload first
          if (
            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
          ) {
            imageUrl = await uploadImageToCloudinary(featuredImage);
          } else {
            // Fall back to server upload if Cloudinary credentials are missing
            const formData = new FormData();
            formData.append("image", featuredImage);

            const uploadResponse = await fetch("/api/blog/upload", {
              method: "POST",
              body: formData,
            });

            if (!uploadResponse.ok) {
              throw new Error("Failed to upload image");
            }

            const uploadData = await uploadResponse.json();
            imageUrl = uploadData.imageUrl;
          }
        } catch (error) {
          console.error("Image upload error:", error);
          toast.error("Failed to upload image. Please try again.");
          setSaving(false);
          return;
        }
      }

      // Update blog post
      const postData = {
        title,
        slug,
        excerpt,
        content,
        author, // Include author in post data
        categories,
        featuredImage: imageUrl,
        metaTitle, // Add this
  metaDescription, // Add this
      };

      const response = await fetch(`/api/blog/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update post");
      }

      toast.success("Blog post updated successfully");
      router.push("/blog-admin/dashboard");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update post"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link
              href="/blog-admin/dashboard"
              className="text-purple-600 hover:text-purple-800 mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Edit Blog Post</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {previewMode ? (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Post Preview
              </h2>
              <button
                type="button"
                onClick={() => setPreviewMode(false)}
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-purple-100 text-purple-700"
              >
                <X className="h-4 w-4" />
                <span>Close Preview</span>
              </button>
            </div>

            <div className="border-b border-gray-200 pb-6 mb-6">
              {currentImage && (
                <div className="relative w-full h-64 mb-6">
                  <Image
                    src={currentImage || "/placeholder.svg"}
                    alt="Preview"
                    fill
                    className="object-contain bg-gray-50 rounded-lg"
                  />
                </div>
              )}

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {title || "Post Title"}
              </h1>
              <p className="text-gray-600 mb-4">
                {excerpt || "Post excerpt will appear here..."}
              </p>

              {/* Display author in preview */}
              {author && (
                <p className="text-sm text-gray-500 mb-4">By {author}</p>
              )}

              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className="text-sm px-3 py-1 bg-purple-100 text-purple-800 rounded-full"
                  >
                    {category}
                  </span>
                ))}
                {categories.length === 0 && (
                  <span className="text-sm text-gray-400">
                    No categories added
                  </span>
                )}
              </div>
            </div>

            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Featured Image */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Featured Image
              </h2>

              {currentImage ? (
                <div className="relative">
                  <Image
                    src={currentImage || "/placeholder.svg"}
                    alt="Preview"
                    width={500}
                    height={300}
                    className="w-full h-80 object-contain bg-gray-50 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-red-500 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
                >
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 mb-1">Click to upload an image</p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, WebP or GIF (max. 5MB)
                  </p>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
              />

              {isUploading && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Uploading: {uploadProgress}%
                  </p>
                </div>
              )}
            </div>

            {/* Post Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Post Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                    required
                  />
                </div>

                {/* Author field */}
                <div>
                  <label
                    htmlFor="author"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Author <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    URL-friendly version of the title (e.g., my-blog-post)
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="excerpt"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Excerpt <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                    required
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    A brief summary of the post (displayed in blog listings)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full"
                      >
                        <span className="text-sm">{category}</span>
                        <button
                          type="button"
                          onClick={() => removeCategory(category)}
                          className="ml-1 text-purple-600 hover:text-purple-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Add a category"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCategory();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={addCategory}
                      className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Content <span className="text-red-500">*</span>
              </h2>
              <BlogEditor content={content} onChange={setContent} />
            </div>

            {/* Submit Button - Removed the Preview button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving || isUploading}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-400"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Update Post</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
