document.addEventListener('DOMContentLoaded', function() {
    const priceSlider = document.getElementById('price-range');
    const maxPriceDisplay = document.getElementById('max-price');
    const selectButtons = document.querySelectorAll('.select-flight');
    
    // Update price display when slider changes
    priceSlider.addEventListener('input', function() {
        maxPriceDisplay.textContent = this.value.toLocaleString();
    });
    
    // Handle flight selection
    selectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const resultItem = this.closest('.result-item');
            const flightInfo = {
                airline: resultItem.querySelector('.airline span').textContent,
                departureTime: resultItem.querySelector('.departure .time').textContent,
                arrivalTime: resultItem.querySelector('.arrival .time').textContent,
                departureAirport: resultItem.querySelector('.departure .airport').textContent,
                arrivalAirport: resultItem.querySelector('.arrival .airport').textContent,
                price: resultItem.querySelector('.amount').textContent,
                duration: resultItem.querySelector('.duration .hours').textContent
            };
            
            // Store selected flight in localStorage
            localStorage.setItem('selectedFlight', JSON.stringify(flightInfo));
            
            // Show loading state
            this.textContent = 'Selecting...';
            this.disabled = true;
            
            // Redirect to booking review
            setTimeout(() => {
                window.location.href = '/booking-review';
            }, 1500);
        });
    });
    
    // Filter functionality
    const filterInputs = document.querySelectorAll('input[type="checkbox"], select');
    filterInputs.forEach(input => {
        input.addEventListener('change', applyFilters);
    });
    
    function applyFilters() {
        // In a real application, this would filter the results
        // For demo purposes, we'll just show a message
        console.log('Filters applied');
    }
});