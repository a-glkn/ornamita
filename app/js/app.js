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

    document.querySelector('.mob-menu li.catalog a').addEventListener("click", (event) => {
        event.preventDefault();

        document.querySelector('.mob-menu li.catalog').classList.toggle('open');
    });


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
});