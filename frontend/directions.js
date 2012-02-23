
function Directions(mapObj, destObj, origObj, wayPObjs) {
	var directionsDisplay = new google.maps.DirectionsRenderer();
  	var directionsService = new google.maps.DirectionsService();
  	var destination = null;
  	var origin = null;
  	var wayPoints = [];
  	var legs = [];

    directionsDisplay.setMap(mapObj);

	destination = destObj;
	origin = origObj;   

	if(wayPObjs && wayPObjs.length()) {
		$.each(wayPObjs, function(i, wayPObj)) {
			wayPoints.push({location: wayPObj, stopover: true});
		});
	}
	
    this.addWayPoint = function(waypoint) {
    	this.waypoint.push({location: location, stopover: true});
    	this.execute();
    }
    
    this.execute = function() {
	   
	    var request = {
	        origin: this.origin ,
	        destination: this.destination,
	        waypoints: this.waypoints, 
	        travelMode: google.maps.DirectionsTravelMode.DRIVING,
	        optimizeWaypoints: true,
	    };

	    console.log(request);

	    console.log('DirectionsService:');
	    directionsService.route(request, function(response, status) {
	      console.log(status);
	      console.log(response);

	      if (status == google.maps.DirectionsStatus.OK) {
	      
	        directionsDisplay.setDirections(response);
	        this.legs = this.updateLegs(response.routes[0], response.cg.destination);
	        console.log(response);
	      } else {
	        // bad request to directions!
	        console.log(status);
	      }
	    });
	}
	
	this.updateLegs = function(response, destination) {
		data = [];
		$.each(response.legs, function(i, leg) {
			var leg_data = {};
			leg_data.sequence = i;
			leg_data.leg_distance = leg.distance.value;
			leg_data.location_lng = leg.start_location.Ra;
			leg_data.location_lat = leg.start_location.Qa;
			data.push(leg_data);	
		});
		return data;
	}
}    
  }





