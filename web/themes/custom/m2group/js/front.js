(function($, Drupal, drupalSettings) {

    var home_navigation = new Swiper("#home_navigation", {
        slidesPerView: 1.5,
        spaceBetween: 25,
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 144,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 190,
            },
        },
    });

    var home_utilities = new Swiper("#home_utilities", {
        slidesPerView: 1.3,
        spaceBetween: 25,
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 3.5,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });

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

    let searchHandler = function() {
        let s = $('[name="district_station"]');
        let initSelectOpt = function() {
            s.append('<option value="default">' + s.attr('placeholder') + '</option>');
            let stationElemWrappers = $('.station_lv4_data .item');
            let districtElemWrappers = $('#edit-district-data>div>ul>li>ul>li>div');
            stationElemWrappers.each(function(index) {
                let val = $(this).attr('value');
                let text = $(this).text();
                if (index == 0) {
                    s.append("<optgroup label='Danh sách Ga'>");
                }
                s.append('<option value="' + val + '" type="station">' + s.attr('stext') + ' ' + text + '</option>');
                if (index == (stationElemWrappers.length - 1)) {
                    s.append("</optgroup>");
                }
            });
            districtElemWrappers.each(function(index) {
                let val = $(this).find('input').val();
                let text = $(this).find('label').text();
                if (index == 0) {
                    s.append("<optgroup label='Danh sách Quận'>");
                }
                s.append('<option value="' + val + '" type="district">' + s.attr('dtext') + ' ' + text + '</option>');
                if (index == (districtElemWrappers.length - 1)) {
                    s.append("</optgroup>");
                }
            });
            let sBox = $('.advance-filter .filter-box .select-box');
            sBox.html('');
            $('[data-drupal-selector="edit-room-type"]').appendTo(sBox);
        };
        $.when(initSelectOpt()).done(function() {
            function matchStart(params, data) {
                params.term = params.term || '';
                if (nonAccentVietnamese(data.text).toUpperCase().indexOf(nonAccentVietnamese(params.term).toUpperCase()) !== -1) {
                    return data;
                }
                return false;
            }

            var sparent = s.parents("form");
            s.select2({
                theme: "classic",
                // templateResult: formatState,
                dropdownPosition: 'below',
                dropdownParent: sparent,
                matcher: function(params, data) {
                    return matchStart(params, data);
                },
            });
            $('.search-btn').click(function(e) {
                e.preventDefault();
                if (s.val() != 'default') {
                    let type = s.find('option[value="' + s.val() + '"]').attr('type');
                    let flatType = $("[name='flat_type']:checked").val();
                    let roomType = $("[name='room_type']").val();
                    let productPageUrl = drupalSettings.path.baseUrl + drupalSettings.m2group.product_url + '?' + type + '%5B' + s.val() + '%5D=' + s.val() + '&type=' + flatType + '&room_type=' + roomType;
                    window.location.href = productPageUrl;
                }
            })
        });
        $(".flat-type .item").click(function() {
            $(this).addClass("checked");
            $(this).siblings(".item").removeClass("checked");
        });
        $(".advance-filter .filter-btn").click(function() {
            $(".advance-filter").toggleClass("close");
        });
    };
    searchHandler();

    var products = new Swiper("#products", {
        slidesPerView: 1,
        spaceBetween: 25,
        navigation: {
            nextEl: ".control .swiper-button-next",
            prevEl: ".control .swiper-button-prev",
        },
        breakpoints: {
            640: {
                slidesPerView: 1.5,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 2.7,
            },
            1200: {
                slidesPerView: 3,
            },
        },
    });
})(jQuery, Drupal, drupalSettings);