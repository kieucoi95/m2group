(function ($, Drupal, drupalSettings) {
    $(document).ready(function () {
        var slide_1 = new Swiper(".about_slide_1", {
            slidesPerView: 1.5,
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
            },
        });
        var slide_2 = new Swiper(".about_slide_2", {
            slidesPerView: 1.5,
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
            },
        });
    });
})(jQuery, Drupal, drupalSettings);