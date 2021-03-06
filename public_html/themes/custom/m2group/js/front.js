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

    let searchHandler = function() {
        let s = $('[name="district_station"]');
        let initSelectOpt = function() {
            s.append('<option value="default">' + s.attr('placeholder') + '</option>');
            let stationElemWrappers = $('#edit-station-data>div>ul>li>ul>li>ul>li>div');
            let districtElemWrappers = $('#edit-district-data>div>ul>li>ul>li>div');
            stationElemWrappers.each(function(index) {
                let val = $(this).find('input').val();
                let text = $(this).find('label').text();
                // if (index == 0) {
                //     s.append("<optgroup label='Danh sách Ga'>");
                // }
                s.append('<option value="' + val + '" type="station">' + s.attr('stext') + ' ' + text + '</option>');
                // if (index == (stationElemWrappers.length - 1)) {
                //     s.append("</optgroup>");
                // }
            });
            districtElemWrappers.each(function(index) {
                let val = $(this).find('input').val();
                let text = $(this).find('label').text();
                // if (index == 0) {
                //     s.append("<optgroup label='Danh sách Quận'>");
                // }
                s.append('<option value="' + val + '" type="district">' + s.attr('dtext') + ' ' + text + '</option>');
                // if (index == (districtElemWrappers.length - 1)) {
                //     s.append("</optgroup>");
                // }
            });
            let sBox = $('.advance-filter .filter-box .select-box');
            sBox.html('');
            $('[data-drupal-selector="edit-room-type"]').appendTo(sBox);
        };
        $.when(initSelectOpt()).done(function() {
            function formatState(state) {
                let type = $('option[value="' + state.id + '"]').attr("type");
                if (type == 'station') {
                    var $state = $('<span>' + state.text + '<span class="s2-type">Ga</span></span>');
                } else if (type == 'district') {
                    var $state = $('<span>' + state.text + '<span class="s2-type">Quận</span></span>');
                } else {
                    var $state = state.text;
                }
                return $state;
            };
            var sparent = s.parents("form");
            s.select2({
                theme: "classic",
                templateResult: formatState,
                dropdownPosition: 'below',
                dropdownParent: sparent,
            }).on('select2:open', function(e) {
                sparent.find('.select2-dropdown').addClass('animate__animated animate__bounce');
            }).on('select2:closing', function(e) {
                sparent.find('.select2-dropdown').removeClass('animate__animated animate__bounce');
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