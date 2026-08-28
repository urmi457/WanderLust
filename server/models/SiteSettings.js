import mongoose from "mongoose";

// A single document holding every editable text/image block used across
// the public site (Hero, About intro, Contact info, Footer). The admin
// panel edits this one document instead of a list.
const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "WanderLust" },

    hero: {
      eyebrow: { type: String, default: "Top Planning And Consultation" },
      title: {
        type: String,
        default: "Discover Breathtaking Destinations And Unforgettable Experiences",
      },
      subtitle: {
        type: String,
        default:
          "Plan your next adventure with WanderLust — curated packages, expert local guides and unforgettable memories, all in one place.",
      },
      image: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
      },
    },

    about: {
      eyebrow: { type: String, default: "About Us" },
      title: { type: String, default: "Welcome to WanderLust" },
      body: {
        type: String,
        default:
          "WanderLust was founded to make exploring Bangladesh's hidden corners easy and accessible for everyone, with a team of local guides and planners dedicated to crafting trips that are safe, sustainable, and unforgettable from start to finish.",
      },
    },

    contact: {
      address: { type: String, default: "Zindabazar, Sylhet, Bangladesh" },
      phone: { type: String, default: "+880 1234-567890" },
      email: { type: String, default: "hello@wanderlust.com" },
      mapEmbedUrl: {
        type: String,
        default: "https://www.google.com/maps?q=Sylhet,Bangladesh&output=embed",
      },
    },

    footer: {
      about: {
        type: String,
        default:
          "Discover breathtaking destinations and unforgettable experiences with a travel partner you can trust.",
      },
      facebook: { type: String, default: "#" },
      twitter: { type: String, default: "#" },
      instagram: { type: String, default: "#" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("SiteSettings", siteSettingsSchema);
