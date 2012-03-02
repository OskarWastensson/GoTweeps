function Directions(mapObj, destObj, origObj, wayPObjs) {
	directionsDisplay = new google.maps.DirectionsRenderer({
		suppressMarkers: true
	});
  	directionsService = new google.maps.DirectionsService();
  	destMarker = destObj.marker;
  	origMarker = origObj.marker;
  	wpMarkers = [];
  	trip = null;
	dynamicUsrIndex = null;
  	dynamicWpIndex = null;
  	  	
  	this.legs = [];
  	this.users = [];

  	directionsDisplay.setMap(mapObj);

	/*if(wayPObjs && wayPObjs.length) {
		$.each(wayPObjs, function(i, wayPObj) {
			wpMarkers.push(wayPObj);
		});
	}*/
	wpMarkers = wayPObjs;

	console.log(wpMarkers);
	
	this.addWayPoint = function(wayPObj, passenger) {
    	wpMarkers.push(wayPObj);
    	dynamicWpIndex = wpMarkers.length - 1;

    	trip.passengers.push( {users: 'me'})
    	dynamicUsrIndex = trip.passengers.length - 1;
    }

    //test
    this.setWpMarkers = function(wayPObj) {
    	wpMarkers.push(wayPObj);
    }

    this.removeWpMarker = function(name) {
    	console.log(wpMarkers[0]["marker"]["title"]);
    	//var name = wayPObj["marker"]["title"];
    	for (var i = 0; i < wpMarkers.length; i++) {
    		wpMarker = wpMarkers[i];
          	if (wpMarker["marker"]["title"] === name) {
            	wpMarkers.splice(i, 1);
            	
    		}
    	}
    }

    this.setTrip = function(tripdata) {
    	trip = tripdata;
    }
    
    this.refresh = function() {
    	console.log(wpMarkers);
    	calculateStep1();
    }

    this.newUserToDestination = function() {
    	return trip.passengers[dynamicUsrIndex].user_to_destination;
    }

    this.newCost = function() {
    	return trip.passengers[dynamicUsrIndex].cost;
    }

    this.getLeg = function() {
    	return legs[0];
    }

    calculateStep1 = function() {
	  	if(null != dynamicWpIndex) {
	  		// special request for the user_to_destination value of the dynamic waypoint
	  		origin = wpMarkers[dynamicWpIndex].marker.getPosition();
		  	destination = destMarker.getPosition();
	  		
	  		var request = {
	  			origin: origin,
	  			destination: destination,
	  			travelMode: google.maps.DirectionsTravelMode.DRIVING
	  		}
	  		
	  		directionsService.route(request, function(response, status) {
	  			if (status == google.maps.DirectionsStatus.OK) {
					trip.passengers[dynamicUsrIndex].user_to_destination = response.routes[0].legs[0].distance.value;			      			
					calculateStep2();
	      		} else {
	        		// bad request to directions!
	        		console.log('bad request in step 1');
	      		}		
	  		});	
	  	} else {
	  		calculateStep2();
	  	}
	}

	calculateStep2 = function() {
	  	destination = destMarker.getPosition();
  		origin = origMarker.getPosition();
 		waypoints = [];
 		$.each(wpMarkers, function(i, obj) {
 			waypoints.push({location: obj.marker.getPosition(), stopover: true});
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
	        calculateStep3(response.routes[0]);
	      } else {
	        // bad request to directions!
	      }
	    });
	}
	
	calculateStep3 = function(response) {
		legs = [];

		$.each(response.legs, function(i, leg) {
			var leg_data = {};
			leg_data.sequence = i;
			leg_data.leg_distance = leg.distance.value;
			leg_data.location_lng = leg.start_location.lng();
			leg_data.location_lat = leg.start_location.lat();
			legs.push(leg_data);
		});

		if(trip) {
			legs[0].pick_up_passenger = trip.passengers[0];
			$.each(response.waypoint_order, function(i, index) {
				legs[i+1].pick_up_passenger = trip.passengers[index+1];
				// or legs[i].pick_up_passenger = trip.passengers[index]; ?		
			});

			car = [];
			pick_up_fee = 0;	
			$.each(legs, function(i, leg) {
				leg.pick_up_passenger.cost = pick_up_fee;
				car.push(leg.pick_up_passenger);
				leg.distance_before_leg = leg.pick_up_passenger.user_to_destination;
				if(i == legs.length -1) {
					leg.distance_after_leg = 0;
				} else {
					leg.distance_after_leg = legs[i+1].pick_up_passenger.user_to_destination;
				}

				leg.useful_m = leg.distance_before_leg - leg.distance_after_leg; 
				leg.wasted_m = leg.leg_distance - leg.useful_m;

				leg.share_fee = leg.useful_m * trip.km_cost * 0.001 / car.length;
				pick_up_fee = leg.pick_up_fee = leg.wasted_m * trip.km_cost * 0.001;

				$.each(car, function(i, passenger) {
					passenger.cost += leg.share_fee;
				});
			});

			$.each(car, function(i, passenger) {
				passenger.cost = Math.round(passenger.cost/10)*10; 
			});

			this.legs = legs;
		}

		directions.afterRefresh();
	}

	this.afterRefresh = function() {
		
	}
}    

