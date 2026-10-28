/* ==========================================================================
   ASTRO-AI / NOVA PORTFOLIO CHATBOT
   Intelligent flight-assistant and portfolio guide for 1st Year CSE (AI & ML)
   Specialized in Space Tech, Rocket Satellites, AI Explorations & Creative Art.
   ========================================================================== */

(function initChatbot() {
  const messagesContainer = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatForm = document.getElementById('chatForm');
  const quickChips = document.querySelectorAll('.chip');
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const resetChatBtn = document.getElementById('resetChatBtn');

  if (!messagesContainer || !chatInput || !chatForm) return;

  // Audio Telemetry Feedback via Web Audio API
  let audioEnabled = true;
  let audioCtx = null;

  function playTelemetrySound(type = 'blip') {
    if (!audioEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'blip') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'incoming') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(1080, now + 0.12);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch (e) {
      console.warn('Audio feedback error:', e);
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      audioToggleBtn.textContent = audioEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
      audioToggleBtn.title = audioEnabled ? 'Disable telemetry sounds' : 'Enable telemetry sounds';
    });
  }

  // Knowledge base for answering user queries
  const knowledgeBase = [
    {
      keywords: ['hi', 'hello', 'hey', 'start', 'greetings', 'who are you', 'intro'],
      reply: `👋 Welcome to my Mission Control! I am **AERO-AI**, the interactive portfolio flight assistant. Here you can explore my journey as a **1st-Year CSE (AI & ML) student**, my intense passion for **Space Tech & Rocket Satellites**, and my **creative algorithmic art** experiments. How can I assist your exploration today?`
    },
    {
      keywords: ['space', 'rocket', 'satellites', 'cubesat', 'orbit', 'propulsion', 'launch'],
      reply: `🚀 **Space Tech & Rocket Satellites:** My deepest technical passion lies at the intersection of aerospace systems and artificial intelligence. I'm actively researching **CubeSat avionics, orbital mechanics simulation**, and **small-satellite constellation telemetry**. Check out the **[Space Tech & Satellites Lab](space-tech.html)** page to test the real-time orbit simulator!`
    },
    {
      keywords: ['ai', 'ml', 'machine learning', 'deep learning', 'neural', 'python', 'cse'],
      reply: `🧠 **AI & ML Focus:** As a 1st-year Computer Science Engineering student specializing in AI & Machine Learning, I focus on:
• Neural Networks for Satellite Imagery & Remote Sensing
• Python, NumPy, PyTorch fundamentals, and Linear Algebra
• Edge AI for low-power spaceflight microcontrollers
• Algorithmic problem solving and data structures.`
    },
    {
      keywords: ['art', 'creative', 'animation', 'enhancement', 'generative', 'design'],
      reply: `🎨 **Creative Art & Animations:** I view engineering as an art form! I love creating generative celestial art, interactive canvas shaders, particle cosmos systems, and UI telemetry enhancements. Head over to the **[Creative Art & Exploration](exploration-art.html)** page to experiment with the live generative canvas!`
    },
    {
      keywords: ['projects', 'work', 'code', 'github', 'portfolio'],
      reply: `🛠️ **Highlighted First-Year Projects:**
1. **CubeSat Orbital Telemetry Engine** - Web-based orbit calculation & altitude physics.
2. **AeroSpace Vision CNN** - Initial prototype for satellite cloud & terrain segmentation.
3. **Generative Neural Constellation** - Algorithmic particle art synchronized to mathematical fractals.
Visit the **[Projects](projects.html)** tab to inspect all builds & repositories!`
    },
    {
      keywords: ['first year', 'college', 'semester', 'education', 'background', 'year 1', 'student'],
      reply: `🎓 **Academic Journey:** Currently in my 1st Year of **B.Tech in Computer Science & Engineering (Artificial Intelligence & Machine Learning)**. Building rock-solid foundations in calculus, data structures, discrete mathematics, and aerospace telemetry computing.`
    },
    {
      keywords: ['contact', 'email', 'social', 'linkedin', 'github', 'hire', 'collaborate'],
      reply: `📫 **Connect & Transmission:** I'd love to collaborate on space tech clubs, hackathons, open-source AI projects, or student satellite teams! Hop to the **[Transmission Page](contact.html)** or drop a direct frequency ping!`
    }
  ];

  function getBotResponse(userText) {
    const text = userText.toLowerCase().trim();

    for (const item of knowledgeBase) {
      if (item.keywords.some((kw) => text.includes(kw))) {
        return item.reply;
      }
    }

    return `🛰️ *Telemetry packet received:* "${userText}". While my 1st-year CSE flight logs are constantly growing, you can ask me about **Space Tech**, **Rocket Satellites**, **AI & ML coursework**, or **Creative Art animations**! Or use the quick chips below.`;
  }

  function appendMessage(text, sender = 'bot') {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', sender);

    // Parse simple markdown links and bold formatting
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="text-decoration: underline; color: #E0F2F4; font-weight:600;">$1</a>')
      .replace(/\n/g, '<br>');

    bubble.innerHTML = formatted;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (sender === 'bot') {
      playTelemetrySound('incoming');
    }
  }

  function showBotTyping(callback) {
    const typingBubble = document.createElement('div');
    typingBubble.classList.add('chat-bubble', 'bot');
    typingBubble.innerHTML = `<span style="opacity: 0.7; font-family: var(--font-mono); font-size: 0.8rem;">🛰️ AERO-AI computing telemetry...</span>`;
    messagesContainer.appendChild(typingBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      typingBubble.remove();
      callback();
    }, 550);
  }

  function handleUserMessage(message) {
    if (!message) return;
    appendMessage(message, 'user');
    playTelemetrySound('blip');

    showBotTyping(() => {
      const reply = getBotResponse(message);
      appendMessage(reply, 'bot');
    });
  }

  // Form submission
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = chatInput.value.trim();
    if (!val) return;
    chatInput.value = '';
    handleUserMessage(val);
  });

  // Quick Chips
  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt') || chip.textContent;
      handleUserMessage(prompt);
    });
  });

  // Reset chat
  if (resetChatBtn) {
    resetChatBtn.addEventListener('click', () => {
      messagesContainer.innerHTML = '';
      appendMessage(
        `🛰️ **Terminal Reset:** Flight Assistant re-initialized. Ready to explore Space Tech, AI & ML projects, or creative visuals. Ask me anything!`,
        'bot'
      );
    });
  }

  // Initial greeting if container is empty
  if (messagesContainer.children.length === 0) {
    appendMessage(
      `🛰️ **AERO-AI Flight Deck Initialized:** Welcome! I am your interactive guide into a 1st-Year CSE (AI & ML) portfolio driven by **deep-space exploration, rocket satellites, and creative tech**. Select a mission chip below or ask any question!`,
      'bot'
    );
  }
})();
