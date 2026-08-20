/* ============================================
   A História de João Victor - JavaScript
   Tema: Descoberta, Amor e Orgulho LGBTQIA+
   ============================================ */

(function () {
    'use strict';

    /* ============================================
       1. CONFIGURAÇÕES GLOBAIS
       ============================================ */
    const CONFIG = {
        scrollThreshold: 0.15,
        scrollRootMargin: '0px 0px -80px 0px',
        animationDelay: 100,
        typewriterSpeed: 50,
        particleCount: 50,
        sparkleCount: 8,
        navOffset: 100
    };

    /* ============================================
       2. PRELOADER (Tela de Carregamento)
       ============================================ */
    const Preloader = {
        init() {
            const preloader = document.createElement('div');
            preloader.className = 'preloader';
            preloader.innerHTML = `
                <div class="preloader-content">
                    <div class="preloader-rainbow"></div>
                    <div class="preloader-text">Carregando uma história de amor...</div>
                    <div class="preloader-hearts">💜 💙 💚 💛 🧡 ❤️</div>
                </div>
            `;
            document.body.appendChild(preloader);

            // Adiciona estilos do preloader dinamicamente
            this.injectStyles();

            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.classList.add('preloader-hidden');
                    setTimeout(() => preloader.remove(), 800);
                }, 1500);
            });
        },

        injectStyles() {
            const styles = `
                .preloader {
                    position: fixed;
                    inset: 0;
                    background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.8s ease, visibility 0.8s ease;
                }
                .preloader-hidden {
                    opacity: 0;
                    visibility: hidden;
                }
                .preloader-content {
                    text-align: center;
                }
                .preloader-rainbow {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: conic-gradient(
                        #FF0018, #FFA52C, #FFFF41,
                        #008018, #0000F9, #86007D, #FF0018
                    );
                    margin: 0 auto 2rem;
                    animation: preloader-spin 1.5s linear infinite;
                    position: relative;
                }
                .preloader-rainbow::after {
                    content: '🌈';
                    position: absolute;
                    inset: 8px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                }
                @keyframes preloader-spin {
                    to { transform: rotate(360deg); }
                }
                .preloader-text {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.2rem;
                    color: #86007D;
                    margin-bottom: 1rem;
                    animation: preloader-fade 1.5s ease-in-out infinite;
                }
                .preloader-hearts {
                    font-size: 1.5rem;
                    letter-spacing: 0.5rem;
                    animation: preloader-fade 2s ease-in-out infinite;
                }
                @keyframes preloader-fade {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
            `;
            const styleSheet = document.createElement('style');
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    };

    /* ============================================
       3. SCROLL ANIMATIONS (IntersectionObserver)
       ============================================ */
    const ScrollAnimations = {
        init() {
            const elements = document.querySelectorAll('.animate-on-scroll');
            if (!elements.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * CONFIG.animationDelay);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: CONFIG.scrollThreshold,
                rootMargin: CONFIG.scrollRootMargin
            });

            elements.forEach(el => observer.observe(el));
        }
    };

    /* ============================================
       4. NAVEGAÇÃO FIXA COM DESTAQUE ATIVO
       ============================================ */
    const Navigation = {
        sections: [],
        navLinks: [],
        nav: null,

        init() {
            this.createNav();
            this.sections = Array.from(document.querySelectorAll('section[id]'));
            this.navLinks = Array.from(document.querySelectorAll('.nav-link'));
            this.setupScrollSpy();
            this.setupSmoothScroll();
        },

        createNav() {
            const nav = document.createElement('nav');
            nav.className = 'main-nav';
            nav.innerHTML = `
                <div class="nav-container">
                    <div class="nav-logo">🌈 João Victor</div>
                    <ul class="nav-menu">
                        <li><a href="#descoberta" class="nav-link">Descoberta</a></li>
                        <li><a href="#paixao" class="nav-link">Paixão</a></li>
                        <li><a href="#beijo" class="nav-link">Beijo</a></li>
                        <li><a href="#orgulho" class="nav-link">Orgulho</a></li>
                        <li><a href="#timeline" class="nav-link">Jornada</a></li>
                    </ul>
                    <button class="nav-toggle" aria-label="Menu">
                        <span></span><span></span><span></span>
                    </button>
                </div>
            `;
            document.body.insertBefore(nav, document.body.firstChild);
            this.nav = nav;

            // Adiciona estilos da nav
            const styles = `
                .main-nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
                    z-index: 1000;
                    transform: translateY(-100%);
                    transition: transform 0.4s ease;
                }
                .main-nav.visible {
                    transform: translateY(0);
                }
                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .nav-logo {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #86007D;
                }
                .nav-menu {
                    display: flex;
                    gap: 2rem;
                    list-style: none;
                }
                .nav-link {
                    color: #2D3748;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 0.95rem;
                    position: relative;
                    padding: 0.3rem 0;
                    transition: color 0.3s ease;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D);
                    transition: width 0.3s ease;
                }
                .nav-link:hover,
                .nav-link.active {
                    color: #86007D;
                }
                .nav-link:hover::after,
                .nav-link.active::after {
                    width: 100%;
                }
                .nav-toggle {
                    display: none;
                    flex-direction: column;
                    gap: 5px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                .nav-toggle span {
                    width: 25px;
                    height: 3px;
                    background: #86007D;
                    border-radius: 2px;
                    transition: all 0.3s ease;
                }
                .nav-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(6px, 6px);
                }
                .nav-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                .nav-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(6px, -6px);
                }
                @media (max-width: 768px) {
                    .nav-toggle {
                        display: flex;
                    }
                    .nav-menu {
                        position: fixed;
                        top: 70px;
                        left: 0;
                        right: 0;
                        background: rgba(255, 255, 255, 0.98);
                        backdrop-filter: blur(15px);
                        flex-direction: column;
                        padding: 2rem;
                        gap: 1.5rem;
                        transform: translateY(-150%);
                        transition: transform 0.4s ease;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    }
                    .nav-menu.open {
                        transform: translateY(0);
                    }
                    .nav-link {
                        font-size: 1.1rem;
                    }
                }
            `;
            const styleSheet = document.createElement('style');
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);

            // Toggle mobile menu
            const toggle = nav.querySelector('.nav-toggle');
            const menu = nav.querySelector('.nav-menu');
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                menu.classList.toggle('open');
            });

            // Fecha menu ao clicar em link (mobile)
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    toggle.classList.remove('active');
                    menu.classList.remove('open');
                });
            });
        },

        setupScrollSpy() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        this.navLinks.forEach(link => {
                            link.classList.toggle('active',
                                link.getAttribute('href') === `#${id}`);
                        });
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '-20% 0px -60% 0px'
            });

            this.sections.forEach(section => observer.observe(section));

            // Mostra/esconde nav baseado no scroll
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                if (currentScroll > CONFIG.navOffset) {
                    this.nav.classList.add('visible');
                } else {
                    this.nav.classList.remove('visible');
                }
                lastScroll = currentScroll;
            });
        },

        setupSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const offset = this.nav ? this.nav.offsetHeight : 0;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    /* ============================================
       5. BARRA DE PROGRESSO DO SCROLL
       ============================================ */
    const ScrollProgress = {
        init() {
            const bar = document.createElement('div');
            bar.className = 'scroll-progress';
            document.body.appendChild(bar);

            const styles = `
                .scroll-progress {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 3px;
                    width: 0%;
                    background: linear-gradient(90deg,
                        #FF0018, #FFA52C, #FFFF41,
                        #008018, #0000F9, #86007D);
                    z-index: 1001;
                    transition: width 0.1s ease-out;
                    box-shadow: 0 0 10px rgba(134, 0, 125, 0.3);
                }
            `;
            const styleSheet = document.createElement('style');
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);

            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                bar.style.width = `${scrollPercent}%`;
            });
        }
    };

    /* ============================================
       6. EFEITO PARALLAX NO HERO
       ============================================ */
    const Parallax = {
        init() {
            const hero = document.querySelector('.hero');
            if (!hero) return;

            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const heroContent = hero.querySelector('.hero-content');
                if (heroContent && scrolled < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
                }
            });
        }
    };

    /* ============================================
       7. EFEITO TILT 3D NOS CARDS
       ============================================ */
    const CardTilt = {
        init() {
            const cards = document.querySelectorAll('.story-card');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -3;
                    const rotateY = ((x - centerX) / centerX) * 3;

                    card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
                });
            });
        }
    };

    /* ============================================
       8. SPARKLES / CONFETTI AO CLICAR
       ============================================ */
    const Sparkles = {
        init() {
            // Cria sparkles ao clicar em emojis especiais
            const sparkleTargets = document.querySelectorAll('.rainbow-hearts, .pride-emojis, .final-quote .heart-animation');
            sparkleTargets.forEach(target => {
                target.style.cursor = 'pointer';
                target.addEventListener('click', (e) => this.createSparkles(e.clientX, e.clientY));
            });

            // Sparkle geral ao clicar em qualquer lugar (sutil)
            document.addEventListener('click', (e) => {
                if (Math.random() > 0.7) {
                    this.createSparkles(e.clientX, e.clientY, 3);
                }
            });
        },

        createSparkles(x, y, count = CONFIG.sparkleCount) {
            const colors = ['#FF0018', '#FFA52C', '#FFFF41', '#008018', '#0000F9', '#86007D'];
            const emojis = ['✨', '💜', '💙', '💚', '💛', '🧡', '❤️', '🌈', '⭐'];

            for (let i = 0; i < count; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle-particle';
                sparkle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

                const angle = (Math.PI * 2 * i) / count;
                const velocity = 80 + Math.random() * 60;
                const size = 1 + Math.random() * 1.5;

                sparkle.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    font-size: ${size}rem;
                    pointer-events: none;
                    z-index: 9999;
                    transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    opacity: 1;
                `;

                document.body.appendChild(sparkle);

                requestAnimationFrame(() => {
                    sparkle.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0) rotate(${Math.random() * 360}deg)`;
                    sparkle.style.opacity = '0';
                });

                setTimeout(() => sparkle.remove(), 1000);
            }
        }
    };

    /* ============================================
       9. BOTÃO VOLTAR AO TOPO
       ============================================ */
    const BackToTop = {
        init() {
            const button = document.createElement('button');
            button.className = 'back-to-top';
            button.innerHTML = '↑';
            button.setAttribute('aria-label', 'Voltar ao topo');
            document.body.appendChild(button);

            const styles = `
                .back-to-top {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D);
                    background-size: 200% 200%;
                    color: white;
                    border: none;
                    font-size: 1.5rem;
                    font-weight: bold;
                    cursor: pointer;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px);
                    transition: all 0.4s ease;
                    box-shadow: 0 5px 20px rgba(134, 0, 125, 0.3);
                    z-index: 999;
                    animation: rainbow-flow 5s ease infinite;
                }
                .back-to-top.visible {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }
                .back-to-top:hover {
                    transform: translateY(-5px) scale(1.1);
                    box-shadow: 0 10px 30px rgba(134, 0, 125, 0.5);
                }
                @keyframes rainbow-flow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @media (max-width: 768px) {
                    .back-to-top {
                        width: 45px;
                        height: 45px;
                        bottom: 1.5rem;
                        right: 1.5rem;
                        font-size: 1.3rem;
                    }
                }
            `;
            const styleSheet = document.createElement('style');
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);

            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 500) {
                    button.classList.add('visible');
                } else {
                    button.classList.remove('visible');
                }
            });

            button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    /* ============================================
       10. TYPEWRITER EFFECT (Efeito de Digitação)
       ============================================ */
    const Typewriter = {
        init() {
            const subtitle = document.querySelector('.hero-subtitle');
            if (!subtitle) return;

            const text = subtitle.textContent;
            subtitle.textContent = '';
            subtitle.style.visibility = 'visible';

            let i = 0;
            const type = () => {
                if (i < text.length) {
                    subtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, CONFIG.typewriterSpeed);
                }
            };

            // Inicia após o preloader desaparecer
            setTimeout(type, 2000);
        }
    };

    /* ============================================
       11. PARTÍCULAS NO HERO (Canvas)
       ============================================ */
    const HeroParticles = {
        canvas: null,
        ctx: null,
        particles: [],
        animationId: null,

        init() {
            const hero = document.querySelector('.hero');
            if (!hero) return;

            this.canvas = document.createElement('canvas');
            this.canvas.className = 'hero-particles';
            this.canvas.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
            `;
            hero.insertBefore(this.canvas, hero.firstChild);
            this.ctx = this.canvas.getContext('2d');

            this.resize();
            window.addEventListener('resize', () => this.resize());

            this.createParticles();
            this.animate();
        },

        resize() {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        },

        createParticles() {
            this.particles = [];
            const count = window.innerWidth < 768 ? 25 : CONFIG.particleCount;
            const emojis = ['✨', '💜', '💙', '💚', '💛', '🧡', '❤️', '⭐', '🌈'];

            for (let i = 0; i < count; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: 10 + Math.random() * 20,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    emoji: emojis[Math.floor(Math.random() * emojis.length)],
                    opacity: 0.2 + Math.random() * 0.4,
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 2
                });
            }
        },

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.rotation += p.rotationSpeed;

                // Wrap around edges
                if (p.x < -50) p.x = this.canvas.width + 50;
                if (p.x > this.canvas.width + 50) p.x = -50;
                if (p.y < -50) p.y = this.canvas.height + 50;
                if (p.y > this.canvas.height + 50) p.y = -50;

                this.ctx.save();
                this.ctx.globalAlpha = p.opacity;
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.rotation * Math.PI / 180);
                this.ctx.font = `${p.size}px serif`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(p.emoji, 0, 0);
                this.ctx.restore();
            });

            this.animationId = requestAnimationFrame(() => this.animate());
        }
    };

    /* ============================================
       12. ANIMAÇÃO DOS DOTS DA TIMELINE
       ============================================ */
    const TimelineAnimation = {
        init() {
            const dots = document.querySelectorAll('.timeline-dot');
            if (!dots.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(-50%) scale(1.5)';
                            setTimeout(() => {
                                entry.target.style.transform = 'translateY(-50%) scale(1)';
                            }, 300);
                        }, index * 150);
                    }
                });
            }, { threshold: 0.5 });

            dots.forEach(dot => observer.observe(dot));
        }
    };

    /* ============================================
       13. ELEMENTOS FLUTUANTES ALEATÓRIOS
       ============================================ */
    const FloatingElements = {
        init() {
            const hearts = document.querySelectorAll('.floating-heart');
            setInterval(() => {
                hearts.forEach(heart => {
                    const randomDelay = Math.random() * 5;
                    const randomDuration = 5 + Math.random() * 4;
                    heart.style.animationDelay = `${randomDelay}s`;
                    heart.style.animationDuration = `${randomDuration}s`;
                });
            }, 5000);
        }
    };

    /* ============================================
       14. EASTER EGG - KONAMI CODE
       ============================================ */
    const EasterEgg = {
        sequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
        current: 0,

        init() {
            document.addEventListener('keydown', (e) => {
                const expectedKey = this.sequence[this.current];
                if (e.key === expectedKey || e.key.toLowerCase() === expectedKey.toLowerCase()) {
                    this.current++;
                    if (this.current === this.sequence.length) {
                        this.activate();
                        this.current = 0;
                    }
                } else {
                    this.current = 0;
                }
            });
        },

        activate() {
            // Chuva de arco-íris!
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    Sparkles.createSparkles(
                        Math.random() * window.innerWidth,
                        Math.random() * window.innerHeight,
                        2
                    );
                }, i * 30);
            }

            // Mensagem especial
            const message = document.createElement('div');
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem 3rem;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                z-index: 10000;
                text-align: center;
                font-family: 'Playfair Display', serif;
                animation: fade-in-up 0.5s ease;
            `;
            message.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 1rem;">🌈✨🏳️‍🌈</div>
                <h3 style="color: #86007D; margin-bottom: 0.5rem;">Você descobriu o segredo!</h3>
                <p style="color: #4A5568;">O amor é sempre a resposta 💜</p>
            `;
            document.body.appendChild(message);
            setTimeout(() => message.remove(), 4000);
        }
    };

    /* ============================================
       15. MENSAGEM NO CONSOLE
       ============================================ */
    const ConsoleMessage = {
        init() {
            const styles = [
                'color: #86007D',
                'font-size: 16px',
                'font-weight: bold',
                'font-family: sans-serif',
                'padding: 10px'
            ].join(';');

            console.log('%c🌈 A História de João Victor 🌈', styles);
            console.log('%cObrigado por visitar este espaço de amor e autodescoberta!', 'color: #4A5568; font-size: 13px;');
            console.log('%c💜 Dica: Tente o Konami Code para uma surpresa especial!', 'color: #FF0018; font-size: 12px; font-style: italic;');
            console.log('%cSer quem você é também é uma forma de coragem.', 'color: #0000F9; font-size: 12px; font-style: italic;');
        }
    };

    /* ============================================
       16. INICIALIZAÇÃO
       ============================================ */
    const App = {
        init() {
            Preloader.init();
            ConsoleMessage.init();

            // Aguarda o DOM carregar para inicializar os demais módulos
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.startModules());
            } else {
                this.startModules();
            }
        },

        startModules() {
            // Pequeno delay para garantir que tudo esteja renderizado
            setTimeout(() => {
                ScrollAnimations.init();
                Navigation.init();
                ScrollProgress.init();
                Parallax.init();
                CardTilt.init();
                Sparkles.init();
                BackToTop.init();
                Typewriter.init();
                HeroParticles.init();
                TimelineAnimation.init();
                FloatingElements.init();
                EasterEgg.init();
            }, 100);
        }
    };

    // Inicia a aplicação
    App.init();

})();
