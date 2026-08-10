import PageHeader from "../components/PageHeader";
import PackagesSection from "../components/PackagesSection";
import BookingForm from "../components/BookingForm";
import Newsletter from "../components/Newsletter";

// "Package" page, matching the fourth mockup screen: package grid + booking form.
export default function Package() {
  return (
    <>
      <PageHeader title="Package" subtitle="Browse our most popular tour packages." />
      <PackagesSection />
      <BookingForm />
      <Newsletter />
    </>
  );
}
