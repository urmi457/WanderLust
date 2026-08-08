import useApiList from "../hooks/useApiList";
import { TestimonialsAPI } from "../lib/api";
import { testimonials as fallbackTestimonials } from "../data/testimonials";
import TestimonialCard from "./TestimonialCard";

// "Our Clients Say!!!" list, reused on Home and Services pages.
export default function TestimonialsSection() {
  const { data: testimonials, loading } = useApiList(TestimonialsAPI.list, fallbackTestimonials);

  return (
    <section className="section-pad bg-base-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <span className="eyebrow justify-center">Testimonial</span>
          <h2 className="section-title">Our Clients Say!!!</h2>
        </div>

        {loading ? (
          <p className="text-center text-base-content/50">Loading testimonials...</p>
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            {testimonials.map((t) => (
              <TestimonialCard key={t._id || t.id} testimonial={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
