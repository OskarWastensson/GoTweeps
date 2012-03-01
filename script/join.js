//Useful links:
// http://code.google.com/apis/maps/documentation/javascript/reference.html#Marker
// http://code.google.com/apis/maps/documentation/javascript/services.html#Geocoding
// http://jqueryui.com/demos/autocomplete/#remote-with-cache


var geocoder;
var map;
var marker;
var initialLocation;
var browserSupportFlag = new Boolean();

//GEOCODER
  geocoder = new google.maps.Geocoder();
  marker = new google.maps.Marker({
    map: map,
    position: initialLocation,
    draggable: true
  });   

$(document).ready(function() { 
  //  Fetch get variable id
  url_vars = getUrlVars();
  trip_id = url_vars['trip'];

  initialize();
  
  // Form posting event
  $('#options').submit(function(event) {

    event.preventDefault();

    // validate fields here!
    send = {
        "lng": $('#longitude').val(),
        "lat": $('#latitude').val(),
        "user_to_destination": directions.newUserToDestination()
      }  // id of logged in user i set automically if users is missing

    $.post('http://localhost/git/gotweeps/tripAPI/?/trips/' + trip_id + '/passengers/', send, function(data) {
      window.location.href = "confirm_passenger.php?trip=" + trip_id;
    }, 'json'); 
  });
});

      
function initialize(){
  

  // Make JSON request for trip data
  $.getJSON('http://localhost/git/gotweeps/TripAPI/?/trips/' + trip_id, function(data){

    var trip = data["0"];

    var form = $("#options");
    //data from JSON
    $("#event").text(trip.tag);
    $("#arrival").text(trip.eta);
    $("#price").text(trip.km_cost);
    $("#message").text(trip.message);
    
    //destination location
    var destinationLat = trip.destination_lat;
    var destinationLng = trip.destination_lng;

    //MAP
    var options = {
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
        
    map = new google.maps.Map(document.getElementById("map_canvas"), options);
  
    // Infowindow object for popup descriptions
    var infowindow = new google.maps.InfoWindow({
        content: "holding"
    });

    //Marker of event
    destination = {};
    destination.marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(destinationLat,destinationLng),
        title: trip.tag
    });

    google.maps.event.addListener(destination.marker, 'click', function () {
      infowindow.setContent(this.title);
      infowindow.open(map, this);
    });

    var waypoints = [];
    $.each(trip.passengers, function(i, passenger) {
  
      point = {};
      point.marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(passenger.lat, passenger.lng),
        title: passenger.name
      });
      point.passenger = passenger;

      google.maps.event.addListener(point.marker, 'click', function () {
        infowindow.setContent(this.title);
        infowindow.open(map, this);
      });

      waypoints.push(point);
    });      
   
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
    } else if (google.gears){
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
    } else {
      browserSupportFlag = false;
      handleNoGeolocation(browserSupportFlag);
    }
    
    // Directions object
    origin = waypoints.shift();
    directions = new Directions(map, destination, origin, waypoints);
    directions.setTrip(trip);

    var newPassenger = new InputLoc($('#address'), $('#latitude'), $('#longitude'));  
    directions.addWayPoint(newPassenger);

    directions.afterRefresh = function() {
      $('#calculation').text(directions.newCost());
    }

    directions.refresh();

  });  
   
  function handleNoGeolocation(errorFlag){
   var sthlm = new google.maps.LatLng(59.300,18.114);
 
    if(errorFlag == true){
      console.log("Geolocation fungerar inte!");
    }else{
      console.log("Din webbläsare stödjer inte geolocation...");
    }
  }
}
    
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

