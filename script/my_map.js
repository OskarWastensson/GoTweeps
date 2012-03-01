$(document).ready(function(){
    
  initialize();

  var tripId = getUrlVars()["id"];
  //'../tripAPI/?/trips/' + tripId
  $.getJSON('tripAPI/?/trips/' + tripId, function(trip){
    
    var trip = trip[0];

      var location = new google.maps.LatLng(trip.destination_lat, trip.destination_lng);

      var destination = new google.maps.Marker({
        map: map,
        position: location,
        title: "destination",
        icon: "images/destination.png"
      });

      destObj = { marker: destination };

      displayTravelInfo(trip);

      var confirmed_and_pending = confirmedAndPending(trip);
      confirmed = confirmed_and_pending.confirmed;
      pending = confirmed_and_pending.pending;
      
      passengersInfo();

      directions = new Directions(map, destObj, driverObj, wayPoints);
      directions.refresh()
    });

  var close = $("span#close");
  
  close.click(function() {
  
    $("div.menu").animate({width: 'toggle'}, function(){
      close.toggleClass("clicked")
      if(close.text() === "X"){
        close.text('<')
      }else{
        close.text('X')
      }
    });
  });
  
});

var directions;
var map;
var confirmed = [];
var pending = [];
var wayPoints = [];
var driverObj = {};


function initialize() {
  var myOptions = {
    center: new google.maps.LatLng(59.397, 18.644),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  
}


function passengersInfo(){
   
  for(var i = 0; i < confirmed.length; i++){
    var user = confirmed[i].user;
    var location = new google.maps.LatLng(confirmed[i].lat, confirmed[i].lng);
    var content = confirmed[i].user + "<div><a href='' class='remove_passenger'>Ta bort personen från din resa!<a/></div>";
    var imgUrl = 'images/markerGreen.png'
    setMarkers(user, location, content, imgUrl, "confirmed");
  }

  for(var i = 0; i < pending.length; i++){
    var user = pending[i].user;
    var location = new google.maps.LatLng(pending[i].lat, pending[i].lng);
    var content = pending[i].user + "<div><a href='' class='add_passenger'>Lägg till personen till din resa!<a/></div>";
    var imgUrl = 'images/markerRed.png'
    setMarkers(user, location, content, imgUrl, "pending");
  }

  function setMarkers(user, pos, content, imgUrl, cat){
    
    // Infowindow object for popup descriptions
    var infowindow = new google.maps.InfoWindow({});

    var marker = new google.maps.Marker({
      map: map,
      position: pos,
      title: user,
      icon: imgUrl
    });

    if (cat === "confirmed")
      wayPoints.push({marker: marker});

    console.log(wayPoints);

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(content);
      infowindow.open(map, this);
    });

    google.maps.event.addListener(infowindow, 'domready', function() {
      $(".add_passenger").click(function(evt){
        evt.preventDefault();
        for (var i = 0; i < pending.length; i++) {
          var passenger = pending[i];
          if (passenger.user === user) {
            confirmed.push(pending[i]);
            pending.splice(i, 1);
            passengersInfo();
          }
        }
        directions.refresh()
        
      });

      $(".remove_passenger").bind("click", function(evt) {
        evt.preventDefault();
        for (var i = 0; i < confirmed.length; i++) {
          var passenger = confirmed[i];
          if (passenger.user === user) {
            pending.push(confirmed[i]);
            confirmed.splice(i, 1);
            passengersInfo();
          }
        }
        directions.refresh()
     });
    });

  }

}

function getUrlVars() {
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

function displayTravelInfo(trip) {
  $("#event").text(trip.tag);
  $("#arrival").text(trip.eta);
  $("#number").text(trip.number);
  $("#price").text(trip.kmCost);
  $("#message").text(trip.message);
}

function confirmedAndPending(trip) {
  //skapar passagerarobjekt och delar upp dom i två arrayer: confirmed och pending.
  var passengers = trip.passengers;
  driverInfo = passengers.shift();
  var location = new google.maps.LatLng(driverInfo.lat, driverInfo.lng);
  var driver = new google.maps.Marker({
      map: map,
      position: location,
      title: "Driver",
      icon: "images/car2.png"
  });

  driverObj = {marker:driver};

  for (var j = 0; j < passengers.length; j++) {
    
    var confirmed_by_driver = passengers[j].confirmed_by_driver;
    var confirmObj = {};
    var pendingObj = {};
    if (confirmed_by_driver == "1" ){
      confirmObj.user = passengers[j]["passenger_name"];
      confirmObj.lat = passengers[j].lat;
      confirmObj.lng = passengers[j].lng;
      confirmed.push(confirmObj);
      
    }else{
      pendingObj.user = passengers[j]["passenger_name"];
      pendingObj.lat = passengers[j].lat;
      pendingObj.lng = passengers[j].lng;
      pending.push(pendingObj);
    }
  }
  return { confirmed: confirmed, pending: pending };
}



