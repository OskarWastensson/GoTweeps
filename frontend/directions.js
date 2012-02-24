
function Directions(mapObj, destObj, origObj, wayPObjs) {
	directionsDisplay = new google.maps.DirectionsRenderer();
  	directionsService = new google.maps.DirectionsService();
  	destMarker = destObj.marker;
  	origMarker = origObj.marker;
  	this.waypoints = [];
  	this.legs = [];
  	
    directionsDisplay.setMap(mapObj);

	if(wayPObjs && wayPObjs.length) {
		$.each(wayPObjs, function(i, wayPObj) {
			this.wayPoints.push({location: wayPObj, stopover: true});
		});
	}
	
	this.addWayPoint = function(waypoint) {
    	this.waypoint.push({location: location, stopover: true});
    	this.refresh();
    }
    
    this.refresh = function() {
	  	destination = destMarker.getPosition();
  		origin = origMarker.getPosition();
 
		/*
		   		if(!this.destination || !this.origin) {
			console.log("No directions");
			console.log(this);
     		return false;
   		}*/

	    var request = {
	        origin: origin ,
	        destination: destination,
	        waypoints: this.waypoints, 
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
			console.log(leg.start_location);
			leg_data.location_lng = leg.start_location.lng();
			leg_data.location_lat = leg.start_location.lat();
			data.push(leg_data);	
		});
		return data;
	}
}    
  





