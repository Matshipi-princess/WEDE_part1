// community.js - JavaScript for Community & Groups page
// Adds hamburger menu, animations, newsletter handling, and cart counting.

document.addEventListener('DOMContentLoaded', function() {
    // 1. Hamburger Menu
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');
    const headerIcons = document.querySelector('.header-icons');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
            headerIcons.classList.toggle('active');
        });
    }

    // 2. Fade-in Animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        setTimeout(() => section.style.opacity = '1', 300);
    });

    // 3. Newsletter Form Handling
    const newsletterForm = document.querySelector('form[action="#"]');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                alert('Email address received');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email.');
            }
        });
    }

    // 4. Cart Counting
    updateCartCount();
});

function updateCartCount() {
    const cartCount = localStorage.getItem('cartCount') || 0;
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        let badge = cartIcon.nextElementSibling;
        if (!badge || !badge.classList.contains('cart-badge')) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            cartIcon.parentNode.appendChild(badge);
        }
        badge.textContent = cartCount > 0 ? `(${cartCount})` : '';
    }
}
