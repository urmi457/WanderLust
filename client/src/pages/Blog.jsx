import PageHeader from "../components/PageHeader";
import BlogSection from "../components/BlogSection";
import Newsletter from "../components/Newsletter";

// Our Blog page, matching the sixth mockup screen.
export default function Blog() {
  return (
    <>
      <PageHeader title="Our Blog" subtitle="Stories, tips and guides from our travellers." />
      <BlogSection title="Popular Travel Blogs" />
      <Newsletter />
    </>
  );
}
