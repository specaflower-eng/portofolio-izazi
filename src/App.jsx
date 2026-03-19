import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeModal, setActiveModal] = useState(null);

  const canvasRef = useRef(null);

  // Efek Typewriter
  useEffect(() => {
    if (!isLoading) {
      const typePhrases = [
        "Network Systems Administrator.",
        "IoT Hardware Integrator.",
        "Full-Stack Web Developer.",
        "Cybersecurity Enthusiast."
      ];
      let currentPhraseIndex = 0;
      let currentCharIndex = 0;
      let isDeletingWord = false;
      let typeSpeed = 80;

      const typeWriterEffect = () => {
        const textElement = document.getElementById("typewriter");
        if (!textElement) return;

        const fullPhrase = typePhrases[currentPhraseIndex];
        
        if (isDeletingWord) {
          textElement.innerText = fullPhrase.substring(0, currentCharIndex - 1);
          currentCharIndex--;
          typeSpeed = 40; 
        } else {
          textElement.innerText = fullPhrase.substring(0, currentCharIndex + 1);
          currentCharIndex++;
          typeSpeed = 80; 
        }

        if (!isDeletingWord && currentCharIndex === fullPhrase.length) {
          isDeletingWord = true;
          typeSpeed = 2000; 
        } else if (isDeletingWord && currentCharIndex === 0) {
          isDeletingWord = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % typePhrases.length;
          typeSpeed = 600; 
        }
        
        setTimeout(typeWriterEffect, typeSpeed);
      };
      
      typeWriterEffect();
    }
  }, [isLoading]);

  // Loader Timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll & Intersection Observers
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);

      const sections = document.querySelectorAll('section');
      sections.forEach(sec => {
        const secTop = sec.offsetTop;
        const secHeight = sec.clientHeight;
        if (window.scrollY >= (secTop - secHeight / 3)) {
          setActiveSection(sec.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Animasi Reveal (Muncul dari bawah/samping)
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      revealObserver.observe(el);
    });

    // Animasi Skill Bar
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      skillObserver.observe(bar);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
      skillObserver.disconnect();
    };
  }, []);

  // 3D Tilt Card Effect
  useEffect(() => {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    const handleMouseMove = (e, card) => {
      if(window.innerWidth > 1024) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      }
    };

    const handleMouseLeave = (card) => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
    };

    const handleMouseEnter = (card) => {
      card.style.transition = 'none'; 
    };

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => handleMouseLeave(card));
      card.addEventListener('mouseenter', () => handleMouseEnter(card));
    });

    return () => {
      // Cleanup for tilt cards if necessary
    };
  }, [isLoading]);

  // Canvas Network Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    let canvasW, canvasH, nodeParticlesArray;
    let interactPointer = { 
      x: null, 
      y: null, 
      radius: window.innerWidth > 768 ? 180 : 120 
    };
    let animationFrameId;

    const handleMouseMove = (e) => {
      interactPointer.x = e.clientX;
      interactPointer.y = e.clientY + window.scrollY; 
    };
    const handleTouchMove = (e) => {
      interactPointer.x = e.touches[0].clientX;
      interactPointer.y = e.touches[0].clientY + window.scrollY;
    };
    const handleMouseOut = () => {
      interactPointer.x = null;
      interactPointer.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, {passive: true});
    window.addEventListener('mouseout', handleMouseOut);

    class NetworkNodeParticle {
      constructor() {
        this.x = Math.random() * canvasW;
        this.y = Math.random() * canvasH;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.baseColor = "rgba(0, 246, 255, 0.4)";
      }
      
      updatePosition() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x > canvasW || this.x < 0) this.vx = -this.vx;
        if (this.y > canvasH || this.y < 0) this.vy = -this.vy;

        if(interactPointer.x !== null && interactPointer.y !== null) {
          let dx = interactPointer.x - this.x;
          let dy = interactPointer.y - this.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          
          if(dist < interactPointer.radius) {
            const forceDirectionX = dx / dist;
            const forceDirectionY = dy / dist;
            const forceFactor = (interactPointer.radius - dist) / interactPointer.radius;
            
            this.x -= forceDirectionX * forceFactor * 3;
            this.y -= forceDirectionY * forceFactor * 3;
          }
        }
      }
      
      renderNode() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor;
        ctx.fill();
      }
    }

    function setupCanvasEnvironment() {
      canvasW = window.innerWidth;
      const heroEl = document.getElementById('hero');
      canvasH = heroEl ? heroEl.offsetHeight : window.innerHeight; 
      
      canvas.width = canvasW;
      canvas.height = canvasH;
      
      nodeParticlesArray = [];
      
      let densityFactor = (canvasW * canvasH) / 10000;
      if(canvasW < 768) densityFactor = (canvasW * canvasH) / 8000; 
      
      if(densityFactor > 120) densityFactor = 120;
      
      for (let i = 0; i < densityFactor; i++) {
        nodeParticlesArray.push(new NetworkNodeParticle());
      }
    }

    function renderNetworkLines() {
      let lineOpacity = 1;
      for (let a = 0; a < nodeParticlesArray.length; a++) {
        for (let b = a; b < nodeParticlesArray.length; b++) {
          let dx = nodeParticlesArray[a].x - nodeParticlesArray[b].x;
          let dy = nodeParticlesArray[a].y - nodeParticlesArray[b].y;
          let distanceSq = (dx * dx) + (dy * dy);
          
          let connectThreshold = (canvas.width / 8) * (canvas.height / 8);
          
          if (distanceSq < connectThreshold) {
            lineOpacity = 1 - (distanceSq / connectThreshold);
            ctx.strokeStyle = `rgba(0, 246, 255, ${lineOpacity * 0.25})`;
            ctx.lineWidth = 1;
            
            ctx.beginPath();
            ctx.moveTo(nodeParticlesArray[a].x, nodeParticlesArray[a].y);
            ctx.lineTo(nodeParticlesArray[b].x, nodeParticlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function runEngineLoop() {
      animationFrameId = requestAnimationFrame(runEngineLoop);
      ctx.clearRect(0, 0, canvasW, canvasH);
      
      for (let i = 0; i < nodeParticlesArray.length; i++) {
        nodeParticlesArray[i].updatePosition();
        nodeParticlesArray[i].renderNode();
      }
      renderNetworkLines();
    }

    setupCanvasEnvironment();
    runEngineLoop();

    const handleResize = () => setupCanvasEnvironment();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoading]);

  // Modal ESC Key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if(e.key === "Escape" && activeModal) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  // Handlers
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const openModal = (id) => {
    setActiveModal(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'auto';
  };

  const handleModalOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  const sendToWhatsApp = (e) => {
    e.preventDefault(); 
    
    const nameInput = document.getElementById('waName').value.trim();
    const subjectInput = document.getElementById('waSubject').value.trim();
    const messageInput = document.getElementById('waMessage').value.trim();
    
    const phoneNumber = "6289698349980";
    const templatePesan = `Halo Izazi,%0A%0ASaya tertarik dengan profil teknis dan portofolio Anda.%0A%0A*---------- INFORMASI PENGIRIM ----------*%0ANama : ${encodeURIComponent(nameInput)}%0ASubjek : ${encodeURIComponent(subjectInput)}%0A%0A*---------- PESAN DETAIL ----------*%0A${encodeURIComponent(messageInput)}%0A%0A-----------------------------------------`;
    
    const apiURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${templatePesan}`;
    window.open(apiURL, '_blank');
  };

  return (
    <div className="App">
      {/* LOADER */}
      <div id="loader" style={{ opacity: isLoading ? '1' : '0', visibility: isLoading ? 'visible' : 'hidden' }}>
        <div className="loader-content">
          <div className="cyber-loader"></div>
          <div style={{ color: 'var(--primary)', letterSpacing: '3px', fontWeight: 600 }}>ESTABLISHING CONNECTION...</div>
        </div>
      </div>

      <header id="header" className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-wrapper">
          <a href="#hero" className="logo">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </div>
            IZAZI
          </a>
          <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} id="mobile-menu-btn" onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </div>
          <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="nav-links">
            <a href="#hero" className={`nav-item ${activeSection === 'hero' ? 'active' : ''}`} onClick={closeMenu}>System.Home()</a>
            <a href="#about" className={`nav-item ${activeSection === 'about' ? 'active' : ''}`} onClick={closeMenu}>About.exe</a>
            <a href="#skills" className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`} onClick={closeMenu}>Skills.config</a>
            <a href="#projects" className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`} onClick={closeMenu}>Projects.log</a>
            <a href="#timeline" className={`nav-item ${activeSection === 'timeline' ? 'active' : ''}`} onClick={closeMenu}>Timeline.dat</a>
            <a href="#contact" className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`} onClick={closeMenu}>Contact.sh</a>
          </nav>
        </div>
      </header>

      <section id="hero">
        <canvas id="canvas-network" ref={canvasRef}></canvas>
        <div className="container">
          <div className="hero-content reveal">
            <div className="status-badge">
              <span className="status-dot"></span> System Online & Ready for Deployment
            </div>
            <h1 className="hero-title">Muhammad <br/><span className="text-gradient">Izazi Dewanto</span></h1>
            
            <div className="hero-subtitle">
              &gt; <span className="typed-text" id="typewriter"></span><span className="cursor"></span>
            </div>
            
            <p className="hero-desc">
              Mahasiswa Teknik Multimedia dan Jaringan dengan spesialisasi mendalam pada pengembangan sistem cerdas <i>End-to-End</i>. Saya memadukan keahlian merancang sirkuit <i>hardware</i> IoT, mengkonfigurasi arsitektur jaringan skala <i>enterprise</i>, hingga menulis kode untuk aplikasi <i>Full-Stack</i>.
            </p>
            
            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                Deploy Projects 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '10px' }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              
              <div className="social-links">
                <a href="https://www.linkedin.com/in/izazi-dewanto-670b722a6" target="_blank" rel="noreferrer" className="social-link" title="Connect on LinkedIn">
                  <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://instagram.com/izaaaze" target="_blank" rel="noreferrer" className="social-link" title="Follow Instagram @izaaaze">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="bg-glow-1"></div>
        <div className="container">
          <div className="section-header reveal-left">
            <span className="section-subtitle">01. Architecting Solutions</span>
            <h2 className="section-title">Bridging Hardware & Code.</h2>
          </div>
          
          <div className="bento-grid">
            <div className="bento-item bento-intro glass-panel reveal">
              <h3 className="highlight-text">Hello World, I'm Izazi.</h3>
              <div className="about-text">
                <p>
                  Sebagai mahasiswa tingkat akhir di Politeknik Negeri Jakarta, saya tidak hanya belajar teori, melainkan <strong>terjun langsung memecahkan masalah kompleks</strong> melalui teknologi yang terintegrasi. 
                </p>
                <p>
                  Fokus utama saya adalah membangun ekosistem <i>End-to-End</i>. Mengapa? Karena perangkat keras yang canggih (IoT) tidak akan maksimal tanpa fondasi jaringan (Network) yang stabil, dan jaringan yang cepat butuh antarmuka (Software) yang brilian agar dapat digunakan manusia.
                </p>
                <p>
                  Saya terbiasa memimpin tim development dengan metodologi <i>Agile</i>, memastikan setiap baris kode, arsitektur database, dan sirkuit mikrokontroler berfungsi presisi serta mengutamakan <strong>Cybersecurity</strong> di setiap layernya.
                </p>
              </div>
            </div>

            <div className="bento-item bento-philosophy glass-panel reveal-right">
              <div className="icon-box" style={{ marginBottom: '20px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>Engineering <br/><span className="text-gradient">Philosophy</span></h3>
              <p style={{ color: 'var(--text-dark)', lineHeight: 1.7 }}>
                <i>"Hardware butuh 'otak' agar cerdas. Software butuh 'tubuh' agar berdampak nyata."</i><br/><br/>
                Sistem terbaik bukanlah yang paling rumit, melainkan yang paling efisien dalam mengkomunikasikan data dari node terbawah hingga ke cloud dashboard.
              </p>
            </div>

            <div className="bento-item bento-card glass-panel reveal">
              <div className="icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              </div>
              <h3>IoT & Embedded</h3>
              <p>Merancang sirkuit dan program ESP32/Arduino terintegrasi sensor presisi.</p>
            </div>

            <div className="bento-item bento-card glass-panel reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              </div>
              <h3>Network Eng.</h3>
              <p>Desain arsitektur LAN, administrasi Linux server, dan setup DNS/Firewall.</p>
            </div>

            <div className="bento-item bento-card glass-panel reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
              </div>
              <h3>Full-stack Dev</h3>
              <p>Membangun Web MVC (Laravel) & antarmuka Mobile (Android/Flutter).</p>
            </div>

            <div className="bento-item bento-card glass-panel reveal" style={{ transitionDelay: '0.3s' }}>
              <div className="icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
              </div>
              <h3>Cybersecurity</h3>
              <p>Pemahaman hardening server dan fundamental Web Security (Pentest).</p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <div className="section-header reveal-left">
            <span className="section-subtitle">02. Technical Capabilities</span>
            <h2 className="section-title">Hardware to Cloud.</h2>
          </div>

          <div className="skills-wrapper">
            <div className="skill-group glass-panel reveal">
              <h3>
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>
                IoT & Edge Computing
              </h3>
              
              <div className="skill-item">
                <div className="skill-header"><span className="skill-name">Microcontrollers (ESP32, RPi, Arduino)</span><span className="skill-pct">95%</span></div>
                <div className="skill-bar-bg"><div className="skill-bar-fill" data-width="95%"></div></div>
              </div>
              <div className="skill-item">
                <div className="skill-header"><span className="skill-name">Sensor Integration & WSN</span><span className="skill-pct">90%</span></div>
                <div className="skill-bar-bg"><div className="skill-bar-fill" data-width="90%"></div></div>
              </div>
              <div className="skill-item">
                <div className="skill-header"><span className="skill-name">MQTT & IoT Protocols</span><span className="skill-pct">85%</span></div>
                <div className="skill-bar-bg"><div className="skill-bar-fill" data-width="85%"></div></div>
              </div>
              
              <div className="tools-cloud">
                <span className="tool-tag">RFID MFRC522</span>
                <span className="tool-tag">Ultrasonic HC-SR04</span>
                <span className="tool-tag">ESP8266</span>
                <span className="tool-tag">DHT Sensors</span>
                <span className="tool-tag">Circuit Design</span>
              </div>
            </div>

            <div className="skill-group glass-panel reveal" style={{ transitionDelay: '0.15s' }}>
              <h3>
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg></div>
                Software Development
              </h3>
              
              <div className="skill-item">
                <div className="skill-header"><span className="skill-name">C/C++ (Embedded) & Python (AI/Logic)</span><span className="skill-pct">90%</span></div>
                <div className="skill-bar-bg"><div className="skill-bar-fill" data-width="90%"></div></div>
              </div>
              <div className="skill-item">
                <div className="skill-header"><span className="skill-name">PHP (Laravel Framework) & SQL</span><span className="skill-pct">85%</span></div>
                <div className="skill-bar-bg"><div className="skill-bar-fill" data-width="85%"></div></div>
              </div>
              <div className="skill-item">
                <div className="skill-header"><span className="skill-name">Java (Android) & JavaScript (React/Node)</span><span className="skill-pct">80%</span></div>
                <div className="skill-bar-bg"><div className="skill-bar-fill" data-width="80%"></div></div>
              </div>

              <div className="tools-cloud">
                <span className="tool-tag">Firebase RTDB</span>
                <span className="tool-tag">MySQL/SQLite</span>
                <span className="tool-tag">Docker</span>
                <span className="tool-tag">Git/GitHub</span>
                <span className="tool-tag">YOLOv8 AI</span>
              </div>
            </div>

            <div className="skill-group glass-panel reveal" style={{ transitionDelay: '0.3s' }}>
              <h3>
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg></div>
                Networking & Security
              </h3>
              
              <div className="skill-item">
                <div className="skill-header"><span className="skill-name">Linux Admin & Bash Automation</span><span className="skill-pct">85%</span></div>
                <div className="skill-bar-bg"><div className="skill-bar-fill" data-width="85%"></div></div>
              </div>
              <div className="skill-item">
                <div className="skill-header"><span className="skill-name">Cisco Architecture </span><span className="skill-pct">80%</span></div>
                <div className="skill-bar-bg"><div className="skill-bar-fill" data-width="80%"></div></div>
              </div>
              <div className="skill-item">
                <div className="skill-header"><span className="skill-name">Cybersecurity </span><span className="skill-pct">75%</span></div>
                <div className="skill-bar-bg"><div className="skill-bar-fill" data-width="75%"></div></div>
              </div>

              <div className="tools-cloud">
                <span className="tool-tag">Ubuntu Server / Kali</span>
                <span className="tool-tag">Apache2</span>
                <span className="tool-tag">DNS Config</span>
                <span className="tool-tag">UFW Firewall</span>
                <span className="tool-tag">TUI Dialog</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <div className="section-header reveal-left">
            <span className="section-subtitle">03. Portfolios & Case Studies</span>
            <h2 className="section-title">Engineering Showcase.</h2>
            <p style={{ color: 'var(--text-dark)', maxWidth: '700px', fontSize: '1.1rem' }}>
              Kumpulan proyek terpilih yang membuktikan kemampuan implementasi sistem nyata. Mulai dari merakit <i>hardware</i>, merutekan jaringan, hingga membangun antarmuka <i>software</i> yang intuitif.
            </p>
          </div>

          <div className="featured-projects-grid">
            <div className="project-card featured-card reveal tilt-card" onClick={() => openModal('modal-p1')}>
              <div className="featured-badge">⭐ TOP PROJECT</div>
              <div className="project-img-wrapper">
                <img src="/assets/classroom/foto.jpg" alt="Thumbnail" className="project-img"/>
              </div>
              <div className="project-content">
                <div className="project-tags"><span>IoT</span><span>YOLOv8 AI</span><span>React.js</span></div>
                <h3 className="project-title">Smart Monitoring Classroom & Validasi Kehadiran</h3>
                <p className="project-desc">Sistem cerdas end-to-end untuk pantau okupansi kelas via AI Camera dan validasi dosen menggunakan RFID ESP32 melalui protokol MQTT.</p>
                <span className="btn-view">View Details <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
              </div>
            </div>

            <div className="project-card featured-card reveal tilt-card" style={{ transitionDelay: '0.1s' }} onClick={() => openModal('modal-p2')}>
              <div className="featured-badge">⭐ TOP PROJECT</div>
              <div className="project-img-wrapper">
                <img src="/assets/z car/zcar.jpg" alt="Thumbnail" className="project-img"/>
              </div>
              <div className="project-content">
                <div className="project-tags"><span>Robotics</span><span>ESP32</span><span>Flutter Android</span></div>
                <h3 className="project-title">Smart Car 4-Mode Controller</h3>
                <p className="project-desc">Pengembangan robot mobil canggih dengan mikrokontroler ESP32, dikendalikan real-time multi-platform via Firebase Database.</p>
                <span className="btn-view">View Details <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
              </div>
            </div>
          </div>

          <h3 className="section-subtitle reveal" style={{ marginBottom: '30px', marginTop: '40px', color: 'var(--text-dark)' }}>Other Case Studies</h3>

          <div className="projects-grid">
            <div className="project-card reveal tilt-card" onClick={() => openModal('modal-p3')}>
              <div className="project-img-wrapper">
                <img src="/assets/parking/foto.jpeg" alt="Thumbnail" className="project-img"/>
              </div>
              <div className="project-content">
                <div className="project-tags"><span>WSN</span><span>ESP8266</span><span>Sensors</span></div>
                <h3 className="project-title">Sistem Parkir Pintar Berbasis WSN IoT</h3>
                <p className="project-desc">Arsitektur Wireless Sensor Network menggunakan node ESP8266, sensor Infrared, dan RFID untuk manajemen lahan parkir efisien.</p>
                <span className="btn-view">View Details <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
              </div>
            </div>

            <div className="project-card reveal tilt-card" style={{ transitionDelay: '0.1s' }} onClick={() => openModal('modal-p4')}>
              <div className="project-img-wrapper">
                <img src="/assets/dustbin/dustbin.png" alt="Thumbnail" className="project-img"/>
              </div>
              <div className="project-content">
                <div className="project-tags"><span>Embedded</span><span>Arduino Uno</span><span>C++</span></div>
                <h3 className="project-title">Automatic Smart Dustbin</h3>
                <p className="project-desc">Prototipe hardware kebersihan touchless, presisi mengukur jarak objek menggunakan sensor ultrasonik untuk aktuasi motor servo tutup tong.</p>
                <span className="btn-view">View Details <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
              </div>
            </div>

            <div className="project-card reveal tilt-card" style={{ transitionDelay: '0.2s' }} onClick={() => openModal('modal-p5')}>
              <div className="project-img-wrapper">
                <img src="/assets/cofeeshop/topologi.png" alt="Thumbnail" className="project-img"/>
              </div>
              <div className="project-content">
                <div className="project-tags"><span>Network Design</span><span>Cisco Packet Tracer</span></div>
                <h3 className="project-title">Smart Coffee Shop Simulation</h3>
                <p className="project-desc">Merancang simulasi virtual topologi jaringan IoT tersegmentasi untuk otomasi gedung (AC cerdas berbasis suhu dan pintu motion sensor).</p>
                <span className="btn-view">View Details <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
              </div>
            </div>

            <div className="project-card reveal tilt-card" onClick={() => openModal('modal-p6')}>
              <div className="project-img-wrapper">
                <img src="/assets/libraryz/dashboard.jpg" alt="Thumbnail" className="project-img"/>
              </div>
              <div className="project-content">
                <div className="project-tags"><span>Laravel PHP</span><span>MySQL</span><span>MVC Architecture</span></div>
                <h3 className="project-title">Library Management System Web App</h3>
                <p className="project-desc">Sistem Informasi Perpustakaan skala enterprise dengan arsitektur MVC, mengamankan data dengan Role-Based Access Control (RBAC) Laravel.</p>
                <span className="btn-view">View Details <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
              </div>
            </div>

            <div className="project-card reveal tilt-card" style={{ transitionDelay: '0.1s' }} onClick={() => openModal('modal-p7')}>
              <div className="project-img-wrapper">
                <img src="/assets/cinemaapp/1.jpg" alt="Thumbnail" className="project-img"/>
              </div>
              <div className="project-content">
                <div className="project-tags"><span>Android Java</span><span>Firebase RTDB</span></div>
                <h3 className="project-title">Cinema App (My Watchlist Tracker)</h3>
                <p className="project-desc">Aplikasi mobile native Android pengelolaan database film favorit, tersinkronisasi realtime ke cloud Firebase dengan struktur UI responsif.</p>
                <span className="btn-view">View Details <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
              </div>
            </div>

            <div className="project-card reveal tilt-card" onClick={() => openModal('modal-p9')}>
              <div className="project-img-wrapper">
                <img src="/assets/bash/main.jpg" alt="Thumbnail" className="project-img"/>
              </div>
              <div className="project-content">
                <div className="project-tags"><span>Bash Scripting</span><span>TUI Linux</span><span>Cronjobs</span></div>
                <h3 className="project-title">DNS Resolver & Monitoring Script Utility</h3>
                <p className="project-desc">Memprogram script utility terminal Linux (Bash) interaktif TUI untuk analisis query DNS dan cronjob ping otomatis mendeteksi server down.</p>
                <span className="btn-view">View Details <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="timeline">
        <div className="container">
          <div className="section-header reveal-left" style={{ textAlign: 'center', margin: '0 auto 4rem auto' }}>
            <span className="section-subtitle" style={{ justifyContent: 'center' }}>04. Academic Background</span>
            <h2 className="section-title">Education & Credentials.</h2>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline-item reveal-left">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">2023 - Sekarang</span>
                <h3 className="timeline-title">Politeknik Negeri Jakarta</h3>
                <h4 className="timeline-subtitle">Diploma IV Teknik Multimedia dan Jaringan</h4>
                <p style={{ color: 'var(--text-dark)', fontSize: '1rem', lineHeight: 1.6 }}>
                  Fokus akademik komprehensif pada rekayasa infrastruktur jaringan skala menengah-besar, pemrograman berorientasi objek, keamanan siber dasar, dan arsitektur sistem tersebar.
                  <br/><br/><strong style={{ color: 'var(--primary)' }}>Pencapaian: IPK 3.89 / 4.0</strong> | Depok, Jawa Barat.
                </p>
              </div>
            </div>

            <div className="timeline-item reveal-right">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">2023 - 2025</span>
                <h3 className="timeline-title">CCIT Fakultas Teknik Universitas Indonesia</h3>
                <h4 className="timeline-subtitle">Internet-based System Automation (ISA)</h4>
                <p style={{ color: 'var(--text-dark)', fontSize: '1rem', lineHeight: 1.6 }}>
                  Pendalaman intensif dalam perancangan sistem otomatisasi berbasis Internet of Things (IoT). Menguasai integrasi mikrokontroler dengan cloud database dan pengembangan web pendukung.
                  <br/><br/><strong style={{ color: 'var(--primary)' }}>Pencapaian: IPK 3.89 / 4.0</strong> | Depok, Jawa Barat.
                </p>
              </div>
            </div>

            <div className="timeline-item reveal-left">
              <div className="timeline-dot" style={{ background: 'var(--primary)' }}></div>
              <div className="timeline-content" style={{ borderColor: 'var(--primary)', boxShadow: '0 0 30px rgba(0, 246, 255, 0.1)' }}>
                <span className="timeline-date" style={{ background: 'var(--primary)', color: 'var(--bg-base)' }}>Sertifikasi Profesional Terverifikasi</span>
                <h3 className="timeline-title">Licenses & Credentials</h3>
                <ul className="cert-list">
                  <li><strong>Robotic: Internet of Things</strong> — BISA AI Academy (Juli 2025)</li>
                  <li><strong>Basic Web Security Pentester & Hacking</strong> — (September 2025)</li>
                  <li><strong>Junior Cyber Security</strong> — Digitalent Scholarship Kementerian Kominfo RI (2025)</li>
                  <li><strong>Introduction to IoT</strong> — Cisco Networking Academy (November 2024)</li>
                  <li><strong>Introduction to Cybersecurity</strong> — Cisco Networking Academy (Juli 2024)</li>
                  <li><strong>HCIA-Datacon V1.0 Course</strong> — Huawei ICT Academy</li>
                  <li><strong>Cognitive Class Data Science</strong> — Methodology, 101, & Tools IBM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="section-header reveal-left">
            <span className="section-subtitle">05. Initiation Protocol</span>
            <h2 className="section-title">Let's Build Together.</h2>
          </div>

          <div className="contact-grid">
            <div className="contact-info reveal-left">
              <p>Mencari *Engineer* dengan pola pikir pemecahan masalah end-to-end? Baik itu untuk kolaborasi integrasi sensor hardware, optimasi query database, hingga perancangan arsitektur keamanan jaringan, mari kita diskusikan solusinya secara teknis.</p>
              
              <div className="contact-cards">
                <div className="contact-card">
                  <div className="icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  </div>
                  <div className="contact-detail">
                    <h4>Email Address</h4>
                    <a href="mailto:iza6azee@gmail.com">iza6azee@gmail.com</a>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </div>
                  <div className="contact-detail">
                    <h4>Professional Network</h4>
                    <a href="https://www.linkedin.com/in/izazi-dewanto-670b722a6" target="_blank" rel="noreferrer">linkedin.com/in/izazi-dewanto</a>
                  </div>
                </div>
                
                <div className="contact-card">
                  <div className="icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </div>
                  <div className="contact-detail">
                    <h4>Instagram</h4>
                    <a href="https://instagram.com/izaaaze" target="_blank" rel="noreferrer">@izaaaze</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container reveal-right">
              <div className="form-header">
                <h3>Send a Ping <span style={{ color: 'var(--primary)' }}>_</span></h3>
                <p>Kirim pesan langsung ke WhatsApp saya secara otomatis.</p>
              </div>
              
              <form id="waForm" className="contact-form" onSubmit={sendToWhatsApp}>
                <div className="form-group">
                  <label className="form-label" htmlFor="waName">Identitas Pengirim</label>
                  <input type="text" id="waName" className="form-control" required placeholder="Contoh: Budi (HRD / Tech Lead)"/>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="waSubject">Subjek / Keperluan</label>
                  <input type="text" id="waSubject" className="form-control" required placeholder="Contoh: Tawaran Kolaborasi Proyek Embedded IoT"/>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="waMessage">Pesan Detail</label>
                  <textarea id="waMessage" className="form-control" required placeholder="Halo Izazi, saya melihat portofolio Anda dan tertarik mendiskusikan..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', borderRadius: 'var(--border-radius-sm)' }}>
                  Execute Message -&gt; WhatsApp 
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '10px' }}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon></svg>
            IZAZI<span>.</span>
          </div>
          <p className="footer-text">
            &copy; by : Muhammad Izazi Dewanto
          </p>
        </div>
      </footer>

      {/* MODALS */}
      <div className={`modal-overlay ${activeModal === 'modal-p1' ? 'active' : ''}`} id="modal-p1" onClick={handleModalOverlayClick}>
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-header-text">
              <span className="modal-role">Lead Developer & AI/Hardware Integrator</span>
              <h3>Smart Monitoring Classroom & Validasi Presensi</h3>
            </div>
            <div className="modal-close" onClick={closeModal}>✕</div>
          </div>
          <div className="modal-body">
            <div className="modal-gallery">
              <img src="/assets/classroom/cara kerja.jpeg" alt="Gallery"/>
              <img src="/assets/classroom/foto.jpg" alt="Gallery"/>
              <img src="/assets/classroom/dashboard.jpg" alt="Gallery"/>
              <img src="/assets/classroom/admin.jpg" alt="Gallery"/>
              <img src="/assets/classroom/hardware.jpg" alt="Gallery"/>
              <img src="/assets/classroom/topologi.jpg" alt="Gallery"/>
              <img src="/assets/classroom/b.jpg" alt="Gallery"/>
            </div>
            <div className="modal-section-title">Konsep Arsitektur Sistem</div>
            <p className="modal-text">Sistem ini direkayasa untuk menyelesaikan inefisiensi pencatatan kehadiran manual serta memastikan efisiensi penggunaan ruang kelas. Dengan mengkombinasikan komputasi kecerdasan buatan (*Edge AI Computing*) di level lokal dan sistem mikrokontroler IoT, data diproses cepat sebelum dikirim ke server pusat.</p>
            
            <div className="modal-section-title">Fitur & Implementasi Kunci</div>
            <ul className="modal-feature-list">
              <li><strong>Edge AI Object Detection:</strong> Model Deep Learning YOLOv8 di-deploy langsung di Raspberry Pi. Memproses frame video lokal secara real-time untuk menghitung okupansi mahasiswa di kelas tanpa delay internet tinggi.</li>
              <li><strong>Hardware NodeMCU ESP32:</strong> Bertindak sebagai gateway lokal penerima input kartu identitas.</li>
              <li><strong>Integrasi RFID MFRC522:</strong> Modul radio frequency di-coding dengan C++ untuk membaca UID (Unique ID) kartu dosen sebagai proses autentikasi kelas aktif.</li>
              <li><strong>Protokol Lightweight MQTT:</strong> Transmisi data dari ESP32 (Publish) ke server Broker menggunakan payload sangat kecil, mengalahkan performa request HTTP konvensional dalam segi kecepatan.</li>
              <li><strong>Dashboard Fullstack React + Flask:</strong> Backend dibangun dengan Python Flask untuk logika REST API data historis, sementara Frontend memakai React.js untuk web soket grafik live tanpa refresh.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`modal-overlay ${activeModal === 'modal-p2' ? 'active' : ''}`} id="modal-p2" onClick={handleModalOverlayClick}>
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-header-text">
              <span className="modal-role">IoT Robotics & Mobile Developer</span>
              <h3>Smart Car 4-Mode Controller</h3>
            </div>
            <div className="modal-close" onClick={closeModal}>✕</div>
          </div>
          <div className="modal-body">
            <div className="modal-gallery">
              <img src="/assets/z car/zcar.jpg" alt="Robot Fisik"/>
              <img src="/assets/z car/desain.jpg" alt="Aplikasi Control"/>
              <img src="/assets/z car/dashboard.png" alt="Komponen"/>
              <img src="/assets/z car/manual.jpeg" alt="Komponen"/>
            </div>
            <div className="modal-section-title">Deskripsi Proyek</div>
            <p className="modal-text">Pengembangan robot mobil edukatif yang dapat bermanuver dalam 4 mode operasi berbeda. Proyek ini memadukan kelistrikan mekanik motor dengan logika software cloud. Tujuan utamanya adalah mendemonstrasikan bagaimana perintah remote dari smartphone Android dapat diterima oleh hardware fisik dengan latensi nyaris nol via jaringan internet global, bukan sekadar bluetooth lokal.</p>
            
            <div className="modal-section-title">Fitur & Arsitektur Sistem</div>
            <ul className="modal-feature-list">
              <li><strong>Core Mikrokontroler ESP32:</strong> Otak pemrosesan sinyal WiFi on-board yang menerima stream data json secara kontinu.</li>
              <li><strong>Sistem Penggerak L298N:</strong> Modul driver motor yang mengelola arus tegangan tinggi dari baterai Li-ion ke dinamo DC tanpa merusak sirkuit ESP32.</li>
              <li><strong>Mobile App Control UI:</strong> Aplikasi native Android dikembangkan menggunakan framework *Flutter* yang menyediakan *joystick virtual* responsif.</li>
              <li><strong>Firebase Realtime Database (RTDB):</strong> Digunakan sebagai perantara *Cloud* NoSQL. Saat pengguna menggerakkan joystick di HP, nilai variabel X/Y berubah di Firebase, dan ESP32 di lokasi berbeda me-*listen* perubahan state tersebut secara instan.</li>
              <li><strong>4 Multi-Mode Logic:</strong> (1) Mode Manual Joystick, (2) Mode Line Follower (Sensor Garis), (3) Mode Obstacle Avoidance (Ultrasonik Otomatis), (4) Mode Voice Command.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`modal-overlay ${activeModal === 'modal-p3' ? 'active' : ''}`} id="modal-p3" onClick={handleModalOverlayClick}>
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-header-text">
              <span className="modal-role">System Architect & Firmware Engineer</span>
              <h3>Sistem Parkir Pintar Berbasis WSN IoT</h3>
            </div>
            <div className="modal-close" onClick={closeModal}>✕</div>
          </div>
          <div className="modal-body">
            <div className="modal-gallery">
              <img src="/assets/parking/dashboard.jpg" alt="Maket Parkir"/>
              <img src="/assets/parking/hrd.jpg" alt="Sensor"/>
              <img src="/assets/parking/skema.jpg" alt="Dashboard"/>
            </div>
            <div className="modal-section-title">Konsep Skalabilitas Jaringan</div>
            <p className="modal-text">Bagaimana cara memantau 100 slot parkir tanpa menarik kabel ke setiap kotak? Solusinya adalah arsitektur <i>Wireless Sensor Network</i> (WSN). Sistem ini menempatkan sensor mandiri bertenaga kecil (Node) di tiap lokasi yang saling berkomunikasi nirkabel untuk mengirimkan status keterisian slot parkir secara hierarkis menuju *Gateway* pusat.</p>
            
            <div className="modal-section-title">Fitur & Arsitektur Hardware</div>
            <ul className="modal-feature-list">
              <li><strong>Topologi WSN Multi-Node:</strong> Menggunakan banyak modul WiFi ekonomis ESP8266 terdistribusi yang dikelompokkan dalam mesh/star network.</li>
              <li><strong>Sensor Infrared (IR) Obstacle:</strong> Diimplementasikan pada tiap node slot parkir untuk mendeteksi pantulan cahaya dari bawah mobil. Jauh lebih hemat daya dibanding ultrasonik.</li>
              <li><strong>Otentikasi Gerbang RFID:</strong> Palang otomatis hanya terbuka jika sistem memvalidasi UID kartu (mencocokkan data member yang tersimpan di SQL database).</li>
              <li><strong>Optimasi Deep Sleep ESP:</strong> Firmware ditulis sedemikian rupa agar sensor tidur saat tidak ada mobil dan hanya bangun (transmit Wi-Fi) saat status berubah, memperpanjang umur baterai drastis.</li>
              <li><strong>Live Status Dashboard:</strong> Web monitoring yang mem-parsing data API ketersediaan slot kosong (Merah: Isi, Hijau: Kosong) secara real-time untuk panel display sekuriti.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`modal-overlay ${activeModal === 'modal-p4' ? 'active' : ''}`} id="modal-p4" onClick={handleModalOverlayClick}>
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-header-text">
              <span className="modal-role">Embedded Systems Programmer</span>
              <h3>Automatic Smart Dustbin</h3>
            </div>
            <div className="modal-close" onClick={closeModal}>✕</div>
          </div>
          <div className="modal-body">
            <div className="modal-gallery">
              <img src="/assets/dustbin/dustbin.png" alt="Produk"/>
              <img src="/assets/dustbin/buka.png" alt="Wiring"/>
              <img src="/assets/dustbin/sketch.png" alt="Code"/>
              <img src="/assets/dustbin/flow.png" alt="Code"/>
            </div>
            <div className="modal-section-title">Latar Belakang Proyek</div>
            <p className="modal-text">Prototipe hardware ini merupakan implementasi dasar dari prinsip alat bantu higienis berbasis *touchless environment*. Dirancang untuk area fasilitas kesehatan atau ruang publik, tempat sampah ini sepenuhnya beroperasi secara otonom tanpa memerlukan sambungan internet rumit, menjadikannya andal (*reliable*) di segala kondisi.</p>
            
            <div className="modal-section-title">Rincian Teknis & Komponen</div>
            <ul className="modal-feature-list">
              <li><strong>Prosesor Pusat Arduino Uno:</strong> Board mikrokontroler mandiri yang ditanamkan kode bahasa C++ (*bare metal firmware*) untuk komputasi loop kontinu kecepatan milidetik.</li>
              <li><strong>Kalkulasi Ultrasonik HC-SR04:</strong> Mengeluarkan pulsa gelombang suara (Trigger) dan menghitung durasi pantulan balik (Echo). Dikonversi ke satuan centimeter menggunakan rumus kecepatan suara konstan di udara.</li>
              <li><strong>Motor Servo PWM:</strong> Pembukaan tutup tidak menggunakan on/off relay kasar, melainkan sinyal Pulse Width Modulation. Tutup berotasi 90 derajat perlahan secara halus untuk mencegah kerusakan mekanis gear.</li>
              <li><strong>Delay & Reset Logic:</strong> Mengandung sistem *failsafe* code. Tutup akan tetap terbuka selama tangan berada dalam radius 15 cm, dan hanya menutup 3 detik setelah objek menjauh, mencegah mekanisme "terjepit".</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`modal-overlay ${activeModal === 'modal-p5' ? 'active' : ''}`} id="modal-p5" onClick={handleModalOverlayClick}>
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-header-text">
              <span className="modal-role">Network Designer & Simulator</span>
              <h3>Smart Coffee Shop Network Simulation</h3>
            </div>
            <div className="modal-close" onClick={closeModal}>✕</div>
          </div>
          <div className="modal-body">
            <div className="modal-gallery">
              <img src="/assets/cofeeshop/topologi.png" alt="Topologi"/>
              <img src="/assets/cofeeshop/control.png" alt="Topologi"/>
              <img src="/assets/cofeeshop/main.png" alt="Topologi"/>
              <img src="/assets/cofeeshop/end.png" alt="Topologi"/>
            </div>
            <div className="modal-section-title">Konsep Pemisahan Segmen Jaringan</div>
            <p className="modal-text">Sebelum mengimplementasikan jaringan rumit di dunia nyata, blueprint topologi harus dibuat. Simulasi Cisco Packet Tracer ini merepresentasikan skenario kafe modern yang memisahkan *subnet* antara tamu (Guest Wi-Fi), administrasi kasir (LAN), dan jaringan otomatisasi perangkat (IoT Network) demi keamanan (*security isolation*).</p>
            
            <div className="modal-section-title">Detail Skenario & Konfigurasi</div>
            <ul className="modal-feature-list">
              <li><strong>VLAN & Subnetting:</strong> Membagi network menjadi beberapa blok IP untuk mencegah *broadcast storm* dan memisahkan device IoT dengan PC Admin Kasir.</li>
              <li><strong>Home Gateway & MCU Server:</strong> Mengkonfigurasi server lokal virtual yang bertugas menjadi "otak" untuk menerima log sensor dan menjalankan kondisi IF-THEN.</li>
              <li><strong>Sistem AC Cerdas (Suhu):</strong> Simulasi sensor temperatur yang memancarkan data suhu. Aturan logika diset: *Jika Temp &gt; 25°C, Aktifkan AC Cooler ke kecepatan tinggi*.</li>
              <li><strong>Pintu Geser Motion:</strong> Menggunakan virtual *Motion Detector*. Saat pelanggan terdeteksi dalam zona area pintu, status perangkat pintu otomatis berubah menjadi "Open".</li>
              <li><strong>Analisis Jalur IP:</strong> Melakukan tes *Ping* dan pemantauan paket ICMP antar segmen untuk memastikan *firewall/router* memblokir rute yang tidak diinginkan dengan benar.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`modal-overlay ${activeModal === 'modal-p6' ? 'active' : ''}`} id="modal-p6" onClick={handleModalOverlayClick}>
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-header-text">
              <span className="modal-role">Full Stack Web Engineer</span>
              <h3>Library Management System (Laravel MVC)</h3>
            </div>
            <div className="modal-close" onClick={closeModal}>✕</div>
          </div>
          <div className="modal-body">
            <div className="modal-gallery">
              <img src="/assets/libraryz/admin.jpg" alt="Dashboard Web"/>
              <img src="/assets/libraryz/user.jpg" alt="Dashboard Web"/>
              <img src="/assets/libraryz/dashboard.jpg" alt="Dashboard Web"/>
              <img src="/assets/libraryz/1.jpg" alt="Dashboard Web"/>
              <img src="/assets/libraryz/2.jpg" alt="Dashboard Web"/>
            </div>
            <div className="modal-section-title">Pembangunan Sistem Skala Menengah</div>
            <p className="modal-text">Perpustakaan modern memerlukan database relasional (*RDBMS*) yang terstruktur kuat untuk menghindari duplikasi (*anomali data*). Aplikasi ini dikembangkan murni menggunakan framework *PHP Laravel* yang menegakkan standar desain MVC (Model-View-Controller) untuk kode yang bersih, mudah dikelola, dan aman dari kerentanan umum seperti SQL Injection.</p>
            
            <div className="modal-section-title">Arsitektur & Modul Fitur Utama</div>
            <ul className="modal-feature-list">
              <li><strong>Sistem Autentikasi RBAC:</strong> Login portal yang dinamis memisahkan sesi *Superadmin*, *Pustakawan*, dan *Siswa*. Masing-masing memiliki hak akses *middleware* direktori yang berbeda.</li>
              <li><strong>Manajemen ERD MySQL Lanjut:</strong> Tabel Buku, Kategori, Penulis, Member, dan Transaksi direlasikan melalui struktur *Foreign Key* dan aksi *Cascading* yang disiplin.</li>
              <li><strong>CRUD Kompleks:</strong> Form input pengelolaan inventori yang dilengkapi validasi backend kuat. Termasuk fitur upload gambar cover buku secara otomatis ke direktori server.</li>
              <li><strong>Otomatisasi Hitung Denda:</strong> Algoritma controller menggunakan fungsi Carbon/Date untuk menghitung selisih hari keterlambatan pengembalian dikalikan tarif denda yang terkonfigurasi.</li>
              <li><strong>Blade Templating Engine:</strong> Antarmuka *View* dikompresi menjadi blok-blok *component* yang dapat didaur ulang, menjadikan load HTML sangat ringan dan *responsive* di segala *device*.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`modal-overlay ${activeModal === 'modal-p7' ? 'active' : ''}`} id="modal-p7" onClick={handleModalOverlayClick}>
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-header-text">
              <span className="modal-role">Native Android Developer</span>
              <h3>Cinema App (My Watchlist App)</h3>
            </div>
            <div className="modal-close" onClick={closeModal}>✕</div>
          </div>
          <div className="modal-body">
            <div className="modal-gallery">
              <img src="/assets/cinemaapp/1.jpg" alt="Homescreen"/>
              <img src="/assets/cinemaapp/1.jpg" alt="Homescreen"/>
            </div>
            <div className="modal-section-title">Fokus Pengembangan Aplikasi Mobile</div>
            <p className="modal-text">Diprogram secara *Native* menggunakan Android Studio (Java/Kotlin), Cinema App membidik pengalaman pengguna (*UX*) yang *fluid* setara ekosistem aplikasi hiburan top. Inti kerumitannya terletak pada sinkronisasi status asinkron lintas layar (contoh: Saat user pindah ke handphone baru, *Watchlist* tetap aman karena di-backup via *Cloud API*).</p>
            
            <div className="modal-section-title">Teknologi & Analisis Fitur</div>
            <ul className="modal-feature-list">
              <li><strong>Integrasi RESTful API:</strong> Melakukan protokol HTTP GET request ke database eksternal penyedia layanan film pihak ketiga (seperti TMDB/OMDB) lalu memparsing file JSON ke dalam Java Object.</li>
              <li><strong>Firebase Realtime Database:</strong> Implementasi Google Firebase SDK untuk menyimpan relasi daftar film (*Watchlist*) ke spesifik ID pengguna secara *real-time*.</li>
              <li><strong>RecyclerView & Adapter:</strong> Manajemen rendering memori secara cerdas menggunakan RecyclerView. Memuat ratusan poster film tanpa membuat handphone *freeze* / *Out of Memory*.</li>
              <li><strong>Desain XML Responsif:</strong> UI Layout *ConstraintLayout* diatur mengikuti pedoman *Material Design*, membuat elemen aplikasi tidak *stretch* hancur baik di HP maupun Tablet.</li>
              <li><strong>Operasi CRUD Lengkap:</strong> (Create) Tambah list, (Read) Tampil detail sinopsis, (Update) Tandai sebagai 'Sudah Ditonton', (Delete) Hapus dari *library*.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`modal-overlay ${activeModal === 'modal-p9' ? 'active' : ''}`} id="modal-p9" onClick={handleModalOverlayClick}>
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-header-text">
              <span className="modal-role">Bash Developer & Automator</span>
              <h3>DNS Resolver & Monitoring Script Utility</h3>
            </div>
            <div className="modal-close" onClick={closeModal}>✕</div>
          </div>
          <div className="modal-body">
            <div className="modal-gallery">
              <img src="/assets/bash/main.jpg" alt="TUI"/>
              <img src="/assets/bash/1.jpg" alt="TUI"/>
              <img src="/assets/bash/2.jpg" alt="TUI"/>
              <img src="/assets/bash/cron.jpg" alt="TUI"/>
              <img src="/assets/bash/log.jpg" alt="TUI"/>
            </div>
            <div className="modal-section-title">Otomatisasi Pekerjaan Network Engineer</div>
            <p className="modal-text">Melakukan *troubleshooting* ratusan server secara manual setiap hari sangatlah tidak efisien. Skrip Bash ini diciptakan khusus di lingkungan operasi sistem kernel Linux (`.sh`) untuk otomatisasi *checking* status jaringan. Agar lebih ramah (*user-friendly*) bagi kolega non-programmer, program dibungkus menggunakan antarmuka grafis di dalam terminal (*TUI*).</p>
            
            <div className="modal-section-title">Struktur Program & Perintah Logika</div>
            <ul className="modal-feature-list">
              <li><strong>Desain Text-User Interface (TUI):</strong> Tidak sekadar layar hitam, navigasi menu dan kotak input dirender indah menggunakan library command-line *Dialog* / *Whiptail*.</li>
              <li><strong>Regex & AWK Text Processing:</strong> Program menggunakan algoritma *piping* kompleks. Command `dig` atau `nslookup` dieksekusi massal berdasar daftar file TXT eksternal, dan command `awk` digunakan untuk memfilter dan membersihkan string IP (*IPv4 & IPv6*) yang dihasilkan.</li>
              <li><strong>Status Polling (ICMP Ping):</strong> Loop bersyarat (While/For logic) mengeksekusi request `ping` ke deretan target untuk memvalidasi apakah domain terhubung ke server yang aktif (Status: UP) atau mati (Status: DOWN).</li>
              <li><strong>Cron Job Task Scheduler:</strong> Skrip dirancang untuk dapat dijalankan secara tersembunyi (*background service*) setiap interval beberapa menit menggunakan fitur *cron daemon*, otomatis membuang hasil cek ke format laporan `.log` berbasis tanggal (*Timestamping*).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;