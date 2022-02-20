(function($, Drupal) {
    Drupal.behaviors.productListing = {
        attach: function(context, settings) {
            $(document, context).once('search').each(function() {
                if ($('.exposed-block').length) {
                    console.log(1);
                    $('legend').click(function() {
                        $(this).next().find('.form-checkboxes>ul').slideToggle(300);
                    })
                }
            });
        }
    }
})(jQuery, Drupal);