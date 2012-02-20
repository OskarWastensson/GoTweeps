//Useful links:
// http://code.google.com/apis/maps/documentation/javascript/reference.html#Marker
// http://code.google.com/apis/maps/documentation/javascript/services.html#Geocoding
// http://jqueryui.com/demos/autocomplete/#remote-with-cache


var geocoder;
var map;
var departure;
var destination;
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
      console.log("BRAA1");
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
  departure = new google.maps.Marker({
    map: map,
    position: initialLocation,
    draggable: true
  });

  destination = new google.maps.Marker({
    map: map,
    draggable: true
  });
          console.log(destination);

        
}
    
$(document).ready(function() { 
         
  initialize();
          
  $(function() {
    $(".address").autocomplete({
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
        var depLocation = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
        departure.setPosition(depLocation);
        map.setCenter(depLocation);
      },
      select: function(event, ui) {
        $("#latitude2").val(ui.item.latitude);
        $("#longitude2").val(ui.item.longitude);
        var destLocation = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
        destination.setPosition(destLocation);
        map.setCenter(destLocation);
      }
    });
  });
  
  //Add listener to marker for reverse geocoding
  google.maps.event.addListener(departure, 'drag', function() {
    geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          $('.address').val(results[0].formatted_address);
          $('#latitude').val(marker.getPosition().lat());
          $('#longitude').val(marker.getPosition().lng());
        }
      }
    });
  });
  
});