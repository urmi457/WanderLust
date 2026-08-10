import PageHeader from "../components/PageHeader";
import PackagesSection from "../components/PackagesSection";
import Newsletter from "../components/Newsletter";

// Packages listing page, matching the fifth mockup screen.
export default function Packages() {
  return (
    <>
      <PageHeader title="Packages" subtitle="Find the perfect getaway for your next trip." />
      <PackagesSection title="All Packages" />
      <Newsletter />
    </>
  );
}
