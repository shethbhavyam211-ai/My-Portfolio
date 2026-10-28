/* ==========================================================================
   BHAVYA'S PORTFOLIO AI ASSISTANT
   Conversational Assistant for Bhavya Manish Sheth
   1st Year B.Tech CSE (AI & ML) Student
   Email: shethbhavyam211@gmail.com
   ========================================================================== */

(function initBhavyaChatbot() {
  const messagesContainer = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatForm = document.getElementById('chatForm');
  const quickChips = document.querySelectorAll('.chip');
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const resetChatBtn = document.getElementById('resetChatBtn');

  if (!messagesContainer || !chatInput || !chatForm) return;

  let audioEnabled = true;
  let audioCtx = null;

  function playTone(freq = 840, type = 'sine', duration = 0.08) {
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
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      audioToggleBtn.textContent = audioEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
    });
  }

  const knowledgeBase = [
    {
      keywords: ['hi', 'hello', 'hey', 'start', 'greetings', 'who are you', 'bhavya', 'intro'],
      reply: `👋 Hello! I am **Bhavya's AI Assistant**. Welcome to the portfolio of **Bhavya Manish Sheth**, a dedicated 1st-year **CSE (Artificial Intelligence & Machine Learning)** undergraduate student! You can ask me about Bhavya's academic journey, technical projects, creative hobbies, or how to get in touch at **shethbhavyam211@gmail.com**.`
    },
    {
      keywords: ['about', 'education', 'college', '1st year', 'first year', 'degree', 'cse', 'ai & ml'],
      reply: `🎓 **About Bhavya Manish Sheth:**
• Currently pursuing **B.Tech in Computer Science & Engineering (AI & ML)** — 1st Year.
• Focused on mastering computer science fundamentals: C, Python, Data Structures, Discrete Mathematics, and Linear Algebra for Machine Learning.
• Check out the **[About Page](about.html)** to read his full background and academic milestones!`
    },
    {
      keywords: ['projects', 'code', 'work', 'build', 'github', 'model'],
      reply: `🛠️ **Bhavya's Highlighted Projects:**
1. **Academic Performance Predictor:** ML regression model analyzing student study habits to predict grades.
2. **Interactive Algorithm Visualizer:** Dynamic visual engine for sorting and pathfinding algorithms.
3. **Smart Task & Habit Tracker:** Clean web productivity application with local persistence.
4. **Portfolio AI Agent:** This conversational frontend assistant with Web Audio synthesis!
Explore all demos on the **[Projects Page](projects.html)**!`
    },
    {
      keywords: ['skills', 'tech', 'stack', 'languages', 'python', 'tools'],
      reply: `💻 **Core Technical Toolkit:**
• **Languages:** Python, C, JavaScript, HTML5, CSS3
• **AI & ML Foundations:** NumPy, Pandas, Scikit-Learn basics, Linear Algebra & Calculus
• **Developer Tools:** Git, VS Code, Linux terminal, Canva / UI prototyping.`
    },
    {
      keywords: ['hobbies', 'interests', 'free time', 'art', 'astronomy', 'creative'],
      reply: `🎨 **Bhavya's Hobbies & Interests:**
• **Creative Coding:** Algorithmic visual generators and generative canvas art.
• **Astronomy & Space Exploration:** Avid fan of deep-space science, cosmology, and rocketry missions.
• **Strategic Gaming & Chess:** Enjoys logic puzzles, chess, and tactical problem-solving.
• **Tech & Sci-Fi Reading:** Keeping up with breakthroughs in artificial intelligence and future technology.
Visit the **[Hobbies Page](hobbies.html)** to see an interactive generative visualizer!`
    },
    {
      keywords: ['contact', 'email', 'reach', 'message', 'hire', 'collaborate'],
      reply: `📫 **Get in Touch with Bhavya:**
• **Direct Email:** [shethbhavyam211@gmail.com](mailto:shethbhavyam211@gmail.com)
• You can also send a message directly through the **[Contact Page](contact.html)**!`
    }
  ];

  function getBotResponse(userText) {
    const text = userText.toLowerCase().trim();
    for (const item of knowledgeBase) {
      if (item.keywords.some((kw) => text.includes(kw))) {
        return item.reply;
      }
    }
    return `💡 Thanks for asking! I'm Bhavya's portfolio assistant. You can ask me about Bhavya's **education**, **1st-year AI/ML projects**, **skills**, **hobbies**, or reach out to him directly at **shethbhavyam211@gmail.com**.`;
  }

  function appendMessage(text, sender = 'bot') {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', sender);

    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="text-decoration: underline; color: #81e9e6; font-weight:600;">$1</a>')
      .replace(/\n/g, '<br>');

    bubble.innerHTML = formatted;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (sender === 'bot') {
      playTone(660, 'sine', 0.1);
    }
  }

  function showBotTyping(callback) {
    const typingBubble = document.createElement('div');
    typingBubble.classList.add('chat-bubble', 'bot');
    typingBubble.innerHTML = `<span style="opacity: 0.7; font-family: var(--font-mono); font-size: 0.8rem;">⚡ Bhavya-AI is thinking...</span>`;
    messagesContainer.appendChild(typingBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      typingBubble.remove();
      callback();
    }, 450);
  }

  function handleUserMessage(message) {
    if (!message) return;
    appendMessage(message, 'user');
    playTone(880, 'sine', 0.05);

    showBotTyping(() => {
      const reply = getBotResponse(message);
      appendMessage(reply, 'bot');
    });
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = chatInput.value.trim();
    if (!val) return;
    chatInput.value = '';
    handleUserMessage(val);
  });

  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt') || chip.textContent;
      handleUserMessage(prompt);
    });
  });

  if (resetChatBtn) {
    resetChatBtn.addEventListener('click', () => {
      messagesContainer.innerHTML = '';
      appendMessage(
        `👋 **Assistant Reset:** Hi! How can I help you learn more about **Bhavya Manish Sheth**?`,
        'bot'
      );
    });
  }

  if (messagesContainer.children.length === 0) {
    appendMessage(
      `👋 **Welcome!** I am the AI assistant for **Bhavya Manish Sheth** — 1st-Year CSE (AI & ML) student. Feel free to click any suggestion below or ask me about Bhavya's background, projects, or hobbies!`,
      'bot'
    );
  }
})();
