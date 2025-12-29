document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('flight-search-form');
    const departureDate = document.getElementById('departure-date');
    const returnDate = document.getElementById('return-date');
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');

    // Set minimum date for departure (tomorrow)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    departureDate.min = tomorrow.toISOString().split('T')[0];
    departureDate.value = tomorrow.toISOString().split('T')[0];

    // Auto-complete for cities
    const cities = [
        'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Benin City',
        'Accra', 'Kumasi', 'Cape Coast', 'Kigali', 'Kampala', 'Nairobi',
        'Dar es Salaam', 'Cairo', 'Casablanca', 'Tunis', 'Algiers'
    ];

    setupAutoComplete(fromInput, cities);
    setupAutoComplete(toInput, cities);

    // Set return date to be after departure date
    departureDate.addEventListener('change', function() {
        if (this.value) {
            returnDate.min = this.value;
            if (returnDate.value && returnDate.value < this.value) {
                returnDate.value = this.value;
            }
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Show loading state
            const submitBtn = form.querySelector('.btn-search');
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Searching...';
            
            // Simulate API call delay
            setTimeout(() => {
                // Redirect to results page with form data
                const formData = new FormData(form);
                const params = new URLSearchParams(formData).toString();
                window.location.href = `/flight-results?${params}`;
            }, 2000);
        }
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Clear previous errors
        clearAllErrors();
        
        // Validate from and to fields
        if (!fromInput.value.trim()) {
            showError(fromInput, 'Please enter departure city');
            isValid = false;
        }
        
        if (!toInput.value.trim()) {
            showError(toInput, 'Please enter destination city');
            isValid = false;
        }
        
        if (fromInput.value.trim().toLowerCase() === toInput.value.trim().toLowerCase()) {
            showError(toInput, 'Departure and destination cannot be the same');
            isValid = false;
        }
        
        // Validate dates
        if (!departureDate.value) {
            showError(departureDate, 'Please select departure date');
            isValid = false;
        }
        
        return isValid;
    }
});

function setupAutoComplete(input, suggestions) {
    const autocompleteList = document.createElement('div');
    autocompleteList.className = 'autocomplete-list';
    autocompleteList.style.cssText = `
        position: absolute;
        background: white;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
        display: none;
        width: 100%;
        box-shadow: var(--shadow-lg);
    `;
    
    input.parentNode.style.position = 'relative';
    input.parentNode.appendChild(autocompleteList);

    input.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        autocompleteList.innerHTML = '';
        
        if (value.length > 0) {
            const filteredSuggestions = suggestions.filter(suggestion => 
                suggestion.toLowerCase().includes(value)
            );
            
            filteredSuggestions.forEach(suggestion => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.textContent = suggestion;
                item.style.cssText = `
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    border-bottom: 1px solid var(--border-color);
                `;
                
                item.addEventListener('click', function() {
                    input.value = suggestion;
                    autocompleteList.style.display = 'none';
                    input.focus();
                });
                
                autocompleteList.appendChild(item);
            });
            
            autocompleteList.style.display = filteredSuggestions.length > 0 ? 'block' : 'none';
        } else {
            autocompleteList.style.display = 'none';
        }
    });

    input.addEventListener('blur', function() {
        setTimeout(() => {
            autocompleteList.style.display = 'none';
        }, 200);
    });
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
    input.classList.add('error');
}

function clearError(input) {
    const errorElement = input.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
    input.classList.remove('error');
}

function clearAllErrors() {
    document.querySelectorAll('.form-error').forEach(error => error.remove());
    document.querySelectorAll('.form-input.error').forEach(input => input.classList.remove('error'));
}