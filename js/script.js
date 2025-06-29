// ====================== //
// JavaScript для сайта Avto Belgium
// ====================== //

// Функция для изменения навбара при скролле
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Плавная прокрутка для якорных ссылок
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

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Функция для работы с FAQ
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');

    // Закрываем все остальные ответы
    document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
            item.classList.remove('active');
        }
    });

    document.querySelectorAll('.faq-question').forEach(item => {
        if (item !== element) {
            item.classList.remove('active');
        }
    });

    // Переключаем текущий ответ
    answer.classList.toggle('active');
    element.classList.toggle('active');
}

// Применяем анимацию к элементам
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚗 Avto Belgium сайт загружен!');

    // Добавляем класс для анимации к элементам
    const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .custom-tile, .reason-card, .guarantee-card, .review-card, .faq-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Анимация для статистики в hero секции
    animateNumbers();

    // Добавляем обработчики для всех кнопок
    const buttons = document.querySelectorAll('.btn-custom, .pretty-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Добавляем эффект клика
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Анимация для карточек при наведении
    const cards = document.querySelectorAll('.custom-tile, .reason-card, .guarantee-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Параллакс эффект для hero секции
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Анимация для социальных иконок
    const socialIcons = document.querySelectorAll('.social-links i');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.6s ease';
        });

        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Анимация для логотипа
    const logo = document.querySelector('.navbar-brand');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Анимация для флагов
    const flags = document.querySelectorAll('.flag-bordered');
    flags.forEach(flag => {
        flag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
        });

        flag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Анимация для разделителей
    const dividers = document.querySelectorAll('.custom-divider');
    dividers.forEach(divider => {
        divider.addEventListener('mouseenter', function() {
            this.style.transform = 'scaleX(1.5)';
        });

        divider.addEventListener('mouseleave', function() {
            this.style.transform = 'scaleX(1)';
        });
    });

    // Анимация для форм
    const formInputs = document.querySelectorAll('.pretty-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Анимация для FAQ элементов
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });

        question.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(0)';
            }
        });
    });
});

// Функция анимации чисел
function animateNumbers() {
    const numbers = document.querySelectorAll('.display-5');
    numbers.forEach(number => {
        const finalNumber = parseInt(number.textContent);
        if (!isNaN(finalNumber)) {
            animateNumber(number, 0, finalNumber, 2000);
        }
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

// Функция для мобильного меню
function toggleMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navbarCollapse.classList.toggle('show');
}

// Обработчик для кнопки "Наверх"
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (scrollToTopBtn.style.opacity === '0') {
                    scrollToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Анимация для отзывов (карусель)
let currentReview = 0;
const reviews = document.querySelectorAll('.review-card');

function showReview(index) {
    reviews.forEach((review, i) => {
        if (i === index) {
            review.classList.add('active');
        } else {
            review.classList.remove('active');
        }
    });
}

// Автоматическое переключение отзывов
if (reviews.length > 0) {
    setInterval(() => {
        currentReview = (currentReview + 1) % reviews.length;
        showReview(currentReview);
    }, 5000);
}

// Анимация для шагов процесса
function animateSteps() {
    const steps = document.querySelectorAll('.step');
    const car = document.getElementById('car');

    if (steps.length > 0 && car) {
        let currentStep = 0;

        setInterval(() => {
            steps.forEach((step, i) => {
                if (i === currentStep) {
                    step.classList.add('active');
                    step.querySelector('.step-text').classList.add('active');
                } else {
                    step.classList.remove('active');
                    step.querySelector('.step-text').classList.remove('active');
                }
            });

            // Анимация машины с ультимативными эффектами
            const stepWidth = 100 / (steps.length - 1);
            car.style.left = `${currentStep * stepWidth}%`;

            // Добавляем класс для анимации движения
            car.classList.add('moving');

            // Добавляем ультимативный эффект
            car.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.3)) drop-shadow(0 0 30px rgba(255,0,0,0.9)) drop-shadow(0 0 15px rgba(255,102,0,0.6))';

            // Добавляем дополнительный эффект
            car.style.transform = 'scale(1.05)';

            setTimeout(() => {
                car.classList.remove('moving');
                car.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))';
                car.style.transform = 'scale(1)';
            }, 1200);

            currentStep = (currentStep + 1) % steps.length;
        }, 3000);
    }
}

// Запускаем анимацию шагов при загрузке
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateSteps, 1000);
});

// Добавляем CSS анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .custom-tile:hover {
        transform: translateY(-10px) scale(1.02);
    }

    .reason-card:hover,
    .guarantee-card:hover {
        transform: translateY(-10px) scale(1.02);
    }

    .btn-custom:hover {
        transform: translateY(-3px) scale(1.05);
    }

    .social-links i:hover {
        animation: bounce 0.6s ease;
    }

    .faq-question:hover {
        transform: translateX(5px);
    }

    .faq-answer {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

document.head.appendChild(style);

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Ошибка на странице:', e.error);
});

// Оптимизация производительности
window.addEventListener('scroll', function() {
    // Используем requestAnimationFrame для оптимизации
    requestAnimationFrame(function() {
        // Код обработки скролла
    });
}, { passive: true });

console.log('✨ Все анимации и эффекты загружены!');