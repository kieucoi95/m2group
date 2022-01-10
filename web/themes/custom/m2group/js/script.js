(function ($, Drupal, drupalSettings) {

    $(document).ready(function () {
        imageLazyLoading();
        
    });
    
    function imageLazyLoading() {
        $("img.lazy").lazyload({
            effect : "fadeIn",
            threshold : 500
        });
    }
})(jQuery, Drupal, drupalSettings);