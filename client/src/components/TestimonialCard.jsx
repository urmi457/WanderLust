import { FiStar } from "react-icons/fi";

// Single testimonial row used in the "Our Clients Say" section.
export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-base-200 rounded-box p-5 flex items-center gap-4">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-14 h-14 rounded-full object-cover shrink-0"
      />
      <div>
        <p className="text-sm text-base-content/70 italic">
          &ldquo;{testimonial.quote || testimonial.message}&rdquo;
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-primary text-sm">{testimonial.name}</span>
          <span className="flex text-warning">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <FiStar key={i} size={12} fill="currentColor" />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
