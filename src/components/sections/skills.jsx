import Card from "../common/Card";
import { skills } from "../../data/skills";
import "../../styles/skills.css";

export default function Skills() {
  return (
    <section id="skills" className="container fade-in">
      <div className="section-content">

        <h2>Skills</h2>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <Card key={index} className="skill-card">
              <img
                src={skill.icon}
                alt={skill.name}
                className="skill-icon"
              />
              <h3 className="skill-name">{skill.name}</h3>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
