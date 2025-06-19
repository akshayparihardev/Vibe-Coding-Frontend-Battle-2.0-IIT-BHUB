document.addEventListener('DOMContentLoaded', () => {
    const loaderWrapper = document.getElementById('loader-wrapper');
    if (loaderWrapper) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loaderWrapper.classList.add('hidden');
            }, 500);
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
    } else {
        body.classList.add('light-mode');
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light-mode');
        }
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const targetId = entry.target.id;
                const activeLink = document.querySelector(`.nav-links a[href="#${targetId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const animatedElements = document.querySelectorAll('.active-animation');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            const activeContent = document.getElementById(targetTab);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });

    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const carouselDots = document.querySelectorAll('.testimonials-carousel-container .dot');
    let currentTestimonialIndex = 0;
    const totalTestimonials = testimonialCards.length;

    function updateTestimonialCarousel() {
        const cardWidth = testimonialCards[0].offsetWidth + (parseFloat(getComputedStyle(testimonialCards[0]).marginRight) * 2);
        testimonialsCarousel.style.transform = `translateX(-${currentTestimonialIndex * cardWidth}px)`;
        carouselDots.forEach((dot, index) => {
            if (index === currentTestimonialIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    carouselDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            currentTestimonialIndex = parseInt(e.target.dataset.slide);
            updateTestimonialCarousel();
        });
    });

    setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % totalTestimonials;
        updateTestimonialCarousel();
    }, 5000);

    updateTestimonialCarousel();
    window.addEventListener('resize', updateTestimonialCarousel);

    const showcaseItems = document.querySelectorAll('.showcase-item');
    const showcaseDotsContainer = document.querySelector('.showcase-nav-dots');
    let currentShowcaseIndex = 0;
    const totalShowcaseItems = showcaseItems.length;

    function updateShowcaseCarousel() {
        showcaseItems.forEach((item, index) => {
            if (index === currentShowcaseIndex) {
                item.classList.add('active');
                item.style.display = 'flex';
            } else {
                item.classList.remove('active');
                item.style.display = 'none';
            }
        });
        showcaseDotsContainer.innerHTML = '';
        for (let i = 0; i < totalShowcaseItems; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentShowcaseIndex) {
                dot.classList.add('active');
            }
            dot.dataset.slide = i;
            dot.addEventListener('click', (e) => {
                currentShowcaseIndex = parseInt(e.target.dataset.slide);
                updateShowcaseCarousel();
            });
            showcaseDotsContainer.appendChild(dot);
        }
    }

    setInterval(() => {
        currentShowcaseIndex = (currentShowcaseIndex + 1) % totalShowcaseItems;
        updateShowcaseCarousel();
    }, 7000);

    updateShowcaseCarousel();

    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeButton = document.querySelector('.modal-content .close-button');
    const openModalButtons = document.querySelectorAll('.open-video-modal');

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const videoSrc = button.dataset.videoSrc;
            modalVideo.src = videoSrc;
            videoModal.classList.add('active');
            modalVideo.play();
        });
    });

    closeButton.addEventListener('click', () => {
        modalVideo.pause();
        modalVideo.currentTime = 0;
        videoModal.classList.remove('active');
    });

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            modalVideo.pause();
            modalVideo.currentTime = 0;
            videoModal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            modalVideo.pause();
            modalVideo.currentTime = 0;
            videoModal.classList.remove('active');
        }
    });
});
