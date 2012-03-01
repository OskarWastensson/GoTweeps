$(document).ready(function(){
  
  initialize();
  
})

var map;

  function initialize() {
        var myOptions = {
          center: new google.maps.LatLng(59.397, 18.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        getJson(map)
  }

  function getJson(map){
    $.getJSON('test.json', function(data){
      
      var trip = data[1];

      $("#event").text(trip.tag);
      $("#arrival").text(trip.eta);
      $("#number").text(trip.number);
      $("#price").text(trip.kmCost);
      $("#message").text(trip.message);

      var passengers = trip.passengers;
      var pending = [];
      var confirmed = []; 
      
      for (var j = 0; j < passengers.length; j++) {
        var confirmed_by_driver = passengers[j].confirmed_by_driver;
        var confirmObj = {};
         var pendingObj = {};
        if (confirmed_by_driver == "1" ){
          confirmObj.user = passengers[j].users;
          confirmObj.lat = passengers[j].lat;
          confirmObj.lng = passengers[j].lng;
          confirmed.push(confirmObj);
          
        }else{
          pendingObj.user = passengers[j].users;
          pendingObj.lat = passengers[j].lat;
          pendingObj.lng = passengers[j].lng;
          pending.push(pendingObj);
        }
      }
      passengersInfo(confirmed, pending);

    });
  };

  function setMarkers(pos, content, imgUrl){

    // Infowindow object for popup descriptions
    var infowindow = new google.maps.InfoWindow({});

    var marker = new google.maps.Marker({
      map: map,
      position: pos,
      title: content,
      icon: imgUrl
    });

    console.log(content);

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(content);
      infowindow.open(map, this);
    });

  };


  function passengersInfo(passPositiv, passNegativ){

    for(var i = 0; i < passPositiv.length; i++){
      var passengerLatLng = new google.maps.LatLng(passPositiv[i].lat, passPositiv[i].lng);
      var userPos = passPositiv[i].user + "<a href=''>Ta bort den här personen på din resa!</a>";
      var imgUrl = '../images/markerBlue.png'
      setMarkers(passengerLatLng, userPos, imgUrl);
    }

    for(var i = 0; i < passNegativ.length; i++){
      var passengerLatLng = new google.maps.LatLng(passNegativ[i].lat, passNegativ[i].lng);
      var content = passNegativ[i].user + "<a href=''>Lägg till den här personen på din resa!</a>";
      var imgUrl = '../images/markerGreen.png'
      setMarkers(passengerLatLng, content, imgUrl);
    }

  }




