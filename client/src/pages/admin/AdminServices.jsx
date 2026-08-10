import AdminEntity from "./AdminEntity";
import { ServicesAPI } from "../../lib/api";

export default function AdminServices() {
  return (
    <AdminEntity
      title="Services"
      api={ServicesAPI}
      columns={[
        { key: "title", label: "Title" },
        { key: "icon", label: "Icon" },
      ]}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "icon", label: "Icon (map / route / headset / ticket)" },
      ]}
    />
  );
}
