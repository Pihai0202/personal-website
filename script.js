document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            
            // Toggle between menu and close icon
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons({
                attrs: {
                    class: 'icon-inline'
                },
                nameAttr: 'data-lucide',
                icons: undefined
            });
        });
    }

    // Close mobile menu when nav-link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    // 3. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // 4. Back to Top Click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Scroll Spy (Highlight active nav item on scroll)
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for navbar height
            const sectionId = current.getAttribute('id');
            const navLink = document.getElementById(`nav-link-${sectionId}`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollActive);

    // 6. Scroll Reveal Effect (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 7. Projects Modal Handler
    const homeworkBtn = document.getElementById('hero-btn-drive');
    const projectsModal = document.getElementById('projects-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    if (homeworkBtn && projectsModal && modalCloseBtn) {
        homeworkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            projectsModal.classList.add('open');
            document.body.style.overflow = 'hidden'; // prevent page scrolling
        });

        const closeModal = () => {
            projectsModal.classList.remove('open');
            document.body.style.overflow = ''; // restore scrolling
        };

        modalCloseBtn.addEventListener('click', closeModal);

        // Close on clicking overlay background
        projectsModal.addEventListener('click', (e) => {
            if (e.target === projectsModal) {
                closeModal();
            }
        });

        // Close on Esc key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectsModal.classList.contains('open')) {
                closeModal();
            }
        });
    }
});
