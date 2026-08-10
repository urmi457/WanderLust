import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FiMapPin, FiClock, FiDollarSign, FiSearch } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import Newsletter from "../components/Newsletter";
import { PackagesAPI, BookingsAPI } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { packages as fallbackPackages } from "../data/packages";

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, profile } = useAuth();

  const [pkg, setPkg] = useState(null);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({ date: "", guests: 1 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([PackagesAPI.get(id), PackagesAPI.list()])
      .then(([one, list]) => {
        setPkg(one);
        setAll(list);
      })
      .catch(() => {
        const fb = fallbackPackages.find((p) => p.id === id) || fallbackPackages[0];
        setPkg(fb);
        setAll(fallbackPackages);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleBook(e) {
    e.preventDefault();
    if (!currentUser) {
      const result = await Swal.fire({
        icon: "info",
        title: "Please login first",
        text: "You need an account to book a tour.",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
      });
      if (result.isConfirmed) navigate("/login");
      return;
    }
    if (!pkg?._id) {
      Swal.fire({ icon: "error", title: "This demo package can't be booked", text: "It isn't saved in the database yet." });
      return;
    }

    setSubmitting(true);
    try {
      await BookingsAPI.create({
        packageId: pkg._id,
        name: profile?.name,
        email: profile?.email,
        date: booking.date,
        guests: Number(booking.guests),
      });
      Swal.fire({
        icon: "success",
        title: "Booking request received!",
        text: `We'll be in touch about your trip to ${pkg.title}.`,
      });
      setBooking({ date: "", guests: 1 });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Booking failed", text: err.response?.data?.message || err.message });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !pkg) {
    return (
      <>
        <PageHeader title="Loading..." />
        <section className="section-pad text-center text-base-content/50">Loading package...</section>
      </>
    );
  }

  const recent = all.filter((p) => (p._id || p.id) !== (pkg._id || pkg.id)).slice(0, 3);

  return (
    <>
      <PageHeader title={pkg.title} subtitle={pkg.location} />

      <section className="section-pad">
        <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-80 object-cover rounded-box mb-6"
            />
            <h2 className="font-display text-2xl font-bold text-primary mb-3">{pkg.title}</h2>
            <p className="text-base-content/70 leading-relaxed">{pkg.description}</p>

            <div className="flex flex-wrap gap-4 mt-6">
              <span className="badge badge-lg gap-1 bg-secondary/10 text-secondary border-none">
                <FiMapPin size={12} /> {pkg.location}
              </span>
              <span className="badge badge-lg gap-1 bg-secondary/10 text-secondary border-none">
                <FiClock size={12} /> {pkg.days} Days
              </span>
              <span className="badge badge-lg gap-1 bg-secondary/10 text-secondary border-none">
                <FiDollarSign size={12} /> ${pkg.price} / person
              </span>
            </div>

            <form
              onSubmit={handleBook}
              className="mt-8 bg-base-200 rounded-box p-6 grid sm:grid-cols-3 gap-3 items-end"
            >
              <div className="sm:col-span-1">
                <label className="text-xs text-base-content/60">Travel date</label>
                <input
                  required
                  type="date"
                  value={booking.date}
                  onChange={(e) => setBooking((b) => ({ ...b, date: e.target.value }))}
                  className="input input-bordered w-full mt-1"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-xs text-base-content/60">Guests</label>
                <input
                  required
                  type="number"
                  min={1}
                  value={booking.guests}
                  onChange={(e) => setBooking((b) => ({ ...b, guests: e.target.value }))}
                  className="input input-bordered w-full mt-1"
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-brand sm:col-span-1 w-full">
                {submitting ? "Booking..." : "Book This Package"}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <FiSearch className="text-base-content/40" />
                <input type="text" placeholder="Search packages" className="grow" />
              </label>
            </div>

            <div>
              <h4 className="font-display font-semibold text-primary mb-3">Details</h4>
              <ul className="text-sm text-base-content/60 space-y-2">
                <li className="flex justify-between"><span>Destination</span><span className="font-medium text-base-content">{pkg.location}</span></li>
                <li className="flex justify-between"><span>Duration</span><span className="font-medium text-base-content">{pkg.days} Days</span></li>
                <li className="flex justify-between"><span>Price</span><span className="font-medium text-base-content">${pkg.price}</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-primary mb-3">Recent Package</h4>
              <div className="space-y-3">
                {recent.map((r) => (
                  <Link
                    key={r._id || r.id}
                    to={`/packages/${r.slug || r.id}`}
                    className="flex gap-3 items-center group"
                  >
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-14 h-14 rounded-box object-cover shrink-0"
                    />
                    <div>
                      <p className="text-sm font-medium text-primary group-hover:text-secondary">
                        {r.title}
                      </p>
                      <p className="text-xs text-base-content/50">${r.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display font-semibold text-primary mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {(pkg.tags && pkg.tags.length ? pkg.tags : ["Adventure", "Hills", "Nature", "Family", "Trekking"]).map((tag) => (
                  <span key={tag} className="badge badge-outline border-base-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
