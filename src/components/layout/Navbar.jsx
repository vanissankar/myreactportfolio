import { useEffect, useState } from "react";
import "../../styles/navbar.css";

export default function Navbar() {
  const links = ["home", "skills", "projects", "contact"];
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      links.forEach((link) => {
        const section = document.getElementById(link);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActive(link);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar nav-glass">
      <div className="container flex flex-between">

        {/* Brand */}
        <h1 className="nav-brand">Anis.dev</h1>

        {/* Navigation Links */}
        <div className="nav-links">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className={`nav-link ${active === link ? "active" : ""}`}
            >
              {link}
            </a>
          ))}
        </div>

      </div>
    </nav>
  );
}
