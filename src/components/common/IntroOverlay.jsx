import { useEffect, useRef } from "react";
import "../../styles/intro.css";

export default function IntroOverlay({ onStart }) {
  const wrapperRef = useRef(null);

  const handleStart = () => {
    wrapperRef.current.classList.add("fade-out");

    setTimeout(() => {
      onStart(); // signal App.jsx to start timer & sounds
    }, 600);
  };

  return (
    <div className="intro-overlay" ref={wrapperRef} onClick={handleStart}>
      <div className="intro-card">
        <div className="music-icon">🎵</div>
        <p className="intro-text">For best experience, click here</p>
      </div>
    </div>
  );
}
