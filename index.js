// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initModals();
    initForms();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const header = document.getElementById('header');
    const mobileMenu = document.querySelector('.mobile-menu');
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
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.querySelector('i').classList.toggle('fa-bars');
            mobileMenu.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close mobile menu when clicking on a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenu.querySelector('i').classList.add('fa-bars');
            mobileMenu.querySelector('i').classList.remove('fa-times');
        });
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
    const elementsToAnimate = document.querySelectorAll('.skill-card, .cert-card, .project-card, .service-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Modal functionality
function initModals() {
    const consultBtn = document.getElementById('consult-btn');
    const consultModal = document.getElementById('consult-modal');
    const hireModal = document.getElementById('hire-modal');
    const closeModals = document.querySelectorAll('.close-modal');

    // Open consultation modal
    if (consultBtn) {
        consultBtn.addEventListener('click', function() {
            consultModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Open hire modal from buttons
    const hireButtons = document.querySelectorAll('.btn-secondary');
    hireButtons.forEach(btn => {
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

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === consultModal) {
            consultModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === hireModal) {
            hireModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Form handling
function initForms() {
    const contactForm = document.getElementById('contactForm');
    const consultForm = document.getElementById('consult-form');
    const hireForm = document.getElementById('hire-form');

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // Consultation form submission
    if (consultForm) {
        consultForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('consult-name').value;
            const email = document.getElementById('consult-email').value;
            const date = document.getElementById('consult-date').value;
            const time = document.getElementById('consult-time').value;
            const message = document.getElementById('consult-message').value;

            // Create email content
            const subject = `Consultation Request - ${name}`;
            const body = `Hello Ibrahim,%0D%0A%0D%0AI would like to book a consultation with you.%0D%0A%0D%0AName: ${name}%0D%0AEmail: ${email}%0D%0APreferred Date: ${date}%0D%0APreferred Time: ${time}%0D%0A%0D%0AAdditional Details:%0D%0A${message}%0D%0A%0D%0ALooking forward to your response.`;

            // Open default email client
            window.open(`mailto:princeij56@gmail.com?subject=${subject}&body=${body}`);

            // Close modal and show success message
            document.getElementById('consult-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
            showNotification('Consultation request sent! Check your email for confirmation.', 'success');
            consultForm.reset();
        });
    }

    // Hire form submission
    if (hireForm) {
        hireForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('hire-name').value;
            const email = document.getElementById('hire-email').value;
            const company = document.getElementById('hire-company').value;
            const project = document.getElementById('hire-project').value;
            const budget = document.getElementById('hire-budget').value;
            const details = document.getElementById('hire-details').value;

            // Create email content
            const subject = `Hiring Request - ${name}`;
            const body = `Hello Ibrahim,%0D%0A%0D%0AI would like to hire you for a project.%0D%0A%0D%0AName: ${name}%0D%0AEmail: ${email}%0D%0ACompany: ${company}%0D%0AProject Type: ${project}%0D%0ABudget Range: ${budget}%0D%0A%0D%0AProject Details:%0D%0A${details}%0D%0A%0D%0APlease let me know your availability and rates.`;

            // Open default email client
            window.open(`mailto:princeij56@gmail.com?subject=${subject}&body=${body}`);

            // Close modal and show success message
            document.getElementById('hire-modal').style.display = 'none';
            document.body.style.overflow = 'auto';
            showNotification('Hiring request sent! I\'ll get back to you soon.', 'success');
            hireForm.reset();
        });
    }
}

// Animation initialization
function initAnimations() {
    // Add animation classes to elements
    const animateOnScroll = document.querySelectorAll('.skill-card, .cert-card, .project-card, .service-card');

    animateOnScroll.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animateOnScroll.forEach(el => {
        observer.observe(el);
    });
}

// Notification system
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    // Add close button functionality
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 280);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 280);
        }
    }, 5000);

    // Add to page
    document.body.appendChild(notification);

    // Add keyframe animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        // Set initial opacity to 0 for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});
