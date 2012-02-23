//Useful links:
// http://code.google.com/apis/maps/documentation/javascript/reference.html#Marker
// http://code.google.com/apis/maps/documentation/javascript/services.html#Geocoding
// http://jqueryui.com/demos/autocomplete/#remote-with-cache


var geocoder;
var map;
var marker;
var initialLocation;
var browserSupportFlag = new Boolean();
    
function initialize(fromObj){

//MAP
  var sthlm = new google.maps.LatLng(59.300,18.114);

  var options = {
    zoom: 12,
    center: sthlm,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
        
  map = new google.maps.Map(document.getElementById("map_canvas"), options);
  directions = new Directions(map, fromObj, toObj, []);

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
  var directionsObj = new Directions();
    
  initialize(fromObj);

});

// Form posting event
$('.options').submit(function(event) {
  leg = directions.legs[0];
  event.preventDefault();
  // validate fields here!
  send = {
    "tag": $('#tag').value,
    "destination_lng": $('#longitude2').value,
    "destination_lat": $('#latitude2').value,
    "eta": $('#arrival').value,
    "km_cost": $('#price').value,
    "message": $('#message').value,
    "legs":[
        { "sequence": legs.sequence, 
          "from_lng": $('#longitude1').value,
          "from_lat": $('#latitude1').value,
          "leg_distance": leg.leg_distance,  
          "user_to_destination": leg.leg_distance, 
          "passengers":[ {} ] // id of logged in user i set automically if users is missing
      }]
  };
    
  console.log("Form submits:");
  console.log(send);  

    /*
    $.post('index.php?/trips', send, function(data) {
      // lock form
      // send tweet
      // display status messgae  
    }, 'json'); */ 
});



function InputLoc(inputField, latField, lngField){
   
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(59.3425027, 18.0288077),
      map: map,
      draggable: true
    });
 
   
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
          }
        }
      });
    });
};