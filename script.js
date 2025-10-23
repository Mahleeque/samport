// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});


// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close nav when clicking outside (for mobile)
document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.closest('.nav-container') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scroll for navigation links
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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe project cards, skills, and About photo
document.querySelectorAll('.project-card, .skill-category, .about-photo').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Form submission

// Form submission (EmailJS)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Initialize EmailJS
    emailjs.init('7FjlyZDYgMLFs4jiX'); // your public key

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        // Grab values
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !message) {
            alert("Please fill out all fields.");
            return;
        }

        // Send Email via EmailJS
        emailjs.send('service_9tbnvts', 'template_kzfovwm', {
            from_name: name,
            from_email: email,
            message: message
        }).then(() => {
            submitButton.textContent = 'Message Sent! ✓';
            submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            contactForm.reset();
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            }, 3000);
        }).catch((error) => {
            console.error('EmailJS Error:', error);
            submitButton.textContent = 'Send Failed — Try Again';
            submitButton.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            }, 3000);
        });
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Add animation to floating boxes
const floatingBoxes = document.querySelectorAll('.floating-box');
floatingBoxes.forEach((box, index) => {
    box.style.animation = `float ${6 + index * 2}s ease-in-out infinite`;
});

console.log('Portfolio loaded successfully! 🚀');
