import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import ImageUploadField from "../../components/ImageUploadField";

// A reusable Add / Edit / Delete table for a simple resource.
// `fields` describes the form: [{ name, label, type: 'text'|'number'|'textarea'|'tags', required }]
// `api` must expose { list, create, update, remove }.
export default function AdminEntity({ title, fields, api, columns }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = edit
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await api.list();
      setItems(data);
    } catch (err) {
      Swal.fire({ icon: "error", title: `Couldn't load ${title.toLowerCase()}`, text: err.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    const blank = {};
    fields.forEach((f) => (blank[f.name] = f.type === "tags" ? [] : ""));
    setEditing(blank);
  }

  function openEdit(item) {
    const copy = { ...item };
    fields.forEach((f) => {
      if (f.type === "tags" && !Array.isArray(copy[f.name])) copy[f.name] = [];
    });
    setEditing(copy);
  }

  function updateField(name, value) {
    setEditing((e) => ({ ...e, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...editing };
    fields.forEach((f) => {
      if (f.type === "number") payload[f.name] = Number(payload[f.name]);
      if (f.type === "tags" && typeof payload[f.name] === "string") {
        payload[f.name] = payload[f.name]
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }
    });

    try {
      if (editing._id) {
        await api.update(editing._id, payload);
        Swal.fire({ icon: "success", title: "Updated!", timer: 1300, showConfirmButton: false });
      } else {
        await api.create(payload);
        Swal.fire({ icon: "success", title: "Added!", timer: 1300, showConfirmButton: false });
      }
      setEditing(null);
      load();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Save failed",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    const result = await Swal.fire({
      icon: "warning",
      title: `Delete this ${title.toLowerCase().slice(0, -1)}?`,
      text: item.title || item.name || "This can't be undone.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    });
    if (!result.isConfirmed) return;

    try {
      await api.remove(item._id);
      Swal.fire({ icon: "success", title: "Deleted", timer: 1200, showConfirmButton: false });
      load();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete failed",
        text: err.response?.data?.message || err.message,
      });
    }
  }

  const displayCols = columns || fields.slice(0, 3).map((f) => ({ key: f.name, label: f.label }));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold text-primary">{title}</h2>
        <button onClick={openNew} className="btn-brand btn-sm gap-1">
          <FiPlus /> Add {title.slice(0, -1)}
        </button>
      </div>

      {loading ? (
        <p className="text-base-content/50">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-box border border-base-300">
          <table className="table">
            <thead>
              <tr>
                {displayCols.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={displayCols.length + 1} className="text-center text-base-content/50 py-6">
                    No {title.toLowerCase()} yet.
                  </td>
                </tr>
              )}
              {items.map((item) => (
                <tr key={item._id}>
                  {displayCols.map((c) => (
                    <td key={c.key} className="max-w-xs truncate">
                      {Array.isArray(item[c.key]) ? item[c.key].join(", ") : String(item[c.key] ?? "")}
                    </td>
                  ))}
                  <td className="text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => openEdit(item)} className="btn btn-xs btn-outline gap-1">
                      <FiEdit2 size={12} /> Edit
                    </button>
                    <button onClick={() => handleDelete(item)} className="btn btn-xs btn-outline btn-error gap-1">
                      <FiTrash2 size={12} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-box p-6 w-full max-w-lg space-y-3 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-semibold text-primary text-lg">
                {editing._id ? "Edit" : "Add"} {title.slice(0, -1)}
              </h3>
              <button type="button" onClick={() => setEditing(null)} className="btn btn-ghost btn-sm btn-circle">
                <FiX />
              </button>
            </div>

            {fields.map((f) => (
              <div key={f.name}>
                <label className="text-xs text-base-content/60">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    required={f.required}
                    rows={3}
                    value={editing[f.name] ?? ""}
                    onChange={(e) => updateField(f.name, e.target.value)}
                    className="textarea textarea-bordered w-full mt-1"
                  />
                ) : f.type === "tags" ? (
                  <input
                    placeholder="Comma separated"
                    value={Array.isArray(editing[f.name]) ? editing[f.name].join(", ") : editing[f.name] ?? ""}
                    onChange={(e) => updateField(f.name, e.target.value)}
                    className="input input-bordered w-full mt-1"
                  />
                ) : f.type === "image" ? (
                  <ImageUploadField
                    value={editing[f.name]}
                    onChange={(url) => updateField(f.name, url)}
                  />
                ) : (
                  <input
                    required={f.required}
                    type={f.type || "text"}
                    value={editing[f.name] ?? ""}
                    onChange={(e) => updateField(f.name, e.target.value)}
                    className="input input-bordered w-full mt-1"
                  />
                )}
              </div>
            ))}

            <button type="submit" disabled={saving} className="btn-brand w-full mt-2">
              {saving ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
