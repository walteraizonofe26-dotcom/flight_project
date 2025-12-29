document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('payment-form');
    const payBtn = document.getElementById('pay-btn');
    const cardDetails = document.getElementById('card-details');
    const bankDetails = document.getElementById('bank-details');
    const mobileDetails = document.getElementById('mobile-details');
    const paymentMethods = document.querySelectorAll('input[name="payment_method"]');
    
    // Load booking data
    const selectedFlight = JSON.parse(localStorage.getItem('selectedFlight'));
    const passengerData = JSON.parse(localStorage.getItem('passengerData'));
    
    if (selectedFlight && passengerData) {
        document.getElementById('flight-summary').textContent = `${selectedFlight.departureAirport} to ${selectedFlight.arrivalAirport}`;
        document.getElementById('date-summary').textContent = '2025-01-15';
        document.getElementById('passenger-summary').textContent = `${passengerData.firstName} ${passengerData.lastName}`;
        document.getElementById('total-amount').textContent = selectedFlight.price;
        document.getElementById('mobile-amount').textContent = selectedFlight.price;
    }
    
    // Generate reference number
    const refNumber = `AP${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}001`;
    document.getElementById('ref-number').textContent = refNumber;
    document.getElementById('mobile-ref').textContent = refNumber;
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            cardDetails.style.display = 'none';
            bankDetails.style.display = 'none';
            mobileDetails.style.display = 'none';
            
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else if (this.value === 'bank') {
                bankDetails.style.display = 'block';
            } else if (this.value === 'mobile') {
                mobileDetails.style.display = 'block';
            }
        });
    });
    
    // Card number formatting
    const cardNumber = document.getElementById('card-number');
    cardNumber.addEventListener('input', function() {
        let value = this.value.replace(/\s/g, '').replace(/\D/g, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        this.value = formattedValue.substring(0, 19);
    });
    
    // Expiry date formatting
    const expiry = document.getElementById('expiry');
    expiry.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        this.value = value.substring(0, 5);
    });
    
    // CVV validation
    const cvv = document.getElementById('cvv');
    cvv.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').substring(0, 3);
    });
    
    // Form submission
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;
        
        if (validatePayment(paymentMethod)) {
            processPayment(paymentMethod);
        }
    });
    
    function validatePayment(method) {
        clearAllErrors();
        let isValid = true;
        
        if (method === 'card') {
            const cardNumber = document.getElementById('card-number').value;
            const expiry = document.getElementById('expiry').value;
            const cvv = document.getElementById('cvv').value;
            const cardName = document.getElementById('card-name').value;
            
            if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
                showError(document.getElementById('card-number'), 'Please enter a valid 16-digit card number');
                isValid = false;
            }
            
            if (!expiry.match(/^\d{2}\/\d{2}$/)) {
                showError(document.getElementById('expiry'), 'Please enter expiry date in MM/YY format');
                isValid = false;
            }
            
            if (!cvv.match(/^\d{3}$/)) {
                showError(document.getElementById('cvv'), 'Please enter a valid 3-digit CVV');
                isValid = false;
            }
            
            if (!cardName.trim()) {
                showError(document.getElementById('card-name'), 'Cardholder name is required');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function processPayment(method) {
        payBtn.textContent = 'Processing Payment...';
        payBtn.disabled = true;
        
        // Simulate payment processing
        setTimeout(() => {
            // Store payment information
            const paymentInfo = {
                method: method,
                reference: document.getElementById('ref-number').textContent,
                amount: document.getElementById('total-amount').textContent,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
            
            // Redirect to confirmation
            window.location.href = '/confirmation';
        }, 3000);
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