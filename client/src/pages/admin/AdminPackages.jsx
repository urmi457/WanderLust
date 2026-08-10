import AdminEntity from "./AdminEntity";
import { PackagesAPI } from "../../lib/api";

export default function AdminPackages() {
  return (
    <AdminEntity
      title="Packages"
      api={PackagesAPI}
      columns={[
        { key: "title", label: "Title" },
        { key: "location", label: "Location" },
        { key: "price", label: "Price" },
        { key: "days", label: "Days" },
      ]}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "location", label: "Location", required: true },
        { name: "price", label: "Price ($)", type: "number", required: true },
        { name: "days", label: "Days", type: "number", required: true },
        { name: "image", label: "Image", type: "image", required: true },
        { name: "short", label: "Short description", type: "textarea", required: true },
        { name: "description", label: "Full description", type: "textarea", required: true },
        { name: "tags", label: "Tags", type: "tags" },
      ]}
    />
  );
}
