import Card from "../common/Card";
import { projects } from "../../data/projects";
import "../../styles/projects.css";

export default function Projects() {
  return (
    <section id="projects" className="container fade-in">
      <div className="section-content">

        <h2>Projects</h2>

        <div className="projects-grid">
          {projects.map((proj, index) => (
            <Card key={index} className="project-card">
              <h3 className="project-title">{proj.title}</h3>

              <p className="project-desc">{proj.description}</p>

              {proj.tech && (
                <div className="tech-tags">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <button
                className="btn btn-primary project-btn"
                onClick={() => window.open(proj.url, "_blank")}
              >
                Preview
              </button>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
