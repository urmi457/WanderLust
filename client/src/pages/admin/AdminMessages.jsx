import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiTrash2 } from "react-icons/fi";
import { MessagesAPI } from "../../lib/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setMessages(await MessagesAPI.list());
    } catch (err) {
      Swal.fire({ icon: "error", title: "Couldn't load messages", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(m) {
    try {
      await MessagesAPI.update(m._id, { read: !m.read });
      load();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Update failed", text: err.message });
    }
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete this message?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    });
    if (!result.isConfirmed) return;
    try {
      await MessagesAPI.remove(id);
      Swal.fire({ icon: "success", title: "Deleted", timer: 1200, showConfirmButton: false });
      load();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Delete failed", text: err.message });
    }
  }

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-primary mb-4">Contact Messages</h2>

      {loading ? (
        <p className="text-base-content/50">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-base-content/50">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`bg-white border rounded-box p-4 ${m.read ? "border-base-300" : "border-secondary"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-primary">
                    {m.name} <span className="text-xs text-base-content/50 font-normal">({m.email})</span>
                  </p>
                  {m.phone && <p className="text-xs text-base-content/50">{m.phone}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => toggleRead(m)} className="btn btn-xs btn-outline">
                    Mark {m.read ? "Unread" : "Read"}
                  </button>
                  <button onClick={() => handleDelete(m._id)} className="btn btn-xs btn-outline btn-error gap-1">
                    <FiTrash2 size={12} /> Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-base-content/70 mt-2">{m.message}</p>
              <p className="text-xs text-base-content/40 mt-1">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
