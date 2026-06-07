/*
Nama  : I Putu Agus Risky Suardana Putra
NIM   : 240040110
Kelas : BB244
*/

// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('navMenu');
    nav.classList.toggle('active');
}

// Close menu when clicking on a link (mobile)
// Don't close when tapping a dropdown header (has class 'dropdown-toggle') so users can select submenu on mobile
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            // If this link is a dropdown toggle, keep menu open to allow selecting submenu items
            if (this.classList.contains('dropdown-toggle')) {
                return;
            }
            // Otherwise (regular link / submenu link), close the mobile nav
            document.getElementById('navMenu').classList.remove('active');
        }
    });
});

// Close menu when clicking outside (mobile)
document.addEventListener('click', function(event) {
    const nav = document.getElementById('navMenu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth <= 768) {
        if (!nav.contains(event.target) && !toggle.contains(event.target)) {
            nav.classList.remove('active');
        }
    }
});

// Mascot Slider (hanya jika elemen ada di halaman)
if (document.querySelector('.mascot-slider')) {
    let currentSlideIndex = 0;
    let slideInterval;

    function showSlide(index) {
        const slides = document.querySelectorAll('.mascot-slide');
        const dots = document.querySelectorAll('.slider-dots .dot');
        
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        slides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');
    }

    function changeSlide(direction) {
        showSlide(currentSlideIndex + direction);
        resetInterval();
    }

    function currentSlide(index) {
        showSlide(index);
        resetInterval();
    }

    function autoSlide() {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 3000);
    }

    // Start auto slide when page loads
    document.addEventListener('DOMContentLoaded', function() {
        slideInterval = setInterval(autoSlide, 3000);
    });

    // Pause auto slide on hover
    const mascotSlider = document.querySelector('.mascot-slider');
    if (mascotSlider) {
        mascotSlider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        mascotSlider.addEventListener('mouseleave', function() {
            slideInterval = setInterval(autoSlide, 3000);
        });
    }

    // Make functions global
    window.changeSlide = changeSlide;
    window.currentSlide = currentSlide;
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation (untuk halaman kontak)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const pesan = document.getElementById('pesan').value;
        
        if (nama && email && pesan) {
            alert('Terima kasih! Pesan Anda telah terkirim.\n\nNama: ' + nama + '\nEmail: ' + email);
            contactForm.reset();
        } else {
            alert('Mohon lengkapi semua field!');
        }
    });
}

// Counter Animation untuk Statistics
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + (element.dataset.suffix || '');
        }
    }, 20);
}

// Intersection Observer untuk animasi saat scroll
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate counters jika ada
            if (entry.target.querySelector('.stat-number')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent.replace(/\D/g, ''));
                    counter.dataset.suffix = counter.textContent.replace(/[0-9]/g, '');
                    animateCounter(counter, target);
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stats-section, .program-card, .news-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Add observer callback to add 'animate' class to timeline items when visible
// (observer already adds 'animate' to elements it observes; ensure timeline items get that class)
// No extra JS needed because observer adds 'animate' to entry.target


// Active Navigation
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});
// Mark parent dropdown as active-parent when a child link is active
function updateActiveParents(){
    document.querySelectorAll('nav li.dropdown').forEach(li => {
        if (li.querySelector('a.active')) {
            li.classList.add('active-parent');
        } else {
            li.classList.remove('active-parent');
        }
    });
}
updateActiveParents();
// Also update when window resizes or DOM changes (optional)
window.addEventListener('resize', updateActiveParents);

// News Filter (Berita Page)
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            const newsCards = document.querySelectorAll('.news-card-full');
            
            newsCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'grid';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Gallery Tabs (Galeri Page)
const tabButtons = document.querySelectorAll('.tab-btn');
if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-tab');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                if (filterValue === 'semua' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// FAQ Accordion (Kontak Page)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Dropdown toggle (click: mobile toggle; desktop click toggles persistent open)
const dropdownToggles = document.querySelectorAll('nav li.dropdown > .dropdown-toggle');
if (dropdownToggles.length > 0) {
    dropdownToggles.forEach(toggle => {
        // Initialize accessibility state
        toggle.setAttribute('aria-expanded', 'false');

        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // prevent document click handler from closing immediately
            const parent = this.parentElement;

            if (window.innerWidth <= 768) {
                // Mobile: toggle open state (same class used for styling)
                parent.classList.toggle('open');
                const isOpen = parent.classList.contains('open');
                this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            } else {
                // Desktop: toggle persistent open so menu remains when cursor moves away
                const isOpen = parent.classList.toggle('open');
                this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            }
        });
    });

    // Close persistent dropdowns when clicking outside (desktop only)
    document.addEventListener('click', function(event) {
        if (window.innerWidth > 768) {
            const nav = document.getElementById('navMenu') || document.querySelector('nav');
            if (!nav.contains(event.target)) {
                document.querySelectorAll('nav li.dropdown.open').forEach(li => {
                    li.classList.remove('open');
                    const t = li.querySelector('.dropdown-toggle');
                    if (t) t.setAttribute('aria-expanded', 'false');
                });
            }
        }
    });

    // Close persistent dropdowns on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('nav li.dropdown.open').forEach(li => {
                li.classList.remove('open');
                const t = li.querySelector('.dropdown-toggle');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
        }
    });

    // ----- Hover behavior with short delay so menus don't disappear immediately -----
    const HOVER_CLOSE_DELAY = 300; // ms
    const hoverTimers = new Map();
    const dropdownItems = document.querySelectorAll('nav li.dropdown');

    function clearHoverTimer(el) {
        if (hoverTimers.has(el)) {
            clearTimeout(hoverTimers.get(el));
            hoverTimers.delete(el);
        }
    }

    function scheduleClose(el) {
        // Don't schedule closing if element is clicked-open (persistent)
        if (el.classList.contains('open')) return;
        clearHoverTimer(el);
        const timer = setTimeout(() => {
            el.classList.remove('hover');
            const t = el.querySelector('.dropdown-toggle');
            if (t) t.setAttribute('aria-expanded', 'false');
            hoverTimers.delete(el);
        }, HOVER_CLOSE_DELAY);
        hoverTimers.set(el, timer);
    }

    dropdownItems.forEach(li => {
        li.addEventListener('mouseenter', function() {
            if (window.innerWidth <= 768) return; // only for desktop

            // open this dropdown immediately (hover state)
            clearHoverTimer(li);

            // Close other non-persistent dropdowns immediately for smooth, instant switching
            dropdownItems.forEach(other => {
                if (other === li) return;
                if (other.classList.contains('open')) return; // leave clicked ones open
                clearHoverTimer(other);
                other.classList.remove('hover');
                const tt = other.querySelector('.dropdown-toggle');
                if (tt) tt.setAttribute('aria-expanded', 'false');
                hoverTimers.delete(other);
            });

            li.classList.add('hover');
            const t = li.querySelector('.dropdown-toggle');
            if (t) t.setAttribute('aria-expanded', 'true');
        });

        li.addEventListener('mouseleave', function() {
            if (window.innerWidth <= 768) return; // only for desktop
            scheduleClose(li);
        });
    });

    // When clicking to open (persistent), clear any hover timers for that item
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const parent = this.parentElement;
            clearHoverTimer(parent);
        });
    });

}

// Resize handling: clean up hover/open states when switching between desktop and mobile
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        // Mobile: remove hover states and clear timers
        document.querySelectorAll('nav li.dropdown.hover').forEach(li => li.classList.remove('hover'));
        document.querySelectorAll('nav li.dropdown.open').forEach(li => li.classList.remove('open'));
        // Clear any hover timers if present
        if (typeof hoverTimers !== 'undefined') {
            hoverTimers.forEach(timer => clearTimeout(timer));
            hoverTimers.clear();
        }
    } else {
        // Desktop: ensure mobile nav overlay is closed
        const navMenu = document.getElementById('navMenu');
        if (navMenu) navMenu.classList.remove('active');
    }
});