import { useEffect, useRef } from "react";

export default function RopeSwitch({ onToggleTheme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 200;
    canvas.height = window.innerHeight;

    /* -----------------------
       VERLET ROPE PHYSICS
    ------------------------ */

    const SEGMENTS = 18;
    const SEG_LENGTH = 18;
    const GRAVITY = 0.5;

    let points = [];

    // Create rope points
    for (let i = 0; i < SEGMENTS; i++) {
      points.push({
        x: 40,
        y: i * SEG_LENGTH,
        oldx: 40,
        oldy: i * SEG_LENGTH,
      });
    }

    let dragging = false;
    let dragIndex = SEGMENTS - 1;
    let lastMouseX = 0;

    /* -----------------------
       DRAG HANDLERS
    ------------------------ */
    const onDown = (e) => {
      dragging = true;
      lastMouseX = e.clientX || e.touches?.[0]?.clientX;
    };

    const onMove = (e) => {
      if (!dragging) return;

      const mx = e.clientX || e.touches?.[0]?.clientX;
      const my = e.clientY || e.touches?.[0]?.clientY;

      points[dragIndex].x = mx;
      points[dragIndex].y = my;
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;

      const dx = points[dragIndex].x - lastMouseX;

      if (dx > 35) onToggleTheme("light");
      else if (dx < -35) onToggleTheme("dark");
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    window.addEventListener("touchstart", onDown);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);

    /* -----------------------
       VERLET SIMULATION
    ------------------------ */
    const simulate = () => {
      // Physics integration
      for (let p of points) {
        if (p === points[0]) continue; // top anchor fixed

        let vx = p.x - p.oldx;
        let vy = p.y - p.oldy;

        p.oldx = p.x;
        p.oldy = p.y;

        p.x += vx;
        p.y += vy + GRAVITY;
      }

      // Enforce rope constraints
      for (let i = 0; i < 6; i++) {
        points[0].x = 40;
        points[0].y = 0;

        for (let j = 0; j < SEGMENTS - 1; j++) {
          let p1 = points[j];
          let p2 = points[j + 1];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const diff = (SEG_LENGTH - dist) / dist;

          const offsetX = dx * diff * 0.5;
          const offsetY = dy * diff * 0.5;

          p1.x -= offsetX;
          p1.y -= offsetY;
          p2.x += offsetX;
          p2.y += offsetY;
        }
      }
    };

    /* -----------------------
       DRAW ROPE
    ------------------------ */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "var(--accent)";
      ctx.lineWidth = 3;
      ctx.beginPath();

      ctx.moveTo(points[0].x, points[0].y);

      for (let p of points) {
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // Draw ball
      const ball = points[dragIndex];
      ctx.beginPath();
      ctx.fillStyle = "var(--accent)";
      ctx.shadowBlur = 12;
      ctx.shadowColor = "var(--accent)";
      ctx.arc(ball.x, ball.y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    /* -----------------------
       MAIN LOOP
    ------------------------ */
    const loop = () => {
      if (!dragging) simulate();
      draw();
      requestAnimationFrame(loop);
    };

    loop();
  }, []);

  return <canvas ref={canvasRef} className="rope-switch"></canvas>;
}
