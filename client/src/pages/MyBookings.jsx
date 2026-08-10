import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiCalendar, FiUsers, FiMapPin } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import { BookingsAPI } from "../lib/api";

const statusColor = {
  pending: "badge-warning",
  confirmed: "badge-success",
  cancelled: "badge-error",
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await BookingsAPI.mine();
      setBookings(data);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Couldn't load bookings", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCancel(id) {
    const result = await Swal.fire({
      icon: "warning",
      title: "Cancel this booking?",
      text: "This can't be undone.",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "Keep booking",
      confirmButtonColor: "#d33",
    });
    if (!result.isConfirmed) return;

    try {
      await BookingsAPI.cancelMine(id);
      Swal.fire({ icon: "success", title: "Booking cancelled", timer: 1400, showConfirmButton: false });
      load();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Cancel failed", text: err.response?.data?.message || err.message });
    }
  }

  return (
    <>
      <PageHeader title="My Bookings" subtitle="Track and manage your trip requests." />
      <section className="section-pad">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          {loading && <p className="text-center text-base-content/60">Loading...</p>}

          {!loading && bookings.length === 0 && (
            <p className="text-center text-base-content/60">
              You haven't booked any trips yet. Head over to Packages to get started!
            </p>
          )}

          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white border border-base-300 rounded-box p-5 flex flex-col md:flex-row md:items-center gap-4 justify-between shadow-sm"
              >
                <div>
                  <h3 className="font-display font-semibold text-primary text-lg flex items-center gap-2">
                    <FiMapPin className="text-secondary" /> {b.packageTitle}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-base-content/60">
                    <span className="flex items-center gap-1">
                      <FiCalendar /> {new Date(b.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiUsers /> {b.guests} guest(s)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`badge ${statusColor[b.status] || "badge-ghost"} capitalize`}>
                    {b.status}
                  </span>
                  {b.status !== "cancelled" && (
                    <button onClick={() => handleCancel(b._id)} className="btn btn-sm btn-outline btn-error">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
