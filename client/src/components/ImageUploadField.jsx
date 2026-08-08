import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { FiUpload, FiImage } from "react-icons/fi";
import { UploadAPI } from "../lib/api";

// Drop-in field for any "image URL" input across the admin panel.
// Lets the admin either upload a file (goes to imgbb via our backend,
// and the returned URL is what actually gets saved to MongoDB) or
// paste a URL directly. Always shows a live preview.
export default function ImageUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await UploadAPI.upload(file);
      onChange(result.url);
      Swal.fire({ icon: "success", title: "Image uploaded!", timer: 1200, showConfirmButton: false });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Image upload failed",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      {label && <label className="text-xs text-base-content/60">{label}</label>}

      <div className="flex items-center gap-3 mt-1">
        <div className="w-16 h-16 rounded-box overflow-hidden border border-base-300 bg-base-200 flex items-center justify-center shrink-0">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <FiImage className="text-base-content/30" size={22} />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            type="text"
            placeholder="Image URL (or upload a file below)"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="input input-bordered input-sm w-full"
          />

          <label className="btn btn-sm btn-outline gap-2 w-fit cursor-pointer">
            <FiUpload size={14} />
            {uploading ? "Uploading..." : "Upload Image"}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
