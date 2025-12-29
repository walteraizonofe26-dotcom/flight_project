document.addEventListener('DOMContentLoaded', function() {
    // Load booking data from localStorage
    const selectedFlight = JSON.parse(localStorage.getItem('selectedFlight'));
    const passengerData = JSON.parse(localStorage.getItem('passengerData'));
    const paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'));
    
    if (selectedFlight && passengerData) {
        // Update booking reference
        document.getElementById('booking-ref').textContent = paymentInfo.reference;
        
        // Update passenger information
        document.getElementById('passenger-name').textContent = `${passengerData.firstName} ${passengerData.lastName}`;
        document.getElementById('passenger-email').textContent = passengerData.email;
        document.getElementById('passenger-phone').textContent = passengerData.phone;
    }
    
    // Generate random reference number if not available
    if (!paymentInfo) {
        const refNumber = `AP${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}001`;
        document.getElementById('booking-ref').textContent = refNumber;
    }
    
    // Print functionality
    window.printBooking = function() {
        window.print();
    };
    
    // Auto-save booking to local storage for future reference
    if (paymentInfo) {
        const bookingRecord = {
            reference: paymentInfo.reference,
            flight: selectedFlight,
            passenger: passengerData,
            payment: paymentInfo,
            timestamp: new Date().toISOString()
        };
        
        // Store in localStorage
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(bookingRecord);
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }
    
    // Animation for confirmation icon
    const checkmark = document.querySelector('.checkmark');
    checkmark.style.opacity = '0';
    checkmark.style.transform = 'scale(0)';
    
    setTimeout(() => {
        checkmark.style.transition = 'all 0.6s ease';
        checkmark.style.opacity = '1';
        checkmark.style.transform = 'scale(1)';
    }, 100);
    
    // Add animation to details
    const detailSections = document.querySelectorAll('.detail-section');
    detailSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
});