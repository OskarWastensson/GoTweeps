var directions;
var map;

$(document).ready(function(){
    
  initialize();

  var tripId = getUrlVars()["id"];
  // tripAPI/?/trips/ + tripId
  $.getJSON('frontend/test.json', function(trip){
    
    var trip = trip[0];
    
    var dest_lat = trip.destination_lat;
    var dest_lng = trip.destination_lng;
    
    var destination = new Marker(map, dest_lat, dest_lng, "Destination");
    destination.setIcon("images/destination.png")

    
    var destObj = { marker: destination };

    var passengers = trip.passengers;
    var driverData = passengers.shift();
    
    var driver = new Marker(map, driverData.lat, driverData.lng, "Driver");
    driver.setIcon("images/car2.png");
    var driverObj = { marker: driver };
    
    displayTravelInfo(trip);
    
    //global    
    passengerObjs = confirmedOrPending(passengers);
    
    setMarkers();

    directions = new Directions(map, destObj, driverObj, []);
    
    directions.refresh();
      
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

function initialize() {
  var myOptions = {
    center: new google.maps.LatLng(59.397, 18.644),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  
}

function setMarkers(){

  for (var i = 0; i < passengerObjs.length; i++) {
    
    var passenger = passengerObjs[i];
    var name = passenger["name"];
    var lat = passenger.lat;
    var lng = passenger.lng;
    var category = passenger.category
    if (category === "confirmed") {
      var content = passenger["name"] + "<div><a href='' class='remove_passenger'>Ta bort personen från din resa!<a/></div>";
      var imgURL = "images/markerGreen.png";
    }
    else {
      var content = passenger["name"] + "<div><a href='' class='add_passenger'>Lägg till personen till din resa!<a/></div>";
      var imgURL = 'images/markerRed.png';
    }
    var passengerMarker = new Marker(map, lat, lng, name);
    passengerMarker.setIcon(imgURL);
    passengerMarker.setInfoWindow(content);
       
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

function confirmedOrPending(passengers) {
  var passengerObjs = [];
  for (var i = 0; i < passengers.length; i++) {
    var confirmed_by_driver = passengers[i].confirmed_by_driver;
    var category = confirmed_by_driver === "1" ? "confirmed" : "pending";
    
    var passengerObj = {
      name: passengers[i].passenger_name,
      lat: passengers[i].lat,
      lng: passengers[i].lng,
      category: category
    };
    passengerObjs.push(passengerObj);
    
  }
  return passengerObjs;
}

function Marker(map, lat, lng, title) {
    
  var location = new google.maps.LatLng(lat, lng);

  var marker = new google.maps.Marker({
    map: map,
    position: location,
    title: title,
    
  });

  var infoWindow = new google.maps.InfoWindow({});
    
  this.setInfoWindow = function(content) {
    
    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.setContent(content);
      infoWindow.open(map, this);
    });

    google.maps.event.addListener(infoWindow, 'domready', function() {
      $(".add_passenger").click(function (evt) {
        evt.preventDefault();
        console.log(marker["icon"]);
        directions.setWpMarkers({ marker: marker });
        for (var i = 0; i < passengerObjs.length; i++) {
          if (passengerObjs[i]["name"] === title) {
            passengerObjs[i]["category"] = "confirmed";
          }
        }
                
        infoWindow.setContent(title + "<div><a href='' class='remove_passenger'>Ta bort personen från din resa!<a/></div>");
        directions.refresh();
      });

      $(".remove_passenger").click(function (evt) {
        evt.preventDefault();
        console.log(marker["icon"]);
        directions.removeWpMarker(title);
        for (var i = 0; i < passengerObjs.length; i++) {
          if (passengerObjs[i]["name"] === title) {
            passengerObjs[i]["category"] = "pending";
          }
        }
                
        infoWindow.setContent(title + "<div><a href='' class='add_passenger'>Lägg till personen till din resa!<a/></div>");
        directions.refresh();
      });
    });
  };
  
  this.setIcon = function(url) {
    marker.icon = url;
  };

  this.getPosition = function() {
    return marker.getPosition();
  };
}




