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

    var videoModal = document.getElementById('videoModalCenter')
    videoModal.addEventListener('hidden.bs.modal', function(event) {
        $('.home_video .youtube-field-player')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    })

    let searchHandler = function() {
        let s = $('[name="district_station"]');
        let initSelectOpt = function() {
            s.append('<option value="default">' + s.attr('placeholder') + '</option>');
            let stationElemWrappers = $('#edit-station-data>div>ul>li>ul>li>ul>li>div');
            let districtElemWrappers = $('#edit-district-data>div>ul>li>ul>li>div');
            stationElemWrappers.each(function() {
                let val = $(this).find('input').val();
                let text = $(this).find('label').text();
                s.append('<option value="' + val + '" type="station">' + s.attr('stext') + ' ' + text + '</option>');
            });
            districtElemWrappers.each(function() {
                let val = $(this).find('input').val();
                let text = $(this).find('label').text();
                s.append('<option value="' + val + '" type="district">' + s.attr('dtext') + ' ' + text + '</option>');
            });
        };
        $.when(initSelectOpt()).done(function() {
            s.select2();
            $('.search-btn').click(function(e) {
                e.preventDefault();
                if (s.val() != 'default') {
                    let type = s.find('option[value="' + s.val() + '"]').attr('type');
                    let productPageUrl = drupalSettings.path.baseUrl + drupalSettings.m2group.product_url + '?' + type + '%5B' + s.val() + '%5D=' + s.val();
                    window.location.href = productPageUrl;
                }
            })
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