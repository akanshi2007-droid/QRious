/*
 * squareBurst(element)
 * Fires a short burst of Google-coloured squares from the centre of an
 * element (e.g. the Download button). Draws on a temporary full-screen
 * canvas that removes itself when the animation ends.
 */

const COLORS = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];

export function squareBurst(element, { count = 32, duration = 900 } = {}) {
  if (typeof window === "undefined" || !element) return;

  // respect users who turned animations off
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const rect = element.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  /* ---------- temporary overlay canvas ---------- */
  const dpr = window.devicePixelRatio || 1;
  const canvas = document.createElement("canvas");

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "9998",
  });

  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  /* ---------- particles ---------- */
  const particles = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 160 + Math.random() * 280; // px per second

    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 140, // slight upward bias
      size: 5 + Math.random() * 6,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 14,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  });

  /* ---------- animation loop ---------- */
  const start = performance.now();
  let last = start;

  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    const progress = (now - start) / duration;
    last = now;

    if (progress >= 1) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // fade out slowly at first, quickly at the end
    const alpha = 1 - progress * progress;
    const drag = Math.pow(0.05, dt);

    for (const p of particles) {
      p.vx *= drag;
      p.vy = p.vy * drag + 900 * dt; // drag + gravity
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rotation += p.spin * dt;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    }

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}