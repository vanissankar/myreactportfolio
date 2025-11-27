import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import { useEffect } from "react";



export default function App() {
    // Background star generator
  useEffect(() => {
    const container = document.getElementById("starfield");
    if (!container) return;

    container.innerHTML = ""; // clear old stars (Hot Reload fix)

    const starCount = 70; // number of stars

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";

      // Random position
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;

      // Each star has unique timing
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      star.style.animationDelay = `${Math.random() * 5}s`;

      container.appendChild(star);
    }
  }, []);
  // STARFIELD V2 ENGINE
useEffect(() => {

  /* ----------- Twinkling stars ----------- */
  const createStars = (layer, count, sizeMin, sizeMax) => {
    const container = document.getElementById(layer);
    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const s = document.createElement("div");
      s.className = "star";

      const size = sizeMin + Math.random() * sizeMax;
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;

      s.style.top = `${Math.random() * 100}%`;
      s.style.left = `${Math.random() * 100}%`;

      s.style.animationDuration = `${2 + Math.random() * 3}s`;

      container.appendChild(s);
    }
  };

  createStars("stars-layer1", 60, 1, 2);
  createStars("stars-layer2", 40, 2, 3);
  createStars("stars-layer3", 20, 3, 4);

   // One shooting star every 2.5 seconds

}, []);


  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>

      
    </>
  );
}
