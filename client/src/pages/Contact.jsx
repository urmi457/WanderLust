import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import Newsletter from "../components/Newsletter";
import useSiteSettings from "../hooks/useSiteSettings";

// Contact Us page, matching the eighth mockup screen: map/details card + message form.
export default function Contact() {
  const { settings } = useSiteSettings();
  const { contact } = settings;

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Have a question? Send us a message." />

      <section className="section-pad">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-10">
          <div>
            <span className="eyebrow">Get In Touch</span>
            <h2 className="section-title">Contact For Any Query</h2>
            <p className="text-base-content/60 mt-4 max-w-md">
              Our team usually replies within one business day. You can also reach us directly
              using the details below.
            </p>

            <ul className="space-y-4 mt-8">
              <li className="flex gap-3 items-start">
                <span className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <FiMapPin />
                </span>
                <div>
                  <p className="font-semibold text-primary">Address</p>
                  <p className="text-sm text-base-content/60">{contact.address}</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <FiPhone />
                </span>
                <div>
                  <p className="font-semibold text-primary">Phone</p>
                  <p className="text-sm text-base-content/60">{contact.phone}</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <FiMail />
                </span>
                <div>
                  <p className="font-semibold text-primary">Email</p>
                  <p className="text-sm text-base-content/60">{contact.email}</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 rounded-box overflow-hidden border border-base-300 h-48">
              <iframe
                title="map"
                className="w-full h-full"
                loading="lazy"
                src={contact.mapEmbedUrl}
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <Newsletter />
    </>
  );
}
