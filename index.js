document.addEventListener('DOMContentLoaded', () => {
    // Intro Animation
    const introScreen = document.getElementById('intro-screen');
    if (introScreen) {
        document.body.style.overflow = 'hidden';
        
        const startBtn = document.getElementById('start-intro-btn');
        const loadingText = document.getElementById('loading-text');
        const logoContainer = document.getElementById('logo-container');
        
        // Sound effects
        const sfxClick = new Audio('https://www.myinstants.com/media/sounds/minecraft_click.mp3');
        const sfxPortal = new Audio('https://www.myinstants.com/media/sounds/portal_travel.mp3');
        const sfxBlock = new Audio('https://www.myinstants.com/media/sounds/wood1.mp3');
        const sfxChest = new Audio('https://www.myinstants.com/media/sounds/chestopen.mp3');
        const sfxDing = new Audio('https://www.myinstants.com/media/sounds/minecraft_level_up.mp3');
        const sfxCreeper = new Audio('https://www.myinstants.com/media/sounds/creeper-explosion.mp3');
        
        const words = ["HACKCRAFT"];
        
        startBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Play click, portal, and ding sounds
            sfxClick.play().catch(() => {});
            sfxPortal.volume = 0.8;
            sfxPortal.play().catch(() => {});
            sfxDing.volume = 0.6;
            sfxDing.play().catch(() => {});
            
            // Hide button, show loading
            startBtn.classList.add('hidden');
            loadingText.classList.remove('hidden');
            
            // Generate blocks
            words.forEach(word => {
                const wordRow = document.createElement('div');
                wordRow.className = 'flex justify-center flex-wrap w-full';
                word.split('').forEach(char => {
                    const block = document.createElement('div');
                    if (char === ' ') {
                        block.className = 'w-4 md:w-8';
                    } else {
                        // Randomize block type
                        const isGrass = Math.random() > 0.5;
                        block.className = `falling-block ${isGrass ? 'grass' : ''}`;
                        const charSpan = document.createElement('span');
                        charSpan.className = 'text-shadow';
                        charSpan.textContent = char;
                        block.appendChild(charSpan);
                    }
                    wordRow.appendChild(block);
                });
                logoContainer.appendChild(wordRow);
            });
            
            // Wait a bit, then drop blocks
            setTimeout(() => {
                loadingText.classList.add('opacity-0');
                
                setTimeout(() => {
                    loadingText.classList.add('hidden');
                    logoContainer.classList.remove('hidden');
                    
                    const blocks = document.querySelectorAll('.falling-block');
                    let blockIndex = 0;
                    
                    const dropInterval = setInterval(() => {
                        if (blockIndex < blocks.length) {
                            blocks[blockIndex].classList.add('dropped');
                            // Play block sound
                            const soundClone = sfxBlock.cloneNode();
                            soundClone.volume = 0.4;
                            soundClone.play().catch(() => {});
                            blockIndex++;
                        } else {
                            clearInterval(dropInterval);
                            
                            // Play chest open sound
                            sfxChest.volume = 0.7;
                            sfxChest.play().catch(() => {});
                            
                            // Wait 3 seconds total, but play creeper blast before the transition
                            setTimeout(() => {
                                // Play creeper blast 1.5s before the main page loads
                                sfxCreeper.volume = 0.8;
                                sfxCreeper.play().catch(() => {});
                            }, 1500);

                            setTimeout(() => {
                                introScreen.classList.add('opacity-0');
                                
                                setTimeout(() => {
                                    introScreen.remove();
                                    document.body.style.overflow = '';
                                }, 1000);
                            }, 3000);
                        }
                    }, 80); // Drop speed
                }, 500);
            }, 1500); // "Loading World..." display duration
        });
    }

    // Parallax effect on clouds based on mouse movement (optional subtle effect)
    document.addEventListener('mousemove', (e) => {
        const clouds = document.querySelectorAll('.cloud');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        clouds.forEach((cloud, index) => {
            const speed = (index + 1) * 10;
            const xOffset = (window.innerWidth / 2 - e.pageX) / speed;
            const yOffset = (window.innerHeight / 2 - e.pageY) / speed;
            cloud.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // FAQ Accordion Logic
    const faqBtns = document.querySelectorAll('.faq-btn');
    
    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            
            // Close all others
            document.querySelectorAll('.faq-content').forEach(c => {
                if(c !== content && !c.classList.contains('hidden')) {
                    c.classList.add('hidden');
                    c.previousElementSibling.querySelector('.faq-icon').textContent = '+';
                }
            });

            // Toggle current
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.textContent = '-';
                // Play subtle sound if desired (using Web Audio API, ignored for now to keep it lightweight)
            } else {
                content.classList.add('hidden');
                icon.textContent = '+';
            }
        });
    });

    // Scroll rules horizontally with mouse wheel and auto-scroll
    const rulesContainer = document.getElementById('rules-container');
    if (rulesContainer) {
        let isHovered = false;

        // Manual scroll with wheel
        rulesContainer.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                rulesContainer.scrollLeft += e.deltaY;
            }
        });

        // Pause on hover
        rulesContainer.addEventListener('mouseenter', () => isHovered = true);
        rulesContainer.addEventListener('mouseleave', () => isHovered = false);
        
        // Pause on touch (for mobile)
        rulesContainer.addEventListener('touchstart', () => isHovered = true);
        rulesContainer.addEventListener('touchend', () => {
            setTimeout(() => isHovered = false, 1000); // Resume after 1s
        });

        // Auto-scroll animation loop
        const scrollSpeed = 1; // pixels per frame
        const autoScroll = () => {
            if (!isHovered) {
                rulesContainer.scrollLeft += scrollSpeed;
                
                // If reached the end, reset to the beginning smoothly
                if (rulesContainer.scrollLeft >= (rulesContainer.scrollWidth - rulesContainer.clientWidth - 1)) {
                    rulesContainer.scrollLeft = 0;
                }
            }
            requestAnimationFrame(autoScroll);
        };
        
        // Start animation
        requestAnimationFrame(autoScroll);
    }

    // Nav active state on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-mc-grass');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('text-mc-grass');
            }
        });
    });

    // Global click sound
    const globalClickSfx = new Audio('https://www.myinstants.com/media/sounds/minecraft_click.mp3');
    document.addEventListener('click', () => {
        const soundClone = globalClickSfx.cloneNode();
        soundClone.volume = 0.5;
        soundClone.play().catch(() => {});
    });

    // Audio click visual effect (micro-interaction)
    const buttons = document.querySelectorAll('.mc-btn, .mc-btn-play, .faq-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.98)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = '';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
});
