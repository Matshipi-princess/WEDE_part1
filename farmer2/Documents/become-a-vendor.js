// vendor.js - JavaScript for Become a Vendor page
// Adds hamburger menu, form validation, submission, and animations.

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

    // 2. Animations (fade-in for forms on load)
    const forms = document.querySelectorAll('.form-card');
    forms.forEach(form => {
        form.style.opacity = '0';
        setTimeout(() => form.style.opacity = '1', 500); // Fade in after 0.5s
    });

    // 3. Form Validation and Submission (for both forms)
    const accountForm = document.querySelector('form[action="/register"]');
    const vendorForm = document.querySelector('form[action="/submit-vendor-application"]');

    function handleForm(form, recipientEmail) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            clearErrors();
            if (validateForm(form)) {
                submitForm(form, recipientEmail);
            }
        });
    }

    if (accountForm) handleForm(accountForm, 'vendors@munchandmakers.com');
    if (vendorForm) handleForm(vendorForm, 'info@munchandmakers.com');

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                showError(input, `${input.name} is required.`);
                isValid = false;
            }
            if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                showError(input, 'Invalid email.');
                isValid = false;
            }
        });
        return isValid;
    }

    function showError(field, message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        field.parentNode.insertBefore(error, field.nextSibling);
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(e => e.remove());
    }

    function submitForm(form, recipient) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        fetch('https://dummy-endpoint.com/submit', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                alert('Submitted successfully!');
                const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
                window.location.href = `mailto:${recipient}?subject=Vendor Application&body=${encodeURIComponent(body)}`;
                form.reset();
            } else {
                alert('Failed. Opening email.');
                window.location.href = `mailto:${recipient}?subject=Vendor Application`;
            }
        })
        .catch(() => {
            alert('Error. Opening email.');
            window.location.href = `mailto:${recipient}?subject=Vendor Application`;
        });
    }
});