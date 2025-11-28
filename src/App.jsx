import { useEffect, useState, useRef } from "react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import EscapeModal from "./components/common/EscapeModal";
import IntroOverlay from "./components/common/IntroOverlay";

export default function App() {

  /* ================================
     GLOBAL STATES
  ================================ */

  const START_15 = 15;

  const [timer15, setTimer15] = useState(START_15);
  const [escapeOpen, setEscapeOpen] = useState(false);
  const [escapeKey, setEscapeKey] = useState(0);

  const [blackholeActive, setBlackholeActive] = useState(false);
  const [restartVisible, setRestartVisible] = useState(false);

  // NEW — intro must finish before anything starts
  const [introDone, setIntroDone] = useState(false);

  // sound allow state
  const [soundEnabled, setSoundEnabled] = useState(true);

  /* ================================
     AUDIO REFS
  ================================ */
  const tickRef = useRef(null);
  const galaxyRef = useRef(null);

  useEffect(() => {
    tickRef.current = new Audio("/sounds/tick.wav");
    tickRef.current.volume = 0.25;

    galaxyRef.current = new Audio("/sounds/galaxy.wav");
    galaxyRef.current.volume = 0.9;
    galaxyRef.current.loop = true;
  }, []);

  /* ================================
     15s MAIN TIMER (runs ONLY after intro)
  ================================ */
  useEffect(() => {
    if (!introDone) return; // stop timer before intro tap

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
  }, [introDone]);

  /* ================================
     TICK SOUND CONTROL
  ================================ */
  useEffect(() => {
    if (!introDone) return; // block audio until tap
    if (!tickRef.current) return;

    const ok =
      soundEnabled &&
      !escapeOpen &&
      !blackholeActive &&
      !restartVisible;

    if (ok) {
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
    soundEnabled,
    introDone
  ]);

  /* ================================
     GALAXY MUSIC CONTROL
  ================================ */
  useEffect(() => {
    if (!introDone) return;
    if (!galaxyRef.current) return;

    const ok =
      soundEnabled &&
      !escapeOpen &&
      !blackholeActive &&
      !restartVisible;

    if (ok) {
      galaxyRef.current.play().catch(() => {});
    } else {
      galaxyRef.current.pause();
    }
  }, [
    escapeOpen,
    blackholeActive,
    restartVisible,
    soundEnabled,
    introDone
  ]);

  /* ================================
     ACCENT COLOR FADE WITH TIMER
  ================================ */
  useEffect(() => {
    if (!introDone) return;

    const p = Math.max(0, Math.min(timer15, 15));
    let blend = 1 - (p - 5) / 10;
    blend = Math.min(Math.max(blend, 0), 1);

    const blue = [19, 226, 221];
    const red = [255, 59, 59];

    const mixed = blue.map((b, i) =>
      Math.round(b + (red[i] - b) * blend)
    );

    document.documentElement.style.setProperty(
      "--accent",
      `rgb(${mixed[0]},${mixed[1]},${mixed[2]})`
    );
    document.documentElement.style.setProperty(
      "--accent-soft",
      `rgba(${mixed[0]},${mixed[1]},${mixed[2]},0.15)`
    );

    if (timer15 <= 5) document.body.classList.add("red-theme");
    else document.body.classList.remove("red-theme");
  }, [timer15, introDone]);

  /* ================================
     STARFIELD — only after intro
  ================================ */
  useEffect(() => {
    if (!introDone) return;

    const createStars = (layer, count, min, max) => {
      const el = document.getElementById(layer);
      if (!el) return;
      el.innerHTML = "";

      for (let i = 0; i < count; i++) {
        const s = document.createElement("div");
        s.className = "star";

        const size = min + Math.random() * max;
        s.style.width = `${size}px`;
        s.style.height = `${size}px`;

        s.style.top = `${Math.random() * 100}%`;
        s.style.left = `${Math.random() * 100}%`;

        s.style.animationDuration = `${2 + Math.random() * 3}s`;

        el.appendChild(s);
      }
    };

    createStars("stars-layer1", 60, 1, 2);
    createStars("stars-layer2", 40, 2, 3);
    createStars("stars-layer3", 20, 3, 4);
  }, [introDone]);

  /* ================================
     RENDER
  ================================ */
  return (
    <>
      {/* INTRO OVERLAY ALWAYS FIRST */}
      {!introDone && (
        <IntroOverlay
          onStart={() => {
            setIntroDone(true);

            // start audio immediately when user taps
            setTimeout(() => {
              tickRef.current?.play().catch(() => {});
              galaxyRef.current?.play().catch(() => {});
            }, 50);
          }}
        />
      )}

      {introDone && (
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

          {escapeOpen && (
            <EscapeModal
              key={escapeKey}
              onClose={() => {
                setEscapeOpen(false);
                setTimer15(START_15);
              }}
              onFailBlackhole={() => {
                setBlackholeActive(true);
                setSoundEnabled(false);
              }}
              onRestart={() => {
                setRestartVisible(false);
                setBlackholeActive(false);
                setSoundEnabled(true);
                setTimer15(START_15);
              }}
              onRestartShow={() => setRestartVisible(true)}
            />
          )}

          <Footer />
        </>
      )}
    </>
  );
}
