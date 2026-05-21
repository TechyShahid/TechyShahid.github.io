/* ============================================
   PORTFOLIO WEBSITE - JavaScript
   Shahid Khan | Senior Software Engineer
   ============================================ */

// ─── PARTICLE CANVAS BACKGROUND ─────────────────────────────
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.hue = Math.random() > 0.5 ? 259 : 270; // purple tones
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
            ctx.fillStyle = `hsla(${this.hue}, 70%, 65%, ${this.opacity})`;
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = [];
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
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

                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `hsla(259, 70%, 65%, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animationId);
        init();
        animate();
    });

    init();
    animate();
})();


// ─── TYPING EFFECT ─────────────────────────────────────────
(function initTypingEffect() {
    const roles = [
        'Senior Software Engineer',
        'Microservices Architect',
        'Cloud-Native Developer',
        'Full Stack Engineer',
        'Java & Spring Expert'
    ];
    const el = document.getElementById('typed-role');
    if (!el) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 80;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            el.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 40;
        } else {
            el.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeDelay = 2000; // pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeDelay = 400;
        }

        setTimeout(type, typeDelay);
    }

    setTimeout(type, 1000);
})();


// ─── NAVBAR SCROLL BEHAVIOR ────────────────────────────────
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');
    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scrolled state
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Active section highlighting
                let currentSection = '';
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentSection = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
})();


// ─── MOBILE MENU TOGGLE ────────────────────────────────────
(function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
        document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
})();


// ─── SCROLL REVEAL ANIMATIONS ──────────────────────────────
(function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
})();


// ─── COUNTER ANIMATION ─────────────────────────────────────
(function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    function animateCounter(el, target) {
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);

        function update() {
            current += step;
            if (current >= target) {
                el.textContent = target;
                return;
            }
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }

        update();
    }

    counters.forEach(counter => observer.observe(counter));
})();


// ─── SMOOTH SCROLL ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
