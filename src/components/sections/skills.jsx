import "../../styles/skills.css";
import { skills } from "../../data/skills";
import { useEffect, useRef } from "react";

export default function Skills() {
  const fullList = [...skills, ...skills];
  const trackRef = useRef(null);

  // Infinite scroll + dynamic scaling
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let scrollX = 0;

    const interval = setInterval(() => {
      scrollX -= 2;
      track.style.transform = `translateX(${scrollX}px)`;

      const totalWidth = track.scrollWidth / 2;
      if (Math.abs(scrollX) >= totalWidth) {
        scrollX = 0;
      }

      const cards = track.querySelectorAll(".skill-circle");
      const trackCenter = window.innerWidth / 2;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - trackCenter);

        const scale = Math.max(0.7, 1.4 - dist / 500);
        const blur = Math.min(6, dist / 130);
        const opacity = Math.max(0.3, 1 - dist / 450);

        card.style.transform = `scale(${scale})`;
        card.style.filter = `blur(${blur}px)`;
        card.style.opacity = opacity;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="skills" className="skills-section snap-section">
      <h2 className="skills-title">Skills</h2>

      <div className="skills-track">
        <div className="scroll-strip" ref={trackRef}>
          {fullList.map((skill, index) => (
            <div key={index} className="skill-circle">
              <skill.icon className="skill-icon" />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>

        <div className="scroll-strip">
          {fullList.map((skill, index) => (
            <div key={`dup-${index}`} className="skill-circle">
              <skill.icon className="skill-icon" />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
