// news.js - JavaScript for News & Events page
// Adds hamburger menu, accordions for news cards, and fade-in animations.

document.addEventListener('DOMContentLoaded', function() {
    // 1. Hamburger Menu Functionality
    // This makes the mobile menu work by toggling the nav list visibility.
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');
    const headerIcons = document.querySelector('.header-icons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navList.classList.toggle('active'); // Shows/hides nav items
            headerIcons.classList.toggle('active'); // Adjusts icons
        });
    }

    // 2. Accordions for News Cards
    // Clicking an image in a news card toggles the visibility of the text content (e.g., description).
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        const img = card.querySelector('img'); // Find the image
        const content = card.querySelector('p') || card.querySelector('h3'); // Find text to toggle
        if (img && content) {
            content.style.display = 'none'; // Start hidden
            img.addEventListener('click', function() {
                // Toggle display
                content.style.display = (content.style.display === 'none') ? 'block' : 'none';
            });
        }
    });

    // 3. Fade-in Animations
    // Adds a smooth fade-in effect to news cards when the page loads.
    newsCards.forEach(card => {
        card.style.opacity = '0'; // Start invisible
        setTimeout(() => {
            card.style.opacity = '1'; // Fade in after a short delay
        }, 500);
    });
});