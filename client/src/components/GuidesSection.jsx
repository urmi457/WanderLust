import useApiList from "../hooks/useApiList";
import { GuidesAPI } from "../lib/api";
import { guides as fallbackGuides } from "../data/guides";
import GuideCard from "./GuideCard";

// "Meet Our Guide" grid, reused on Home and About pages.
export default function GuidesSection() {
  const { data: guides, loading } = useApiList(GuidesAPI.list, fallbackGuides);

  return (
    <section className="section-pad bg-base-200">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <span className="eyebrow justify-center">Travel Guide</span>
          <h2 className="section-title">Meet Our Guide</h2>
        </div>

        {loading ? (
          <p className="text-center text-base-content/50">Loading guides...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {guides.map((g) => (
              <GuideCard key={g._id || g.id} guide={g} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
