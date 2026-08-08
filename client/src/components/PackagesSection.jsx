import useApiList from "../hooks/useApiList";
import { PackagesAPI } from "../lib/api";
import { packages as fallbackPackages } from "../data/packages";
import PackageCard from "./PackageCard";

// "Our Popular & Latest Package" grid, reused on Home and Package pages.
export default function PackagesSection({ limit, title = "Our Popular & Latest Package" }) {
  const { data: packages, loading } = useApiList(PackagesAPI.list, fallbackPackages);
  const list = limit ? packages.slice(0, limit) : packages;

  return (
    <section className="section-pad">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <span className="eyebrow justify-center">Our Latest Package</span>
          <h2 className="section-title">{title}</h2>
        </div>

        {loading ? (
          <p className="text-center text-base-content/50">Loading packages...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p) => (
              <PackageCard key={p._id || p.id} pkg={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
