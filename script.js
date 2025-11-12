// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSplashScreen();
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initTabs();
    initParallax();
    initContactForm();
    initSmoothScrolling();
});

// Splash Screen Animation
function initSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    
    // Hide splash screen after 3.5 seconds
    setTimeout(() => {
        splashScreen.classList.add('hidden');
        
        // Remove splash screen from DOM after transition
        setTimeout(() => {
            if (splashScreen && splashScreen.parentNode) {
                splashScreen.parentNode.removeChild(splashScreen);
            }
        }, 1000);
    }, 3500);
}

// Navigation Functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
        const isActive = !hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('no-scroll', isActive);
        hamburger.setAttribute('aria-expanded', String(isActive));
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('no-scroll');
            hamburger?.setAttribute('aria-expanded', 'false');
        });
    });

    // Navbar background on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.2)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate skill bars when skills section is visible
                if (entry.target.classList.contains('skills-section')) {
                    animateSkillBars();
                }
                
                // Stagger animation for grid items
                if (entry.target.classList.contains('projects-grid')) {
                    staggerGridAnimation(entry.target, '.project-card');
                }
                
                if (entry.target.classList.contains('skills-grid')) {
                    staggerGridAnimation(entry.target, '.skill-category');
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-header, .about-content, .projects-grid, .skills-grid, .deep-dive-content, .contact-content');
    animateElements.forEach(el => observer.observe(el));

    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .section-header, .about-content, .projects-grid, .skills-grid, .deep-dive-content, .contact-content {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .stagger-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .stagger-animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Stagger animation for grid items
function staggerGridAnimation(container, itemSelector) {
    const items = container.querySelectorAll(itemSelector);
    items.forEach((item, index) => {
        item.classList.add('stagger-item');
        setTimeout(() => {
            item.classList.add('stagger-animate');
        }, index * 100);
    });
}

// Skill Bars Animation
function initSkillBars() {
    // This will be triggered by scroll animation
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const skillLevel = bar.getAttribute('data-skill');
        bar.style.width = skillLevel + '%';
    });
}

// Tab Functionality for Deep Dive Section
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab)?.classList.add('active');
        });
    });
}

// Parallax Effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Floating cards parallax
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.1 + (index * 0.05);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            this.reset();
            
            // In a real application, you would send the data to your backend
            console.log('Form submission:', formObject);
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    const style = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 1rem 1.5rem;
        color: white;
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        min-width: 300px;
    `;
    
    notification.style.cssText = style;
    
    if (type === 'success') {
        notification.style.borderColor = 'rgba(34, 197, 94, 0.5)';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Mouse tracking for interactive effects (pointer precision only)
if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', debounce((e) => {
        const cursor = { x: e.clientX, y: e.clientY };
        
        // Subtle parallax effect for floating cards
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
            
            const distance = Math.sqrt(
                Math.pow(cursor.x - cardCenter.x, 2) + 
                Math.pow(cursor.y - cardCenter.y, 2)
            );
            
            if (distance < 200) {
                const angle = Math.atan2(cursor.y - cardCenter.y, cursor.x - cardCenter.x);
                const strength = (200 - distance) / 200 * 10;
                const moveX = Math.cos(angle) * strength;
                const moveY = Math.sin(angle) * strength;
                
                card.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                card.style.transform = 'translate(0px, 0px)';
            }
        });
    }, 16));
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced hover effects for glass morphism elements
    const glassElements = document.querySelectorAll('.glass-morphism');
    
    glassElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            typeWriter();
        }, 4000); // Start after splash screen
    }
});

// Performance optimization
let ticking = false;

function updateOnScroll() {
    // Batch scroll-dependent updates here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Recalculate any position-dependent elements
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        card.style.transform = 'translate(0px, 0px)';
    });
}, 250));
