// Данные товаров
const products = [
    {
        id: 1,
        name: "Макс",
        price: 100.000,
        image: "images/product1.jpg",
        description: "Оно очень умное",
        buyLink: "https://chat.deepseek.com"
    },
    {
        id: 2,
        name: "Дизайн интерфейсов UI/UX",
        price: 12990,
        image: "images/product2.jpg",
        description: "Освойте проектирование пользовательских интерфейсов. Figma, прототипирование, UX-исследования и создание дизайн-систем.",
        buyLink: "https://example.com/product2"
    },
    {
        id: 3,
        name: "Мобильная разработка",
        price: 17990,
        image: "images/product3.jpg",
        description: "Научитесь создавать мобильные приложения для iOS и Android. React Native, Flutter, нативные технологии.",
        buyLink: "https://example.com/product3"
    },
    {
        id: 4,
        name: "SEO оптимизация",
        price: 8990,
        image: "images/product1.jpg",
        description: "Продвижение сайтов в поисковых системах. Технический SEO, контент-стратегия, аналитика и метрики.",
        buyLink: "https://example.com/product4"
    },
    {
        id: 5,
        name: "Digital маркетинг",
        price: 10990,
        image: "images/product2.jpg",
        description: "Комплексный курс по цифровому маркетингу: SMM, контекстная реклама, email-маркетинг, аналитика.",
        buyLink: "https://example.com/product5"
    },
    {
        id: 6,
        name: "Бизнес-аналитика",
        price: 13990,
        image: "images/product3.jpg",
        description: "Анализ данных для бизнеса. SQL, Python, визуализация данных, построение дашбордов и отчетов.",
        buyLink: "https://example.com/product6"
    }
];

// Функция для форматирования цены
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}

// Функция для создания карточки товара
function createProductCard(product, index) {
    return `
        <div class="product-card" style="animation-delay: ${index * 0.1}s">
            <img src="${product.image}" alt="${product.name}" 
                 onerror="this.src='https://via.placeholder.com/400x300/667eea/ffffff?text=Товар+${product.id}'">
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">${formatPrice(product.price)}</p>
            <a href="${product.buyLink}" target="_blank" class="btn btn-buy" 
               onclick="trackPurchase(${product.id})">
                Купить сейчас
            </a>
        </div>
    `;
}

// Функция для отображения товаров
function displayProducts() {
    const productsContainer = document.getElementById('productsContainer');
    if (productsContainer) {
        productsContainer.innerHTML = products.map((product, index) => 
            createProductCard(product, index)
        ).join('');
    }
}

// Функция для отслеживания кликов по кнопкам покупки
function trackPurchase(productId) {
    console.log(`Покупка товара ID: ${productId}`);
    // Здесь можно добавить аналитику (Google Analytics, Yandex.Metrica и т.д.)
    // Например: gtag('event', 'purchase', { product_id: productId });
}

// Функция для обновления активной навигации
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
           (currentPage === '' && linkPage === 'index.html') ||
           (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Плавная прокрутка для якорей
function initSmoothScroll() {
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
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    setActiveNav();
    initSmoothScroll();
    
    // Добавляем класс загруженной страницы для плавного появления
    document.body.classList.add('page-loaded');
});

// Обработчик для lazy loading изображений
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}
