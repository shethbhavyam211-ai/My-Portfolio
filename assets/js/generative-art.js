/* ==========================================================================
   GENERATIVE ART & CREATIVE EXPLORATION CANVAS
   Interactive algorithmic canvas blending neural fractals and cosmic vectors.
   ========================================================================== */

(function initGenerativeArt() {
  const canvas = document.getElementById('generativeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const btnPattern = document.getElementById('btnChangePattern');
  const btnSnapshot = document.getElementById('btnSnapshot');
  const patternLabel = document.getElementById('patternLabel');

  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight || 420);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight || 420;
    initNodes();
  });

  const patterns = ['Neural Constellation', 'Orbital Flux Field', 'Cosmic Trajectory Spiral'];
  let currentPatternIndex = 0;

  let nodes = [];
  let mouse = { x: width / 2, y: height / 2, down: false };
  let tick = 0;

  function initNodes() {
    nodes = [];
    const count = 75;
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2.5 + 1.5,
        phase: Math.random() * Math.PI * 2,
        connections: [],
      });
    }
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mousedown', () => {
    mouse.down = true;
  });
  canvas.addEventListener('mouseup', () => {
    mouse.down = false;
  });

  if (btnPattern) {
    btnPattern.addEventListener('click', () => {
      currentPatternIndex = (currentPatternIndex + 1) % patterns.length;
      if (patternLabel) patternLabel.textContent = patterns[currentPatternIndex];
      initNodes();
    });
  }

  if (btnSnapshot) {
    btnSnapshot.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = `creative_exploration_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  initNodes();

  function render() {
    // Semi-transparent fade for trailing effect in spiral mode
    if (currentPatternIndex === 2) {
      ctx.fillStyle = 'rgba(3, 6, 13, 0.15)';
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    tick += 0.02;

    const pattern = patterns[currentPatternIndex];

    if (pattern === 'Neural Constellation') {
      // Connect nodes and react to mouse
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Mouse attraction or repulsion
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          n.x -= (dx / dist) * force * 1.8;
          n.y -= (dy / dist) * force * 1.8;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + Math.sin(tick + n.phase) * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = '#E0F2F4';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#52e5ff';
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const d = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(224, 242, 244, ${0.35 * (1 - d / 110)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    } else if (pattern === 'Orbital Flux Field') {
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const angle = tick * 0.5 + i * 0.12;
        const radius = (i * 3.8 + 20) % (Math.min(width, height) * 0.45);

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle * 1.4) * (radius * 0.7);

        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#E0F2F4' : '#52e5ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#E0F2F4';
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(224, 242, 244, 0.05)';
        ctx.stroke();
      }
    } else if (pattern === 'Cosmic Trajectory Spiral') {
      const centerX = width / 2;
      const centerY = height / 2;

      for (let arm = 0; arm < 3; arm++) {
        const armOffset = (arm * Math.PI * 2) / 3;
        const r = ((tick * 40 + arm * 80) % 280);
        const theta = r * 0.06 + tick + armOffset;

        const x = centerX + Math.cos(theta) * r;
        const y = centerY + Math.sin(theta) * r;

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#E0F2F4';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#52e5ff';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    requestAnimationFrame(render);
  }

  render();
})();
