/* ==================== NEW NAVBAR LOGIC ==================== */
const navHamburger = document.getElementById('nav-hamburger'),
    navLinks = document.getElementById('nav-links'),
    navItems = document.querySelectorAll('.nav-item');

// Toggle menu
if (navHamburger) {
    navHamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('open');

        // Toggle Icon
        const icon = navHamburger.querySelector('i');
        if (navLinks.classList.contains('open')) {
            icon.classList.replace('ri-menu-line', 'ri-close-line');
        } else {
            icon.classList.replace('ri-close-line', 'ri-menu-line');
        }
    });
}

// Close on link click
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = navHamburger.querySelector('i');
        if (icon) icon.classList.replace('ri-close-line', 'ri-menu-line');
    });
});

// Close on outside click
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('open')) {
        if (!navLinks.contains(e.target) && !navHamburger.contains(e.target)) {
            navLinks.classList.remove('open');
            const icon = navHamburger.querySelector('i');
            if (icon) icon.classList.replace('ri-close-line', 'ri-menu-line');
        }
    }
});

/* ==================== SCROLL SECTIONS ACTIVE LINK ==================== */
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 100 // Adjusted for header height
        sectionId = current.getAttribute('id')

        // Target the new .nav-links container
        const link = document.querySelector('.nav-links a[href*=' + sectionId + ']')
        if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link')
            } else {
                link.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* ==================== CHANGE BACKGROUND HEADER ==================== */
function scrollHeader() {
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class
    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* ==================== SHOW SCROLL UP ==================== */
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* ==================== SCROLL REVEAL ANIMATION ==================== */
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

/* ==================== FORM VALIDATION ==================== */
// Set minimum date to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

function submitForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const messageEl = document.getElementById('contact-message');

    // Clear previous messages
    messageEl.className = 'contact__message';

    // Basic Validation
    if (name.trim() === '' || phone.trim() === '' || date === '') {
        messageEl.textContent = 'Please fill in all required fields.';
        messageEl.style.color = '#ef4444'; // Red
        return;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        messageEl.textContent = 'Please enter a valid 10-digit phone number.';
        messageEl.style.color = '#ef4444';
        return;
    }

    // Success Simulation
    const submitBtn = document.querySelector('.contact__form button');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = 'Sending... <i class="ri-loader-4-line"></i>';
    submitBtn.disabled = true;

    setTimeout(() => {
        messageEl.textContent = 'Thank you! Appointment requested successfully.';
        messageEl.style.color = 'var(--accent-color)';

        submitBtn.innerHTML = 'Sent <i class="ri-check-line"></i>';

        // Reset form
        document.getElementById('appointment-form').reset();

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            messageEl.textContent = '';
        }, 5000);
    }, 1500);
}
