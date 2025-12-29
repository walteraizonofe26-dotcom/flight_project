document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateContactForm()) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset form
                form.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        }
    });
    
    function validateContactForm() {
        let isValid = true;
        clearAllErrors();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (!subject.value.trim()) {
            showError(subject, 'Please enter a subject');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Please enter your message');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(input, message) {
        clearError(input);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        
        input.parentNode.appendChild(errorElement);
        input.style.borderColor = '#dc3545';
    }
    
    function clearError(input) {
        const errorElement = input.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
        input.style.borderColor = '#ced4da';
    }
    
    function clearAllErrors() {
        document.querySelectorAll('.form-error').forEach(error => error.remove());
        document.querySelectorAll('.form-input').forEach(input => {
            input.style.borderColor = '#ced4da';
        });
    }
});