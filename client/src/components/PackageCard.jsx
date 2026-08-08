import { Link } from "react-router-dom";
import { FiMapPin, FiClock } from "react-icons/fi";

// Reusable card for a tour package, used on Home, Package and Packages pages.
export default function PackageCard({ pkg }) {
  const linkId = pkg.slug || pkg.id || pkg._id;
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition overflow-hidden border border-base-300">
      <figure className="h-48 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </figure>
      <div className="card-body p-5">
        <div className="flex items-center gap-1 text-xs text-base-content/50">
          <FiMapPin size={12} /> {pkg.location}
        </div>
        <h3 className="card-title text-primary font-display text-lg">{pkg.title}</h3>
        <p className="text-sm text-base-content/60 line-clamp-2">{pkg.short}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="flex items-center gap-1 text-xs text-base-content/50">
            <FiClock size={12} /> {pkg.days} Days
          </span>
          <span className="font-display font-bold text-secondary">${pkg.price}</span>
        </div>

        <Link to={`/packages/${linkId}`} className="btn-brand btn-sm mt-4 w-fit">
          Read More
        </Link>
      </div>
    </div>
  );
}
