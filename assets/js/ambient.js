/* ==========================================================================
   AMBIENT MODERN PARTICLES BACKGROUND
   Custom Palette: #132c91, #2970db, #4fd4d2, #81e9e6, #fefcc0
   ========================================================================== */

(function initAmbientBackground() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initNodes();
  });

  const palette = ['#2970db', '#4fd4d2', '#81e9e6', '#fefcc0'];
  let nodes = [];
  let mouse = { x: -1000, y: -1000 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function initNodes() {
    nodes = [];
    const count = Math.min(80, Math.floor((width * height) / 14000));
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: Math.random() * 0.5 + 0.3,
      });
    }
  }

  initNodes();

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const n1 = nodes[i];
      n1.x += n1.vx;
      n1.y += n1.vy;

      if (n1.x < 0) n1.x = width;
      if (n1.x > width) n1.x = 0;
      if (n1.y < 0) n1.y = height;
      if (n1.y > height) n1.y = 0;

      // Draw node
      ctx.beginPath();
      ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
      ctx.fillStyle = n1.color;
      ctx.globalAlpha = n1.alpha;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      // Connect to neighbors
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(79, 212, 210, ${0.18 * (1 - dist / 90)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Mouse interactive reaction
      const mDist = Math.hypot(n1.x - mouse.x, n1.y - mouse.y);
      if (mDist < 120) {
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(254, 252, 192, ${0.35 * (1 - mDist / 120)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    requestAnimationFrame(render);
  }

  render();
})();
