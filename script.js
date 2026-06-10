// ============================================
// BAKING BISTRO - Main JavaScript File
// ============================================

// Gallery Data
const galleryData = [
    { id: 1, category: 'birthday', title: 'Rainbow Birthday', emoji: '🎂' },
    { id: 2, category: 'wedding', title: 'Classic White Wedding', emoji: '💍' },
    { id: 3, category: 'anniversary', title: 'Gold Elegance', emoji: '✨' },
    { id: 4, category: 'kids', title: 'Unicorn Dreams', emoji: '🦄' },
    { id: 5, category: 'corporate', title: 'Corporate Excellence', emoji: '🏢' },
    { id: 6, category: 'luxury', title: 'Golden Luxury', emoji: '👑' },
    { id: 7, category: 'birthday', title: 'Chocolate Delight', emoji: '🍫' },
    { id: 8, category: 'wedding', title: 'Rose Garden', emoji: '🌹' },
    { id: 9, category: 'kids', title: 'Space Adventure', emoji: '🚀' },
];

// ============================================
// Navigation & Scroll Effects
// ============================================

const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when link is clicked
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// ============================================
// Smooth Scroll to Section
// ============================================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================
// Gallery Functionality
// ============================================

const galleryGrid = document.getElementById('galleryGrid');
const galleryFilters = document.querySelectorAll('.gallery-filter');
let currentFilter = 'all';

// Initialize gallery
function initializeGallery() {
    renderGallery('all');
}

function renderGallery(filter) {
    galleryGrid.innerHTML = '';
    
    const filteredItems = filter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === filter);
    
    filteredItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        galleryItem.innerHTML = `
            <div class="w-full h-full flex items-center justify-center text-7xl">${item.emoji}</div>
            <div class="gallery-item-label">
                <h3 class="font-playfair text-xl font-bold">${item.title}</h3>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}

// Gallery filter functionality
galleryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        galleryFilters.forEach(f => f.classList.remove('active'));
        // Add active class to clicked filter
        filter.classList.add('active');
        // Get the filter category
        const category = filter.dataset.filter;
        currentFilter = category;
        // Render gallery with selected category
        renderGallery(category);
    });
});

// ============================================
// Cake Builder Form Functionality
// ============================================

const cakeBuilderForm = document.getElementById('cakeBuilderForm');
const dropzone = document.getElementById('dropzone');
const imageUpload = document.getElementById('imageUpload');
const uploadedFiles = document.getElementById('uploadedFiles');
let selectedImages = [];

// Dropzone click to upload
dropzone.addEventListener('click', () => {
    imageUpload.click();
});

// Drag and drop functionality
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

// File input change
imageUpload.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            selectedImages.push({
                name: file.name,
                size: (file.size / 1024).toFixed(2)
            });
        }
    });
    displayUploadedFiles();
}

function displayUploadedFiles() {
    uploadedFiles.innerHTML = '';
    selectedImages.forEach((file, index) => {
        const fileTag = document.createElement('div');
        fileTag.className = 'file-tag';
        fileTag.innerHTML = `
            <span>📄 ${file.name.substring(0, 15)}...</span>
            <button type="button" onclick="removeFile(${index})">✕</button>
        `;
        uploadedFiles.appendChild(fileTag);
    });
}

function removeFile(index) {
    selectedImages.splice(index, 1);
    displayUploadedFiles();
}

// Form submission - Send via WhatsApp
cakeBuilderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(cakeBuilderForm);
    const occasion = formData.get('occasion');
    const servings = formData.get('servings');
    const flavor = formData.get('flavor');
    const budget = formData.get('budget');
    const theme = formData.get('theme');
    const deliveryDate = formData.get('deliveryDate');
    const deliveryTime = formData.get('deliveryTime') || 'Not specified';
    const requirements = formData.get('requirements');
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    
    // Create WhatsApp message
    let message = `Hello Baking Bistro!\n\n`;
    message += `I would like to design a custom cake with the following details:\n\n`;
    message += `📋 *Cake Details*\n`;
    message += `• Occasion: ${occasion}\n`;
    message += `• Servings: ${servings}\n`;
    message += `• Flavor: ${flavor}\n`;
    message += `• Budget: ${budget}\n`;
    message += `• Theme/Style: ${theme}\n`;
    message += `• Delivery Date: ${deliveryDate}\n`;
    message += `• Delivery Time: ${deliveryTime}\n\n`;
    
    if (requirements) {
        message += `📝 *Special Requirements*\n${requirements}\n\n`;
    }
    
    if (selectedImages.length > 0) {
        message += `📸 *Uploaded ${selectedImages.length} reference image(s)*\n\n`;
    }
    
    message += `👤 *Contact Information*\n`;
    message += `• Name: ${name}\n`;
    message += `• Phone: ${phone}\n`;
    message += `• Email: ${email}\n\n`;
    message += `Looking forward to creating my dream cake with Baking Bistro!`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with pre-filled message
    // Replace with actual WhatsApp number
    const whatsappURL = `https://wa.me/1234567890?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    
    // Show success message
    showNotification('Your cake design is being sent via WhatsApp! 🎉');
    
    // Reset form
    cakeBuilderForm.reset();
    selectedImages = [];
    uploadedFiles.innerHTML = '';
});

// ============================================
// Contact Form Functionality
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoURL = `mailto:hello@bakingbistro.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoURL;
    
    // Show success message
    showNotification('Opening your email client...');
    
    // Reset form
    contactForm.reset();
});

// ============================================
// FAQ Functionality
// ============================================

const faqButtons = document.querySelectorAll('.faq-button');

faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Close other open FAQs
        faqButtons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('active');
                btn.nextElementSibling.classList.remove('show');
            }
        });
        
        // Toggle current FAQ
        button.classList.toggle('active');
        const content = button.nextElementSibling;
        content.classList.toggle('show');
    });
});

// ============================================
// Notification System
// ============================================

function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-6 bg-gradient-to-r from-blush-pink to-chocolate text-white px-6 py-3 rounded-full shadow-2xl animate-slide-in-right z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'all 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ============================================
// Intersection Observer for Scroll Animations
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    
    // Add some polish with hover effects
    addHoverEffects();
    
    // Log initialization
    console.log('✨ Baking Bistro website initialized!');
});

function addHoverEffects() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// Keyboard Navigation
// ============================================

document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
    }
    
    // Close FAQ on ESC
    if (e.key === 'Escape') {
        faqButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.nextElementSibling.classList.remove('show');
        });
    }
});

// ============================================
// Performance Optimization
// ============================================

// Lazy load images when they come into view
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Accessibility Improvements
// ============================================

// Add focus visible styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});
