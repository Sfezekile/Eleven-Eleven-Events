
document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn.querySelector("i");
    const navItems = navLinks.querySelectorAll("a");
    const sections = document.querySelectorAll("section");
    const navHeight = document.querySelector("nav").offsetHeight;
    // Toggle mobile menu
    menuBtn.addEventListener("click", (e) => {
        const isOpen = navLinks.classList.toggle("open");
        menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
        menuBtn.setAttribute("aria-expanded", isOpen);
    });
    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuBtnIcon.setAttribute("class", "ri-menu-line");
            menuBtn.setAttribute("aria-expanded", "false");
            
            // Smooth scrolling to section
            const targetId = item.getAttribute("href");
            if (targetId.startsWith("#")) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - navHeight,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove("open");
            menuBtnIcon.setAttribute("class", "ri-menu-line");
            menuBtn.setAttribute("aria-expanded", "false");
        }
    });
    // Update active link based on scroll position
    function updateActiveLink() {
        let fromTop = window.scrollY + navHeight + 100;
        
        navItems.forEach(item => {
            const section = document.querySelector(item.getAttribute("href"));
            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }
    // Set up scroll event listener
    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink(); // Initialize active link
});

