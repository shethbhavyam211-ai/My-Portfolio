# 🚀 Welcome to Your Space Tech & AI Portfolio!

Hello! As a **1st-Year CSE (AI & ML)** student, you now have an elite, custom-engineered portfolio featuring:
- **`#E0F2F4` (Ice Aero Cyan)** signature palette paired with cosmic deep obsidian.
- **AERO-AI Flight Assistant Chatbot** right at the top of your homepage with audio telemetry sound and interactive chips.
- **Space Tech & Rocket Satellites Laboratory** with a real-time interactive **2D Orbit Simulator** calculating Keplerian velocities and ground station locks.
- **Creative Art, Animations & Generative Canvas** showcasing your exploration ideas.
- **Categorized Projects & Labs** ready to receive your upcoming semester builds.
- **Sub-Space Transmission Contact Station** for collaborations and hackathons.

---

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main Mission Control & Hero with Live Chatbot
├── space-tech.html         # Space Tech & Rocket Satellites Lab + Orbit Simulator
├── exploration-art.html    # Creative Generative Art & Animation Studio
├── projects.html           # Project repository with filter tabs
├── contact.html            # Transmission contact form & social links
├── HOW_TO_CUSTOMIZE.md     # This guide!
└── assets/
    ├── css/
    │   └── style.css       # Design system (#E0F2F4 theme, glassmorphism, HUDs)
    ├── js/
    │   ├── starfield.js    # Background interactive twinkling constellation canvas
    │   ├── chatbot.js      # AERO-AI chatbot logic & Web Audio synthesizer
    │   ├── satellite-sim.js# Real-time satellite orbit physics calculator
    │   └── generative-art.js# Interactive algorithmic canvas generator
    └── images/
        ├── hero_exploration.jpg   # Hero space explorer artwork
        ├── satellite_cubesat.jpg  # 6U CubeSat in Low Earth Orbit
        └── neural_cosmic_art.jpg  # Neural network and cosmic trajectory art
```

---

## 🛠️ Step-by-Step Customization Guide

### 1. Update Your Name & Brand
- In `index.html` (and all `.html` files), search for:
  ```html
  <a href="index.html" class="brand-logo">
    <div class="brand-symbol">🛰️</div>
    <span>AERO<span style="color: #fff;">PORTFOLIO</span></span>
  </a>
  ```
  Change `AEROPORTFOLIO` to your own name or initials (e.g., `ALEX<span style="color: #fff;">FOLIO</span>`).

### 2. Update Your Socials & Links
- Open `contact.html` and replace:
  - `github.com/your-username` with your real GitHub handle
  - `linkedin.com/in/your-profile` with your LinkedIn URL
  - `student@college.edu` with your college or personal email address

### 3. Add New Projects as You Finish Each Semester
- Open `projects.html`.
- To add a new project, simply copy and paste a project block:
  ```html
  <div class="glass-card project-card" data-category="ai"> <!-- 'space', 'ai', or 'creative' -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div class="card-icon">🚀</div>
      <span class="card-badge">SEMESTER 2</span>
    </div>
    <h3 class="card-title">Your New Project Title</h3>
    <p class="card-desc">Description of what you engineered...</p>
    <div class="tag-list" style="margin-bottom: 20px;">
      <span class="tech-tag">Python</span>
      <span class="tech-tag">PyTorch</span>
    </div>
    <a href="https://github.com/your-username/repo" target="_blank" class="btn btn-secondary" style="width: 100%;">
      <span>Inspect GitHub Repo ↗</span>
    </a>
  </div>
  ```

### 4. Teach the Chatbot New Answers
- Open `assets/js/chatbot.js`.
- Look for the `knowledgeBase` array (around Line 58).
- You can add your own custom questions and answers:
  ```javascript
  {
    keywords: ['hackathon', 'award', 'competition'],
    reply: `🏆 I recently participated in the XYZ Hackathon where our team built an autonomous satellite anomaly detector!`
  },
  ```

---

## 🌐 How to Preview Your Website Locally

You can open `index.html` directly in any web browser (Chrome, Edge, Firefox, Safari).

Or, from this directory in your terminal, run:
```bash
python3 -m http.server 8000
```
Then visit: `http://localhost:8000` in your browser.
