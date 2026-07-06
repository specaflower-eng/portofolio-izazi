import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

/* ─── DATA ─── */
const NAV = [
  { href: '#hero',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#skills',   label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#timeline', label: 'Education' },
  { href: '#certs',    label: 'Certifications' },
  { href: '#contact',  label: 'Contact' },
];

const MARQUEE = [
  'ESP32', 'React.js', 'MQTT', 'Laravel', 'Python',
  'Cisco', 'Firebase', 'Flutter', 'Burp Suite',
  'Linux Server', 'YOLOv8', 'IoT Engineering', 'Web Security',
];

const FACTS = [
  { count: 3.89, decimal: true,  suffix: '',  lbl: 'GPA / 4.0' },
  { count: 8,    decimal: false, suffix: '+', lbl: 'Projects Built' },
  { count: 7,    decimal: false, suffix: '+', lbl: 'Certifications' },
  { count: 30,   decimal: false, suffix: '+', lbl: 'Technologies' },
];

const SKILLS = [
  {
    title: 'IoT & Embedded Systems',
    items: ['ESP32 & Raspberry Pi','Embedded C / C++','MQTT Protocol',
            'Edge Computing','Sensor Integration','Circuit Design',
            'Wireless Sensor Networks','Firebase RTDB'],
  },
  {
    title: 'Software & AI Engineering',
    items: ['Python','JavaScript / React.js','PHP (Laravel)',
            'REST API Development','Computer Vision (YOLOv8 / YOLO11)',
            'Java (Android)','Flutter','MySQL','Docker','Git / GitHub'],
  },
  {
    title: 'Networking & Cybersecurity',
    items: ['Cisco Routing & Switching','VLAN & Subnetting',
            'Linux Server Administration','Bash Scripting',
            'Web Penetration Testing','Burp Suite','Nmap','Wireshark',
            'OWASP Top 10','Bug Bounty Hunting','PortSwigger Academy',
            'Kali Linux'],
  },
];

const PROJECTS = [
  {
    id: 'modal-p1',
    img: '/assets/classroom/foto.jpg',
    tags: ['IoT', 'YOLOv8 AI', 'React.js'],
    title: 'Smart Classroom Monitoring & Attendance',
    desc: 'End-to-end intelligent system for real-time class occupancy tracking via AI camera and RFID lecturer validation over MQTT.',
    featured: true,
  },
  {
    id: 'modal-p2',
    img: '/assets/z car/zcar.jpg',
    tags: ['Robotics', 'ESP32', 'Flutter'],
    title: 'Smart Car 4-Mode Controller',
    desc: 'ESP32 robot car with four operating modes, controlled in real-time from a Flutter Android app via Firebase RTDB.',
    featured: true,
  },
  {
    id: 'modal-nutricab',
    img: '/assets/nutricab/cover.jpg',
    tags: ['Edge AI / YOLO11', 'Raspberry Pi', 'MQTT'],
    title: 'NutriCab Smart Farming System',
    desc: 'End-to-end smart-farming system: on-device YOLO11 AI diagnoses leaf disease while ESP32 nodes auto-irrigate crops, engineered to stay online through internet and router failures.',
    featured: true,
  },
  {
    id: 'modal-p3',
    img: '/assets/parking/foto.jpeg',
    tags: ['WSN', 'ESP8266', 'Sensors'],
    title: 'Smart Parking System with WSN IoT',
    desc: 'Wireless sensor network for smart parking lot management using distributed ESP8266 nodes, IR sensors, and RFID gate.',
  },
  {
    id: 'modal-p4',
    img: '/assets/dustbin/buka.png',
    tags: ['Embedded', 'Arduino', 'C++'],
    title: 'Automatic Smart Dustbin',
    desc: 'Touchless hardware prototype using HC-SR04 ultrasonic sensor and servo PWM for smooth automated lid actuation.',
  },
  {
    id: 'modal-p5',
    img: '/assets/cofeeshop/topologi.png',
    tags: ['Network Design', 'Cisco'],
    title: 'Smart Coffee Shop Network Sim',
    desc: 'Cisco Packet Tracer simulation of a segmented IoT network with VLAN, smart AC automation, and motion-triggered doors.',
  },
  {
    id: 'modal-p6',
    img: '/assets/libraryz/dashboard.jpg',
    tags: ['Laravel', 'MySQL', 'MVC'],
    title: 'Library Management System',
    desc: 'Full-stack web app with Laravel MVC, RBAC authentication, relational MySQL ERD, and automated fine calculation.',
  },
  {
    id: 'modal-p7',
    img: '/assets/libraryz/1.jpg',
    tags: ['Android Java', 'Firebase'],
    title: 'Cinema App, Watchlist Tracker',
    desc: 'Native Android app synced to Firebase RTDB for managing a personal movie watchlist with REST API integration.',
  },
  {
    id: 'modal-p9',
    img: '/assets/bash/main.jpg',
    tags: ['Bash', 'Linux', 'Automation'],
    title: 'DNS Resolver and Monitoring Script',
    desc: 'Interactive Bash TUI utility for DNS query analysis and automated cronjob ping monitoring with timestamped log reports.',
  },
];

const CERTS = [
  {
    img: '/assets/certs/ccna-srwe.png',
    title: 'CCNA: Switching, Routing & Wireless Essentials',
    issuer: 'Cisco · Jakarta State Polytechnic',
    year: '2026',
    desc: 'Advanced LAN switching, inter-VLAN routing, and wireless network configuration.',
  },
  {
    img: '/assets/certs/ccna-intro-networks.png',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco · Jakarta State Polytechnic',
    year: '2026',
    desc: 'Network fundamentals, IP addressing, and the protocols behind reliable connectivity.',
  },
  {
    img: '/assets/certs/junior-cybersecurity.png',
    title: 'Junior Cyber Security',
    issuer: 'Digitalent · Komdigi RI',
    year: '2025',
    desc: 'Government VSGA program covering core defensive security practices and threat handling.',
  },
  {
    img: '/assets/certs/intro-cybersecurity.png',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    year: '2025',
    desc: 'Threat landscape, attack vectors, and the principles of protecting data and infrastructure.',
  },
  {
    img: '/assets/certs/web-security-pentest.png',
    title: 'Basic Web Security & Pentesting',
    issuer: 'Web Security Program',
    year: '2025',
    desc: 'Web vulnerability assessment and penetration-testing basics to find and fix system flaws.',
  },
  {
    img: '/assets/certs/robotic-iot.png',
    title: 'Robotic: Internet of Things',
    issuer: 'BISA AI Academy',
    year: '2025',
    desc: 'Hands-on IoT and robotics fundamentals, from sensor integration to connected device control.',
  },
  {
    img: '/assets/certs/intro-iot.png',
    title: 'Introduction to IoT & Digital Transformation',
    issuer: 'Cisco Networking Academy',
    year: '2024',
    desc: 'How connected devices and data drive automation and digital transformation.',
  },
];

const EXPERTISE = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
    title: 'IoT & Embedded',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'Network Engineering',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
      </svg>
    ),
    title: 'Full-Stack Development',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      </svg>
    ),
    title: 'Cybersecurity',
  },
];

/* ─── MODAL DATA ─── */
const MODAL_CONTENT = {
  'modal-p1': {
    role: 'Lead Developer & AI / Hardware Integrator',
    title: 'Smart Classroom Monitoring & Attendance Validation',
    images: [
      '/assets/classroom/cara kerja.jpeg',
      '/assets/classroom/foto.jpg',
      '/assets/classroom/dashboard.jpg',
      '/assets/classroom/admin.jpg',
      '/assets/classroom/hardware.jpg',
      '/assets/classroom/topologi.jpg',
    ],
    overview: 'An end-to-end intelligent system combining Edge AI computing with IoT microcontrollers to solve manual attendance inefficiencies and maximize classroom utilization. Data is processed locally before relaying to a central server, reducing latency and internet dependency.',
    features: [
      { title: 'Edge AI with YOLOv8', desc: 'Deep learning model deployed directly on Raspberry Pi. Processes live video frames locally for real-time student occupancy counting without cloud latency.' },
      { title: 'ESP32 Gateway Hardware', desc: 'Acts as the local RFID reader gateway, receiving card inputs from the classroom entrance and forwarding validated UIDs over MQTT.' },
      { title: 'RFID MFRC522 Authentication', desc: 'C++ programmed radio frequency module that reads lecturer card UIDs to activate and authenticate each class session.' },
      { title: 'MQTT Lightweight Protocol', desc: 'Data transmission from ESP32 (Publish) to the broker server. Significantly faster and lighter than conventional HTTP requests.' },
      { title: 'React.js and Flask Dashboard', desc: 'Python Flask backend powers the REST API and historical data layer, while React.js frontend renders live WebSocket charts without page refresh.' },
    ],
  },
  'modal-p2': {
    role: 'IoT Robotics & Mobile Developer',
    title: 'Smart Car 4-Mode Controller',
    images: [
      '/assets/z car/zcar.jpg',
      '/assets/z car/desain.jpg',
      '/assets/z car/dashboard.png',
      '/assets/z car/manual.jpeg',
    ],
    overview: 'An educational robot car capable of operating in 4 distinct modes, combining mechanical drive systems with cloud software logic. The project demonstrates how remote commands from a smartphone can reach physical hardware with near-zero latency over the internet.',
    features: [
      { title: 'ESP32 Core Processor', desc: 'On-board WiFi-capable processor continuously receiving and parsing JSON data streams from the cloud.' },
      { title: 'L298N Motor Driver', desc: 'Manages high-voltage current from the Li-ion battery to DC motors, protecting the ESP32 circuit from power spikes.' },
      { title: 'Flutter Android App', desc: 'Native cross-platform app featuring a responsive virtual joystick for real-time directional control.' },
      { title: 'Firebase Realtime Database', desc: 'Cloud NoSQL intermediary: joystick values update in Firebase, and the ESP32 listens for state changes and reacts instantly across any network, not just local.' },
      { title: '4 Operating Modes', desc: '(1) Manual Joystick, (2) Line Follower, (3) Obstacle Avoidance via Ultrasonic, (4) Voice Command input.' },
    ],
  },
  'modal-nutricab': {
    role: 'AI Engineer & Team Lead',
    title: 'NutriCab Smart Farming System',
    images: [
      '/assets/nutricab/cover.jpg',
      '/assets/nutricab/1.jpg',
      '/assets/nutricab/2.jpg',
      '/assets/nutricab/3.jpg',
      '/assets/nutricab/4.jpg',
    ],
    overview: 'NutriCab is a full smart-farming system that monitors plant health and irrigates crops autonomously. As AI Engineer and team lead, I led a four-person team and built the intelligence layer: a Raspberry Pi that runs a YOLO11s vision model locally to diagnose leaf disease in real time, plus the entire edge pipeline linking it to the cloud. Around that core, ESP32 nodes measure soil NPK nutrients and water-tank levels over MQTT and drive relay-controlled pumps, while a React dashboard and an Android app let the grower monitor and control everything remotely over a secured Firebase cloud.',
    features: [
      { title: 'YOLO11s Leaf Disease Model', desc: 'I trained and evaluated a custom YOLO11s model that classifies leaves in real time as Healthy, Leaf Spot, or Yellow Virus, rendering live bounding boxes and confidence scores straight from the camera feed.' },
      { title: '6-Step Leaf Gatekeeper', desc: 'I designed a validation pipeline that confirms a genuine leaf fills the frame before inference runs, filtering background noise and holding accuracy steady across changing light and camera distance.' },
      { title: 'Raspberry Pi Edge Brain & MQTT', desc: 'I developed the on-device software on the Raspberry Pi: it runs all AI inference locally and orchestrates MQTT messaging between the sensor nodes, the model, and the cloud, so detection never depends on a remote server.' },
      { title: 'Offline-First Resilience & Router Failover', desc: 'I engineered the pipeline to survive the field, buffering data to SD card when the internet drops, auto-syncing to Firebase on reconnect, and switching between routers automatically so the system stays online.' },
      { title: 'ESP32 Sensing & Auto-Irrigation', desc: 'ESP32 nodes read soil NPK nutrients and ultrasonic water-tank levels, publishing over MQTT to trigger relay-driven pump watering, closing the loop from sensing to action.' },
      { title: 'Cloud, Web & Mobile Layer', desc: 'A secured Firebase backend feeds a React dashboard and an Android app with role-based access and OTP login, giving the grower live readings, camera galleries, and remote pump control from anywhere.' },
    ],
  },
  'modal-p3': {
    role: 'System Architect & Firmware Engineer',
    title: 'Smart Parking System with Wireless Sensor Network',
    images: [
      '/assets/parking/dashboard.jpg',
      '/assets/parking/hrd.jpg',
      '/assets/parking/skema.jpg',
    ],
    overview: 'How do you monitor 100 parking slots without running cable to every space? A Wireless Sensor Network (WSN) architecture places low-power sensor nodes at each slot that communicate wirelessly, hierarchically reporting slot availability back to a central gateway.',
    features: [
      { title: 'WSN Multi-Node Topology', desc: 'Multiple economical ESP8266 WiFi modules distributed in a mesh/star network configuration across the parking lot.' },
      { title: 'IR Obstacle Sensors', desc: 'Detects car presence via light reflection. More power-efficient than ultrasonic sensors for continuous slot monitoring.' },
      { title: 'RFID Gate Authentication', desc: 'The entry barrier opens only after validating the card UID against the SQL member database.' },
      { title: 'ESP Deep Sleep Optimization', desc: 'Firmware keeps sensors in deep sleep when idle, waking only to transmit on status change. Dramatically extends battery life.' },
      { title: 'Live Status Dashboard', desc: 'Web monitoring panel parsing real-time slot availability. Red for occupied, green for empty.' },
    ],
  },
  'modal-p4': {
    role: 'Embedded Systems Programmer',
    title: 'Automatic Smart Dustbin',
    images: [
      '/assets/dustbin/buka.png',
      '/assets/dustbin/sketch.png',
      '/assets/dustbin/flow.png',
    ],
    overview: 'A touchless hardware prototype for hygienic environments like healthcare facilities and public spaces. Operates fully autonomously without any internet connection, making it reliable under all conditions.',
    features: [
      { title: 'Arduino Uno Core', desc: 'C++ bare-metal firmware for millisecond-precision control loop. No OS overhead, direct register-level programming.' },
      { title: 'HC-SR04 Ultrasonic Ranging', desc: 'Triggers a sound pulse (Trigger pin) and measures echo return time to calculate object distance in centimeters using the speed-of-sound constant.' },
      { title: 'Servo Motor PWM Control', desc: 'Lid opens with a smooth 90-degree rotation via Pulse Width Modulation, not an abrupt on/off relay, which prevents gear damage.' },
      { title: 'Failsafe Logic', desc: 'Lid stays open while any object is within 15 cm, then closes 3 seconds after the hand moves away, preventing the pinch scenario.' },
    ],
  },
  'modal-p5': {
    role: 'Network Designer & Simulator',
    title: 'Smart Coffee Shop Network Simulation',
    images: [
      '/assets/cofeeshop/topologi.png',
      '/assets/cofeeshop/control.png',
      '/assets/cofeeshop/main.png',
      '/assets/cofeeshop/end.png',
    ],
    overview: 'Before deploying a real network, a complete topology blueprint must be built and tested. This Cisco Packet Tracer simulation models a modern café separating Guest Wi-Fi, Admin LAN, and IoT device subnets for proper security isolation.',
    features: [
      { title: 'VLAN and Subnetting', desc: 'Splits the network into isolated IP blocks to prevent broadcast storms and keep IoT devices fully separated from the admin cash register PC.' },
      { title: 'Gateway and MCU Server', desc: 'Virtual local server receives sensor logs and executes IF-THEN automation conditions for connected devices.' },
      { title: 'Smart AC Logic', desc: 'Temperature sensor data triggers a rule: If Temp exceeds 25°C, activate high-speed AC cooler. Tested and verified in the simulation.' },
      { title: 'Motion-Triggered Door', desc: 'Virtual motion detector changes door state to Open automatically when a customer is detected within the sensor zone.' },
      { title: 'ICMP Path Analysis', desc: 'Ping tests and packet monitoring between subnets verify the router/firewall correctly blocks all unauthorized cross-segment routes.' },
    ],
  },
  'modal-p6': {
    role: 'Full-Stack Web Engineer',
    title: 'Library Management System with Laravel MVC',
    images: [
      '/assets/libraryz/admin.jpg',
      '/assets/libraryz/user.jpg',
      '/assets/libraryz/dashboard.jpg',
      '/assets/libraryz/1.jpg',
      '/assets/libraryz/2.jpg',
    ],
    overview: 'A mid-scale library system built with strict Laravel MVC architecture to enforce clean, maintainable, and secure code. The relational database design eliminates data anomalies, while the framework provides built-in protection against SQL Injection and XSS.',
    features: [
      { title: 'RBAC Authentication', desc: 'Dynamic login portal separating Superadmin, Librarian, and Student sessions, each with unique middleware-enforced access rights.' },
      { title: 'Advanced MySQL ERD', desc: 'Books, Categories, Authors, Members, and Transactions linked via disciplined Foreign Key constraints and Cascading actions.' },
      { title: 'Full CRUD with File Upload', desc: 'Backend-validated input forms with automatic book cover image upload handling to a structured server directory.' },
      { title: 'Automated Fine Calculation', desc: 'Controller algorithm uses Carbon/Date functions to compute late return penalties automatically: days overdue times configured daily rate.' },
      { title: 'Blade Component System', desc: 'View layer uses reusable Blade component blocks for lightweight, responsive HTML. Fast-loading across all device sizes.' },
    ],
  },
  'modal-p7': {
    role: 'Native Android Developer',
    title: 'Cinema App, Watchlist Tracker',
    images: [
      '/assets/libraryz/1.jpg',
    ],
    overview: 'A native Android app built with Android Studio (Java) targeting a fluid, app-store-quality user experience. The core complexity lies in cross-screen async state synchronization and cloud backup, ensuring a user\'s watchlist survives device changes.',
    features: [
      { title: 'RESTful API Integration', desc: 'HTTP GET requests to an external movie database API (TMDB/OMDB), parsing JSON responses into typed Java objects.' },
      { title: 'Firebase Realtime Database', desc: "Google Firebase SDK stores each user's watchlist tied to their specific user ID, syncing in real-time across devices." },
      { title: 'RecyclerView and Adapter', desc: 'Smart memory recycling renders hundreds of movie posters efficiently with no OOM freezes and smooth scrolling.' },
      { title: 'Material Design XML Layout', desc: 'ConstraintLayout UI following Material Design guidelines. Adapts correctly across both phones and tablets.' },
      { title: 'Complete CRUD', desc: 'Create (add to list), Read (full detail/synopsis view), Update (mark as watched), Delete (remove from library).' },
    ],
  },
  'modal-p9': {
    role: 'Bash Developer & Linux Automator',
    title: 'DNS Resolver and Monitoring Script Utility',
    images: [
      '/assets/bash/main.jpg',
      '/assets/bash/1.jpg',
      '/assets/bash/2.jpg',
      '/assets/bash/cron.jpg',
      '/assets/bash/log.jpg',
    ],
    overview: 'Manually troubleshooting hundreds of servers daily is unsustainable. This Bash utility automates network status checking on Linux, wrapped in a Text User Interface (TUI) so non-programmer colleagues can use it without touching the command line.',
    features: [
      { title: 'TUI with Dialog and Whiptail', desc: 'Menu navigation, input boxes, and progress bars rendered as a graphical-style interface inside the terminal. Far beyond a plain black screen.' },
      { title: 'Regex and AWK Text Processing', desc: 'Complex pipelines run dig and nslookup against domain lists from external .txt files, then awk filters and parses clean IPv4/IPv6 address strings.' },
      { title: 'ICMP Ping Status Polling', desc: 'While/For loops execute ping requests to a list of targets, classifying each as UP or DOWN and printing a summary report.' },
      { title: 'Cron Job Scheduler', desc: 'Script designed to run as a silent background service at set intervals, logging results to timestamped .log files automatically.' },
    ],
  },
  'modal-edu-ccit': {
    role: 'Professional Certificate in Information Technology — IoT Track',
    title: 'CCIT, Universitas Indonesia',
    overviewLabel: 'Program Overview',
    featuresLabel: 'What I Studied',
    images: [
      '/assets/ccit/cover.jpg',
      '/assets/ccit/1.jpg',
      '/assets/ccit/2.jpg',
    ],
    overview: 'A 2-year professional certification program at the Center for Computing and Information Technology (CCIT), Faculty of Engineering, Universitas Indonesia, with a certified specialization in Internet of Things. Assessed through formative, summative, and criterion-referenced methods, including written tests, case studies, and project presentations, across 23 courses spanning the full computing stack.',
    features: [
      { title: 'Programming & Software Foundations', desc: 'Algorithm and Programming, Object-Oriented Programming, Backend Programming, Programming in Java, and Mobile Application Development on Android.' },
      { title: 'Systems & Networking', desc: 'Operating Systems, Computer Networks, Administering Network Operating Systems, and Linux Server Configuration.' },
      { title: 'IoT & Embedded Engineering', desc: 'Introduction to IoT, IoT Circuit Design, Electronic Circuit and Sensors, Embedded Systems, and IoT Frameworks and Platforms.' },
      { title: 'Data & Information Systems', desc: 'Database Design and Implementation, Tools and Techniques to Analyze Data, Big Data and Analytics, Information System Architecture, and Developing Enterprise Information Systems.' },
      { title: 'Security & Web Application', desc: 'Information System Security and Web Application development, rounding out the secure full-stack coverage of the program.' },
    ],
  },
};

/* ─── COMPONENT ─── */
function App() {
  const [isLoading,     setIsLoading]     = useState(true);
  const [isMenuOpen,    setIsMenuOpen]    = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeModal,   setActiveModal]   = useState(null);
  const [imgError,      setImgError]      = useState(false);
  const [heroVisible,    setHeroVisible]    = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lightboxSrc,    setLightboxSrc]    = useState(null);

  /* ── Loader ── */
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  /* ── Hero stagger reveal after loader ── */
  useEffect(() => {
    if (!isLoading) {
      const t = setTimeout(() => setHeroVisible(true), 100);
      return () => clearTimeout(t);
    }
  }, [isLoading]);

  /* ── Scroll: progress bar + section tracking + header ── */
  useEffect(() => {
    const onScroll = () => {
      const total   = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setScrollProgress(total > 0 ? (current / total) * 100 : 0);
      setScrolled(current > 60);
      document.querySelectorAll('section[id]').forEach(s => {
        if (current >= s.offsetTop - s.clientHeight / 3) setActiveSection(s.id);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Scroll reveal (IntersectionObserver) ── */
  useEffect(() => {
    if (isLoading) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [isLoading]);

  /* ── Number counter for stats ── */
  useEffect(() => {
    if (isLoading) return;
    const animate = el => {
      const target   = parseFloat(el.dataset.target);
      const isDecimal = el.dataset.decimal === 'true';
      const suffix   = el.dataset.suffix || '';
      const duration = 1600;
      let start;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = (isDecimal ? (eased * target).toFixed(2) : Math.floor(eased * target)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-target]').forEach(animate);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.7 });
    const factsEl = document.querySelector('.facts-row');
    if (factsEl) obs.observe(factsEl);
    return () => obs.disconnect();
  }, [isLoading]);

  /* ── ESC to close modal ── */
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') {
        if (lightboxSrc) setLightboxSrc(null);
        else if (activeModal) closeModal();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeModal, lightboxSrc]);

  /* ── Image protection: block right-click save & drag on all photos ── */
  useEffect(() => {
    const guard = e => {
      if (e.target.tagName === 'IMG') e.preventDefault();
    };
    document.addEventListener('contextmenu', guard);
    document.addEventListener('dragstart', guard);
    return () => {
      document.removeEventListener('contextmenu', guard);
      document.removeEventListener('dragstart', guard);
    };
  }, []);

  const openModal    = id => { setActiveModal(id); document.body.style.overflow = 'hidden'; };
  const closeModal   = ()  => { setActiveModal(null); document.body.style.overflow = ''; };
  const overlayClick = e  => { if (e.target.classList.contains('modal-overlay')) closeModal(); };

  /* ── 3D card tilt ── */
  const onCardTilt = useCallback(e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top)  / rect.height;
    const x = px - 0.5;
    const y = py - 0.5;
    card.style.transform   = `perspective(1000px) rotateY(${x * 9}deg) rotateX(${y * -9}deg) translateZ(0) scale(1.02)`;
    card.style.transition   = 'transform 0.12s ease-out, box-shadow 0.2s, border-color 0.2s';
    card.style.setProperty('--mx', `${px * 100}%`);
    card.style.setProperty('--my', `${py * 100}%`);
  }, []);

  const onCardReset = useCallback(e => {
    const card = e.currentTarget;
    card.style.transform  = '';
    card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s, border-color 0.2s';
  }, []);

  /* ── Magnetic CTA button ── */
  const onMagnet = useCallback(e => {
    const el   = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x    = (e.clientX - (rect.left + rect.width  / 2)) * 0.28;
    const y    = (e.clientY - (rect.top  + rect.height / 2)) * 0.28;
    el.style.transition = 'background 0.22s, box-shadow 0.22s, transform 0s';
    el.style.transform  = `translate(${x}px, ${y}px)`;
  }, []);

  const onMagnetReset = useCallback(e => {
    const el = e.currentTarget;
    el.style.transition = 'background 0.22s, box-shadow 0.22s, transform 0.55s cubic-bezier(0.16,1,0.3,1)';
    el.style.transform  = '';
  }, []);

  /* ─── RENDER ─── */
  return (
    <div className="App">

      {/* SCROLL PROGRESS */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* LOADER */}
      <div id="loader" className={isLoading ? 'active' : ''}>
        <div className="loader-dot" />
      </div>

      {/* HEADER */}
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-wrapper">
          <a href="#hero" className="logo">Izazi</a>

          <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(o => !o)}>
            <span /><span /><span />
          </div>

          <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {NAV.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className={activeSection === href.slice(1) ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >{label}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="hero">
        {/* Gradient orbs */}
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />

        <div className="container">
          <div className="hero-grid">

            {/* Staggered name reveal — no 'reveal' class, handled by heroVisible */}
            <div className={`hero-text ${heroVisible ? 'hero-visible' : ''}`}>
              <div className="hero-badge">
                <span className="badge-dot" />
                Available for opportunities
              </div>
              <h1 className="hero-title">
                <span className="name-given">Muhammad</span>
                <span className="name-brand">Izazi</span>
                <span className="name-family">Dewanto.</span>
              </h1>

              <p className="hero-role">
                <span className="role-mark">·</span>
                Network & IoT Systems Engineer
              </p>

              <p className="hero-desc">
                Final-year student at Jakarta State Polytechnic and CCIT UI.
                I build systems at every layer: embedded firmware, network
                infrastructure, and full-stack web apps.
              </p>

              <div className="hero-actions">
                <a
                  href="#projects"
                  className="btn btn-primary"
                  onMouseMove={onMagnet}
                  onMouseLeave={onMagnetReset}
                >
                  View Work
                </a>
                <div className="social-links">
                  <a href="https://www.linkedin.com/in/izazi-dewanto-670b722a6" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
                    <svg viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com/izaaaze" target="_blank" rel="noreferrer" className="social-link" title="Instagram">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-photo reveal-right">
              <div className="photo-wrapper">
                {imgError
                  ? <div className="photo-placeholder">IZ</div>
                  : <img
                      src="/assets/profile.jpg"
                      alt="Muhammad Izazi Dewanto"
                      onError={() => setImgError(true)}
                    />
                }
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[0, 1].map(n => (
            <div key={n} className="marquee-items" aria-hidden={n === 1 ? 'true' : undefined}>
              {MARQUEE.map((item, i) => (
                <React.Fragment key={i}>
                  <span>{item}</span>
                  <span className="marquee-sep" />
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="container">
          <span className="section-tag reveal-left">About</span>

          <div className="about-intro reveal-left">
            <h2 className="section-heading">Bridging <em>hardware</em><br/>and code.</h2>
            <div className="about-text">
              <p>
                I'm a final-year student at Jakarta State Polytechnic and CCIT Universitas Indonesia.
                Two concurrent programs that give me both theoretical depth and applied experience
                across multiple engineering disciplines.
              </p>
              <p>
                From programming microcontrollers and designing circuit boards, to architecting
                network infrastructure and building full-stack web applications. I work across
                the entire stack, not just one layer.
              </p>
            </div>
          </div>

          {/* Inline counter stats */}
          <div className="facts-row reveal">
            {FACTS.map(({ count, decimal, suffix, lbl }) => (
              <div key={lbl} className="fact-item">
                <span
                  className="fact-num"
                  data-target={count}
                  data-decimal={decimal}
                  data-suffix={suffix}
                >
                  {decimal ? '0.00' : `0${suffix}`}
                </span>
                <span className="fact-label">{lbl}</span>
              </div>
            ))}
          </div>

          {/* Expertise chips */}
          <div className="expertise-chips reveal">
            {EXPERTISE.map(({ icon, title }) => (
              <div key={title} className="expertise-chip">
                <span className="chip-icon">{icon}</span>
                {title}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills">
        <div className="container">
          <div className="skills-header">
            <span className="section-tag reveal-left">Skills</span>
            <h2 className="section-heading reveal-left">Technical <em>stack.</em></h2>
          </div>

          <div className="skills-list">
            {SKILLS.map(({ title, items }, i) => (
              <div key={title} className="skill-category reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <h3>{title}</h3>
                <div className="pill-cloud">
                  {items.map(s => <span key={s} className="pill">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects">
        <div className="container">
          <span className="section-tag reveal-left">Projects</span>
          <h2 className="section-heading reveal-left">Selected <em>work.</em></h2>
          <p className="section-desc reveal-left">
            Systems built across hardware, networks, and software. From prototypes to production.
          </p>

          {/* Featured 2-col */}
          <div className="projects-featured">
            {PROJECTS.filter(p => p.featured).map(p => (
              <div
                key={p.id}
                className="project-card project-featured reveal"
                onClick={() => openModal(p.id)}
                onMouseMove={onCardTilt}
                onMouseLeave={onCardReset}
              >
                <div className="project-img-wrap">
                  <img src={p.img} alt={p.title} />
                </div>
                <div className="project-info">
                  <div className="project-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <span className="project-cta">View Case Study →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Other 3-col */}
          <div className="projects-grid">
            {PROJECTS.filter(p => !p.featured).map((p, i) => (
              <div
                key={p.id}
                className="project-card reveal"
                style={{ transitionDelay: `${i * 0.07}s` }}
                onClick={() => openModal(p.id)}
                onMouseMove={onCardTilt}
                onMouseLeave={onCardReset}
              >
                <div className="project-img-wrap">
                  <img src={p.img} alt={p.title} />
                </div>
                <div className="project-info">
                  <div className="project-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                  <h3>{p.title}</h3>
                  <span className="project-cta">View Details →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="timeline">
        <div className="container">
          <span className="section-tag reveal-left">Education</span>
          <h2 className="section-heading reveal-left">Academic <em>background.</em></h2>

          <div className="edu-grid edu-grid-2">
            <div className="edu-card reveal">
              <span className="edu-period">2023 – Present</span>
              <h3>Jakarta State Polytechnic</h3>
              <h4>Diploma IV, Multimedia and Network Engineering</h4>
              <p>A four-year applied engineering program centered on network infrastructure, IoT systems, cybersecurity, and full-stack development. Still an active student here, I've paired every course with hands-on lab work, building and deploying real systems rather than just studying the theory.</p>
              <div className="edu-badge">GPA 3.89 / 4.0</div>
            </div>

            <div
              className="edu-card edu-card-clickable reveal"
              style={{ transitionDelay: '0.1s' }}
              onClick={() => openModal('modal-edu-ccit')}
            >
              <div className="edu-thumb">
                <img src="/assets/ccit/cover.jpg" alt="CCIT Universitas Indonesia graduation" />
              </div>
              <span className="edu-period">2023 to 2025</span>
              <h3>CCIT, Universitas Indonesia</h3>
              <h4>Professional Certificate, Information Technology — IoT Track</h4>
              <p>A 2-year continuing education program at the Center for Computing and Information Technology (CCIT), Faculty of Engineering, Universitas Indonesia. Covered the full computing stack from programming and databases to networking, embedded systems, and IoT platforms.</p>
              <div className="edu-badge">GPA 3.39 / 4.0</div>
              <span className="edu-cta">View Details →</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certs">
        <div className="container">
          <span className="section-tag reveal-left">Certifications</span>
          <h2 className="section-heading reveal-left">Licenses &amp; <em>credentials.</em></h2>
          <p className="section-desc reveal-left">
            Verified certifications across networking, cybersecurity, and IoT. Click any card to view the full certificate.
          </p>

          <div className="certs-grid">
            {CERTS.map((c, i) => (
              <div
                key={c.title}
                className="cert-item reveal"
                style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
                onClick={() => setLightboxSrc(c.img)}
              >
                <span className="cert-year">{c.year}</span>
                <div className="cert-thumb">
                  <img src={c.img} alt={`${c.title} certificate`} loading="lazy" />
                </div>
                <div className="cert-info">
                  <span className="cert-issuer">{c.issuer}</span>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <span className="cert-view">View certificate →</span>
                </div>
              </div>
            ))}
          </div>

          <p className="certs-note reveal">
            Additional credentials: Huawei HCIA-Datacom · IBM Data Science 101 (Methodology &amp; Tools)
          </p>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="container">
          <span className="section-tag reveal-left">Contact</span>

          <div className="contact-main reveal">
            <h2 className="section-heading">Get in <em>touch.</em></h2>
            <p className="contact-sub">
              Open for internships, freelance work, and full-time roles.
              If you need someone who works across hardware, networking, and software, reach out.
            </p>

            <a href="mailto:iza6azee@gmail.com" className="contact-email-big">
              iza6azee@gmail.com
            </a>

            <div className="contact-socials">
              <a
                href="https://www.linkedin.com/in/izazi-dewanto-670b722a6"
                target="_blank" rel="noreferrer"
                className="contact-social-link"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://instagram.com/izaaaze"
                target="_blank" rel="noreferrer"
                className="contact-social-link"
              >
                Instagram ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <span className="footer-logo">Izazi</span>
            <span className="footer-sep" />
            <p>© 2025 Muhammad Izazi Dewanto</p>
          </div>
        </div>
      </footer>

      {/* ── MODALS ── */}
      {Object.entries(MODAL_CONTENT).map(([id, m]) => (
        <div
          key={id}
          className={`modal-overlay ${activeModal === id ? 'active' : ''}`}
          onClick={overlayClick}
        >
          <div className="modal-container">
            <div className="modal-header">
              <div>
                <span className="modal-role">{m.role}</span>
                <h3>{m.title}</h3>
              </div>
              <div className="modal-close" onClick={closeModal}>✕</div>
            </div>

            <div className="modal-body">
              {m.images?.length > 0 && (
                <div className={`modal-gallery ${id === 'modal-edu-ccit' ? 'modal-gallery-docs' : ''}`}>
                  {m.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${m.title} screenshot ${i + 1}`}
                      className="gallery-img-zoomable"
                      onClick={e => { e.stopPropagation(); setLightboxSrc(src); }}
                    />
                  ))}
                </div>
              )}

              <div className="modal-section-title">{m.overviewLabel || 'Project Overview'}</div>
              <p className="modal-text">{m.overview}</p>

              <div className="modal-section-title">{m.featuresLabel || 'Key Features and Implementation'}</div>
              <ul className="modal-feature-list">
                {m.features.map(f => (
                  <li key={f.title}>
                    <div><strong>{f.title}: </strong>{f.desc}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      {/* ── LIGHTBOX ── */}
      {lightboxSrc && (
        <div className="lightbox-overlay" onClick={() => setLightboxSrc(null)}>
          <button className="lightbox-close" onClick={() => setLightboxSrc(null)}>✕</button>
          <img src={lightboxSrc} alt="Enlarged view" onClick={e => e.stopPropagation()} />
        </div>
      )}

    </div>
  );
}

export default App;
