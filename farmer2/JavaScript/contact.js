// contact.js - JavaScript for Contact Us page
// This file adds interactivity: hamburger menu toggle, form validation, error handling, and simulated AJAX submission with email compilation.

// 1. Hamburger Menu Functionality
// This makes the mobile menu (hamburger) work by toggling visibility of the nav list and icons.
// It runs when the page loads and listens for clicks on the hamburger button.
document.addEventListener('DOMContentLoaded', function() {
    // Find the hamburger menu button and nav list in the HTML
    const hamburger = document.querySelector('.hamburger-menu'); // The three bars
    const navList = document.querySelector('.nav-list'); // The menu items
    const headerIcons = document.querySelector('.header-icons'); // Icons container

    // If the hamburger exists (it should after our HTML update), add a click listener
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Toggle CSS classes to show/hide the menu (your CSS should define these, e.g., .active { display: block; })
            navList.classList.toggle('active'); // Shows/hides nav items
            headerIcons.classList.toggle('active'); // Adjusts icons for mobile
        });
    }
});

// 2. Form Validation and Submission
// This handles the contact form: validates inputs, shows errors, and submits data asynchronously.
// It runs when the page loads and listens for form submission.
document.addEventListener('DOMContentLoaded', function() {
    // Find the contact form in the HTML (matches your form's action)
    const form = document.querySelector('form[action="/submit-contact-form"]');
    
    if (form) {
        // Listen for form submission (when user clicks "Send Message")
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the default form submission (page reload)
            
            // Clear any old error messages
            clearErrors();
            
            // Validate the form inputs
            const isValid = validateForm();
            
            if (isValid) {
                // If valid, simulate AJAX submission and prepare email
                submitForm();
            } else {
                // If invalid, errors are already shown by validateForm()
                console.log('Form validation failed. Please fix errors.'); // Debug message
            }
        });
    }
});

// Helper function: Clear old error messages
function clearErrors() {
    // Find all error message elements and remove them
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
}

// Helper function: Validate form inputs
function validateForm() {
    let isValid = true; // Start assuming it's valid
    
    // Get form fields (match your HTML IDs)
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Validate Name: Required, at least 2 characters
    if (!name.value.trim() || name.value.trim().length < 2) {
        showError(name, 'Name is required and must be at least 2 characters.');
        isValid = false;
    }
    
    // Validate Email: Required, must be a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email check
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        showError(email, 'A valid email address is required.');
        isValid = false;
    }
    
    // Validate Subject: Required, at least 5 characters
    if (!subject.value.trim() || subject.value.trim().length < 5) {
        showError(subject, 'Subject is required and must be at least 5 characters.');
        isValid = false;
    }
    
    // Validate Message: Required, at least 10 characters
    if (!message.value.trim() || message.value.trim().length < 10) {
        showError(message, 'Message is required and must be at least 10 characters.');
        isValid = false;
    }
    
    return isValid; // True if all passed, false if any failed
}

// Helper function: Show error message below a field
function showError(field, message) {
    // Create a new error element
    const error = document.createElement('div');
    error.className = 'error-message'; // Style this in CSS (e.g., red text)
    error.textContent = message;
    
    // Insert it after the field
    field.parentNode.insertBefore(error, field.nextSibling);
}

// Helper function: Simulate AJAX submission and prepare email
function submitForm() {
    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Compile data into an object (for AJAX)
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };
    
    // Simulate AJAX submission using fetch() (asynchronous, no page reload)
    // Replace 'https://dummy-endpoint.com/submit' with your real server URL later
    fetch('https://dummy-endpoint.com/submit', { // Dummy URL for demo
        method: 'POST', // Send data
        headers: { 'Content-Type': 'application/json' }, // Tell server it's JSON
        body: JSON.stringify(formData) // Convert data to JSON
    })
    .then(response => {
        if (response.ok) {
            // Success: Log and prepare email
            console.log('Form submitted successfully via AJAX:', formData);
            alert('Thank you! Your message has been submitted.'); // User feedback
            
            // Compile and open email client (mailto for "sending" email)
            const recipient = 'info@munchandmakers.com'; // From your HTML
            const emailSubject = `Contact Form: ${subject}`;
            const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form
            document.querySelector('form').reset();
        } else {
            // Error: Show message
            console.error('Submission failed:', response.status);
            alert('Submission failed. Please try again.');
        }
    })
    .catch(error => {
        // Network error: Fallback to email client anyway
        console.error('AJAX error:', error);
        alert('Network error. Opening email client instead.');
        
        // Still open email as fallback
        const recipient = 'info@munchandmakers.com';
        const emailSubject = `Contact Form: ${subject}`;
        const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    });
}
