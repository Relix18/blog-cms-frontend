import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

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
  // 'image'
  // 'video'
];

export default function Editor({ value, onChange }: EditorProps) {
  const quillRef = useRef<HTMLDivElement>(null);
  const [quill, setQuill] = useState<Quill | null>(null);

  useEffect(() => {
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
        formats: formats,
      });

      setQuill(quillInstance);

      quillInstance.root.innerHTML = value;

      quillInstance.on("text-change", () => {
        onChange(quillInstance.root.innerHTML);
      });
    }
  }, [quill, value, onChange]);

  return <div ref={quillRef} style={{ height: "500px" }} />;
}
