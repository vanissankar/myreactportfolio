import { useEffect, useState, useRef } from "react";
import "../../styles/navbar.css";

export default function Navbar() {
  const links = ["home", "skills", "projects", "contact"];
  const [active, setActive] = useState("home");
  const [typedCount, setTypedCount] = useState({});
  const [showCursor, setShowCursor] = useState({}); // NEW: track cursor only when typing is done
  const typingTimeoutRef = useRef(null);

  // Update active link on scroll
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typing effect with irregular speed + cursor only at the end
  useEffect(() => {
    // reset cursor when active changes
    setShowCursor((prev) => ({ ...prev, [active]: false }));

    // clear any pending timeouts
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    const fullText = active.charAt(0).toUpperCase() + active.slice(1);
    setTypedCount((prev) => ({ ...prev, [active]: 1 }));

    let index = 1;

    const typeNext = () => {
      const base = 200;
      const jitter = Math.floor(Math.random() * 160) - 40;
      const delay = Math.max(60, base + jitter);

      typingTimeoutRef.current = setTimeout(() => {
        setTypedCount((prev) => {
          const curr = prev[active] ?? 0;
          const next = Math.min(fullText.length, curr + 1);
          return { ...prev, [active]: next };
        });

        index++;

        // After reaching full text → enable cursor
        if (index > fullText.length) {
          setShowCursor((prev) => ({ ...prev, [active]: true }));
          return; // stop typing
        }

        typeNext();
      }, delay);
    };

    if (fullText.length > 1) typeNext();

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [active]);

  return (
    <nav className="navbar nav-glass">
      <div className="container flex flex-between">
        <h1 className="nav-brand">Anis.dev</h1>

        <div className="nav-links">
          {links.map((link) => {
            const isActive = link === active;
            const fullText = link.charAt(0).toUpperCase() + link.slice(1);

            if (!isActive) {
              return (
                <a key={link} href={`#${link}`} className="nav-link">
                  {fullText}
                </a>
              );
            }

            const typed = typedCount[link] ?? 1;
            const cursorVisible = showCursor[link] ?? false;

            return (
              <a
                key={link}
                href={`#${link}`}
                className={`nav-link active ${cursorVisible ? "cursor-on" : "cursor-off"}`}
              >
                {Array.from(fullText).map((ch, idx) => (
                  <span
                    key={idx}
                    className={`nav-char ${idx < typed ? "visible" : "hidden"}`}
                  >
                    {ch}
                  </span>
                ))}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
