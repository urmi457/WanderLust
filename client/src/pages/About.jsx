import PageHeader from "../components/PageHeader";
import AboutPreview from "../components/AboutPreview";
import GuidesSection from "../components/GuidesSection";
import Newsletter from "../components/Newsletter";

// About Us page, matching the second mockup screen.
export default function About() {
  return (
    <>
      <PageHeader title="About Us" subtitle="Get to know the people behind WanderLust." />
      <AboutPreview />
      <GuidesSection />
      <Newsletter />
    </>
  );
}
