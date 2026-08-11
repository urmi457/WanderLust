// Seeds MongoDB with the site's original demo content so the app has
// something to show right after setup. Safe to re-run: it clears each
// collection before inserting.
import mongoose from "mongoose";
import dotenv from "dotenv";

import Package from "../models/Package.js";
import Blog from "../models/Blog.js";
import Guide from "../models/Guide.js";
import Service from "../models/Service.js";
import Testimonial from "../models/Testimonial.js";
import Team from "../models/Team.js";
import SiteSettings from "../models/SiteSettings.js";

dotenv.config();

const packages = [
  {
    slug: "sylhet-tea-garden",
    title: "Sylhet Tea Garden",
    location: "Sylhet, Bangladesh",
    price: 120,
    days: 3,
    image:
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=800&q=80",
    short:
      "Rolling green tea estates, misty hills and calm mornings in the tea capital of Bangladesh.",
    description:
      "Sylhet Tea Garden is a lush paradise of endless emerald rows climbing over gentle hills. Wander between the bushes at sunrise, meet local tea pickers, and enjoy a freshly brewed cup at a hillside stall while the mist rolls through the valley.",
    tags: ["Nature", "Relaxing"],
  },
  {
    slug: "sajek-valley",
    title: "Sajek Valley",
    location: "Rangamati, Bangladesh",
    price: 150,
    days: 4,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
    short:
      "Known as the 'Queen of Hills', famous for its sea of clouds and panoramic sunrise views.",
    description:
      "Sajek Valley sits on top of the hills of the Chittagong Hill Tracts, often called the Queen of Hills. Wake up above the clouds, watch the sunrise paint the valley gold, and spend the evening around a bonfire under a sky full of stars.",
    tags: ["Adventure", "Hills"],
  },
  {
    slug: "panghuma-waterfall",
    title: "Panghuma Waterfall",
    location: "Bandarban, Bangladesh",
    price: 135,
    days: 3,
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    short: "A hidden cascade tucked deep in the hills, reachable only by a scenic jungle trek.",
    description:
      "Panghuma Waterfall rewards adventurous travellers with a multi-tier cascade hidden inside dense forest. The trek in is half the fun, crossing streams and climbing rocky trails before the falls come into view.",
    tags: ["Trekking", "Nature"],
  },
  {
    slug: "tanguar-haor",
    title: "Tanguar Haor",
    location: "Sunamganj, Bangladesh",
    price: 110,
    days: 2,
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
    short: "A vast wetland ecosystem, best explored by boat at sunrise among migratory birds.",
    description:
      "Tanguar Haor is one of the largest freshwater wetlands in Bangladesh. Glide across the still water by boat as the sun rises, spotting migratory birds and stopping at floating villages along the way.",
    tags: ["Wildlife", "Boat"],
  },
];

const blogs = [
  {
    title: "Tanguar Haor",
    excerpt: "A quiet morning on the water, surrounded by birds and floating villages.",
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
    date: "12 Jan 2026",
  },
  {
    title: "Panghuma Waterfall",
    excerpt: "Trekking through the jungle to reach one of Bandarban's best-kept secrets.",
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    date: "22 Jan 2026",
  },
  {
    title: "Sajek Valley",
    excerpt: "Chasing clouds and sunrises in the highest point of the Chittagong Hill Tracts.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
    date: "2 Feb 2026",
  },
  {
    title: "Sylhet Tea Garden: A Lush Paradise in Bangladesh",
    excerpt:
      "Endless rows of green tea bushes, misty hills and the calm rhythm of tea garden mornings.",
    image:
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=800&q=80",
    date: "14 Feb 2026",
  },
];

const guides = [
  { name: "Nilo Ahmed", role: "Trekking Guide", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Rasel Karim", role: "Hill Tracts Guide", image: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Arinda Paul Joy", role: "Wildlife Guide", image: "https://randomuser.me/api/portraits/men/68.jpg" },
  {
    name: "Dibya Sinha Chowdhury",
    role: "City & Culture Guide",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

const services = [
  {
    title: "Travel Planning & Itinerary Development",
    description:
      "We design a day-by-day itinerary tailored to your pace, budget and interests, so every trip runs smoothly.",
    icon: "map",
  },
  {
    title: "Trip Planning and Development",
    description:
      "From flights to local transport, our team handles the logistics so you can focus on the experience.",
    icon: "route",
  },
  {
    title: "24/7 Support",
    description: "A dedicated support line follows you throughout the journey, ready to help whenever you need it.",
    icon: "headset",
  },
  {
    title: "Booking Services",
    description:
      "Hotels, resorts and homestays booked in advance with verified partners at the best available rates.",
    icon: "ticket",
  },
];

const testimonials = [
  {
    name: "Nabin Rahman",
    rating: 5,
    message: "WanderLust planned every detail of our Sajek trip. We just showed up and enjoyed the view.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Tanvir Amin",
    rating: 5,
    message: "The guides were friendly and knew hidden spots no other agency mentioned. Highly recommended.",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    name: "Tanzila Hasan Chowdhury",
    rating: 5,
    message: "Booking, transport, hotel — everything was handled smoothly. Our family trip felt effortless.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const team = [
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

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME || undefined,
  });
  console.log(`Connected to database "${mongoose.connection.name}". Seeding...`);

  await Package.deleteMany({});
  await Blog.deleteMany({});
  await Guide.deleteMany({});
  await Service.deleteMany({});
  await Testimonial.deleteMany({});
  await Team.deleteMany({});

  await Package.insertMany(packages);
  await Blog.insertMany(blogs);
  await Guide.insertMany(guides);
  await Service.insertMany(services);
  await Testimonial.insertMany(testimonials);
  await Team.insertMany(team);

  // SiteSettings is a singleton — only create it if it doesn't exist yet,
  // so re-running the seed never wipes out edits made from the admin panel.
  const existingSettings = await SiteSettings.findOne();
  if (!existingSettings) {
    await SiteSettings.create({});
    console.log("   • siteSettings (default document created)");
  } else {
    console.log("   • siteSettings (already exists, left untouched)");
  }

  console.log(`Collections seeded in "${mongoose.connection.name}":`);
  console.log(`   • ${Package.collection.collectionName} (${packages.length} docs)`);
  console.log(`   • ${Blog.collection.collectionName} (${blogs.length} docs)`);
  console.log(`   • ${Guide.collection.collectionName} (${guides.length} docs)`);
  console.log(`   • ${Service.collection.collectionName} (${services.length} docs)`);
  console.log(`   • ${Testimonial.collection.collectionName} (${testimonials.length} docs)`);
  console.log(`   • ${Team.collection.collectionName} (${team.length} docs)`);

  console.log("Seed complete!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
