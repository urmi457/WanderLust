import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiArrowUp } from "react-icons/fi";
import useSiteSettings from "../hooks/useSiteSettings";

// Site-wide footer with "Get in Touch", "Company" and "Support" columns,
// matching the dark navy footer seen on every page of the mockup.
export default function Footer() {
  const { settings } = useSiteSettings();
  const { footer, contact, siteName } = settings;

  const socials = [
    { Icon: FiFacebook, href: footer.facebook },
    { Icon: FiTwitter, href: footer.twitter },
    { Icon: FiInstagram, href: footer.instagram },
  ];

  return (
    <footer className="bg-neutral text-neutral-content relative">
      <div className="container mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-1 text-white font-display text-xl font-bold">
            <FiMapPin className="text-secondary" /> {siteName}
          </Link>
          <p className="text-sm mt-3 text-neutral-content/70 max-w-xs">{footer.about}</p>
          <div className="flex gap-3 mt-4">
            {socials.map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-sm bg-white/10 border-none hover:bg-secondary text-white"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Get In Touch</h4>
          <ul className="space-y-2 text-sm text-neutral-content/70">
            <li className="flex gap-2 items-start">
              <FiMapPin className="mt-1 shrink-0" /> {contact.address}
            </li>
            <li className="flex gap-2 items-center">
              <FiPhone className="shrink-0" /> {contact.phone}
            </li>
            <li className="flex gap-2 items-center">
              <FiMail className="shrink-0" /> {contact.email}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-neutral-content/70">
            <li><Link to="/about" className="hover:text-secondary">About</Link></li>
            <li><Link to="/services" className="hover:text-secondary">Services</Link></li>
            <li><Link to="/packages" className="hover:text-secondary">Packages</Link></li>
            <li><Link to="/blog" className="hover:text-secondary">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-neutral-content/70">
            <li><Link to="/contact" className="hover:text-secondary">Contact Us</Link></li>
            <li><a href="#" className="hover:text-secondary">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-secondary">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-neutral-content/60">
        © {new Date().getFullYear()} {siteName}. All rights reserved.
      </div>

      <a
        href="#top"
        className="btn btn-circle btn-secondary text-white absolute -top-5 right-6 shadow-lg"
        aria-label="Back to top"
      >
        <FiArrowUp />
      </a>
    </footer>
  );
}
