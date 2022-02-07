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
                $(this).addClass('col-md-3 col-sm-6');
                $(this).parent().addClass('row');
            });
            // Search handler
            Drupal.search.handler(
                '#edit-station input[type="checkbox"]',
                '#edit-station>div>ul>li>ul>li>div>input',
                '#edit-station>div>ul>li>ul>li>ul>li>div>input'
            );
        };
    };

    Drupal.search.handler = function(allCheckboxQuery, bigCheckboxQuery, smallCheckboxQuery) {
        let allCheckbox = $(allCheckboxQuery);
        let bigCheckbox = $(bigCheckboxQuery);
        let smallCheckbox = $(smallCheckboxQuery);

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
    };
})(jQuery, Drupal);