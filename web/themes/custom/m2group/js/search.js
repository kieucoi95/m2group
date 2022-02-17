(function($, Drupal) {
    Drupal.behaviors.search = {
        attach: function(context, settings) {
            Drupal.search.run(context, settings);
        }
    }

    Drupal.search = Drupal.search || {};

    Drupal.search.run = function(context, settings) {
        $(document, context).once('search').each(function() {
            // Custom interface
            Drupal.search.interfaceCustom();
        });
    };

    Drupal.search.interfaceCustom = function() {
        if ($('#edit-station').length) {
            // Create title
            $('#edit-station>div>ul>li>div>label').each(function() {
                let pDiv = $(this).parent();
                pDiv.before('<h3 class="station-title">' + $(this).text() + '</h3>');
            });
            // Add bootstrap classes
            $('#edit-station>div>ul>li>ul>li>ul>li').each(function() {
                $(this).addClass('col-md-3 col-6');
                $(this).parent().addClass('row');
            });
            // Search handler
            Drupal.search.handler(
                '#edit-station input[type="checkbox"]',
                '#edit-station>div>ul>li>ul>li>div>input',
                '#edit-station>div>ul>li>ul>li>ul>li>div>input'
            );
        };
        if ($('#edit-district').length) {
            // Add bootstrap classes
            $('#edit-district>div>ul>li>ul>li').each(function() {
                $(this).addClass('col-md-3 col-6');
                $(this).parent().addClass('row');
            });
            // Search handler
            Drupal.search.handler(
                '#edit-district input[type="checkbox"]',
                '#edit-district>div>ul>li>div>input',
                '#edit-district>div>ul>li>ul>li>div>input'
            );
        };
        $('.box-search .filter-wrapper').click(function() {
            $('.box-search').toggleClass('show_filter');
        });
        Drupal.search.initSelect2();
    };

    Drupal.search.handler = function(allCheckboxQuery, bigCheckboxQuery, smallCheckboxQuery) {
        let allCheckbox = $(allCheckboxQuery);
        let bigCheckbox = $(bigCheckboxQuery);
        let paramText = 'station';
        if ($('.district-search').length) {
            paramText = 'district';

        }

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
        $('.form-actions input').click(function(e) {
            e.preventDefault();
            let smallCheckbox = $(smallCheckboxQuery + ':checked');
            let station_params = '?';
            if (smallCheckbox.length > 0) {
                station_arr = [];
                smallCheckbox.each(function() {
                    let val = $(this).val();
                    station_arr.push(paramText + '%5B%5D=' + val);
                })
                station_params += station_arr.join("&");
                let productPageUrl = drupalSettings.path.baseUrl + drupalSettings.m2group.product_url + station_params;
                window.location.href = productPageUrl;
            }
        });
        // Click search btn on search box
        $('.input-wrapper .img-wrapper').click(function() {
            let s = $('select[name="_select"]');
            let val = s.val();
            let station_params = '?';
            let arr = [];
            if (val != 'default') {
                arr.push(paramText + '%5B%5D=' + val);
            }
            if ($('input[name="flat_type"]:checked').length) {
                arr.push('type=' + $('input[name="flat_type"]:checked').val());
            }
            if (arr.length !== 0) {
                station_params += arr.join("&");
            }
            if (station_params != '?') {
                let productPageUrl = drupalSettings.path.baseUrl + drupalSettings.m2group.product_url + station_params;
                window.location.href = productPageUrl;
            }
        });
    };

    Drupal.search.initSelect2 = function() {
        let initSelectOpt = function() {
            $('#edit-station>div>ul>li>ul>li>ul>li>div').each(function() {
                let val = $(this).find('input').val();
                let text = $(this).find('label').text();
                $('#_select').append('<option value="' + val + '">' + text + '</option>');
            });
            $('#edit-district>div>ul>li>ul>li>div').each(function() {
                let val = $(this).find('input').val();
                let text = $(this).find('label').text();
                $('#_select').append('<option value="' + val + '">' + text + '</option>');
            });
        };
        $.when(initSelectOpt()).done(function() {
            $('#_select').select2();
        });
    };
})(jQuery, Drupal);