"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { useEffect, useState, useRef } from "react";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function Editor({ content, onChange }: EditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const youtubeInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-md max-w-full" },
      }),
      Youtube.configure({
        width: 720,
        height: 405,
        HTMLAttributes: { class: "rounded-md w-full aspect-video" },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[400px] p-4",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    if (showLinkInput && linkInputRef.current) linkInputRef.current.focus();
  }, [showLinkInput]);

  useEffect(() => {
    if (showYoutubeInput && youtubeInputRef.current) youtubeInputRef.current.focus();
  }, [showYoutubeInput]);

  function handleLinkButtonClick() {
    if (!editor) return;
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const existingUrl = editor.getAttributes("link").href ?? "";
    setLinkUrl(existingUrl);
    setShowLinkInput(true);
    setShowYoutubeInput(false);
  }

  function applyLink() {
    if (!editor) return;
    const url = linkUrl.trim();
    if (!url) {
      editor.chain().focus().unsetLink().run();
    } else {
      const href = url.startsWith("http") ? url : `https://${url}`;
      editor.chain().focus().setLink({ href }).run();
    }
    setShowLinkInput(false);
    setLinkUrl("");
  }

  function handleLinkKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") applyLink();
    if (e.key === "Escape") {
      setShowLinkInput(false);
      setLinkUrl("");
      editor?.commands.focus();
    }
  }

  function handleYoutubeButtonClick() {
    setShowYoutubeInput(true);
    setShowLinkInput(false);
  }

  function applyYoutube() {
    if (!editor) return;
    const url = youtubeUrl.trim();
    if (url) {
      editor.commands.setYoutubeVideo({ src: url });
    }
    setShowYoutubeInput(false);
    setYoutubeUrl("");
  }

  function handleYoutubeKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") applyYoutube();
    if (e.key === "Escape") {
      setShowYoutubeInput(false);
      setYoutubeUrl("");
      editor?.commands.focus();
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
      } else {
        alert("Image upload failed: " + (data.error ?? "Unknown error"));
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 flex gap-1 flex-wrap">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          label="B"
          className="font-bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          label="I"
          className="italic"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          label="<>"
        />
        <div className="w-px bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          label="H1"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          label="H2"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          label="H3"
        />
        <div className="w-px bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          label="• List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          label="1. List"
        />
        <div className="w-px bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          label="Code block"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          label="Quote"
        />
        <div className="w-px bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={handleLinkButtonClick}
          active={editor.isActive("link")}
          label="Link"
        />
        <ToolbarButton
          onClick={() => imageInputRef.current?.click()}
          active={false}
          label={uploading ? "Uploading…" : "Image"}
        />
        <ToolbarButton
          onClick={handleYoutubeButtonClick}
          active={showYoutubeInput}
          label="Video"
        />
      </div>

      {/* Hidden file input for image upload */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {showLinkInput && (
        <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 flex items-center gap-2">
          <input
            ref={linkInputRef}
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={handleLinkKeyDown}
            placeholder="https://example.com"
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="button" onClick={applyLink} className="px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-gray-700">
            Apply
          </button>
          <button type="button" onClick={() => { setShowLinkInput(false); setLinkUrl(""); editor.commands.focus(); }} className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
            Cancel
          </button>
        </div>
      )}

      {showYoutubeInput && (
        <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 flex items-center gap-2">
          <input
            ref={youtubeInputRef}
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            onKeyDown={handleYoutubeKeyDown}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="button" onClick={applyYoutube} className="px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-gray-700">
            Embed
          </button>
          <button type="button" onClick={() => { setShowYoutubeInput(false); setYoutubeUrl(""); editor.commands.focus(); }} className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
            Cancel
          </button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  label,
  className = "",
}: {
  onClick: () => void;
  active: boolean;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-1 text-sm rounded transition-colors ${className} ${
        active ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}
