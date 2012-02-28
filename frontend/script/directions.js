
function Directions(mapObj, destObj, origObj, wayPObjs) {
	directionsDisplay = new google.maps.DirectionsRenderer({
		suppressMarkers: true
	});
  	directionsService = new google.maps.DirectionsService();
  	destMarker = destObj.marker;
  	origMarker = origObj.marker;
  	this.wpMarkers = [];
  	this.legs = [];
  	
  	directionsDisplay.setMap(mapObj);

	if(wayPObjs && wayPObjs.length) {
		$.each(wayPObjs, function(i, wayPObj) {
			this.wpMarkers.push(wayPObj.marker);
		});
	}
	
	this.addWayPoint = function(wayPObj) {
    	this.wpMarkers.push(wayPObj.marker);
    }
    
    this.refresh = function() {
	  	destination = destMarker.getPosition();
  		origin = origMarker.getPosition();
 		waypoints = [];
 		$.each(this.wpMarkers, function(i, marker) {
 			waypoints.push({location: marker.getPosition(), stopover: true});
 		}); 

	    var request = {
	        origin: origin ,
	        destination: destination,
	        waypoints: waypoints, 
	        travelMode: google.maps.DirectionsTravelMode.DRIVING,
	        optimizeWaypoints: true,
	    };


	    directionsService.route(request, function(response, status) {
	      if (status == google.maps.DirectionsStatus.OK) {
	      	directionsDisplay.setDirections(response);
	        directions.legs = updateLegs(response.routes[0]);
	      } else {
	        // bad request to directions!
	      }
	    });

	}
	
	updateLegs = function(response) {
		data = [];
		$.each(response.legs, function(i, leg) {
			var leg_data = {};
			leg_data.sequence = i;
			leg_data.leg_distance = leg.distance.value;
			leg_data.location_lng = leg.start_location.lng();
			leg_data.location_lat = leg.start_location.lat();
			data.push(leg_data);	
		});
		return data;
	}
}    
  





