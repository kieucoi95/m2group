(function($, Drupal) {
    Drupal.behaviors.trainLine = {
        attach: function(context, settings) {
            Drupal.trainLine.run(context, settings);
        }
    }

    Drupal.trainLine = Drupal.trainLine || {};

    Drupal.trainLine.run = function(context, settings) {
        $(document, context).once('train_line').each(function() {
            Drupal.trainLine.handler(
                'ul.big-ul input[type="checkbox"]',
                'ul.big-ul>li>div>input',
                'ul.big-ul>li>ul>li>div>input',
                'ul.big-ul>li>div'
            );
        });
    };

    Drupal.trainLine.handler = function(allCheckboxQuery, bigCheckboxQuery, smallCheckboxQuery, titleBarQuery) {
        let allCheckbox = $(allCheckboxQuery);
        let bigCheckbox = $(bigCheckboxQuery);
        let titleBar = $(titleBarQuery);
        let paramText = 'station';
        if ($('.district-search').length) {
            paramText = 'district';
        }
        // Click to label
        $('li.sm-li>div>label').click(function(e) {
            e.preventDefault();
            let val = $(this).siblings('input').val();
            let productPageUrl = drupalSettings.path.baseUrl + drupalSettings.m2group.product_url + '?station%5B' + val + '%5D=' + val;
            window.location.href = productPageUrl;
        });
        titleBar.click(function(e) {
            if (e.target === this) {
                let li = $(this).parent();
                let sibs_li = li.siblings('li');

                li.toggleClass('open');
                sibs_li.removeClass('open');
                if ($(this).next().is(':hidden')) {
                    $(this).next().slideDown({
                        start: function() {
                            $(this).css({
                                display: "flex"
                            })
                        },
                        duration: 300
                    });
                } else {
                    $(this).next().slideUp(300);
                }
                if (!$('.district-search').length) {
                    let other_li = li.siblings('li');
                    other_li.removeClass('open');
                    other_li.find('>ul').slideUp(300);
                } else {
                    sibs_li.find('>ul').slideUp(300);
                }
            }
        });
        allCheckbox.change(function() {
            if ($(this).prop('checked')) {
                $(this).addClass('check');
            } else {
                $(this).removeClass('check');
            }
        });
        bigCheckbox.change(function() {
            let div = $(this).parent().siblings('ul').find('input');
            if ($(this).prop('checked')) {
                div.each(function() {
                    $(this).prop('checked', true);
                    $(this).addClass('check');
                });
            } else {
                div.each(function() {
                    $(this).prop('checked', false);
                    $(this).removeClass('check');
                });
            }
        });
        // Click search btn
        $('.actions button').click(function(e) {
            e.preventDefault();
            let smallCheckbox = $(smallCheckboxQuery + ':checked');
            let station_params = '?';
            if (smallCheckbox.length > 0) {
                station_arr = [];
                smallCheckbox.each(function() {
                    let val = $(this).val();
                    station_arr.push(paramText + '%5B' + val + '%5D=' + val);
                })
                station_params += station_arr.join("&");
                let productPageUrl = drupalSettings.path.baseUrl + drupalSettings.m2group.product_url + station_params;
                window.location.href = productPageUrl;
            }
        });
    };
})(jQuery, Drupal);