// Base JavaScript for shared functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.classList.toggle('active');
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.classList.remove('active');
            });
        }
    });

    // User dropdown functionality
    const userDropdownToggle = document.getElementById('user-dropdown-toggle');
    const userDropdownMenu = document.getElementById('user-dropdown-menu');
    
    if (userDropdownToggle && userDropdownMenu) {
        userDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            userDropdownMenu.classList.toggle('active');
        });

        // Close user dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!userDropdownToggle.contains(event.target) && !userDropdownMenu.contains(event.target)) {
                userDropdownMenu.classList.remove('active');
            }
        });
    }

    // Form submission protection
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';
                
                // Re-enable after 3 seconds (simulate processing)
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtn.getAttribute('data-original-text') || 'Submit';
                }, 3000);
            }
        });
    });

    // Input validation
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });

    // Dropdown accessibility
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// Input validation function
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Email validation
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Required field validation
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Phone number validation
    if (input.type === 'tel') {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (value && !phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }

    if (!isValid) {
        showError(input, errorMessage);
    }

    return isValid;
}

// Show error message
function showError(input, message) {
    // Remove existing error
    clearError(input);
    
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    input.parentNode.appendChild(errorElement);
    input.style.borderColor = '#dc3545';
}

// Clear error message
function clearError(input) {
    const errorElement = input.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
    input.style.borderColor = '#ced4da';
}

// Utility function to sanitize input
function sanitizeInput(input) {
    return input.replace(/[<>]/g, '');
}

// Prevent multiple form submissions
let isSubmitting = false;

function preventMultipleSubmission(form) {
    if (isSubmitting) {
        return false;
    }
    
    isSubmitting = true;
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
    }
    
    setTimeout(() => {
        isSubmitting = false;
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.getAttribute('data-original-text') || 'Submit';
        }
    }, 3000);
    
    return true;
}