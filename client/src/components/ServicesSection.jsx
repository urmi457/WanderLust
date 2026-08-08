import useApiList from "../hooks/useApiList";
import { ServicesAPI } from "../lib/api";
import { services as fallbackServices } from "../data/services";
import ServiceCard from "./ServiceCard";

// "Our Services" grid, reused on Home and Services pages.
export default function ServicesSection({ bg = "bg-base-200" }) {
  const { data: services, loading } = useApiList(ServicesAPI.list, fallbackServices);

  return (
    <section className={`section-pad ${bg}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <span className="eyebrow justify-center">Services</span>
          <h2 className="section-title">Our Services</h2>
        </div>

        {loading ? (
          <p className="text-center text-base-content/50">Loading services...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {services.map((s) => (
              <ServiceCard key={s._id || s.id} service={s} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
