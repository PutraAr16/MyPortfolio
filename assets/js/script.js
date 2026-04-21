/* ================================================
   PORTFOLIO — Main JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================
       PRELOADER
       ========================== */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => preloader.classList.add('loaded'), 600);
    });
    // Fallback
    setTimeout(() => preloader.classList.add('loaded'), 3000);

    /* ==========================
       AOS INIT
       ========================== */
    AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        disable: 'mobile'
    });

    /* ==========================
       CUSTOM CURSOR
       ========================== */
    const cursor = document.getElementById('customCursor');
    const cursorTrail = document.getElementById('customCursorTrail');

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        function animateTrail() {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            requestAnimationFrame(animateTrail);
        }
        animateTrail();

        const hoverTargets = document.querySelectorAll('a, button, .btn, input, textarea, .nav-link, .filter-btn, .social-link, .project-card, .skill-card');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorTrail.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorTrail.classList.remove('hover');
            });
        });
    }

    /* ==========================
       NAVBAR SCROLL EFFECT
       ========================== */
    const navbar = document.getElementById('mainNavbar');
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('#navbarContent .nav-link');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top visibility
        if (scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        // Active nav link
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ==========================
       MOBILE NAV
       ========================== */
    const navToggler = document.getElementById('navToggler');
    const navbarContent = document.getElementById('navbarContent');
    let overlay;

    // Create overlay
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function toggleNav() {
        navToggler.classList.toggle('active');
        navbarContent.classList.toggle('show');
        overlay.classList.toggle('show');
        document.body.style.overflow = navbarContent.classList.contains('show') ? 'hidden' : '';
    }

    navToggler.addEventListener('click', toggleNav);
    overlay.addEventListener('click', toggleNav);

    // Close nav on link click
    document.querySelectorAll('#navbarContent .nav-link, .btn-nav-cta').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarContent.classList.contains('show')) {
                toggleNav();
            }
        });
    });

    /* ==========================
       TYPEWRITER EFFECT
       ========================== */
    const typewriterEl = document.getElementById('typewriterText');
    const phrases = [
        'modern web applications.',
        'responsive user interfaces.',
        'scalable backend systems.',
        'beautiful digital experiences.',
        'creative solutions.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 60 + Math.random() * 40;

            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            }
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 30;

            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause between phrases
            }
        }

        setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();

    /* ==========================
       HERO PARTICLES (Canvas)
       ========================== */
    const canvas = document.getElementById('heroParticles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(80, Math.floor(canvas.width * canvas.height / 12000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(108, 99, 255, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        animationId = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    /* ==========================
       COUNTER ANIMATION
       ========================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounters() {
        statNumbers.forEach(numEl => {
            const target = parseInt(numEl.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += increment;
                if (current < target) {
                    numEl.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    numEl.textContent = target;
                }
            }
            updateCounter();
        });
    }

    // Start counters when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);

    /* ==========================
       SKILL BARS ANIMATION
       ========================== */
    const skillFills = document.querySelectorAll('.skill-fill');
    let skillsAnimated = false;

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                skillFills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = width + '%';
                    }, 200);
                });
            }
        });
    }, { threshold: 0.2 });

    const skillsGrid = document.getElementById('skillsGrid');
    if (skillsGrid) skillsObserver.observe(skillsGrid);

    /* ==========================
       SKILLS FILTER
       ========================== */
    const skillFilterBtns = document.querySelectorAll('.skills-filter .filter-btn');
    const skillCards = document.querySelectorAll('.skill-card-col');

    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ==========================
       PROJECTS FILTER
       ========================== */
    const projectFilterBtns = document.querySelectorAll('.project-filter .filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    /* ==========================
       CONTACT FORM (Google Apps Script)
       ========================== */
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('contactSubmitBtn');
    const successMsg = document.getElementById('formSuccess');

    // ⚠️ REPLACE THIS URL with your Google Apps Script Web App URL
    // Follow the instructions in google-apps-script.js to get your URL
    const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxwjEpvg-f5uKOR3SoodE6RwqLu8nYcVufXuzM9K4hWSTErAGj34_W-8AZNAKnQMns/exec';

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check if endpoint is configured
        if (FORM_ENDPOINT === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
            alert('Contact form not configured yet. Please set up Google Apps Script (see google-apps-script.js for instructions).');
            return;
        }

        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        const jsonData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value
        };

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData)
            });

            // Google Apps Script with no-cors returns opaque response
            // so we assume success if no error was thrown
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            contactForm.style.display = 'none';
            successMsg.classList.add('show');

            setTimeout(() => {
                contactForm.style.display = '';
                contactForm.reset();
                successMsg.classList.remove('show');
            }, 5000);

        } catch (error) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            alert('Failed to send message. Please try again or email me directly.');
            console.error('Form error:', error);
        }
    });

    /* ==========================
       SMOOTH SCROLL for ALL anchors
       ========================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ==========================
       TILT EFFECT ON PROJECT CARDS
       ========================== */
    if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

});
