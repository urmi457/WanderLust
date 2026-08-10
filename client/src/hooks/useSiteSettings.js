import { useEffect, useState } from "react";
import { SettingsAPI } from "../lib/api";

export const defaultSettings = {
  siteName: "WanderLust",
  hero: {
    eyebrow: "Top Planning And Consultation",
    title: "Discover Breathtaking Destinations And Unforgettable Experiences",
    subtitle:
      "Plan your next adventure with WanderLust — curated packages, expert local guides and unforgettable memories, all in one place.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  },
  about: {
    eyebrow: "About Us",
    title: "Welcome to WanderLust",
    body: "WanderLust was founded to make exploring Bangladesh's hidden corners easy and accessible for everyone, with a team of local guides and planners dedicated to crafting trips that are safe, sustainable, and unforgettable from start to finish.",
  },
  contact: {
    address: "Zindabazar, Sylhet, Bangladesh",
    phone: "+880 1234-567890",
    email: "hello@wanderlust.com",
    mapEmbedUrl: "https://www.google.com/maps?q=Sylhet,Bangladesh&output=embed",
  },
  footer: {
    about:
      "Discover breathtaking destinations and unforgettable experiences with a travel partner you can trust.",
    facebook: "#",
    twitter: "#",
    instagram: "#",
  },
};

// Fetches the single site-settings document. Falls back to sensible
// defaults (matching the backend schema defaults) if the API isn't
// reachable yet, so pages never render blank/broken.
export default function useSiteSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    SettingsAPI.get()
      .then((data) => {
        if (active) setSettings(data);
      })
      .catch(() => {
        if (active) setSettings(defaultSettings);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { settings, loading };
}
