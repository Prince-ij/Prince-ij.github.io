// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initModals();
    initForms();
    initAnimations();
    initScrollToTop();
    initEmailHandler();
});

// Navigation functionality
function initNavigation() {
    const header = document.getElementById('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.skill-card, .cert-card, .project-card, .service-card, .about-img, .contact-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Modal functionality
function initModals() {
    const consultBtn = document.getElementById('consult-btn');
    const consultModal = document.getElementById('consult-modal');
    const hireModal = document.getElementById('hire-modal');
    const closeModals = document.querySelectorAll('.close-modal');
    const hireBtns = document.querySelectorAll('a[href="#contact"]:not(.nav-links a)');

    // Open consultation modal
    if (consultBtn) {
        consultBtn.addEventListener('click', function(e) {
            e.preventDefault();
            consultModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Open hire modal when "Hire Me" is clicked
    hireBtns.forEach(btn => {
        if (btn.textContent.includes('Hire Me')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                hireModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Close modals
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            consultModal.style.display = 'none';
            hireModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    [consultModal, hireModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            consultModal.style.display = 'none';
            hireModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Form functionality
function initForms() {
    const contactForm = document.getElementById('contactForm');
    const consultForm = document.getElementById('consult-form');
    const hireForm = document.getElementById('hire-form');

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'contact');
        });
    }

    // Consultation form submission
    if (consultForm) {
        consultForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleConsultationSubmission(this);
        });
    }

    // Hire form submission
    if (hireForm) {
        hireForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this, 'hiring');
        });
    }
}

// Handle consultation form submission specifically
function handleConsultationSubmission(form) {
    const formData = new FormData(form);
    const data = {};

    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Create WhatsApp message with form details
    const whatsappMessage = `Hi Ibrahim! I would like to book a consultation.

📝 *Consultation Request Details:*

👤 *Name:* ${data['consult-name'] || 'Not provided'}
📧 *Email:* ${data['consult-email'] || 'Not provided'}
📅 *Preferred Date:* ${data['consult-date'] || 'Not specified'}
⏰ *Preferred Time:* ${data['consult-time'] || 'Not specified'}
💬 *Additional Details:* ${data['consult-message'] || 'None provided'}

Looking forward to discussing my project with you!`;

    // Create WhatsApp link
    const phoneNumber = '2347033662993';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Simulate processing time then open WhatsApp
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Show success message
        showNotification('Opening WhatsApp with your consultation request!', 'success');

        // Reset form and close modal
        form.reset();
        const modal = form.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }, 1000);
}// Handle form submissions
function handleFormSubmission(form, type) {
    const formData = new FormData(form);
    const data = {};

    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Show success message
        showNotification(`Thank you! Your ${type} request has been sent successfully.`, 'success');

        // Reset form
        form.reset();

        // Close modal if it's a modal form
        if (type !== 'contact') {
            const modal = form.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

        // Generate WhatsApp link based on form type
        generateWhatsAppLink(data, type);
    }, 1500);
}

// Generate WhatsApp link
function generateWhatsAppLink(data, type) {
    const phoneNumber = '2347033662993';
    let message = '';

    switch (type) {
        case 'contact':
            message = `Hi Ibrahim! I'm ${data.name || 'interested in your services'}. ${data.message || 'I would like to discuss a project with you.'}`;
            break;
        case 'consultation':
            message = `Hi Ibrahim! I would like to book a consultation on ${data['consult-date'] || 'weekend'} at ${data['consult-time'] || 'your convenient time'}. ${data['consult-message'] || 'Looking forward to discussing my project.'}`;
            break;
        case 'hiring':
            message = `Hi Ibrahim! I'm interested in hiring you for a ${data['hire-project'] || 'project'}. Budget: ${data['hire-budget'] || 'Negotiable'}. ${data['hire-details'] || 'Let me know your availability.'}`;
            break;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Show option to contact via WhatsApp
    setTimeout(() => {
        if (confirm('Would you like to continue the conversation on WhatsApp?')) {
            window.open(whatsappUrl, '_blank');
        }
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10001;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Add slide in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
            if (style.parentNode) {
                style.remove();
            }
        }, 300);
    }, 5000);
}

// Initialize animations
function initAnimations() {
    // Add entrance animations to hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero h1, .hero-description, .hero-stats, .hero-btns');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Initialize floating icons animation
    const floatingIcons = document.querySelectorAll('.icon-item');
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });

    // Initialize typed text effect for hero title
    initTypedEffect();
}

// Typed text effect
function initTypedEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;

    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';

    let index = 0;
    const speed = 100;

    function typeText() {
        if (index < text.length) {
            heroTitle.innerHTML = text.slice(0, index + 1);
            index++;
            setTimeout(typeText, speed);
        }
    }

    // Start typing effect after initial delay
    setTimeout(typeText, 800);
}

// Initialize scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow-large);
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        z-index: 1000;
    `;

    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = 'var(--shadow-xl)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow-large)';
    });
}

// Initialize particle background (optional enhancement)
function initParticleBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0.1;
    `;

    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(37, 99, 235, ${particle.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    // Initialize
    resizeCanvas();
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
    }
    animateParticles();

    window.addEventListener('resize', resizeCanvas);
}

// Performance optimization
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;

    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 10);
    });
}

// Initialize theme toggle (for future dark mode support)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--bg-primary);
        border: 2px solid var(--border-color);
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        color: var(--text-primary);
        box-shadow: var(--shadow-medium);
        transition: var(--transition);
        z-index: 999;
        transform: translateY(-50%);
    `;

    // For now, just add hover effect (dark mode implementation can be added later)
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-50%) scale(1.1)';
        this.style.boxShadow = 'var(--shadow-large)';
    });

    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-50%) scale(1)';
        this.style.boxShadow = 'var(--shadow-medium)';
    });

    // Uncomment to add theme toggle to page
    // document.body.appendChild(themeToggle);
}

// Initialize email handler
function initEmailHandler() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Try to open with mailto first
            try {
                window.location.href = href;
            } catch (error) {
                // Fallback: copy email to clipboard and show notification
                e.preventDefault();
                const email = 'princeij56@gmail.com';

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(email).then(() => {
                        showNotification('Email address copied to clipboard: ' + email, 'success');
                    }).catch(() => {
                        showNotification('Please email me at: ' + email, 'info');
                    });
                } else {
                    // Fallback for older browsers
                    showNotification('Please email me at: ' + email, 'info');
                }
            }
        });
    });
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initPerformanceOptimizations();
        // initParticleBackground(); // Uncomment for particle effect
        // initThemeToggle(); // Uncomment for theme toggle
    });
} else {
    initPerformanceOptimizations();
    // initParticleBackground();
    // initThemeToggle();
}
