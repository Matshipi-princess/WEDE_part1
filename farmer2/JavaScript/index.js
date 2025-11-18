     // index.js - JavaScript for Index/Home page
     // Adds hamburger menu, interactive Google Maps, and animations.

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

         // 2. Interactive Google Maps (replaces static iframe)
         // This uses the Google Maps API for dynamic features like zooming and markers.
         window.initMap = function() {
             // Coordinates for Rosebank College Braamfontein (from your original iframe)
             const location = { lat: -26.19166698348301, lng: 28.033103415006096 };
             
             // Create the map
             const map = new google.maps.Map(document.getElementById('map'), {
                 zoom: 13, // Starting zoom
                 center: location, // Center on the location
                 mapTypeId: google.maps.MapTypeId.ROADMAP // Basic map style
             });
             
             // Add a marker at the location
             const marker = new google.maps.Marker({
                 position: location,
                 map: map,
                 title: 'Rosebank College Braamfontein' // Tooltip on hover
             });
             
             // Click the map to zoom in (interactive feature)
             map.addListener('click', () => {
                 const currentZoom = map.getZoom();
                 map.setZoom(currentZoom + 1); // Increase zoom by 1 level
             });
             
             // Optional: Info window on marker click
             const infoWindow = new google.maps.InfoWindow({
                 content: '<h3>Rosebank College Braamfontein</h3><p>Your location for Munch & Makers!</p>'
             });
             marker.addListener('click', () => {
                 infoWindow.open(map, marker);
             });
         };
         
         // Fallback: If API fails, show a message (e.g., no internet)
         window.addEventListener('error', (e) => {
             if (e.target.src && e.target.src.includes('maps.googleapis.com')) {
                 document.getElementById('map').innerHTML = '<p>Map failed to load. Check your connection or API key.</p>';
             }
         });

         // 3. Animations (fade-in for sections)
         const sections = document.querySelectorAll('section');
         sections.forEach((section, index) => {
             section.style.opacity = '0';
             setTimeout(() => section.style.opacity = '1', index * 200);
         });
     });
     