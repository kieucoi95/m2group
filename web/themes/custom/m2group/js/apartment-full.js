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

    var related = new Swiper("#related", {
        slidesPerView: 1.5,
        spaceBetween: 25,
        breakpoints: {
            640: {
                slidesPerView: 1.5,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 2.5,
            },
        },
    });
})(jQuery, Drupal, drupalSettings);