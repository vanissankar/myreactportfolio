import { socials } from "../../data/socials";
import Footer from "../layout/Footer";
import "../../styles/contact.css";

export default function Contact() {
  return (
    <section id="contact" className="container fade-in contact-section">

      <div className="section-content contact-wrapper">

        <h2 className="contact-title">Contact</h2>

        {/* Social Icons Row */}
        <div className="socials-container">
          {socials.map((social, index) => {
            const Icon = social.icon;  // get the react component

            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-item"
              >
                <Icon className="social-icon" />
                <span className="social-name">{social.name}</span>
              </a>
            );
          })}
        </div>

      </div>

      <Footer />

    </section>
  );
}
