/* ==========================================================================
   DYNAMIC STARFIELD & CONSTELLATION CANVAS
   Renders smooth twinkling stars, orbital satellite pulses, and mouse interactions.
   ========================================================================== */

(function initStarfield() {
  const canvas = document.getElementById('starfield-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createStars();
  });

  const stars = [];
  const STAR_COUNT = Math.min(130, Math.floor((width * height) / 10000));
  let mouse = { x: -1000, y: -1000 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function createStars() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      });
    }
  }

  // Rare shooting star / satellite pass
  let satellite = null;
  function spawnSatellite() {
    satellite = {
      x: Math.random() * width * 0.6,
      y: Math.random() * height * 0.3,
      dx: 2.2 + Math.random() * 1.5,
      dy: 0.8 + Math.random() * 0.8,
      length: 80,
      alpha: 1,
    };
  }
  setInterval(() => {
    if (!satellite && Math.random() > 0.4) spawnSatellite();
  }, 4500);

  createStars();

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Render constellations near mouse
    for (let i = 0; i < stars.length; i++) {
      const s1 = stars[i];

      // Twinkle
      s1.alpha += s1.twinkleSpeed;
      if (s1.alpha > 0.95 || s1.alpha < 0.25) {
        s1.twinkleSpeed = -s1.twinkleSpeed;
      }

      // Drift slowly
      s1.x += s1.vx;
      s1.y += s1.vy;
      if (s1.x < 0) s1.x = width;
      if (s1.x > width) s1.x = 0;
      if (s1.y < 0) s1.y = height;
      if (s1.y > height) s1.y = 0;

      // Draw star with signature #E0F2F4 tint
      ctx.beginPath();
      ctx.arc(s1.x, s1.y, s1.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224, 242, 244, ${s1.alpha})`;
      ctx.shadowBlur = s1.radius > 1.2 ? 6 : 0;
      ctx.shadowColor = '#E0F2F4';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Connect lines to nearby stars
      for (let j = i + 1; j < stars.length; j++) {
        const s2 = stars[j];
        const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
        if (dist < 85) {
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.strokeStyle = `rgba(224, 242, 244, ${0.1 * (1 - dist / 85)})`;
          ctx.stroke();
        }
      }

      // Mouse interactive links
      const mDist = Math.hypot(s1.x - mouse.x, s1.y - mouse.y);
      if (mDist < 120) {
        ctx.beginPath();
        ctx.moveTo(s1.x, s1.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(82, 229, 255, ${0.3 * (1 - mDist / 120)})`;
        ctx.stroke();
      }
    }

    // Render satellite trail
    if (satellite) {
      ctx.beginPath();
      ctx.moveTo(satellite.x, satellite.y);
      ctx.lineTo(satellite.x - satellite.dx * 16, satellite.y - satellite.dy * 16);
      ctx.strokeStyle = `rgba(224, 242, 244, ${satellite.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#E0F2F4';
      ctx.stroke();
      ctx.shadowBlur = 0;

      satellite.x += satellite.dx;
      satellite.y += satellite.dy;
      satellite.alpha -= 0.008;

      if (satellite.alpha <= 0 || satellite.x > width || satellite.y > height) {
        satellite = null;
      }
    }

    requestAnimationFrame(render);
  }

  render();
})();
