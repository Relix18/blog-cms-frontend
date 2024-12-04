import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const formats = [
  "background",
  "bold",
  "color",
  "font",
  "code",
  "italic",
  "link",
  "size",
  "strike",
  "script",
  "underline",
  "blockquote",
  "header",
  "indent",
  "list",
  "align",
  "direction",
  "code-block",
  "formula",
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
              image: () => handleImageUpload(quillInstance), // Custom handler for image upload
            },
          },
        },
        formats,
      });

      // Set initial content
      quillInstance.clipboard.dangerouslyPasteHTML(value || "");

      quillInstance.on("text-change", () => {
        onChange(quillInstance.root.innerHTML);
      });
      setQuill(quillInstance);
    }
  }, [quill, value, onChange]);

  const handleImageUpload = async (quillInstance: Quill) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "blog-post-images"); // Replace with your preset name

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dkjnrcbib/image/upload", // Replace with your Cloudinary URL
          formData
        );

        const imageUrl = response.data.secure_url;

        // Insert the uploaded image into the editor
        const range = quillInstance.getSelection();
        quillInstance.insertEmbed(range?.index || 0, "image", imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
  };

  return (
    <div ref={quillRef} style={{ height: "500px", border: "1px solid #ccc" }} />
  );
}
