import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { PackagesAPI, BookingsAPI } from "../lib/api";
import { useAuth } from "../context/AuthContext";

// "Book A Tour Deals / Online Booking" split section, shown on Home and Package pages.
export default function BookingForm() {
  const { currentUser, profile } = useAuth();
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    destination: "",
    date: "",
    guests: 1,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    PackagesAPI.list()
      .then((data) => {
        setPackages(data);
        if (data.length) setForm((f) => ({ ...f, destination: f.destination || data[0]._id }));
      })
      .catch(() => setPackages([]));
  }, []);

  useEffect(() => {
    if (profile) {
      setForm((f) => ({ ...f, name: f.name || profile.name || "", email: f.email || profile.email || "" }));
    }
  }, [profile]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
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

    setSubmitting(true);
    try {
      await BookingsAPI.create({
        packageId: form.destination,
        name: form.name,
        email: form.email,
        date: form.date,
        guests: Number(form.guests),
      });
      Swal.fire({
        icon: "success",
        title: "Booking request received!",
        text: "We'll email you shortly to confirm the details.",
        confirmButtonText: "Great!",
      });
      setForm((f) => ({ ...f, date: "", guests: 1 }));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Booking failed",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="relative bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(15,34,71,0.85), rgba(15,34,71,0.92)), url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="container mx-auto px-4 md:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="text-white">
          <span className="eyebrow">Booking</span>
          <h2 className="section-title text-white">Online Booking</h2>
          <p className="text-white/70 mt-4 max-w-md">
            Tell us where you'd like to go and when. Our team will get back to you with a
            tailored itinerary and the best available rates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-box p-6 shadow-xl space-y-3">
          <h3 className="font-display font-semibold text-primary text-lg mb-1">Book A Tour Deals</h3>

          <div className="grid grid-cols-2 gap-3">
            <input
              required
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="input input-bordered w-full"
            />
            <input
              required
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <select
            required
            value={form.destination}
            onChange={(e) => update("destination", e.target.value)}
            className="select select-bordered w-full"
          >
            {packages.length === 0 && <option value="">Loading packages...</option>}
            {packages.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input
              required
              type="date"
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              className="input input-bordered w-full"
            />
            <input
              required
              type="number"
              min={1}
              placeholder="Guests"
              value={form.guests}
              onChange={(e) => update("guests", e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" disabled={submitting} className="btn-brand w-full">
            {submitting ? "Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
