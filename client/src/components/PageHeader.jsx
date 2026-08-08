import Navbar from "./Navbar";

// Reused on every inner page: a mountain-backdrop banner with the page title,
// e.g. "About Us", "Our Services", "Packages", "Contact Us".
export default function PageHeader({ title, subtitle }) {
  return (
    <div
      className="relative bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(15,34,71,0.75), rgba(15,34,71,0.85)), url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <Navbar transparent />
      <div className="container mx-auto px-4 md:px-8 py-24 md:py-32 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-white/80 mt-3 max-w-xl mx-auto">{subtitle}</p>}
      </div>
    </div>
  );
}
