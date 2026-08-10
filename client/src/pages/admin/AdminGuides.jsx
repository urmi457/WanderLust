import AdminEntity from "./AdminEntity";
import { GuidesAPI } from "../../lib/api";

export default function AdminGuides() {
  return (
    <AdminEntity
      title="Guides"
      api={GuidesAPI}
      columns={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
      ]}
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "role", label: "Role", required: true },
        { name: "image", label: "Image", type: "image", required: true },
        { name: "bio", label: "Bio", type: "textarea" },
      ]}
    />
  );
}
