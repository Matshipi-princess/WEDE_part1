// stalls.js - JavaScript for Browse Our Stalls page
// Adds hamburger menu, interactive map, gallery lightbox, search, dynamic content, animations, and modals.

document.addEventListener('DOMContentLoaded', function() {
    // 1. Hamburger Menu (unchanged)
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');
    const headerIcons = document.querySelector('.header-icons');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
            headerIcons.classList.toggle('active');
        });
    }

    // 2. Interactive Map (unchanged - assumes Google Maps API is loaded in HTML)
    function initMap() {
        const mapElement = document.querySelector('iframe'); // Note: If using API, replace with div as in previous responses
        if (mapElement) {
            const map = new google.maps.Map(mapElement, {
                center: { lat: -26.19166698348301, lng: 28.033103415006096 },
                zoom: 15
            });
            new google.maps.Marker({
                position: { lat: -26.19166698348301, lng: 28.033103415006096 },
                map: map,
                title: 'Rosebank College Braamfontein'
            });
        }
    }
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`; // Replace YOUR_API_KEY
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // 3. Gallery Lightbox (unchanged)
    const productImages = document.querySelectorAll('.product-card img');
    productImages.forEach(img => {
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '1000';
            lightbox.style.cursor = 'pointer';

            const imgClone = document.createElement('img');
            imgClone.src = this.src;
            imgClone.alt = this.alt;
            imgClone.style.maxWidth = '90%';
            imgClone.style.maxHeight = '90%';
            lightbox.appendChild(imgClone);
            lightbox.addEventListener('click', () => document.body.removeChild(lightbox));
            document.body.appendChild(lightbox);
        });
    });

    // 4. Search Functionality (updated: added class for CSS styling)
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search products or vendors...';
    searchInput.className = 'search-input'; // New class for styling (see CSS below)
    document.querySelector('.product-categories').prepend(searchInput);
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(query) ? 'block' : 'none';
        });
    });

    // 5. Dynamic Content (updated: now shows a popup message instead of adding a product)
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.textContent = 'Load More Products';
    loadMoreBtn.className = 'load-more-btn'; // New class for styling (see CSS below)
    document.querySelector('.product-categories').appendChild(loadMoreBtn);
    loadMoreBtn.addEventListener('click', function() {
        // Show popup message instead of adding a new card
        alert('You have the latest products please remember'); // Simple popup message
    });

    // 6. Animations (unchanged)
    const grids = document.querySelectorAll('.product-grid');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });
    grids.forEach(grid => {
        grid.style.opacity = '0';
        grid.style.transform = 'translateY(20px)';
        grid.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(grid);
    });

    // 7. Interactive Elements: Modal for "Add to Basket" (unchanged)
    const addButtons = document.querySelectorAll('.add-button');
    addButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '50%';
            modal.style.left = '50%';
            modal.style.transform = 'translate(-50%, -50%)';
            modal.style.background = 'white';
            modal.style.padding = '20px';
            modal.style.border = '1px solid #ccc';
            modal.style.zIndex = '1000';
            modal.innerHTML = '<h3>Added to Basket!</h3><p>Product details here.</p><button>Close</button>';
            modal.querySelector('button').addEventListener('click', () => document.body.removeChild(modal));
            document.body.appendChild(modal);
        });
    });
});