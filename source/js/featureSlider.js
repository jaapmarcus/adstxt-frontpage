(function ($, document) {

    "use strict";

    $(document).ready(function () {

        if (typeof Swiper == 'undefined') {
            return;
        }

        new Swiper('.js-feature-slider', {
            speed: 1500,
            loop: false,
            spaceBetween: 20,
            grabCursor: true,
            slidesPerView: 1.1,

            breakpoints: {
                990: {
                    slidesPerView: 'auto',
                    spaceBetween: 50,
                },
            },

            scrollbar: {
                el: '.js-feature-slider-scrollbar',
                draggable: true,
            },

            navigation: {
                nextEl: '.js-feature-slider-button-next',
                prevEl: '.js-feature-slider-button-prev'
            }
        });

    });

}(jQuery, document));
