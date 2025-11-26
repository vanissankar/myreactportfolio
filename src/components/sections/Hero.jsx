import "../../styles/hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero-section container snap-section">

      {/* LEFT CONTENT */}
      <div className="hero-content">
        <h1 className="hero-title">Hi, I'm Anis</h1>
        <p className="hero-subtitle">
          I build websites, tools, and modern digital experiences.
        </p>

        <div className="hero-buttons">
          <a href="/resume.pdf" className="hero-btn" target="_blank">
            Resume
          </a>
          <a href="#projects" className="hero-btn btn-outline">
            Projects
          </a>
        </div>
      </div>

      {/* RIGHT SIDE PROFILE IMAGE */}
      <div className="hero-image-wrapper">
        <img
          src="/assets/images/profile.jpg"
          alt="Anis Profile"
          className="hero-image"
        />
      </div>

    </section>
  );
}
