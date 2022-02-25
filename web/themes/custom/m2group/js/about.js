(function ($, Drupal, drupalSettings) {
    $(document).ready(function () {
        var slide_1 = new Swiper(".about_slide_1", {
            slidesPerView: 3,
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
        var slide_2 = new Swiper(".about_slide_2", {
            slidesPerView: 3,
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    });
})(jQuery, Drupal, drupalSettings);