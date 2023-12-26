(function ($) {
    "use strict";

    /*=============================================
        =    		 Preloader			      =
    =============================================*/
    function preloader() {
        $('.preloader').delay(0).fadeOut();
    };

    $(window).on('load', function () {
        preloader();

    });

    /*=============================================
        =     Menu sticky & Scroll to top      =
    =============================================*/
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 245) {
            $("#sticky-header").removeClass("sticky-menu");
            $('.scroll-to-target').removeClass('open');

        } else {
            $("#sticky-header").addClass("sticky-menu");
            $('.scroll-to-target').addClass('open');
        }
    });


    /*=============================================
        =    		 Scroll Up  	         =
    =============================================*/
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function () {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);

        });
    }

    var swiper = new Swiper(".mySwiper", {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 0,
        parallax: true,
        autoplay: 400,
        speed: 800,
        autoplayDisableOnInteraction: false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    /*=============================================
        =           Data Background             =
    =============================================*/
    $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    });




    /*=============================================
    =    		VideoPlay 	         =
=============================================*/
    $('.popup-youtube').magnificPopup({
        type: 'iframe'
    });
    $('#demoslide3').owlCarousel({
        loop: true,
        autoplay: true,
        autoPlaySpeed: 5000,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        margin: 25,
        responsiveClass: true,
        navText: ["<img src='./images/left-arrow.png'/>", "<img src='./images/right-arrow.png'/>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                autoplay: true,
                autoplayHoverPause: false,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });

    $('#demoslide4').owlCarousel({
        loop: true,
        autoplay: true,
        autoPlaySpeed: 5000,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        margin: 25,
        responsiveClass: true,
        navText: ["<img src='./images/left-arrow.png'/>", "<img src='./images/right-arrow.png'/>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                autoplay: true,
                autoplayHoverPause: false,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });


    $('#demoslide5').owlCarousel({
        loop: true,
        autoplay: true,
        autoPlaySpeed: 5000,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        margin: 25,
        responsiveClass: true,

        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: false
            },
            1000: {
                items: 1,
                autoplay: true,
                autoplayHoverPause: false,
                nav: true,
                dots: false,
                loop: true
            }
        }
    })


    /*=============================================
        =    		testmonial-4 	         =
    =============================================*/
    $('.owl-demo5').owlCarousel({
        loop: true,
        autoplay: true,
        autoPlaySpeed: 5000,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        margin: 25,
        responsiveClass: true,
        navText: ["<img src='./images/left-arrow-small.png'/>", "<img src='./images/right-arrow-small.png'/>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 4,
                autoplay: true,
                autoplayHoverPause: false,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });


    /*=============================================
    =    		testmonial-2 	         =
=============================================*/
    $('.owl-demo2').owlCarousel({
        loop: true,
        autoplay: true,
        autoPlaySpeed: 5000,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        margin: 25,
        responsiveClass: true,
        navText: ["<img src='./images/left-arrow-small.png'/>", "<img src='./images/right-arrow-small.png'/>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: false
            },
            1000: {
                items: 2,
                autoplay: true,
                autoplayHoverPause: false,
                nav: true,
                dots: false,
                loop: true
            }
        }
    });
    /*=============================================
=    		FAQ 	         =
=============================================*/
    $(".set > a").on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this)
                .siblings(".content")
                .slideUp(200);
            $(".set > a i")
                .removeClass("fa-minus")
                .addClass("fa-plus");
        } else {
            $(".set > a i")
                .removeClass("fa-minus")
                .addClass("fa-plus");
            $(this)
                .find("i")
                .removeClass("fa-plus")
                .addClass("fa-minus");
            $(".set > a").removeClass("active");
            $(this).addClass("active");
            $(".content").slideUp(200);
            $(this)
                .siblings(".content")
                .slideDown(200);
        }
    });

    //Submenu Dropdown Toggle
    if ($('.main-header li.dropdown ul').length) {
        $('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');

        //Dropdown Button
        $('.main-header li.dropdown .dropdown-btn').on('click', function () {
            $(this).prev('ul').slideToggle(500);
        });

        //Disable dropdown parent link
        //$('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
        //e.preventDefault();
        //});
    }

    //Mobile Nav Hide Show
    if ($('.mobile-menu').length) {

        var mobileMenuContent = $('.main-header .nav-outer .main-menu .navigation').html();
        $('.mobile-menu .navigation').append(mobileMenuContent);
        $('.sticky-header .navigation').append(mobileMenuContent);
        $('.mobile-menu .close-btn').on('click', function () {
            $('body').removeClass('mobile-menu-visible');
        });
        //Dropdown Button
        $('.mobile-menu li.dropdown .dropdown-btn').on('click', function () {
            $(this).prev('ul').slideToggle(500);
        });
        //Menu Toggle Btn
        $('.mobile-nav-toggler').on('click', function () {
            $('body').addClass('mobile-menu-visible');
        });

        //Menu Toggle Btn
        $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function () {
            $('body').removeClass('mobile-menu-visible');
        });

    }

})(jQuery);


//Count




let currentNumber = 0;
fetch('http://navoiyps.uz/statist')
    .then(response => response.json())
    .then(data => {
        // API-dan olingan ma'lumotlarni ishlab chiqamiz
        const targetNumber = data[0].established;
        const targetNumber2 = data[0].teachers;
        const targetNumber3 = data[0].exteacher;
        const targetNumber4 = data[0].students;
        const targetNumber5 = data[0].winners;
        const duration = 2 * 1000; // 4 sekund
        const interval = 50; // San'at
        const steps = duration / interval;
        const increment = (targetNumber - currentNumber) / steps;
        function updateOdometer() {
            const odometer1 = document.querySelector('.discharge');
            const odometer2 = document.querySelector('.discharge2');
            const odometer3 = document.querySelector('.discharge3');
            const odometer4 = document.querySelector('.discharge4');
            const odometer5 = document.querySelector('.discharge5');
            if (currentNumber < targetNumber) {
                currentNumber += increment;
                odometer1.innerText = Math.round(currentNumber);
                odometer2.innerText = Math.round(currentNumber);
                odometer3.innerText = Math.round(currentNumber);
                odometer4.innerText = Math.round(currentNumber);
                odometer5.innerText = Math.round(currentNumber);
                setTimeout(updateOdometer, interval);
            } else {
                odometer1.innerText = targetNumber;
                odometer2.innerText = targetNumber2;
                odometer3.innerText = targetNumber3;
                odometer4.innerText = targetNumber4;
                odometer5.innerText = targetNumber5;
            }
        }
        // Dokument yuklanganda avtomatik boshlanadi
        window.onload = function () {
            updateOdometer();
        };
    })
    .catch(error => console.error('API bilan xatolik:', error));








document.addEventListener('DOMContentLoaded', function () {
    const fotoMainItems = document.querySelectorAll('.foto-main');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const controlPrev = document.querySelector('.control-prev');
    const controlNext = document.querySelector('.control-next');

    let currentIndex = 0;

    fotoMainItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            currentIndex = Array.from(fotoMainItems).indexOf(this);
            updateModalContent();
            modal.style.display = 'flex';
        });
    });

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    controlPrev.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + fotoMainItems.length) % fotoMainItems.length;
        updateModalContent();
    });

    controlNext.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % fotoMainItems.length;
        updateModalContent();
    });

    function updateModalContent() {
        const imgSrc = fotoMainItems[currentIndex].querySelector('img').src;
        modalContent.innerHTML = `<img src="${imgSrc}" alt="Large Image">`;
    }
});


fetch('http://navoiyps.uz/team')
    .then(response => response.json())
    .then(data => {
        const teamContainer = document.querySelector('.team-teacher');

        // API-dan olingan ma'lumotlarni ishlab chiqamiz
        data.forEach(teamItem => {
            if (teamItem.type === 'mahalliy') {
                const cardTeamDiv = document.createElement('div');
                cardTeamDiv.classList.add('card-team-div');
                cardTeamDiv.style.margin = '10px';

                const webDesignDiv = document.createElement('div');
                webDesignDiv.classList.add('webdesign');
                webDesignDiv.style.boxShadow = '0 0 5px black';
                webDesignDiv.style.padding = '10px';
                webDesignDiv.style.borderRadius = '5px';

                const teamImage = document.createElement('img');
                teamImage.classList.add('card-team');
                teamImage.src = `http://navoiyps.uz/uploads/${teamItem.img}`;
                teamImage.alt = '';

                webDesignDiv.appendChild(teamImage);
                cardTeamDiv.appendChild(webDesignDiv);
                teamContainer.appendChild(cardTeamDiv);
            }
        });
    })
    .catch(error => console.error('API bilan xatolik:', error));

fetch('http://navoiyps.uz/team')
    .then(response => response.json())
    .then(data => {
        const teamContainer = document.querySelector('.team-div');

        // API-dan olingan ma'lumotlarni ishlab chiqamiz
        data.forEach(teamItem => {
            if (teamItem.type === 'raxbariyat') {
                const cardTeamDiv = document.createElement('div');
                cardTeamDiv.classList.add('card-team-div');
                cardTeamDiv.style.margin = '10px';

                const webDesignDiv = document.createElement('div');
                webDesignDiv.classList.add('webdesign');
                webDesignDiv.style.boxShadow = '0 0 5px black';
                webDesignDiv.style.padding = '10px';
                webDesignDiv.style.borderRadius = '5px';

                const teamImage = document.createElement('img');
                teamImage.classList.add('card-team');
                teamImage.src = `http://navoiyps.uz/uploads/${teamItem.img}`;
                teamImage.alt = '';

                webDesignDiv.appendChild(teamImage);
                cardTeamDiv.appendChild(webDesignDiv);
                teamContainer.appendChild(cardTeamDiv);
            }
        });
    })
    .catch(error => console.error('API bilan xatolik:', error));

fetch('http://navoiyps.uz/team')
    .then(response => response.json())
    .then(data => {
        const teamContainer = document.querySelector('.team-exteacher');

        // API-dan olingan ma'lumotlarni ishlab chiqamiz
        data.forEach(teamItem => {
            if (teamItem.type === 'xorijlik') {
                const cardTeamDiv = document.createElement('div');
                cardTeamDiv.classList.add('card-team-div');
                cardTeamDiv.style.margin = '10px';

                const webDesignDiv = document.createElement('div');
                webDesignDiv.classList.add('webdesign');
                webDesignDiv.style.boxShadow = '0 0 5px black';
                webDesignDiv.style.padding = '10px';
                webDesignDiv.style.borderRadius = '5px';

                const teamImage = document.createElement('img');
                teamImage.classList.add('card-team');
                teamImage.src = `http://navoiyps.uz/uploads/${teamItem.img}`;
                teamImage.alt = '';

                webDesignDiv.appendChild(teamImage);
                cardTeamDiv.appendChild(webDesignDiv);
                teamContainer.appendChild(cardTeamDiv);
            }
        });
    })
    .catch(error => console.error('API bilan xatolik:', error));

fetch('http://navoiyps.uz/team')
    .then(response => response.json())
    .then(data => {
        const teamContainer = document.querySelector('.team-sub');

        // API-dan olingan ma'lumotlarni ishlab chiqamiz
        data.forEach(teamItem => {
            if (teamItem.type === 'tarbiyachi') {
                const cardTeamDiv = document.createElement('div');
                cardTeamDiv.classList.add('card-team-div');
                cardTeamDiv.style.margin = '10px';

                const webDesignDiv = document.createElement('div');
                webDesignDiv.classList.add('webdesign');
                webDesignDiv.style.boxShadow = '0 0 5px black';
                webDesignDiv.style.padding = '10px';
                webDesignDiv.style.borderRadius = '5px';

                const teamImage = document.createElement('img');
                teamImage.classList.add('card-team');
                teamImage.src = `http://navoiyps.uz/uploads/${teamItem.img}`;
                teamImage.alt = '';

                webDesignDiv.appendChild(teamImage);
                cardTeamDiv.appendChild(webDesignDiv);
                teamContainer.appendChild(cardTeamDiv);
            }
        });
    })
    .catch(error => console.error('API bilan xatolik:', error));


fetch('http://navoiyps.uz/abaut')
    .then(response => response.json())
    .then(data => {
        const abautDataContainer = document.getElementById('abaut-data');

        // API-dan olingan ma'lumotlarni ishlab chiqamiz
        data.forEach(abautItem => {
            const mainDiv = document.createElement('div');
            mainDiv.classList.add('col');

            const imageDiv = document.createElement('div');
            imageDiv.classList.add('flex', 'justify-center');

            const mainImage = document.createElement('img');
            mainImage.classList.add('abaut-main-img');
            mainImage.src = `http://navoiyps.uz/uploads/${abautItem.img}`;
            mainImage.alt = '';

            imageDiv.appendChild(mainImage);
            mainDiv.appendChild(imageDiv);

            const textDiv = document.createElement('div');
            textDiv.classList.add();
            textDiv.style.paddingTop = '30px';

            const title = document.createElement('h2');
            title.style.marginTop = '25px';
            title.style.width = '100%';
            title.style.textAlign = 'center';
            title.textContent = abautItem.title;

            const description = document.createElement('p');
            description.style.textAlign = 'center';
            description.textContent = abautItem.desc;

            mainDiv.appendChild(textDiv);
            textDiv.appendChild(title);
            textDiv.appendChild(description);

            abautDataContainer.appendChild(mainDiv);
        });
    })
    .catch(error => console.error('API bilan xatolik:', error));

fetch('http://navoiyps.uz/slider')
    .then(response => response.json())
    .then(data => {
        const swiperContainer = document.querySelector('#swipper');

        // API-dan olingan ma'lumotlarni ishlab chiqamiz
        data.forEach(sliderItem => {
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide', 'cover-background');
            swiperSlide.style.backgroundImage = `url(http://navoiyps.uz/uploads/${sliderItem.img})`;

            swiperContainer.appendChild(swiperSlide);
        });

        // Slider yaratish
        const mySwiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    })
    .catch(error => console.error('API bilan xatolik:', error));


fetch('http://navoiyps.uz/gallery')
    .then(response => response.json())
    .then(data => {
        const photosContainer = document.getElementById('photos');

        // API-dan olingan ma'lumotlarni ishlab chiqamiz
        data.forEach(photoItem => {
            const listItem = document.createElement('li');
            listItem.classList.add('foto-main');

            const image = document.createElement('img');
            image.src = `http://navoiyps.uz/uploads/${photoItem.img}`;
            image.alt = '';

            listItem.appendChild(image);
            photosContainer.appendChild(listItem);
        });
    })
    .catch(error => console.error('API bilan xatolik:', error));

    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Buni qo'shing, aks holda sahifani qayta yuklab bo'ladi
    
        const formData = new FormData(this);
    
        // Formdagi malumotlarni JSON obyektiga aylantirish
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });
    
        // API dan malumotlarni olish
        fetch('http://navoiyps.uz/contact/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // API javobi bilan ishlovchi kod
                console.log('Data:', data);
                window.location.href = '/contactus.html';

            })
            .catch(error => {
                // Xatolikni aniqlash
                console.error('API bilan xatolik:', error);
            });
    });
    
// Foydalanuvchi kiritgan malumotlarni olish


