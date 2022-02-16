(function ($, Drupal, drupalSettings) {
    $(document).ready(function () {
        var gallery_thumb = new Swiper(".gallery_slide_thumb", {
            spaceBetween: 10,
            slidesPerView: 4.3,
            freeMode: true,
            watchSlidesProgress: true,
        });
        var gallery = new Swiper(".gallery_slide", {
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
                swiper: gallery_thumb,
            },
        });
    });
})(jQuery, Drupal, drupalSettings);