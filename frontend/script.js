//Useful links:
// http://code.google.com/apis/maps/documentation/javascript/reference.html#Marker
// http://code.google.com/apis/maps/documentation/javascript/services.html#Geocoding
// http://jqueryui.com/demos/autocomplete/#remote-with-cache


var geocoder;
var map;
var marker;
var initialLocation;
var browserSupportFlag = new Boolean();
    
function initialize(){
//MAP
  var sthlm = new google.maps.LatLng(59.300,18.114);

  var options = {
    zoom: 12,
    center: sthlm,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
        
  map = new google.maps.Map(document.getElementById("map_canvas"), options);
  
  //W3C geolocation
  if(navigator.geolocation){
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position){
      initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(initialLocation);
    }, function(){
      handleNoGeolocation(browserSupportFlag);
    });
    //Google Gears Location
  }else if (google.gears){
    browserSupportFlag = true;
    var geo = google.gears.factory.create('beta.geolocation');
    geo.getCurrentPosition(function(position){
      initialLocation = new google.maps.LatLng(position.latitude, position.longitude);
      map.setCenter(initialLocation);
      console.log("BRAA2");
    }, function(){
      handleNoGeolocation(browserSupportFlag);
    });
    //Browser cant make it!
  }else{
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

  function handleNoGeolocation(errorFlag){
    if(errorFlag == true){
      alert("Geolocation fungerar inte!");
      initialLocation = sthlm;
    }else{
      alert("Din webbläsare stödjer inte geolocation...");
      initialLocation = sthlm;
    }
    map.setCenter(initialLocation);
  }
    
  //GEOCODER
  geocoder = new google.maps.Geocoder();

  marker = new google.maps.Marker({
    map: map,
    position: initialLocation,
    draggable: true
  });

        
}
    



$(document).ready(function() { 
         
  initialize();
          
  $(function() {
     
      $("#address1").autocomplete({
       
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
        $("#latitude1").val(ui.item.latitude);
        $("#longitude1").val(ui.item.longitude);
<<<<<<< HEAD
        depLocation = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
        if(destLocation) {
          directions(depLocation, destLocation, []);

        } else {
          departure.setPosition(depLocation);
          map.setCenter(depLocation);
=======

        var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
        marker = new google.maps.Marker({
          map: map,
          position: location,
          draggable: true
        })

        marker.setPosition(location);
        map.setCenter(location);


      }
    });
  });
  
  //Add listener to marker for reverse geocoding
  google.maps.event.addListener(marker, 'drag', function() {
    geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          $('#address1').val(results[0].formatted_address);
          $('#latitude1').val(marker.getPosition().lat());
          $('#longitude1').val(marker.getPosition().lng());
>>>>>>> Två markers i index
        }
      }
    });
  });


    $(function() {
     
      $("#address2").autocomplete({
       
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
        $("#latitude2").val(ui.item.latitude);
        $("#longitude2").val(ui.item.longitude);

        var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
        marker = new google.maps.Marker({
          map: map,
          position: location,
          draggable: true
        })

        marker.setPosition(location);
        map.setCenter(location);


      }
    });
  });
  
  //Add listener to marker for reverse geocoding
  google.maps.event.addListener(marker, 'drag', function() {
    geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          $('#address2').val(results[0].formatted_address);
          $('#latitude2').val(marker.getPosition().lat());
          $('#longitude2').val(marker.getPosition().lng());
        }
      }
    });
  });


});

/*
$(function() {
    $("#address1").autocomplete({
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
        $("#latitude").val(ui.item.latitude);
        $("#longitude").val(ui.item.longitude);
        var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
        marker.setPosition(location);
        map.setCenter(location);
      }
    });
  });
  
  //Add listener to marker for reverse geocoding
  google.maps.event.addListener(marker, 'drag', function() {
    geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          $('#address1').val(results[0].formatted_address);
          $('#latitude').val(marker.getPosition().lat());
          $('#longitude').val(marker.getPosition().lng());
        }
      }
    });
  });
<<<<<<< HEAD

  // Form posting event
  $('#form').submit(function() {
    // validate here fields here!
    send = = {
      "tag": $('#tag').value(),
      "destination_lng": $('#longitude2').value(),
      "destination_lat": $('#latitude2').value(),
      "eta": $('#arrival').value(),
      "km_cost": $('#price').value(),,
      "message": $('#message').value(),,
      "users": 22, // id of logged in user,
      "legs":[
          { "sequence": 1, // from directions function
            "from_lng": $('#longitude1').value(),,
            "from_lat": $('#latitude1').value(),,
            "leg_distance": 3, // from directions function  
            "user_to_destination": 3, // same value, from directions function
            "passengers":[ {"users":22 } ] //id of logged in user
        }]
      }
    
      $.post('index.php?/trips', send, function(data) {
        // lock form
        // send tweet
        // display status messgae  
      }, 'json');  
  })
  
});
=======
*/
>>>>>>> Två markers i index
