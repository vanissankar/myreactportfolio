import { useEffect, useState, useRef } from "react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import EscapeModal from "./components/common/EscapeModal";

export default function App() {

  /* ------------------------------------
      15-second looping navbar timer
  ------------------------------------- */

  const START_15 = 15;
  const [timer15, setTimer15] = useState(START_15);

  const [escapeOpen, setEscapeOpen] = useState(false);
  const [escapeKey, setEscapeKey] = useState(0);

  const [blackholeActive, setBlackholeActive] = useState(false);
  const [restartVisible, setRestartVisible] = useState(false);

  // NEW ---- SOUND CONTROL
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    setTimer15(START_15);

    const iv = setInterval(() => {
      setTimer15((s) => {
        if (s <= 1) {
          setEscapeOpen(true);
          setEscapeKey((k) => k + 1);
          return START_15;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(iv);
  }, []);

  /* ------------------------------------
      TICK SOUND — only in allowed states
  ------------------------------------- */

  const tickRef = useRef(null);

  useEffect(() => {
    tickRef.current = new Audio("/sounds/tick.wav");
    tickRef.current.volume = 0.25;
    tickRef.current.loop = false;
  }, []);

  useEffect(() => {
    if (!tickRef.current) return;

    const shouldPlay =
      soundEnabled &&         // <- IMPORTANT
      !escapeOpen &&
      !blackholeActive &&
      !restartVisible;

    if (shouldPlay) {
      tickRef.current.currentTime = 0;
      tickRef.current.play().catch(() => {});
    } else {
      tickRef.current.pause();
      tickRef.current.currentTime = 0;
    }
  }, [
    timer15,
    escapeOpen,
    blackholeActive,
    restartVisible,
    soundEnabled
  ]);

  /* ------------------------------------
      Smooth accent color fade
  ------------------------------------- */

  useEffect(() => {
    const progress = Math.max(0, Math.min(timer15, 15));
    let blend = 1 - (progress - 5) / 10;
    blend = Math.min(Math.max(blend, 0), 1);

    const blue = [19, 226, 221];
    const red = [255, 59, 59];

    const mixed = blue.map((b, i) => Math.round(b + (red[i] - b) * blend));

    document.documentElement.style.setProperty(
      "--accent",
      `rgb(${mixed[0]}, ${mixed[1]}, ${mixed[2]})`
    );

    document.documentElement.style.setProperty(
      "--accent-soft",
      `rgba(${mixed[0]}, ${mixed[1]}, ${mixed[2]}, 0.15)`
    );

    if (timer15 <= 5) document.body.classList.add("red-theme");
    else document.body.classList.remove("red-theme");
  }, [timer15]);

  /* ------------------------------------
      STARFIELD V2
  ------------------------------------- */

  useEffect(() => {
    const createStars = (layer, count, min, max) => {
      const container = document.getElementById(layer);
      if (!container) return;
      container.innerHTML = "";

      for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.className = "star";

        const size = min + Math.random() * max;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;

        star.style.animationDuration = `${2 + Math.random() * 3}s`;

        container.appendChild(star);
      }
    };

    createStars("stars-layer1", 60, 1, 2);
    createStars("stars-layer2", 40, 2, 3);
    createStars("stars-layer3", 20, 3, 4);
  }, []);

  return (
    <>
      <Navbar timer15={timer15} />

      <div id="stars-layer1" className="star-layer"></div>
      <div id="stars-layer2" className="star-layer"></div>
      <div id="stars-layer3" className="star-layer"></div>

      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* ESCAPE MODAL */}
      {escapeOpen && (
  <EscapeModal
    key={escapeKey}
    onClose={() => {
      setEscapeOpen(false);
      setTimer15(START_15);  // <<< FULL RESET OF MAIN 15s TIMER
    }}
    onFailBlackhole={() => {
      setBlackholeActive(true);
      setSoundEnabled(false);
    }}
    onRestart={() => {
      setRestartVisible(false);
      setBlackholeActive(false);
      setSoundEnabled(true);
      setTimer15(START_15); // restart also resets sound & timer
    }}
    onRestartShow={() => setRestartVisible(true)}
  />
)}

          onFailBlackhole={() => {
            setBlackholeActive(true);
            setSoundEnabled(false);   // <- STOP SOUND FOREVER
          }}
          onRestart={() => {
            setRestartVisible(false);
            setBlackholeActive(false);
            setSoundEnabled(true);    // <- ONLY HERE SOUND STARTS AGAIN
          }}
          onRestartShow={() => setRestartVisible(true)}
        />
      )}

      <Footer />
    </>
  );
}
