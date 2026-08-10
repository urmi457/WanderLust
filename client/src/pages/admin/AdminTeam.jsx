import AdminEntity from "./AdminEntity";
import { TeamAPI } from "../../lib/api";

export default function AdminTeam() {
  return (
    <AdminEntity
      title="Team"
      api={TeamAPI}
      columns={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
      ]}
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "role", label: "Role (e.g. Chairman, CEO)", required: true },
        { name: "image", label: "Image", type: "image", required: true },
        { name: "bio", label: "Bio", type: "textarea" },
      ]}
    />
  );
}
