// in site initialization



  
// in map initialization



// Skicka in:
//    locations objekt
//		- användar-id som nycklar
//      - alla medlemmars upphämtningsplatser som google.maps.LatLng object
    var directionsDisplay = new google.maps.DirectionsRenderer();

$( function() {
	var sthlm = new google.maps.LatLng(59.300,18.114);

	var options = {
		zoom: 12,
		center: sthlm,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	console.log('Map:');
 	var map = new google.maps.Map(document.getElementById("map_canvas"), options);

 	console.log('Latlng objects:');
	var dest = new google.maps.LatLng(59.4,17.98);
  	var origin = new google.maps.LatLng(59,18);
  	var locations = {
		'perra': new google.maps.LatLng(59.1,18.02),
		'gurra': new google.maps.LatLng(59,18.03)
	}

    directionsDisplay.setMap(map); // this row is new
    var data = directions(dest, origin, locations);

});



function directions(destination, origin, locations) {
  	var directionsService = new google.maps.DirectionsService();

    var waypoints = [];
    $.each(locations, function(i, location) {
    	waypoints.push({location: location, stopover: true});
    }); 

    var request = {
        origin: origin ,
        destination: destination,
        waypoints: waypoints, 
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        optimizeWaypoints: true,
    };
    console.log('DirectionsService:');
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var data = update_legs(response.routes[0], response.cg.destination);
        console.log(response);
      } else {
      	// bad request to directions!
      	console.log(status);
      }

    });
    return data;
  }


function update_legs(response, destination) {
	data = [];
	$.each(response.legs, function(i, leg) {
		var leg_data = {};
		leg_data.sequence = i;
		leg_data.leg_distance = leg.distance.value;
		leg_data.location_lng = leg.start_location.Ra;
		leg_data.location_lat = leg.start_location.Qa;
		data.push(leg_data);	
		distance(leg_data, destination, leg.start_location);
	});
	return data;

}

function distance(leg_data, destination, origin) {
	var directionsService = new google.maps.DirectionsService();

	var request = {
	    origin: origin ,
	    destination: destination,
	    travelMode: google.maps.DirectionsTravelMode.DRIVING,
	};

	directionsService.route(request, function(response, status) {
	  if (status == google.maps.DirectionsStatus.OK) {
	    	console.log(response.routes[0].legs[0].distance.value);

	    	leg_data = response.routes[0].legs[0].distance.value;
		} else {
	  		// bad request to directions!
	  		console.log(status);
	  }

	});
}
