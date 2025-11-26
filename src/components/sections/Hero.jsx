import "../../styles/hero.css";

export default function Hero() {
  return (
    <section id="home" className="container fade-in-delayed">
      <div className="section-content hero-container">

        {/* LEFT SIDE */}
        <div className="hero-left">
          <h2 className="accent-text hero-greeting">
            HI — I'M ANIS
          </h2>

          <h1 className="hero-title">
            Web Developer & Problem Solver
          </h1>

          <p className="hero-desc">
            I build clean, scalable, user-friendly web applications. 
            Passionate about UI, automation, and creating modern digital experiences.
          </p>

          {/* BUTTONS */}
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>

            <a
              href="/resume.pdf"
              download="Anis-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Resume
            </a>
          </div>
        </div>

        {/* RIGHT SIDE (Avatar) */}
        <div className="hero-avatar">
          <div
            className="avatar-circle float"
            style={{
              backgroundImage: "url('/your-avatar.png')"
            }}
          />
        </div>

      </div>
    </section>
  );
}
