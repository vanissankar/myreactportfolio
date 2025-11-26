import "../../styles/skills.css";
import { skills } from "../../data/skills";

export default function Skills() {
  // Duplicate list once for perfect infinite loop
  const fullList = [...skills, ...skills];

  return (
    <section id="skills" className="skills-section snap-section">
      <h2 className="skills-title">Skills</h2>

      <div className="skills-track">
        <div className="scroll-strip">
          {fullList.map((skill, index) => (
            <div key={index} className="skill-circle">
              <img src={skill.icon} alt={skill.name} />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Second duplicate for seamless looping */}
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
