import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const formats = [
  "bold",
  "color",
  "font",
  "italic",
  "link",
  "size",
  "strike",
  "underline",
  "header",
  "indent",
  "list",
  "align",
  "direction",
  "code-block",
  "image",
];

export default function Editor({ value, onChange }: EditorProps) {
  const quillRef = useRef<HTMLDivElement>(null);
  const [quill, setQuill] = useState<Quill | null>(null);

  useEffect(() => {
    if (quill && value !== quill.root.innerHTML) {
      quill.clipboard.dangerouslyPasteHTML(value || "");
    }
  }, [value, quill]);

  useEffect(() => {
    if (quillRef.current && !quill) {
      const quillInstance = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ font: [] }, { size: [] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
            handlers: {
              image: () => handleImageUpload(quillInstance),
            },
          },
          clipboard: true,
        },
        formats,
      });

      quillInstance.clipboard.dangerouslyPasteHTML(value || "");

      quillInstance.on("text-change", () => {
        onChange(quillInstance.root.innerHTML);
      });

      setQuill(quillInstance);
    }
  }, [quill, value, onChange]);

  const handleImageUpload = async (quillInstance: Quill) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        alert("Only JPG, PNG, and GIF files are allowed.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "blog-post-images");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dkjnrcbib/image/upload",
          formData
        );

        const imageUrl = response.data.secure_url;

        const range = quillInstance.getSelection();
        if (range) {
          quillInstance.insertEmbed(range.index, "image", imageUrl);
        } else {
          quillInstance.insertEmbed(0, "image", imageUrl);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Image upload failed. Please try again.");
      }
    };
  };

  return (
    <div ref={quillRef} style={{ height: "500px", border: "1px solid #ccc" }} />
  );
}
