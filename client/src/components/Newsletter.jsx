import { useState } from "react";

// "Our Newsletter" call-to-action banner shown near the footer of every page.
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <div
      className="relative bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(15,34,71,0.82), rgba(15,34,71,0.9)), url('https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="container mx-auto px-4 md:px-8 py-14 text-center">
        <span className="eyebrow justify-center">Subscribe</span>
        <h2 className="section-title text-white">Our Newsletter</h2>
        <p className="text-white/70 mt-2 max-w-md mx-auto text-sm">
          Get the latest travel deals and destination guides straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="input input-bordered flex-1 rounded-full bg-white text-base-content"
          />
          <button type="submit" className="btn-brand">
            Subscribe
          </button>
        </form>
        {sent && <p className="text-secondary text-sm mt-2">Thanks for subscribing!</p>}
      </div>
    </div>
  );
}
