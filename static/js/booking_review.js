document.addEventListener('DOMContentLoaded', function() {
    const passengerForm = document.getElementById('passenger-form');
    const proceedBtn = document.getElementById('proceed-payment');
    
    // Load selected flight from localStorage
    const selectedFlight = JSON.parse(localStorage.getItem('selectedFlight'));
    if (selectedFlight) {
        document.getElementById('airline').textContent = selectedFlight.airline;
        document.getElementById('from').textContent = selectedFlight.departureAirport;
        document.getElementById('to').textContent = selectedFlight.arrivalAirport;
        document.getElementById('departure').textContent = `2025-01-15 at ${selectedFlight.departureTime}`;
        document.getElementById('arrival').textContent = `2025-01-15 at ${selectedFlight.arrivalTime}`;
        document.getElementById('duration').textContent = selectedFlight.duration;
        document.getElementById('ticket-price').textContent = selectedFlight.price;
        
        // Calculate total price (ticket + taxes)
        const ticketPrice = parseInt(selectedFlight.price.replace(/[₦,]/g, ''));
        const taxes = 5000;
        const totalPrice = ticketPrice + taxes;
        document.getElementById('total-price').textContent = `₦${totalPrice.toLocaleString()}`;
    }
    
    // Form validation
    passengerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validatePassengerForm()) {
            proceedToPayment();
        }
    });
    
    // Proceed button click
    proceedBtn.addEventListener('click', function() {
        if (validatePassengerForm()) {
            proceedToPayment();
        }
    });
    
    function validatePassengerForm() {
        let isValid = true;
        clearAllErrors();
        
        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        
        // Validate required fields
        if (!firstName.value.trim()) {
            showError(firstName, 'First name is required');
            isValid = false;
        }
        
        if (!lastName.value.trim()) {
            showError(lastName, 'Last name is required');
            isValid = false;
        }
        
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!phone.value.trim()) {
            showError(phone, 'Phone number is required');
            isValid = false;
        } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(phone.value.replace(/\s/g, ''))) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        return isValid;
    }
    
    function proceedToPayment() {
        // Collect passenger data
        const passengerData = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            passport: document.getElementById('passport').value
        };
        
        // Store passenger data in localStorage
        localStorage.setItem('passengerData', JSON.stringify(passengerData));
        
        // Show loading state
        proceedBtn.textContent = 'Processing...';
        proceedBtn.disabled = true;
        
        // Redirect to payment page
        setTimeout(() => {
            window.location.href = '/payment';
        }, 1500);
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