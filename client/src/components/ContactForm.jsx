import { useState } from "react";
import Swal from "sweetalert2";
import { MessagesAPI } from "../lib/api";

// "Send us a message" form used on the Contact Us page.
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await MessagesAPI.send(form);
      Swal.fire({
        icon: "success",
        title: "Message sent!",
        text: "We'll reply to you soon.",
        timer: 2000,
        showConfirmButton: false,
      });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Couldn't send message",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-box shadow-xl p-6 space-y-3">
      <h3 className="font-display font-semibold text-primary text-lg mb-1">Send Us A Message</h3>

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

      <input
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
        className="input input-bordered w-full"
      />

      <textarea
        required
        placeholder="Your Message"
        rows={4}
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
        className="textarea textarea-bordered w-full"
      />

      <button type="submit" disabled={submitting} className="btn-brand w-full">
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
