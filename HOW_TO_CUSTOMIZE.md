# 🌟 Bhavya Manish Sheth — Professional Portfolio Guide

Welcome to the personal portfolio website for **Bhavya Manish Sheth**, 1st-Year B.Tech Student in **Computer Science & Engineering (Artificial Intelligence & Machine Learning)**.

---

## 🎨 Color Palette Reference (From Provided Swatch)
The portfolio strictly implements the 5-color palette provided:
- **`#132c91`** — Primary Deep Royal Navy
- **`#2970db`** — Cobalt Blue (Vibrant Accent)
- **`#4fd4d2`** — Vivid Cyan / Teal
- **`#81e9e6`** / **`#E0F2F4`** — Soft Mint Aqua & Aero Ice
- **`#fefcc0`** — Warm Cream Accent (Badges & Highlights)

---

## 📁 Website Architecture
```
Portfolio/
├── index.html              # Home Page with Bhavya-AI Chatbot & Overview
├── about.html              # Biography, Academic Timeline & Skills
├── projects.html           # 1st-Year Projects with Filter Tabs & Detail Modals
├── hobbies.html            # Creative Coding Canvas, Astronomy Curiosity & Hobbies
├── contact.html            # Transmission Portal & shethbhavyam211@gmail.com
├── HOW_TO_CUSTOMIZE.md     # This Documentation Guide
└── assets/
    ├── css/
    │   └── style.css       # Complete Design System with Custom Swatch Palette
    ├── js/
    │   ├── ambient.js      # Ambient Particle Background Canvas
    │   ├── chatbot.js      # Bhavya-AI Conversational Assistant with Audio
    │   ├── hobbies-canvas.js # Generative Art Visualizer Canvas
    │   └── main.js         # Mobile Menu, Project Modals & Copy Email
    └── images/
        └── bhavya_avatar.jpg # Custom Professional Avatar of Bhavya
```

---

## 📧 Contact Information
- **Primary Email**: `shethbhavyam211@gmail.com`
- Integrated with one-click **"Copy Email Address"** and direct **mailto** triggers across the site.

---

## 🛠️ How to Add Future Projects
Open `projects.html` and simply add a new project card:
```html
<div class="glass-card project-card" data-category="ai">
  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
    <div class="card-icon">🚀</div>
    <span class="card-badge">SEMESTER 2</span>
  </div>
  <h3 style="font-size: 1.3rem; margin-bottom: 10px;">Your Next Project Title</h3>
  <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 16px;">
    Brief summary of what your model or application achieves...
  </p>
  <div class="tag-list" style="margin-bottom: 20px;">
    <span class="tech-tag">Python</span>
    <span class="tech-tag">PyTorch</span>
  </div>
  <button class="btn btn-secondary btn-open-modal" data-project="your-proj-id" style="width: 100%;">
    <span>Inspect Project Details ↗</span>
  </button>
</div>
```
Then define its modal details in `assets/js/main.js` inside `projectDetails`.

---

## 🌐 Local Preview
Run from this directory in terminal:
```bash
python3 -m http.server 8080
```
Then navigate to: **`http://localhost:8080`** in any browser.
