import Hero from "../components/Hero";
import AboutPreview from "../components/AboutPreview";
import ServicesSection from "../components/ServicesSection";
import PackagesSection from "../components/PackagesSection";
import BookingForm from "../components/BookingForm";
import GuidesSection from "../components/GuidesSection";
import BlogSection from "../components/BlogSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Newsletter from "../components/Newsletter";

// Home page: mirrors the first mockup screen — Hero, About, Services,
// Packages, Booking, Guides, Blog, Testimonials, Newsletter.
export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesSection />
      <PackagesSection limit={3} />
      <BookingForm />
      <GuidesSection />
      <BlogSection limit={3} />
      <TestimonialsSection />
      <Newsletter />
    </>
  );
}
