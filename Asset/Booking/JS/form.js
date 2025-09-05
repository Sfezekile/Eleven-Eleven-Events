// Form Submission
document.addEventListener("DOMContentLoaded", function() {
    // Booking Modal
    const modal = document.getElementById('booking-modal');
    const btn = document.getElementById('booking');
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'event-type', 'event-date', 'start-time', 'end-time', 'guest-count', 'inspiration', 'description' ];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });

    if (!isValid) {
        alert('Please fill out all required fields.');
        return;
    }

    // Prepare email parameters
    const templateParams = {
        full_name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        event_type: document.getElementById('event-type').value,
        event_date: document.getElementById('event-date').value,
        start_time: document.getElementById('start-time').value,
        end_time: document.getElementById('end-time').value,
        guest_count: document.getElementById('guest-count').value,
        inspiration: document.getElementById('inspiration').value,
        description: document.getElementById('description').value,
    };

    // Send email
    emailjs.send('service_pknq0kb', 'template_6115nfn', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Thank you for your booking request! We\'ll contact you within 24 hours.');
            modal.style.display = 'none';
            this.reset();
        }.bind(this), function(error) {
            console.log('FAILED...', error);
            alert('There was an error submitting your request. Please try again or contact us directly.');
        });
});




// Event Type Selection
const eventTypeCards = document.querySelectorAll('.event-type-card');
const eventTypeInput = document.getElementById('event-type');

eventTypeCards.forEach(card => {
    card.addEventListener('click', function() {
        eventTypeCards.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        eventTypeInput.value = this.getAttribute('data-value');
    });
});

// File Upload Interaction
const inspirationUpload = document.querySelector('.inspiration-upload');
const inspirationFiles = document.getElementById('inspiration-files');

inspirationUpload.addEventListener('click', function() {
    inspirationFiles.click();
});

inspirationFiles.addEventListener('change', function() {
    if (this.files.length > 0) {
        inspirationUpload.innerHTML = `
            <i class="fas fa-check-circle" style="color: var(--gold); font-size: 2rem;"></i>
            <p>${this.files.length} file(s) selected</p>
        `;
    }
});

// Multi-step Form Navigation
const nextButtons = document.querySelectorAll('.next-step');
const prevButtons = document.querySelectorAll('.prev-step');

nextButtons.forEach(button => {
    button.addEventListener('click', function() {
        const currentSection = this.closest('.form-section');
        const nextSectionId = this.getAttribute('data-next');
        
        currentSection.classList.remove('active');
        document.getElementById(nextSectionId).classList.add('active');
        
        // Update step indicator
        const stepNumber = parseInt(nextSectionId.split('-')[1]);
        updateStepIndicator(stepNumber);
    });
});

prevButtons.forEach(button => {
    button.addEventListener('click', function() {
        const currentSection = this.closest('.form-section');
        const prevSectionId = this.getAttribute('data-prev');
        
        currentSection.classList.remove('active');
        document.getElementById(prevSectionId).classList.add('active');
        
        // Update step indicator
        const stepNumber = parseInt(prevSectionId.split('-')[1]);
        updateStepIndicator(stepNumber);
    });
});

function updateStepIndicator(activeStep) {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        const stepNumber = step.querySelector('.step-number');
        if (index < activeStep - 1) {
            stepNumber.style.backgroundColor = 'var(--gold)';
        } else if (index === activeStep - 1) {
            stepNumber.style.backgroundColor = 'var(--gold)';
        } else {
            stepNumber.style.backgroundColor = '#ddd';
        }
    });
}