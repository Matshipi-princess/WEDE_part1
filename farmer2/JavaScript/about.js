// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Interactive Map: Replace static iframe with Google Maps API for interactivity (zoom, pan, etc.)
    // Note: Requires a Google Maps API key. Replace 'YOUR_API_KEY' with your actual key from Google Cloud Console.
    function initMap() {
        const mapElement = document.querySelector('iframe'); // Target the existing iframe in footer
        if (mapElement) {
            const map = new google.maps.Map(mapElement, {
                center: { lat: -26.19166698348301, lng: 28.033103415006096 }, // Coordinates from the original embed
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            // Add a marker for the location
            new google.maps.Marker({
                position: { lat: -26.19166698348301, lng: 28.033103415006096 },
                map: map,
                title: 'Rosebank College Braamfontein'
            });
        }
    }
    // Load Google Maps script dynamically
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Gallery Lightbox: Add click handlers to images in .stalls-section for a modal lightbox view
    const images = document.querySelectorAll('.stalls-section img'); // Select the three images
    images.forEach(img => {
        img.addEventListener('click', function() {
            // Create lightbox modal
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

            // Close on click
            lightbox.addEventListener('click', () => document.body.removeChild(lightbox));
            document.body.appendChild(lightbox);
        });
    });

    // Animations: Add fade-in effect on scroll for .info-card elements
    const cards = document.querySelectorAll('.info-card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });

    // Interactive Elements: Accordion for .info-card elements (click to toggle content visibility)
    cards.forEach(card => {
        const header = card.querySelector('h2');
        const content = card.querySelector('p');
        content.style.display = 'none'; // Start collapsed
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });
});