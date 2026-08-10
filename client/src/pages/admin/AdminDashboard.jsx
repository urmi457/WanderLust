import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import AdminPackages from "./AdminPackages";
import AdminBookings from "./AdminBookings";
import AdminBlogs from "./AdminBlogs";
import AdminGuides from "./AdminGuides";
import AdminServices from "./AdminServices";
import AdminTestimonials from "./AdminTestimonials";
import AdminMessages from "./AdminMessages";
import AdminTeam from "./AdminTeam";
import AdminSettings from "./AdminSettings";

const tabs = [
  { key: "settings", label: "Site Settings", Component: AdminSettings },
  { key: "packages", label: "Packages", Component: AdminPackages },
  { key: "bookings", label: "Bookings", Component: AdminBookings },
  { key: "team", label: "Team", Component: AdminTeam },
  { key: "guides", label: "Guides", Component: AdminGuides },
  { key: "blogs", label: "Blogs", Component: AdminBlogs },
  { key: "services", label: "Services", Component: AdminServices },
  { key: "testimonials", label: "Testimonials", Component: AdminTestimonials },
  { key: "messages", label: "Messages", Component: AdminMessages },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("settings");
  const ActiveComponent = tabs.find((t) => t.key === active)?.Component;

  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Manage packages, bookings and site content." />

      <section className="section-pad">
        <div className="container mx-auto px-4 md:px-8">
          <div className="tabs tabs-boxed mb-8 bg-base-200 w-fit flex-wrap">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`tab ${active === t.key ? "tab-active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {ActiveComponent && <ActiveComponent />}
        </div>
      </section>
    </>
  );
}
