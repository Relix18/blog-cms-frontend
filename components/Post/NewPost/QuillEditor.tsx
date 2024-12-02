import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function Editor({ value, onChange }: EditorProps) {
  const quillRef = useRef<HTMLDivElement>(null);
  const [quill, setQuill] = useState<Quill | null>(null);

  useEffect(() => {
    // Initialize Quill only once
    if (quillRef.current && !quill) {
      const quillInstance = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ font: [] }, { size: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
      });

      setQuill(quillInstance);

      // Set initial content
      quillInstance.root.innerHTML = value;

      // Listen for changes in Quill content and update form state
      quillInstance.on("text-change", () => {
        onChange(quillInstance.root.innerHTML);
      });
    }
  }, [quill, value, onChange]); // Run once on mount and when value changes

  return <div ref={quillRef} style={{ height: "300px" }} />;
}
