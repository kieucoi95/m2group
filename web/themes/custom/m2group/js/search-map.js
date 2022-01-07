(function($, Drupal) {
    Drupal.behaviors.search_map = {
        attach: function(context, settings) {
            Drupal.search_map.run(context, settings);
        }
    }

    Drupal.search_map = Drupal.search_map || {};

    // Main handle function
    Drupal.search_map.run = function(context, settings) {
        $(document, context).once('search_map').each(function() {
            let options = {
                zoom: 11,
            };
            let lat = '35.6987';
            let lon = '139.591';
            let position = new google.maps.LatLng(lat, lon);
            let marker_options = [{
                position: position,
                title: '¥ 47.500',
                icon: drupalSettings.path.baseUrl + 'themes/custom/m2group/images/marker.svg',
            }];
            Drupal.search_map.ggmap_init('map', lat, lon, options, marker_options, function(map, lat, lon, user_marker) {

            });
        });
    };

    /* GG Map Functions */
    Drupal.search_map.ggmap_make_marker = function(position, icon, title, map) {
        let _icon = new google.maps.MarkerImage(icon);
        var marker = new google.maps.Marker({
          position: position,
          map: map,
          icon: _icon,
          title: title,
          animation: google.maps.Animation.DROP
        });
      
        var infowindow = new google.maps.InfoWindow({content: title});
        infowindow.open(map, marker); // Open the marker as default
      
        marker.addListener('click', function() {
          infowindow.open(map, marker);
          marker.setAnimation(google.maps.Animation.BOUNCE);
        });
      
        google.maps.event.addListener(infowindow, 'closeclick', function() {
          marker.setAnimation(null);
        });
      
        return marker;
    };
    
    Drupal.search_map.ggmap_init = function(map_id, lat, lon, options, marker_options, callback) {
        if (lat == undefined) {lat = 0;}
        if (lon == undefined) {lon = 0;}
        if (options == undefined) {options = {};}
        if (marker_options == undefined) {marker_options = {};}
      
        // Set init position, if not provided, set the current user pos.
        lat = !lat ? 15.7939253 : lat;
        lon = !lon ? 105.9102078 : lon;
      
        // Build the lat lng object from the user's position.
        var myLatlng = new google.maps.LatLng(lat, lon);
      
        // Set the map's options.
        var mapOptions = options;
        mapOptions['center'] = myLatlng;
        mapOptions['disableDefaultUI'] = mapOptions['disableDefaultUI'] != undefined ? mapOptions['disableDefaultUI'] : true;
        mapOptions['zoom'] = mapOptions['zoom'] != undefined ? mapOptions['zoom'] : 5;
        mapOptions['mapTypeControl'] = mapOptions['mapTypeControl'] != undefined ? mapOptions['mapTypeControl'] : true;
        mapOptions['mapTypeControlOptions'] = mapOptions['mapTypeControlOptions'] != undefined ? mapOptions['mapTypeControlOptions'] : {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU};
        mapOptions['zoomControl'] = mapOptions['zoomControl'] != undefined ? mapOptions['zoomControl'] : true;
        mapOptions['zoomControlOptions'] = mapOptions['zoomControlOptions'] != undefined ? mapOptions['zoomControlOptions'] : {style: google.maps.ZoomControlStyle.SMALL};
        mapOptions['zoomControlOptions']['position'] = mapOptions['zoomControlOptions']['position'] != undefined ? mapOptions['zoomControlOptions']['position'] : google.maps.ControlPosition.RIGHT_TOP;
      
      
        // Initialize the map, and set a timeout to resize properly.
        var map = new google.maps.Map(
          document.getElementById(map_id),
          mapOptions
        );
      
        setTimeout(function() {
          if (marker_options.length > 0) {
            for (let i in marker_options) {
              let val = Drupal.search_map.ggmap_make_marker( marker_options[i]['position'], marker_options[i]['icon'], marker_options[i]['title'], map );
              val.setMap(map);
            }
          }
      
          google.maps.event.trigger(map, 'resize');
          map.setCenter(myLatlng);
      
          // Activate callback function in here.
          if (typeof callback == 'function') {callback(map, lat, lon, myLatlng);}
        }, 500);
    };

    Drupal.search_map.ggmap_add_marker = function(map, marker_arr, callback) {
        let icon = new google.maps.MarkerImage(drupalSettings.path.baseUrl + 'themes/custom/m2group/images/marker.svg');
        var markers = [];
        for (let i in marker_arr) {
          let val = Drupal.search_map.ggmap_make_marker( marker_arr[i]['location'], marker_arr[i]['icon_url'], marker_arr[i]['title'], map );
          markers.push(val);
        }
      
        Drupal.search_map.ggmap_set_bound_and_center(map, markers, true, function (current_map, leftSide) {
          var current_zoom = current_map.getZoom();
          current_map.setZoom(parseInt(current_zoom) - 1);
          // map.setCenter(leftSide);
        });
      
        // Callback if any.
        if (typeof callback == 'function') {
          callback('');
        }
    };
    
    Drupal.search_map.ggmap_set_bound_and_center = function(map, markers, to_center, callback) {
        if (to_center == undefined) {
            to_center = true;
        }
  
        var bounds = new google.maps.LatLngBounds();
    
        var leftSide = new google.maps.LatLng(bounds.getCenter().lat(), bounds.getSouthWest().lng());
    
        for (var i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
        }
    
        setTimeout(function () {
            map.fitBounds(bounds);
        }, 0);
    
        // if (to_center) {
        //   map.panToBounds(bounds); // Center map.
        // }
    
        if (typeof callback == 'function') {
            callback(map, leftSide);
        }
    };

    Drupal.search_map.ggmap_text_to_position = function(name) {
        jQuery.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + name + "&key=AIzaSyBqNX85EZFlbMLc0pnQhkcDrSsw70EQDMs", function(data, status) {
            let lat = data.results[0].geometry.location.lat;
            let lng = data.results[0].geometry.location.lng;
            let latlng = new google.maps.LatLng(lat, lon);
            let result = {
                lat: lat,
                lng: lng,
                latlng: latlng,
            };
            return result;
        });
    };
    /* End GG Map Functions */
})(jQuery, Drupal);