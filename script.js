// ============================================
// CRÉATIVE 3D - Interactive Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.8)';
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.service-card, .material-category, .realization-card').forEach(el => {
        observer.observe(el);
    });

    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Envoi en cours...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<span>✓ Message envoyé !</span>';
                submitBtn.style.background = '#22c55e';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    // File upload preview
    const fileInput = document.querySelector('#files');
    const fileUploadContent = document.querySelector('.file-upload-content span');
    
    if (fileInput && fileUploadContent) {
        fileInput.addEventListener('change', () => {
            const files = fileInput.files;
            if (files.length > 0) {
                const fileNames = Array.from(files).map(f => f.name).join(', ');
                fileUploadContent.textContent = `${files.length} fichier(s) sélectionné(s): ${fileNames}`;
            } else {
                fileUploadContent.textContent = 'Glissez vos fichiers ou cliquez pour parcourir';
            }
        });
    }

    // Video thumbnail click
    const videoThumbnail = document.querySelector('.video-thumbnail');
    if (videoThumbnail) {
        videoThumbnail.addEventListener('click', () => {
            window.open('https://youtu.be/WbOKzdcyioM', '_blank');
        });
    }

    // Stats counter animation
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (element.dataset.suffix || '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Trigger stats animation when visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValues = entry.target.querySelectorAll('.stat-value');
                statValues.forEach(stat => {
                    const text = stat.textContent;
                    const num = parseInt(text);
                    if (!isNaN(num) && !stat.dataset.animated) {
                        stat.dataset.animated = 'true';
                        stat.dataset.suffix = text.replace(/[0-9]/g, '');
                        animateValue(stat, 0, num, 1500);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Add hover effect to material categories
    document.querySelectorAll('.material-category').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--accent-primary)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'var(--border-color)';
        });
    });

    console.log('🚀 Créative 3D - Site loaded successfully');
});
