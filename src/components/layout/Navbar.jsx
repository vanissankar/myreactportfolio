import { useEffect, useState, useRef } from "react";
import "../../styles/navbar.css";

export default function Navbar() {
  const links = ["home", "skills", "projects", "contact"];
  const [active, setActive] = useState("home");
  const [typedCount, setTypedCount] = useState({});
  const typingTimeoutRef = useRef(null);

  // Scroll tracking to set active section
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
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typing effect with irregular delays and slower overall speed
  useEffect(() => {
    // clear any pending timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    const fullText = active.charAt(0).toUpperCase() + active.slice(1);
    // start with first letter visible immediately
    setTypedCount((prev) => ({ ...prev, [active]: 1 }));

    let currentIndex = 1; // we've shown the first char

    const scheduleNext = () => {
      // Random delay to simulate human typing: base slower + jitter
      // baseDelay ~ 170-260ms, plus jitter -80..+120
      const base = 200; // average ms per char (slower)
      const jitter = Math.floor(Math.random() * 160) - 40; // -40..+119
      const delay = Math.max(60, base + jitter); // don't go too small

      typingTimeoutRef.current = setTimeout(() => {
        setTypedCount((prev) => {
          const curr = prev[active] ?? 0;
          const next = Math.min(fullText.length, curr + 1);
          return { ...prev, [active]: next };
        });

        currentIndex++;
        if (currentIndex <= fullText.length) {
          // schedule next char (irregular cadence)
          scheduleNext();
        } else {
          // finished typing; leave as-is (no deletion)
          typingTimeoutRef.current = null;
        }
      }, delay);
    };

    // If word length > 1, schedule subsequent reveals
    if (fullText.length > 1) scheduleNext();

    // cleanup on active change/unmount
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
  }, [active]);

  return (
    <nav className="navbar nav-glass">
      <div className="container flex flex-between">
        <h1 className="nav-brand">Anis.dev</h1>

        <div className="nav-links">
          {links.map((link) => {
            const isActive = active === link;
            const fullText = link.charAt(0).toUpperCase() + link.slice(1);
            const visibleCount = typedCount[link] ?? (isActive ? 1 : fullText.length);

            if (!isActive) {
              return (
                <a key={link} href={`#${link}`} className="nav-link">
                  {fullText}
                </a>
              );
            }

            return (
              <a key={link} href={`#${link}`} className="nav-link active" aria-current="page">
                {Array.from(fullText).map((ch, idx) => (
                  <span
                    key={idx}
                    className={`nav-char ${idx < visibleCount ? "visible" : "hidden"}`}
                    aria-hidden={idx >= visibleCount}
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
