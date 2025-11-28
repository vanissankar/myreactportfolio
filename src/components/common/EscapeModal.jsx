import { useState, useEffect } from "react";
import "../../styles/escape.css";

export default function EscapeModal({
  onClose,
  onFailBlackhole,
  onRestart,
  onRestartShow
}) {
  const WORDS = [
    "galaxy", "nebulae", "quantum", "gravity",
    "cosmos", "fusion", "stellar", "photon"
  ];

  const [word] = useState(
    WORDS[Math.floor(Math.random() * WORDS.length)]
  );
  const [input, setInput] = useState("");
  const [seconds, setSeconds] = useState(7);
  const [message, setMessage] = useState("");

  // 7s countdown
  useEffect(() => {
    if (seconds <= 0) {
      setMessage("Your time out!");
      setTimeout(() => triggerBlackHole(), 900);
      return;
    }

    const iv = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(iv);
  }, [seconds]);

  // Check match
  useEffect(() => {
    if (input.toLowerCase() === word.toLowerCase()) {
      setMessage("You escaped for now!");
      setTimeout(() => onClose(), 1000);
    }
  }, [input]);

  const triggerBlackHole = () => {
    document.body.classList.add("blackhole-v2");
    onFailBlackhole();

    const hole = document.createElement("div");
    hole.className = "blackhole-center";
    document.body.appendChild(hole);

    // After animation → show restart button
    setTimeout(() => {
      const btn = document.createElement("button");
      btn.className = "restart-btn";
      btn.innerText = "Restart";

      btn.onclick = () => {
        onRestart();
        window.location.reload();
      };

      document.body.appendChild(btn);
      onRestartShow();
    }, 1900);

    setTimeout(() => onClose(), 400);
  };

  return (
    <div className="escape-overlay">
      <div className="escape-card pixel-card">

        <h3 className="escape-title">Type the word to escape</h3>
        <p className="escape-word">{word}</p>

        <input
          className="escape-input pixel-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
        />

        <div className="escape-timer">{seconds}s</div>
        {message && <div className="escape-message">{message}</div>}
      </div>
    </div>
  );
}
