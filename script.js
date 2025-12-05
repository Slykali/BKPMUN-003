// ============================================
// MUN SIMULATION PLATFORM - INTERACTIVE JAVASCRIPT
// ============================================

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Animated counter for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Initialize stats animation when in viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.getAttribute('data-target'));
            
            if (!statNumber.classList.contains('animated')) {
                animateCounter(statNumber, target);
                statNumber.classList.add('animated');
            }
        }
    });
}, observerOptions);

// Observe all stat items
document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// Filter functionality for Study Guides
const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
const guideCards = document.querySelectorAll('.guide-card[data-category]');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            guideCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Filter functionality for Delegates
const delegateFilterButtons = document.querySelectorAll('.delegates-filter .filter-btn[data-filter]');
const delegateCards = document.querySelectorAll('.delegate-card[data-region]');

if (delegateFilterButtons.length > 0) {
    delegateFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            delegateFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            delegateCards.forEach(card => {
                const region = card.getAttribute('data-region');
                
                if (filter === 'all' || 
                    (filter === 'permanent' && region === 'permanent') ||
                    (filter === 'europe' && region === 'europe') ||
                    (filter === 'asia' && region === 'asia') ||
                    (filter === 'africa' && region === 'africa') ||
                    (filter === 'americas' && region === 'americas')) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Search functionality for Study Guides
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        guideCards.forEach(card => {
            const title = card.querySelector('.guide-title').textContent.toLowerCase();
            const description = card.querySelector('.guide-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Smooth scrolling for anchor links
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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const shapes = hero.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Add fade-in animation on scroll
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Observe elements for fade-in
document.querySelectorAll('.feature-card, .guide-card, .committee-card, .delegate-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Simulate live updates for simulation interface
const updateSimulationTimer = () => {
    const timer = document.querySelector('.sim-timer');
    if (timer) {
        let seconds = 0;
        setInterval(() => {
            seconds++;
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            timer.textContent = `⏱️ ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }, 1000);
    }
};

// Initialize timer if on homepage
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    updateSimulationTimer();
}

// Add hover effects to cards
document.querySelectorAll('.feature-card, .guide-card, .committee-card, .delegate-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Console welcome message
console.log('%c🌍 MUN Simulation Platform', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cWelcome to the MUN Simulation Platform!', 'font-size: 14px; color: #8b5cf6;');
console.log('%cExperience diplomacy in action.', 'font-size: 12px; color: #ec4899;');

