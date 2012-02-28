function InputLoc(inputField, latField, lngField){
   
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(59.3425027, 18.0288077),
      map: map,
      draggable: true
    });

    this.marker = marker;
 
   
    this.setPosition = function(fromField, fromLat, fromLng){
      var location = new google.maps.LatLng(fromLat.val(), fromLng.val());
      marker.setMap(map);
      marker.setPosition(location);
      marker.setVisible(true);
      directions.refresh();

          //map.setCenter(location);
    };

    (function() {
      inputField.autocomplete({
        //This bit uses the geocoder to fetch address values
        source: function(request, response) {
          geocoder.geocode( {'address': request.term }, function(results, status) {
            response($.map(results, function(item) {
              return {
                label:  item.formatted_address,
                value: item.formatted_address,
                latitude: item.geometry.location.lat(),
                longitude: item.geometry.location.lng()
              }
            }));
          })
        },
        //This bit is executed upon selection of an address
        select: function(event, ui) {
          latField.val(ui.item.latitude);
          lngField.val(ui.item.longitude);
          var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
          marker.setMap(map);
          marker.setPosition(location);
          map.setCenter(location);
          directions.refresh();

        }
      });
    })();
    
    //Add listener to marker for reverse geocoding
    google.maps.event.addListener(marker, 'drag', function() {
      geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            inputField.val(results[0].formatted_address);
            latField.val(marker.getPosition().lat());
            lngField.val(marker.getPosition().lng());
            directions.refresh();
          }
        }
      });
    });
};