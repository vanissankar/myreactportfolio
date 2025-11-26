import { socials } from "../../data/socials";
import Footer from "../layout/Footer";
import "../../styles/contact.css";

export default function Contact() {
  return (
    <section id="contact" className="container fade-in contact-section">

      <div className="section-content contact-wrapper">

        <h2>Contact</h2>
        <p className="contact-subtext">Connect with me:</p>

        <div className="socials-container">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
            >
              <img
                src={social.icon}
                alt={social.name}
                className="social-icon"
              />
              <span className="social-name">{social.name}</span>
            </a>
          ))}
        </div>

      </div>

      {/* FOOTER INSIDE THE SAME SECTION */}
      <Footer />

    </section>
  );
}
