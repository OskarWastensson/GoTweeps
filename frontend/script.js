//Useful links:
// http://code.google.com/apis/maps/documentation/javascript/reference.html#Marker
// http://code.google.com/apis/maps/documentation/javascript/services.html#Geocoding
// http://jqueryui.com/demos/autocomplete/#remote-with-cache


var geocoder;
var map;
var marker;
var initialLocation;
var browserSupportFlag = new Boolean();
    
function initialize(fromObj, toObj){

//MAP
  var sthlm = new google.maps.LatLng(59.300,18.114);

  var options = {
    zoom: 12,
    center: sthlm,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
        
  map = new google.maps.Map(document.getElementById("map_canvas"), options);
  directions = new Directions(map, fromObj, toObj, []);

// Form posting event
  $('#options').submit(function(event) {

    event.preventDefault();
    leg = directions.legs[0];

    // validate fields here!
    send = {
      "tag": $('#tag').val(),
      "destination_lng": $('#longitude2').val(),
      "destination_lat": $('#latitude2').val(),
      "eta": $('#arrival').val(),
      "km_cost": $('#price').val(),
      "message": $('#message').val(),
      "passengers": [ {
        "lng": $('#longitude1').val(),
        "lat": $('#latitude1').val(),
        "leg_distance": leg.leg_distance
      } ] // id of logged in user i set automically if users is missing
      /*
      "legs":[
          { "sequence": leg.sequence, 
              
            "user_to_destination": leg.leg_distance, 
            
        }]*/
    };

      $.post('http://localhost/gotweeps/tripAPI/?/trips', send, function(data) {
        id = data[0].id;
        window.location.href = "confirm.php?trip=" + id;
  
      }, 'json'); 
  });

  $('#myLoc').click(function(){
    var fromField = $("#address1"),
        fromLat = $("#latitude1"),
        fromLng = $("#longitude1");

      //W3C geolocation
      if(navigator.geolocation){
        browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition(function(position){
          initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map.setCenter(initialLocation);

          fromLat.val(position.coords.latitude);
          fromLng.val(position.coords.longitude);

          fromObj.setPosition(fromField, fromLat, fromLng);

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
    
  });
  

  //GEOCODER
  geocoder = new google.maps.Geocoder();

  marker = new google.maps.Marker({
    map: map,
    position: initialLocation,
    draggable: true
  });  
}
    


$(document).ready(function() { 
         
 
  var fromField = $("#address1"),
      toField = $("#address2"),
      fromLat = $("#latitude1"),
      fromLng = $("#longitude1"),
      toLat = $("#latitude2"),
      toLng = $("#longitude2");

  var fromObj = new InputLoc(fromField, fromLat, fromLng);
  var toObj = new InputLoc(toField, toLat, toLng);
    
  initialize(fromObj, toObj);

  
});





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


