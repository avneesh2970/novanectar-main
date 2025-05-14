"use client"

import { useState, useEffect, useCallback } from "react"
import { useEditor, EditorContent, Extension } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"
import { Color } from "@tiptap/extension-color"
import TextStyle from "@tiptap/extension-text-style"
import { Node } from "@tiptap/core"
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Edit,
  Code,
  Quote,
} from "lucide-react"

// Custom extension to preserve hard breaks
const HardBreakPreserve = Extension.create({
  name: "hardBreakPreserve",
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        if (this.editor.isActive("codeBlock")) {
          return false
        }

        this.editor.commands.first(({ commands }) => [
          () => commands.newlineInCode(),
          () => commands.createParagraphNear(),
          () => commands.liftEmptyBlock(),
          () => commands.splitBlock(),
        ])

        return true
      },
    }
  },
})

// Custom paragraph node that preserves empty paragraphs
const CustomParagraph = Node.create({
  name: "paragraph",
  priority: 1000,
  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [{ tag: "p" }]
  },
  renderHTML({ HTMLAttributes }) {
    return ["p", HTMLAttributes, 0]
  },
})

interface BlogEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function BlogEditor({ content, onChange }: BlogEditorProps) {
  const [previewMode, setPreviewMode] = useState(false)
  const [htmlContent, setHtmlContent] = useState(content || "")
  const [linkUrl, setLinkUrl] = useState("")
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [imageAltText, setImageAltText] = useState("") // Add state for image alt text
  const [showImageModal, setShowImageModal] = useState(false) // Add state for image modal
  const [imageFile, setImageFile] = useState<File | null>(null) // Add state for image file

  // Initialize the editor with proper HTML content
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false, // Disable default paragraph to use our custom one
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-gray-300 pl-4 py-2 my-4",
          },
        },
      }),
      CustomParagraph, // Use our custom paragraph node
      HardBreakPreserve, // Add our custom extension to preserve hard breaks
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 no-underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full rounded-lg my-4",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
    ],
    content: content || "<p></p>", // Ensure there's at least an empty paragraph
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setHtmlContent(html)
      onChange(html)
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none p-4 text-gray-700 overflow-y-auto",
      },
    },
  })

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "<p></p>")
      setHtmlContent(content || "")
    }
  }, [content, editor])

  // Handle image selection
  const handleImageSelect = useCallback(() => {
    if (!editor) return

    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0]

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          alert("Image size exceeds 5MB limit")
          return
        }

        setImageFile(file)
        setShowImageModal(true)
      }
    }
  }, [editor])

  // Handle image upload with alt text
  const uploadImage = useCallback(async () => {
    if (!editor || !imageFile) return

    try {
      // Create FormData for upload
      const formData = new FormData()
      formData.append("file", imageFile)
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "")
      formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "")

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        },
      )

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()

      // Insert image into editor with alt text
      editor
        .chain()
        .focus()
        .setImage({
          src: data.secure_url,
          alt: imageAltText || imageFile.name, // Use alt text or fallback to filename
        })
        .run()

      // Reset state
      setShowImageModal(false)
      setImageAltText("")
      setImageFile(null)
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image. Please try again.")
    }
  }, [editor, imageFile, imageAltText])

  // Handle link insertion
  const openLinkModal = useCallback(() => {
    if (!editor) return

    // Get the current selection
    const { from, to } = editor.state.selection

    // Check if there's text selected
    if (from === to) {
      alert("Please select some text first to create a link")
      return
    }

    // Check if there's already a link at the current selection
    const previousUrl = editor.getAttributes("link").href || ""
    setLinkUrl(previousUrl)
    setShowLinkModal(true)
  }, [editor])

  const applyLink = useCallback(() => {
    if (!editor) return

    // If URL is empty, remove the link
    if (!linkUrl.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
    } else {
      // Ensure URL has http:// or https:// prefix
      let formattedUrl = linkUrl.trim()
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = "https://" + formattedUrl
      }

      // Apply the link
      editor.chain().focus().extendMarkRange("link").setLink({ href: formattedUrl }).run()
    }

    // Close the modal
    setShowLinkModal(false)
    setLinkUrl("")
  }, [editor, linkUrl])

  // Ensure editor is focused before applying formatting
  const focusEditor = useCallback(() => {
    if (editor && !editor.isFocused) {
      editor.commands.focus()
    }
  }, [editor])

  // Apply heading styles
  const toggleHeading = useCallback(
    (level: 1 | 2 | 3) => {
      if (!editor) return

      focusEditor()
      editor.chain().focus().toggleHeading({ level }).run()
    },
    [editor, focusEditor],
  )

  // Toggle bullet list
  const toggleBulletList = useCallback(() => {
    if (!editor) return

    focusEditor()
    editor.chain().focus().toggleBulletList().run()
  }, [editor, focusEditor])

  // Toggle ordered list
  const toggleOrderedList = useCallback(() => {
    if (!editor) return

    focusEditor()
    editor.chain().focus().toggleOrderedList().run()
  }, [editor, focusEditor])

  // Toggle blockquote
  const toggleBlockquote = useCallback(() => {
    if (!editor) return

    focusEditor()
    editor.chain().focus().toggleBlockquote().run()
  }, [editor, focusEditor])

  if (!editor) {
    return <div className="h-[500px] w-full bg-gray-100 animate-pulse rounded-md" />
  }

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden h-[500px] flex flex-col">
      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-medium mb-4 text-gray-800">Insert Link</h3>
            <div className="mb-4">
              <label htmlFor="link-url" className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="link-url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      applyLink()
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={applyLink}
                  className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-medium mb-4 text-gray-800">Insert Image</h3>
            <div className="mb-4">
              <label htmlFor="image-alt" className="block text-sm font-medium text-gray-700 mb-1">
                Alt Text <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="image-alt"
                value={imageAltText}
                onChange={(e) => setImageAltText(e.target.value)}
                placeholder="Describe the image for accessibility and SEO"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                autoFocus
              />
              <p className="mt-1 text-xs text-gray-500">
                A clear description of the image content for screen readers and search engines
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowImageModal(false)
                  setImageFile(null)
                  setImageAltText("")
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={uploadImage}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium"
              >
                Upload & Insert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar - Fixed at the top of the editor container */}
      <div className="flex-shrink-0 text-gray-900 bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1 justify-between">
        {!previewMode && (
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => toggleHeading(1)}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""}`}
              title="Heading 1"
            >
              <Heading1 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleHeading(2)}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}`}
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => toggleHeading(3)}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""}`}
              title="Heading 3"
            >
              <Heading3 className="h-4 w-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button
              type="button"
              onClick={() => {
                focusEditor()
                editor.chain().focus().toggleBold().run()
              }}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                focusEditor()
                editor.chain().focus().toggleItalic().run()
              }}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                focusEditor()
                editor.chain().focus().toggleUnderline().run()
              }}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("underline") ? "bg-gray-200" : ""}`}
              title="Underline"
            >
              <UnderlineIcon className="h-4 w-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button
              type="button"
              onClick={toggleBulletList}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("bulletList") ? "bg-gray-200" : ""}`}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={toggleOrderedList}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("orderedList") ? "bg-gray-200" : ""}`}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button
              type="button"
              onClick={openLinkModal}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("link") ? "bg-gray-200" : ""}`}
              title="Insert Link"
            >
              <LinkIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                focusEditor()
                handleImageSelect()
              }}
              className="p-2 rounded hover:bg-gray-200"
              title="Insert Image"
            >
              <ImageIcon className="h-4 w-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button
              type="button"
              onClick={() => {
                focusEditor()
                editor.chain().focus().setTextAlign("left").run()
              }}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""}`}
              title="Align Left"
            >
              <AlignLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                focusEditor()
                editor.chain().focus().setTextAlign("center").run()
              }}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""}`}
              title="Align Center"
            >
              <AlignCenter className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                focusEditor()
                editor.chain().focus().setTextAlign("right").run()
              }}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""}`}
              title="Align Right"
            >
              <AlignRight className="h-4 w-4" />
            </button>
            <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block"></div>
            <button
              type="button"
              onClick={() => {
                focusEditor()
                editor.chain().focus().toggleCodeBlock().run()
              }}
              className={`p-2 rounded hover:bg-gray-200 hidden sm:flex ${editor.isActive("codeBlock") ? "bg-gray-200" : ""}`}
              title="Code Block"
            >
              <Code className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={toggleBlockquote}
              className={`p-2 rounded hover:bg-gray-200 hidden sm:flex ${editor.isActive("blockquote") ? "bg-gray-200" : ""}`}
              title="Quote"
            >
              <Quote className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded ${
              previewMode ? "bg-purple-100 text-purple-700" : "hover:bg-gray-200"
            }`}
            title={previewMode ? "Edit Mode" : "Preview Mode"}
          >
            {previewMode ? (
              <>
                <Edit className="h-4 w-4" />
                <span className="text-sm">Edit</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span className="text-sm">Preview</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content area with scrolling */}
      {previewMode ? (
        <div className="flex-grow overflow-y-auto p-4 bg-white">
          {/* This exactly matches the structure in blog-post-content.tsx */}
          <div className="blog-content prose max-w-none">
            <div
              className="[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-4 [&>h1]:text-gray-800 
                         [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-gray-800
                         [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-gray-800
                         [&>p]:my-4 [&>p]:text-gray-600 [&>p]:leading-relaxed
                         [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:my-4 [&>ul]:text-gray-700
                         [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:my-4 [&>ol]:text-gray-700
                         [&>li]:mb-2 [&>li]:text-gray-700 [&>li>p]:my-1
                         [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:py-2 [&>blockquote]:my-4 [&>blockquote]:italic [&>blockquote]:text-gray-600
                         [&>img]:max-w-full [&>img]:rounded-lg [&>img]:my-4"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto bg-white" onClick={focusEditor}>
          <EditorContent
            editor={editor}
            className="h-full prose prose-headings:mt-4 prose-headings:mb-2 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-ul:pl-5 prose-ol:pl-5 prose-a:text-blue-600 prose-a:no-underline prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:my-4 whitespace-pre-wrap preserve-empty-paragraphs"
          />
        </div>
      )}
    </div>
  )
}
