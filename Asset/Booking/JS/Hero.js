// Image Slider 
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
function showNextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
slides[currentSlide].classList.add('active');
setInterval(showNextSlide, 9000); // Change slide every 9 seconds