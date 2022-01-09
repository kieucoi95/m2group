(function ($, Drupal, drupalSettings) {

    imageLazyLoading();
    console.log(123);
    function imageLazyLoading() {
        $("img.lazy").lazyload({
            effect : "fadeIn",
            threshold : 500
        });
    }
})(jQuery, Drupal, drupalSettings);