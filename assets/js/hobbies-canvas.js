/* ==========================================================================
   CREATIVE CODING CANVAS - HOBBIES PAGE
   Allows interactive generative art exploration using the 5-color palette.
   ========================================================================== */

(function initHobbiesCanvas() {
  const canvas = document.getElementById('hobbiesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const btnCycle = document.getElementById('btnCycleArt');
  const btnCapture = document.getElementById('btnCaptureArt');
  const modeLabel = document.getElementById('artModeLabel');

  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight || 400);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight || 400;
    initParticles();
  });

  const modes = ['Neural Harmonic Waves', 'Geometric Orbit Nodes', 'Cosmic Flow Field'];
  let currentMode = 0;
  let particles = [];
  let mouse = { x: width / 2, y: height / 2 };
  let tick = 0;

  const palette = ['#2970db', '#4fd4d2', '#81e9e6', '#fefcc0'];

  function initParticles() {
    particles = [];
    const count = 65;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 3 + 1.5,
        color: palette[i % palette.length],
        angle: Math.random() * Math.PI * 2,
      });
    }
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  if (btnCycle) {
    btnCycle.addEventListener('click', () => {
      currentMode = (currentMode + 1) % modes.length;
      if (modeLabel) modeLabel.textContent = modes[currentMode];
      initParticles();
    });
  }

  if (btnCapture) {
    btnCapture.addEventListener('click', () => {
      const a = document.createElement('a');
      a.download = `bhavya_creative_art_${Date.now()}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    });
  }

  initParticles();

  function render() {
    ctx.clearRect(0, 0, width, height);
    tick += 0.025;

    const mode = modes[currentMode];

    if (mode === 'Neural Harmonic Waves') {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(79, 212, 210, ${0.3 * (1 - d / 110)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    } else if (mode === 'Geometric Orbit Nodes') {
      const cx = width / 2;
      const cy = height / 2;

      for (let ring = 1; ring <= 4; ring++) {
        const r = ring * 45;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(129, 233, 230, 0.15)';
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      for (let i = 0; i < particles.length; i++) {
        const ring = (i % 4) + 1;
        const r = ring * 45;
        const speed = (0.015 / ring) * (i % 2 === 0 ? 1 : -1);
        particles[i].angle += speed;

        const x = cx + Math.cos(particles[i].angle) * r;
        const y = cy + Math.sin(particles[i].angle) * r;

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = particles[i].color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particles[i].color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    } else if (mode === 'Cosmic Flow Field') {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const angle = Math.sin(p.x * 0.005 + tick) + Math.cos(p.y * 0.005 + tick);
        p.x += Math.cos(angle) * 1.5;
        p.y += Math.sin(angle) * 1.5;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
    }

    requestAnimationFrame(render);
  }

  render();
})();
