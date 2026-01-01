// Home page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for flight search
    const departureDate = document.getElementById('departure-date');
    const returnDate = document.getElementById('return-date');
    
    if (departureDate) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const formattedDate = tomorrow.toISOString().split('T')[0];
        departureDate.min = formattedDate;
        departureDate.value = formattedDate;
    }

    // Auto-complete for departure and destination
    const cities = [
        'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan',
        'Accra', 'Kumasi', 'Cape Coast', 'Kigali', 'Kampala',
        'Nairobi', 'Dar es Salaam', 'Cairo', 'Casablanca'
    ];

    const departureInput = document.getElementById('departure');
    const destinationInput = document.getElementById('destination');

    if (departureInput) {
        setupAutoComplete(departureInput, cities);
    }

    if (destinationInput) {
        setupAutoComplete(destinationInput, cities);
    }

    // Set return date to be after departure date
    if (departureDate && returnDate) {
        departureDate.addEventListener('change', function() {
            if (this.value) {
                returnDate.min = this.value;
                if (returnDate.value && returnDate.value < this.value) {
                    returnDate.value = this.value;
                }
            }
        });
    }

    // Search tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const roundTripField = document.querySelector('.round-trip-field');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide return date field based on tab
            if (this.dataset.tab === 'round-trip') {
                roundTripField.style.display = 'block';
            } else {
                roundTripField.style.display = 'none';
            }
        });
    });

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Feature card animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
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

// Add smooth scrolling effect
function smoothScroll() {
    const scrollElements = document.querySelectorAll('.feature-card, .destination-card');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.style.opacity = 1;
        element.style.transform = "translateY(0)";
    };

    const hideScrollElement = (element) => {
        element.style.opacity = 0;
        element.style.transform = "translateY(72px)";
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener("scroll", handleScrollAnimation);
}

// Initialize scroll animations
smoothScroll();