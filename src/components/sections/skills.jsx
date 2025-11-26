import { useEffect, useRef } from "react";
import "../../styles/skills.css";
import { skills } from "../../data/skills";

export default function Skills() {
  const fullList = [...skills, ...skills]; // duplicated for looping
  const trackRef = useRef(null);

  /* ===============================
      DYNAMIC SCALING ENGINE
  ================================== */
  /* ======================================
      IMPROVED DYNAMIC SCALING ENGINE
     (Bigger center, softer shrink,
      gentle blur)
======================================== */
useEffect(() => {
  const interval = setInterval(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll(".skill-circle");
    const centerX = window.innerWidth / 2;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - cardCenter);

      /* ==========================================
           NEW TUNED VALUES
           — Bigger center scale
           — Smoother scale curve (slower shrink)
           — Softer blur
      ============================================ */

      // Larger center size & smoother drop-off
      let scale = 1.55 - distance * 0.0014;
      if (scale < 0.65) scale = 0.65; // minimum size

      // Softer blur
      let blur = distance * 0.006;
      if (blur > 2) blur = 2;

      // Smoother opacity fade
      let opacity = 1 - distance * 0.0008;
      if (opacity < 0.35) opacity = 0.35;

      // Apply final styles
      card.style.transform = `scale(${scale})`;
      card.style.filter = `blur(${blur}px)`;
      card.style.opacity = opacity;
    });

  }, 60); // steady smooth updates

  return () => clearInterval(interval);
}, []);


  return (
    <section id="skills" className="skills-section snap-section">
      <h2 className="skills-title">Skills</h2>

      <div className="skills-track">

        <div className="scroll-strip" ref={trackRef}>
          {fullList.map((skill, index) => (
            <div key={index} className="skill-circle">
              <img src={skill.icon} alt={skill.name} />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Duplicate for seamless infinite scroll */}
        <div className="scroll-strip">
          {fullList.map((skill, index) => (
            <div key={`dup-${index}`} className="skill-circle">
              <img src={skill.icon} alt={skill.name} />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
