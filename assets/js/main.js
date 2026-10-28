/* ==========================================================================
   MAIN PORTFOLIO INTERACTIVITY
   Mobile Navigation, Modal Previews & Copy Email
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // 2. Copy Email Utility
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = 'shethbhavyam211@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Copied: ' + email;
        btn.style.borderColor = 'var(--c-teal)';
        btn.style.color = 'var(--c-cream)';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2500);
      }).catch(err => {
        console.error('Copy failed', err);
      });
    });
  });

  // 3. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-secondary');
        });
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Project Modal Viewer (Self-Contained Previews)
  const modalOverlay = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalDescription = document.getElementById('modalDescription');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalClose = document.getElementById('modalClose');

  const projectDetails = {
    'grade-predictor': {
      title: 'Student Academic Performance Predictor',
      badge: 'MACHINE LEARNING • PYTHON',
      description: 'A regression and classification machine learning pipeline designed to analyze student study duration, attendance records, assignment submission frequencies, and previous test performance to predict semester GPA and identify at-risk academic areas early.',
      techStack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib'],
      highlights: [
        'Trained using Linear Regression and Random Forest Regressor models.',
        'Feature importance analysis revealed study regularity had 3.4x more predictive power than cramming duration.',
        'Built interactive command-line interface for customized student parameter inputs.'
      ]
    },
    'algo-visualizer': {
      title: 'Algorithmic Sorting & Pathfinding Visualizer',
      badge: 'ALGORITHMS • WEB TECH',
      description: 'An interactive web-based algorithmic demonstration platform allowing students to step-through and visualize how classic sorting algorithms (Merge Sort, Quick Sort, Bubble Sort) and pathfinding algorithms (Dijkstra, BFS) execute in memory step-by-step.',
      techStack: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Data Structures'],
      highlights: [
        'Dynamic speed sliders and array size regulators for custom experimentation.',
        'Color-coded comparison states highlighting pivot selections and element swaps.',
        'Zero external libraries for maximum browser performance and instant loading.'
      ]
    },
    'bhavya-ai': {
      title: 'Bhavya-AI Conversational Portfolio Agent',
      badge: 'AI INTERACTION • WEB AUDIO',
      description: 'A custom frontend conversational AI agent built right into this portfolio. Features natural language keyword recognition, domain-specific contextual responses about Bhavya Manish Sheth, and real-time robotic frequency synthesis via the browser Web Audio API.',
      techStack: ['JavaScript', 'Web Audio API', 'NLP Parsing', 'UI/UX Design'],
      highlights: [
        'Instant response generation with simulated typing telemetry indicators.',
        'Synthesizes harmonic audio blips without needing bulky MP3 downloads.',
        'Integrated interactive quick-action chips for seamless visitor navigation.'
      ]
    },
    'task-tracker': {
      title: 'Smart Task & Study Habit Tracker',
      badge: 'PRODUCTIVITY • WEB APP',
      description: 'A lightweight, intuitive task and study habit management application built for 1st-year college students to organize coursework deadlines, track active study pomodoros, and review daily progress metrics.',
      techStack: ['HTML5', 'Vanilla CSS', 'JavaScript', 'LocalStorage API'],
      highlights: [
        'Persistent client-side storage with zero account creation barriers.',
        'Dynamic priority labeling with smart time-remaining urgency counters.',
        'Clean modern glassmorphism interface with dark mode optimization.'
      ]
    },
    'vision-detector': {
      title: 'Computer Vision Object Recognition Prototype',
      badge: 'COMPUTER VISION • PYTORCH',
      description: 'An introductory computer vision experimentation notebook using OpenCV and pre-trained deep convolutional neural networks to classify real-time video stream objects and analyze bounding box accuracy.',
      techStack: ['Python', 'OpenCV', 'PyTorch', 'Torchvision'],
      highlights: [
        'Explored feature extraction layers and convolutional pooling mechanisms.',
        'Evaluated latency and frame-rate optimization on edge computing devices.',
        'Solidified core image matrix manipulation techniques for 1st-year ML coursework.'
      ]
    },
    'data-analyzer': {
      title: 'Automated CSV Data Analyzer & Plotter',
      badge: 'DATA SCIENCE • PYTHON',
      description: 'A Python automation utility that takes raw CSV dataset spreadsheets, handles missing values, generates descriptive statistical summaries, and automatically produces publication-ready visualization charts.',
      techStack: ['Python', 'Pandas', 'Seaborn', 'Matplotlib'],
      highlights: [
        'Automated outlier detection using Interquartile Range (IQR) filtering.',
        'One-click correlation heatmap and distribution histogram exports.',
        'Streamlined academic lab report preparation by 70%.'
      ]
    }
  };

  const projectModalBtns = document.querySelectorAll('.btn-open-modal');
  projectModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const data = projectDetails[projId];
      if (data && modalOverlay) {
        modalTitle.textContent = data.title;
        modalBadge.textContent = data.badge;
        modalDescription.textContent = data.description;

        modalTechStack.innerHTML = data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('');
        modalHighlights.innerHTML = data.highlights.map(h => `<li style="margin-bottom:8px; color:var(--text-muted);">${h}</li>`).join('');

        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
});
