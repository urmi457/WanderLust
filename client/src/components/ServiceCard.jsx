import { FiMap, FiCompass, FiHeadphones, FiTag } from "react-icons/fi";

const icons = {
  map: FiMap,
  route: FiCompass,
  headset: FiHeadphones,
  ticket: FiTag,
};

// Single row item used in the "Our Services" list (icon + title + description).
export default function ServiceCard({ service }) {
  const Icon = icons[service.icon] || FiMap;
  return (
    <div className="flex items-center gap-4 bg-base-100 border border-base-300 rounded-box p-4 hover:shadow-lg hover:border-secondary/40 transition">
      <div className="flex-1">
        <h3 className="font-display font-semibold text-primary">{service.title}</h3>
        <p className="text-sm text-base-content/60 mt-1">{service.desc || service.description}</p>
      </div>
      <div className="shrink-0 w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
        <Icon size={22} />
      </div>
    </div>
  );
}
