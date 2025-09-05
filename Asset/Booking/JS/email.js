document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your User ID
    (function() {
        emailjs.init('hM_QLpI82XfMUIjX6');
    })();

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable the submit button to prevent multiple submissions
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';
        
        // Clear previous messages
        formMessage.style.display = 'none';
        formMessage.textContent = '';
        
        // Send the email using EmailJS
        emailjs.sendForm('service_mdnt86i', 'template_6fvlhf7', this)
            .then(function() {
                // Show success message
                formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                // Reset the form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, function(error) {
                // Show error message
                formMessage.textContent = 'Failed to send message. Please try again later or contact us directly. Error: ' + error.text;
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                
                // Log the error for debugging
                console.error('EmailJS Error:', error);
            })
            .finally(function() {
                // Re-enable the submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';
            });
    });

    // Add input validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('invalid');
            } else {
                this.classList.add('invalid');
            }
        });
    });
});