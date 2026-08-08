import useSiteSettings from "../hooks/useSiteSettings";
import useApiList from "../hooks/useApiList";
import { TeamAPI } from "../lib/api";

const fallbackTeam = [
  {
    name: "Rahim Uddin",
    role: "Chairman of WanderLust",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    bio: "With over 15 years in the travel industry, Rahim built WanderLust to make exploring Bangladesh's hidden corners easy and accessible for everyone.",
  },
  {
    name: "Nusrat Jahan",
    role: "CEO, WanderLust",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Nusrat leads a team of local guides and planners dedicated to crafting trips that are safe, sustainable, and unforgettable from start to finish.",
  },
];

// "Welcome To WanderLust" preview section shown on the Home page,
// introducing the team with photos, mirrored from the About page.
export default function AboutPreview() {
  const { settings } = useSiteSettings();
  const { data: team, loading } = useApiList(TeamAPI.list, fallbackTeam);

  return (
    <section className="section-pad container mx-auto px-4 md:px-8">
      <div className="text-center mb-10">
        <span className="eyebrow justify-center">{settings.about.eyebrow}</span>
        <h2 className="section-title">{settings.about.title}</h2>
        <p className="text-base-content/60 max-w-2xl mx-auto mt-3 text-sm">{settings.about.body}</p>
      </div>

      {!loading && (
        <div className="grid md:grid-cols-2 gap-10">
          {team.map((member) => (
            <div key={member._id || member.name} className="flex gap-5 items-start">
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 rounded-box object-cover shrink-0"
              />
              <div>
                <h3 className="font-display font-semibold text-primary">{member.name}</h3>
                <p className="text-xs text-secondary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-base-content/60">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
