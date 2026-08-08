import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "./Navbar";
import useSiteSettings from "../hooks/useSiteSettings";

// Full-bleed hero banner on the Home page: "Discover Breathtaking Destinations..."
export default function Hero() {
  const { settings } = useSiteSettings();
  const { hero } = settings;

  return (
    <div
      id="top"
      className="relative min-h-[85vh] bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `linear-gradient(100deg, rgba(15,34,71,0.75) 30%, rgba(15,34,71,0.15) 70%), url('${hero.image}')`,
      }}
    >
      <Navbar transparent />
      <div className="container mx-auto px-4 md:px-8 flex-1 flex items-center">
        <div className="max-w-xl py-24">
          <span className="eyebrow bg-white/10 px-3 py-1 rounded-full">{hero.eyebrow}</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 leading-tight">
            {hero.title}
          </h1>
          <p className="text-white/80 mt-4">{hero.subtitle}</p>
          <Link to="/packages" className="btn-brand mt-8">
            Explore Now <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
