import Swiper from 'swiper/bundle';
import { Fancybox } from "@fancyapps/ui";


document.addEventListener('DOMContentLoaded', () => {
    var togglers = document.querySelectorAll(".menu-toggler");
	togglers.forEach((t) => {
        t.addEventListener("click",function(e){
            document.body.classList.toggle('menu-openned');
        }, false);
    });
    
    const menuItems = document.querySelectorAll('.contacts-menu-nav ul li');
    const contentItems = document.querySelectorAll('.contacts-menu-content__item');
  
    if(menuItems.length && contentItems.length) {
        menuItems.forEach((menuItem, index) => {
            menuItem.addEventListener('click', () => {
                menuItems.forEach(item => item.classList.remove('active'));
                contentItems.forEach(item => item.classList.remove('active'));
            
                menuItem.classList.add('active');
                contentItems[index].classList.add('active');
            });
        });
    }

    var swiperProjects = new Swiper(".slider-projects", {
        pagination: {
          el: ".slider-projects .swiper-pagination",
          type: "fraction"
        },
        navigation: {
          nextEl: ".slider-projects .swiper-button-next",
          prevEl: ".slider-projects .swiper-button-prev"
        }
    });


    let swiper;
    function initSwiper() {
        const breakpoint = 991; // Укажите нужное разрешение
        const screenWidth = window.innerWidth;

        if (screenWidth > breakpoint) {
            if (!swiper) {
                swiper = new Swiper('.slider-advantges', {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    allowTouchMove: true,
                    loop: true,
                    pagination: {
                        el: ".slider-advantges .swiper-pagination",
                        type: "fraction"
                    },
                    navigation: {
                        nextEl: ".slider-advantges .swiper-button-next",
                        prevEl: ".slider-advantges .swiper-button-prev"
                    }
                });
            }
        } else {
            if (swiper) {
            swiper.destroy(true, true); // Уничтожаем Swiper
            swiper = null;
            }
        }
        }

    initSwiper();
    window.addEventListener('resize', initSwiper);



    const contactElements = document.querySelectorAll(".contact");

    if (contactElements.length > 0) {
        contactElements.forEach((contact) => {
            const current = contact.querySelector(".contact-current");

            if (current) {
                current.addEventListener("click", (event) => {
                    if (contact.classList.contains("open")) {
                        contact.classList.remove("open");
                    } else {
                        contactElements.forEach((el) => el.classList.remove("open"));
                        contact.classList.add("open");
                    }
                    event.stopPropagation();
                });
            }
        });

        document.addEventListener("click", (event) => {
            contactElements.forEach((contact) => {
                if (!contact.contains(event.target)) {
                    contact.classList.remove("open");
                }
            });
        });
    }


    document.querySelector('.catalog-menu-item').addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector('body').classList.toggle('catalog-menu-open');
    });

    document.querySelector('.catalog-menu-close').addEventListener("click", (event) => {
        document.querySelector('body').classList.remove('catalog-menu-open');
    });

    document.querySelector('.overlay').addEventListener("click", (event) => {
        document.querySelector('body').classList.remove('catalog-menu-open');
    });

    document.querySelector('.search-handler').addEventListener("click", (event) => {
        document.querySelector('.header').classList.add('serch-open');
    });
      
    document.querySelector('.search-form-close').addEventListener("click", (event) => {
        document.querySelector('.header').classList.remove('serch-open');
    });

    if(document.querySelector('.video') && window.innerWidth > 991) {
        function closeVideo() {
            document.querySelector('.section-intro').classList.remove('video-open');
        }

        document.querySelector('.video .play').addEventListener("click", (event) => {
            document.querySelector('.section-intro').classList.add('video-open');

            const offsetTop = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth' 
            });

            var video = document.querySelector('.video video');
            video.currentTime = 0;
            video.play().then(() => {
                console.log('Видео запущено');
            }).catch(error => {
                console.error('Ошибка запуска видео:', error);
            });
        });

        document.querySelector('.video .close').addEventListener("click", (event) => {
            closeVideo();
        });


        const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                closeVideo();
            }
        });
        }, {
            threshold: 0
        });

        observer.observe(document.querySelector('.section-intro'));
    } else if(document.querySelector('.video') && window.innerWidth < 992) {
        document.querySelector('.section-intro .video').setAttribute('data-fancybox', 'Видео');
    }

    if( document.querySelector('.slider-card-thumbs') && document.querySelector('.slider-card') ) {
        var thumbSwiper = new Swiper(".slider-card-thumbs", {
            loop: true,
            spaceBetween: 10,
            slidesPerView: 5,
            freeMode: true,
            watchSlidesProgress: true,
        });
    
        new Swiper(".slider-card", {
            loop: true,
            spaceBetween: 20,
            navigation: {
              nextEl: ".slider-card .swiper-button-next",
              prevEl: ".slider-card .swiper-button-prev",
            },
            thumbs: {
              swiper: thumbSwiper,
            },
        });
    }

    function showPopup(name) {
        const popup = document.querySelector(`.popup-${name}`);
        const overlay = document.querySelector('.overlay');
    
        if (!popup) {
            console.error(`Popup with class .popup-${name} not found`);
            return;
        }
    
        // Сбрасываем стили перед повторным отображением
        popup.style.opacity = 0;
        popup.style.transition = 'none';
    
        popup.querySelector('.form-inner').style.display = 'block';
        popup.querySelector('.thanks-inner').style.display = 'none';
    
        // Показываем overlay
        overlay.style.display = 'block';
        popup.style.display = 'block'; // Показываем popup
    
        // Определяем ширину экрана
        const isMobile = window.innerWidth < 992;
    
        if (isMobile) {
            // Для мобильных устройств
            popup.style.position = 'fixed';
            popup.style.bottom = '-100%'; // Скрываем за экраном
            popup.style.transition = 'bottom 0.3s ease, opacity 0.3s ease'; // Плавная анимация
    
            // Плавное появление
            setTimeout(() => {
                popup.style.bottom = '0'; // Сдвигаем наверх
                popup.style.opacity = 1;
            }, 10);
        } else {
            // Для больших экранов
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY; // Текущая прокрутка страницы
            const popupHeight = popup.offsetHeight;
    
            // Вычисляем позицию сверху с учетом прокрутки
            const topPosition = Math.max((windowHeight - popupHeight) / 2 + scrollY, scrollY);
    
            popup.style.position = 'absolute';
            popup.style.left = '50%';
            popup.style.transform = 'translateX(-50%)';
            popup.style.top = `${topPosition}px`;
            popup.style.transition = 'opacity 0.3s ease';
    
            setTimeout(() => {
                popup.style.opacity = 1; // Плавное появление
            }, 10);
        }
    
        // Для скрытия всех попапов и overlay при клике на overlay
        overlay.addEventListener('click', closePopup);
    
        // Для закрытия попапа при клике на кнопку .popup__close
        const closeButton = popup.querySelector('.popup__close');
        if (closeButton) {
            closeButton.addEventListener('click', closePopup);
        }
    }
    

    // Функция для закрытия всех попапов
    function closePopup() {
        const overlay = document.querySelector('.overlay');
        const popups = document.querySelectorAll('.popup');
    
        // Скрываем overlay
        overlay.style.display = 'none';
    
        // Скрываем все попапы
        popups.forEach(popup => {
            popup.style.opacity = 0;
            popup.style.transition = 'none'; // Убираем анимацию при скрытии
            popup.style.display = 'none';
    
            // Сбрасываем стили для мобильных устройств
            if (window.innerWidth < 992) {
                popup.style.bottom = '-100%'; // Возвращаем за экран
            }
        });
    }

    // Обработчик для открытия попапов при клике на элементы с data-popup
    document.addEventListener('click', (e) => {
        const button = e.target.closest('[data-popup]');
        if (button) {
            const popupName = button.getAttribute('data-popup');
            showPopup(popupName);
        }
    });


    if(document.querySelector('.slider-single')) {
        document.querySelectorAll('.slider-single').forEach((slider) => {
            new Swiper(slider, {
                navigation: {
                    nextEl: slider.closest('.slider-single-wrap').querySelector('.swiper-button-next'),
                    prevEl: slider.closest('.slider-single-wrap').querySelector('.swiper-button-prev'),
                }
            });
        });
    }


    const tooltips = document.querySelectorAll(".tooltip");
    if(tooltips.length) {
        tooltips.forEach(tooltip => {
            const content = tooltip.querySelector(".tooltip-content");
    
            tooltip.addEventListener("mouseenter", () => {
                content.style.display = "block";
            });
    
            tooltip.addEventListener("mouseleave", () => {
                content.style.display = "none";
            });
        });
    }
    
   
});