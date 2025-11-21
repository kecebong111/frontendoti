// DOM Elements
const toggleServicesBtn = document.getElementById('toggleServices');
const servicesGrid = document.getElementById('servicesGrid');
const hiddenServices = document.querySelectorAll('.service-card.hidden');
const contactForm = document.querySelector('.contact-form');
const navArrows = document.querySelectorAll('.nav-arrow');
const testimonialCard = document.querySelector('.testimonial-card');

// Services Toggle Functionality
toggleServicesBtn.addEventListener('click', function() {
    const isShowingMore = this.querySelector('span:first-child').textContent === 'Show More';
    const arrowIcon = this.querySelector('.arrow-icon');
    
    hiddenServices.forEach(service => {
        service.classList.toggle('hidden');
    });
    
    if (isShowingMore) {
        this.querySelector('span:first-child').textContent = 'Show Less';
        arrowIcon.classList.add('up');
    } else {
        this.querySelector('span:first-child').textContent = 'Show More';
        arrowIcon.classList.remove('up');
    }
});

// Smooth Scrolling for Navigation Links
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

// Contact Form Submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Simple validation
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! We will contact you soon.', 'success');
    this.reset();
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#f44336';
            break;
        default:
            notification.style.backgroundColor = '#2196F3';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Testimonial Navigation (Basic implementation)
let currentTestimonial = 0;
const testimonials = [
    {
        name: 'John Doe',
        role: 'Senior UI/UX Designer',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        avatar: 'https://picsum.photos/seed/avatar1/100/100.jpg',
        image: 'https://picsum.photos/seed/testimonial1/300/200.jpg'
    },
    {
        name: 'Jane Smith',
        role: 'Frontend Developer',
        text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        avatar: 'https://picsum.photos/seed/avatar2/100/100.jpg',
        image: 'https://picsum.photos/seed/testimonial2/300/200.jpg'
    },
    {
        name: 'Mike Johnson',
        role: 'Product Manager',
        text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        avatar: 'https://picsum.photos/seed/avatar3/100/100.jpg',
        image: 'https://picsum.photos/seed/testimonial3/300/200.jpg'
    }
];

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    const testimonialContent = testimonialCard.querySelector('.testimonial-content');
    const testimonialImage = testimonialCard.querySelector('.testimonial-image img');
    
    testimonialContent.innerHTML = `
        <div class="testimonial-avatar">
            <img src="${testimonial.avatar}" alt="${testimonial.name}">
        </div>
        <div class="testimonial-text">
            <p>"${testimonial.text}"</p>
            <div class="testimonial-author">
                <div class="author-name">${testimonial.name}</div>
                <div class="author-role">${testimonial.role}</div>
            </div>
        </div>
    `;
    
    testimonialImage.src = testimonial.image;
    testimonialImage.alt = testimonial.name;
}

navArrows.forEach((arrow, index) => {
    arrow.addEventListener('click', function() {
        if (index === 0) { // Previous
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        } else { // Next
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }
        updateTestimonial();
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(31, 31, 31, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(31, 31, 31, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile Menu Toggle (if needed for mobile)
function createMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelector('.nav-buttons');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    navContainer.appendChild(mobileMenuBtn);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-active');
        navButtons.classList.toggle('mobile-active');
        this.innerHTML = navMenu.classList.contains('mobile-active') ? '✕' : '☰';
    });
}

// Initialize mobile menu for small screens
if (window.innerWidth <= 768) {
    createMobileMenu();
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav-menu, .nav-buttons {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(31, 31, 31, 0.98);
                flex-direction: column;
                padding: 1rem;
                gap: 1rem;
            }
            
            .nav-menu.mobile-active, .nav-buttons.mobile-active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
}

// Console log for debugging
console.log('OmahFE Website loaded successfully!');