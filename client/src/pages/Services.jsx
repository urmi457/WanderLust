import PageHeader from "../components/PageHeader";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Newsletter from "../components/Newsletter";

// Our Services page, matching the third mockup screen.
export default function Services() {
  return (
    <>
      <PageHeader title="Our Services" subtitle="Everything you need for a stress-free trip." />
      <ServicesSection bg="bg-base-100" />
      <TestimonialsSection />
      <Newsletter />
    </>
  );
}
