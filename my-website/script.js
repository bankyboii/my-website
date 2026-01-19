/**
 * Switches the visible section of the website
 * @param {string} sectionId - The ID of the section to show
 */
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(sec => {
        sec.classList.remove('active');
    });

    // Deactivate all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Activate the corresponding nav link
    const activeLink = Array.from(document.querySelectorAll('.nav-link')).find(
        link => link.innerText.toLowerCase() === sectionId
    );
    
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Always scroll to top when changing views
    window.scrollTo(0, 0);
}

/**
 * Filters car cards by category
 * @param {string} category - The type of car to show
 * @param {HTMLElement} btn - The button that was clicked
 */
function filterCars(category, btn) {
    // Update button visual state
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
    });
    btn.classList.add('active');

    // Show or hide car cards based on data-type
    const cards = document.querySelectorAll('.car-card');
    cards.forEach(card => {
        const type = card.getAttribute('data-type');
        if (category === 'all' || type === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

/**
 * Handles the animated number counters in the About section
 */
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 100;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Observe the About section to trigger animations when it comes into view
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) observer.observe(aboutSection);
});