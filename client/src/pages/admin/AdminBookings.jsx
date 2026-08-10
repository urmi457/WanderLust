import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiTrash2 } from "react-icons/fi";
import { BookingsAPI } from "../../lib/api";

const statuses = ["pending", "confirmed", "cancelled"];

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setBookings(await BookingsAPI.all());
    } catch (err) {
      Swal.fire({ icon: "error", title: "Couldn't load bookings", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleStatusChange(id, status) {
    try {
      await BookingsAPI.updateStatus(id, status);
      Swal.fire({ icon: "success", title: "Status updated", timer: 1200, showConfirmButton: false });
      load();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Update failed", text: err.response?.data?.message || err.message });
    }
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete this booking?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    });
    if (!result.isConfirmed) return;
    try {
      await BookingsAPI.remove(id);
      Swal.fire({ icon: "success", title: "Deleted", timer: 1200, showConfirmButton: false });
      load();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Delete failed", text: err.response?.data?.message || err.message });
    }
  }

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-primary mb-4">Bookings</h2>

      {loading ? (
        <p className="text-base-content/50">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-box border border-base-300">
          <table className="table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Guest</th>
                <th>Date</th>
                <th>Guests</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-base-content/50 py-6">
                    No bookings yet.
                  </td>
                </tr>
              )}
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.packageTitle}</td>
                  <td>
                    {b.name}
                    <div className="text-xs text-base-content/50">{b.email}</div>
                  </td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                  <td>{b.guests}</td>
                  <td>
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b._id, e.target.value)}
                      className="select select-bordered select-xs capitalize"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="text-right">
                    <button onClick={() => handleDelete(b._id)} className="btn btn-xs btn-outline btn-error gap-1">
                      <FiTrash2 size={12} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
