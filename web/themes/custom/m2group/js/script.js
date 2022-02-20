(function($, Drupal, drupalSettings) {

    $(document).ready(function() {
        imageLazyLoading();
        gtranslateHandler();
        headerMobile();
    });

    function imageLazyLoading() {
        $("img.lazy").lazyload({
            effect: "fadeIn",
            threshold: 500
        });
    }

    function gtranslateHandler() {
        let gtranslateTimeout = null;
        let gtranslate = function() {
            clearTimeout(gtranslateTimeout);
            if ($('.nturl').length > 0) {
                $('.nturl').each(function() {
                    let langcode = $(this).attr('onclick').split(";")[0].replace("doGTranslate('vi|", '').slice(0, -2);
                    let span = $(this).find('span')[0].outerHTML
                    $(this).html(span + langcode);
                    if (langcode == 'vi') {
                        $('.gtranslate .switcher>.selected>a').html(span + langcode);
                    }
                    $('.gtranslate').fadeIn(300);
                })
                if ($(window).width() <= 991) {
                    $('#block-gtranslate').appendTo('.gtranslate-mb');
                }
            } else {
                gtranslateTimeout = setTimeout(function() {
                    gtranslate();
                }, 500)
            }
        }
        gtranslate();
    }

    function headerMobile() {
        $('.hamburger').click(function() {
            $('body').toggleClass('panel-open');
        })
    }
})(jQuery, Drupal, drupalSettings);