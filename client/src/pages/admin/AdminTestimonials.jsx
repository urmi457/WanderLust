import AdminEntity from "./AdminEntity";
import { TestimonialsAPI } from "../../lib/api";

export default function AdminTestimonials() {
  return (
    <AdminEntity
      title="Testimonials"
      api={TestimonialsAPI}
      columns={[
        { key: "name", label: "Name" },
        { key: "rating", label: "Rating" },
      ]}
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "role", label: "Role" },
        { name: "image", label: "Image", type: "image", required: true },
        { name: "message", label: "Message", type: "textarea", required: true },
        { name: "rating", label: "Rating (1-5)", type: "number" },
      ]}
    />
  );
}
