/* ==========================================================================
   INTERACTIVE SATELLITE & ROCKET ORBIT SIMULATOR
   Renders real-time 2D orbital mechanics for small-satellites / CubeSats.
   ========================================================================== */

(function initSatelliteSim() {
  const canvas = document.getElementById('orbitCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Telemetry DOM elements
  const elAltitude = document.getElementById('telemetryAltitude');
  const elVelocity = document.getElementById('telemetryVelocity');
  const elPeriod = document.getElementById('telemetryPeriod');
  const elSignal = document.getElementById('telemetrySignal');
  const sliderAltitude = document.getElementById('sliderAltitude');
  const sliderInclination = document.getElementById('sliderInclination');
  const btnThruster = document.getElementById('btnThruster');

  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight || 380);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight || 380;
  });

  // Orbital physics parameters
  const EARTH_RADIUS_KM = 6371;
  let altitudeKm = 520; // Low Earth Orbit
  let inclinationDeg = 45;
  let orbitAngle = 0;
  let thrusterBoost = 0;

  function calculatePhysics(alt) {
    // Standard gravitational parameter mu = GM ~ 398600 km^3/s^2
    const mu = 398600;
    const r = EARTH_RADIUS_KM + alt;
    // Orbital velocity v = sqrt(mu / r) in km/s
    const velocity = Math.sqrt(mu / r);
    // Period T = 2 * pi * sqrt(r^3 / mu) in seconds -> convert to minutes
    const periodMinutes = (2 * Math.PI * Math.sqrt(Math.pow(r, 3) / mu)) / 60;

    return {
      velocity: velocity.toFixed(2),
      period: periodMinutes.toFixed(1),
    };
  }

  function updateHUD() {
    const phys = calculatePhysics(altitudeKm);
    if (elAltitude) elAltitude.textContent = `${Math.round(altitudeKm)} km`;
    if (elVelocity) elVelocity.textContent = `${phys.velocity} km/s`;
    if (elPeriod) elPeriod.textContent = `${phys.period} min`;

    // Simulated ground station lock angle
    const inGroundLock = Math.abs(Math.sin(orbitAngle)) > 0.45;
    if (elSignal) {
      elSignal.textContent = inGroundLock ? 'LINK ACTIVE (98.4%)' : 'SEARCHING DOWNLINK...';
      elSignal.style.color = inGroundLock ? 'var(--color-telemetry-green)' : 'var(--color-rocket-amber)';
    }
  }

  if (sliderAltitude) {
    sliderAltitude.addEventListener('input', (e) => {
      altitudeKm = parseFloat(e.target.value);
      updateHUD();
    });
  }

  if (sliderInclination) {
    sliderInclination.addEventListener('input', (e) => {
      inclinationDeg = parseFloat(e.target.value);
    });
  }

  if (btnThruster) {
    btnThruster.addEventListener('click', () => {
      thrusterBoost = 1.0;
      altitudeKm = Math.min(1200, altitudeKm + 60);
      if (sliderAltitude) sliderAltitude.value = altitudeKm;
      updateHUD();
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const earthRadiusPx = Math.min(width, height) * 0.22;

    // Scale altitude to pixels
    const maxAltKm = 1400;
    const maxOrbitRadiusPx = Math.min(width, height) * 0.44;
    const orbitRadiusX = earthRadiusPx + (altitudeKm / maxAltKm) * (maxOrbitRadiusPx - earthRadiusPx);
    
    // Inclination tilt flattening on Y axis
    const tiltFactor = Math.cos((inclinationDeg * Math.PI) / 180);
    const orbitRadiusY = orbitRadiusX * Math.max(0.28, Math.abs(tiltFactor));

    // 1. Draw Orbit Ellipse Path
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, orbitRadiusX, orbitRadiusY, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(224, 242, 244, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Draw Earth Globe with Aero Cyan Atmospheric Glow
    // Outer atmospheric glow
    const atmGlow = ctx.createRadialGradient(
      centerX, centerY, earthRadiusPx * 0.85,
      centerX, centerY, earthRadiusPx * 1.3
    );
    atmGlow.addColorStop(0, 'rgba(82, 229, 255, 0.35)');
    atmGlow.addColorStop(0.5, 'rgba(224, 242, 244, 0.15)');
    atmGlow.addColorStop(1, 'rgba(6, 9, 19, 0)');

    ctx.beginPath();
    ctx.arc(centerX, centerY, earthRadiusPx * 1.3, 0, Math.PI * 2);
    ctx.fillStyle = atmGlow;
    ctx.fill();

    // Earth Body
    const earthGrad = ctx.createRadialGradient(
      centerX - earthRadiusPx * 0.3, centerY - earthRadiusPx * 0.3, earthRadiusPx * 0.1,
      centerX, centerY, earthRadiusPx
    );
    earthGrad.addColorStop(0, '#1c4966');
    earthGrad.addColorStop(0.7, '#0b2138');
    earthGrad.addColorStop(1, '#050c18');

    ctx.beginPath();
    ctx.arc(centerX, centerY, earthRadiusPx, 0, Math.PI * 2);
    ctx.fillStyle = earthGrad;
    ctx.shadowBlur = 18;
    ctx.shadowColor = '#52e5ff';
    ctx.fill();
    ctx.shadowBlur = 0;

    // Subtle continent/cloud curves
    ctx.beginPath();
    ctx.arc(centerX - 10, centerY + 10, earthRadiusPx * 0.7, -0.6, 1.2);
    ctx.strokeStyle = 'rgba(224, 242, 244, 0.2)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // 3. Compute Satellite Coordinates
    // Orbit speed depends on velocity
    const phys = calculatePhysics(altitudeKm);
    const speed = (parseFloat(phys.velocity) / 7.6) * 0.016;
    orbitAngle += speed;

    const satX = centerX + Math.cos(orbitAngle) * orbitRadiusX;
    const satY = centerY + Math.sin(orbitAngle) * orbitRadiusY;

    // Line of sight / Ground Station beam if on front hemisphere
    if (Math.sin(orbitAngle) >= -0.2) {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(satX, satY);
      ctx.strokeStyle = 'rgba(82, 229, 255, 0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw CubeSat satellite symbol
    ctx.save();
    ctx.translate(satX, satY);
    ctx.rotate(orbitAngle + Math.PI / 2);

    // CubeSat Body
    ctx.fillStyle = '#E0F2F4';
    ctx.fillRect(-6, -6, 12, 12);

    // Solar Wings
    ctx.fillStyle = '#3a86ff';
    ctx.fillRect(-18, -3, 10, 6);
    ctx.fillRect(8, -3, 10, 6);
    ctx.strokeStyle = '#E0F2F4';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(-18, -3, 10, 6);
    ctx.strokeRect(8, -3, 10, 6);

    // Thruster Flare if active
    if (thrusterBoost > 0) {
      ctx.beginPath();
      ctx.moveTo(-3, 6);
      ctx.lineTo(0, 16 + thrusterBoost * 10);
      ctx.lineTo(3, 6);
      ctx.fillStyle = '#ffaa44';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ffaa44';
      ctx.fill();
      ctx.shadowBlur = 0;
      thrusterBoost -= 0.02;
    }

    ctx.restore();

    // Satellite label / coordinates
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillStyle = '#E0F2F4';
    ctx.fillText(`ORION-1 [${Math.round(altitudeKm)}km]`, satX + 16, satY - 4);

    requestAnimationFrame(render);
  }

  updateHUD();
  render();
})();
