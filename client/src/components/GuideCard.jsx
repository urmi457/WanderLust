// Single guide profile used in the "Meet Our Guide" grid.
export default function GuideCard({ guide }) {
  return (
    <div className="text-center group">
      <div className="w-full aspect-square rounded-box overflow-hidden mb-3 border border-base-300">
        <img
          src={guide.image}
          alt={guide.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>
      <h4 className="font-semibold text-primary">{guide.name}</h4>
      <p className="text-xs text-base-content/50">{guide.role}</p>
    </div>
  );
}
