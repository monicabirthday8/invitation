// ===========================
// Smooth Scroll Animations
// ===========================

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// ===========================
// RSVP Form Handling
// ===========================

const rsvpForm = document.getElementById('rsvpForm');
const formMessage = document.getElementById('formMessage');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const attendance = document.getElementById('attendance').value;
    
    // Validate form
    if (!firstName || !lastName || !attendance) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Prepare form data for future Google Sheets integration
    const formData = {
        firstName: firstName,
        lastName: lastName,
        attendance: attendance,
        timestamp: new Date().toISOString()
    };
    
    // Log form data (for testing - will be replaced with Google Sheets API call)
    console.log('RSVP Form Data:', formData);
    
    // Show success message
    const attendanceText = attendance === 'yes' ? 'will be attending' : 'cannot attend';
    showMessage(`Thank you, ${firstName}! We have received your RSVP. You ${attendanceText}.`, 'success');
    
    // Reset form after 3 seconds
    setTimeout(() => {
        rsvpForm.reset();
        hideMessage();
    }, 5000);
    
    // TODO: When ready to integrate with Google Sheets, add the following:
    // 1. Create a Google Apps Script web app
    // 2. Replace the console.log with a fetch call to the Google Apps Script URL
    // Example:
    /*
    fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        showMessage(`Thank you, ${firstName}! We have received your RSVP.`, 'success');
        setTimeout(() => {
            rsvpForm.reset();
            hideMessage();
        }, 5000);
    })
    .catch((error) => {
        console.error('Error:', error);
        showMessage('Sorry, there was an error submitting your RSVP. Please try again.', 'error');
    });
    */
});

// Show message function
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Smooth scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Hide message function
function hideMessage() {
    formMessage.style.display = 'none';
    formMessage.className = 'form-message';
}

// ===========================
// Smooth Scrolling for Links
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Add Parallax Effect to Floating Cherries
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const cherries = document.querySelectorAll('.cherry-decoration');
    
    cherries.forEach((cherry, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        cherry.style.transform = `translateY(${yPos}px)`;
    });
});

// ===========================
// Form Input Animations
// ===========================

const formInputs = document.querySelectorAll('.form-group input, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ===========================
// Add Entrance Animation Delay
// ===========================

window.addEventListener('load', () => {
    const detailCards = document.querySelectorAll('.detail-card');
    detailCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 150);
    });
});

// ===========================
// Console Welcome Message
// ===========================

console.log('%c🍒 Welcome to Monica\'s 8th Birthday Party! 🍒', 'color: #c62828; font-size: 20px; font-weight: bold;');
console.log('%cThis website is ready for Google Sheets integration.', 'color: #8d6e63; font-size: 14px;');
console.log('%cForm data structure:', 'color: #8d6e63; font-size: 12px;');
console.log('{ firstName, lastName, attendance, timestamp }');
