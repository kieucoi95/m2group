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
                if ($(this).parent().next().length) {
                    let pDiv = $(this).parent();
                    pDiv.before('<h3 class="station-title">' + $(this).text() + '</h3>');
                } else {
                    $(this).parent().parent().hide();
                }
            });
            // Add bootstrap classes
            $('#edit-station>div>ul>li>ul>li').each(function() {
                if ($(this).find('>ul').length) {
                    let $this = $(this).find('>ul>li');
                    $this.addClass('col-md-3 col-6');
                    $this.parent().addClass('row');
                } else {
                    $(this).hide();
                }
            });
            // Search handler
            Drupal.search.handler(
                '#edit-station input[type="checkbox"]',
                '#edit-station>div>ul>li>ul>li>div>input',
                '#edit-station>div>ul>li>ul>li>ul>li>div>input',
                '#edit-station>div>ul>li>ul>li>div'
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
                '#edit-district>div>ul>li>ul>li>div>input',
                '#edit-district>div>ul>li>div'
            );
        };
        let sBox = $('.advance-filter .filter-box .select-box');
        sBox.html('');
        $('[data-drupal-selector="edit-room-type"]').appendTo(sBox);
        $(".flat-type .item").click(function() {
            $(this).addClass("checked");
            $(this).siblings(".item").removeClass("checked");
        });
        $(".advance-filter .filter-btn").click(function() {
            $(".advance-filter").toggleClass("close");
        });
        Drupal.search.initSelect2();
    };

    Drupal.search.handler = function(allCheckboxQuery, bigCheckboxQuery, smallCheckboxQuery, titleBarQuery) {
        let allCheckbox = $(allCheckboxQuery);
        let bigCheckbox = $(bigCheckboxQuery);
        let titleBar = $(titleBarQuery);
        let paramText = 'station';
        if ($('.district-search').length) {
            paramText = 'district';
        }

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
                    let other_li = li.parent().parent().siblings('li').find('>ul>li');
                    other_li.removeClass('open');
                    other_li.find('>ul').slideUp(300);
                } else {
                    sibs_li.find('>ul').slideUp(300);
                }
            }
        })
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
            if (paramText == 'district') {
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
            } else {
                let smallCheckbox = $(smallCheckboxQuery + ':checked');
                let station_params = '/';
                if (smallCheckbox.length > 0) {
                    station_arr = [];
                    smallCheckbox.each(function() {
                        let val = $(this).val();
                        station_arr.push(val);
                    })
                    station_params += station_arr.join("%2B");
                    let productPageUrl = drupalSettings.path.baseUrl + drupalSettings.m2group.station_lv4_url + station_params;
                    window.location.href = productPageUrl;
                }
            }
        });
        // Click search btn on search box
        $('.input-wrapper .img-wrapper').click(function() {
            let s = $('select[name="_select"]');
            let val = s.val();
            let station_params = '?';
            let arr = [];
            if (val != 'default') {
                arr.push(paramText + '%5B' + val + '%5D=' + val);
            }
            if ($('input[name="flat_type"]:checked').length) {
                arr.push('type=' + $('input[name="flat_type"]:checked').val());
            }
            arr.push('room_type=' + $('[data-drupal-selector="edit-room-type"]').val());
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
        let nonAccentVietnamese = function(str) {
            str = str.toLowerCase();
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            // Some system encode vietnamese combining accent as individual utf-8 characters
            str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
            str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
            return str;
        }
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
            function matchStart(params, data) {
                params.term = params.term || '';
                if (nonAccentVietnamese(data.text).toUpperCase().indexOf(nonAccentVietnamese(params.term).toUpperCase()) !== -1) {
                    return data;
                }
                return false;
            }
            var sparent = $('#_select').parents(".box-search");
            $('#_select').select2({
                theme: "classic",
                dropdownPosition: 'below',
                dropdownParent: sparent,
                matcher: function(params, data) {
                    return matchStart(params, data);
                },
            });
        });
    };
})(jQuery, Drupal);