import AdminEntity from "./AdminEntity";
import { BlogsAPI } from "../../lib/api";

export default function AdminBlogs() {
  return (
    <AdminEntity
      title="Blogs"
      api={BlogsAPI}
      columns={[
        { key: "title", label: "Title" },
        { key: "date", label: "Date" },
        { key: "author", label: "Author" },
      ]}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "image", label: "Image", type: "image", required: true },
        { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
        { name: "content", label: "Full content", type: "textarea" },
        { name: "author", label: "Author" },
        { name: "date", label: "Date (e.g. 12 Jan 2026)" },
      ]}
    />
  );
}
