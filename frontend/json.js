var directions = {};

$(document).ready(function(){
	console.log("getURL");
	url_vars = getUrlVars();
	id = url_vars['trip'];
	console.log("getJSON");

	$.getJSON('http://localhost/gotweeps/TripAPI/?/trips/' + id, function(data){

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

		//Marker of event
		destination = {};
		destination.marker = new google.maps.Marker({
		   	map: map,
		   	position: new google.maps.LatLng(destinationLat,destinationLng),
		});

		var infowindow = new google.maps.InfoWindow({
		    content: "holding"
		});

		var waypoints = [];
		$.each(trip.legs, function(i, leg) {
			point = {};
			point.marker = new google.maps.Marker({
				map: map,
				position: new google.maps.LatLng(leg.from_lat, leg.from_lng),
				title: leg.name
			});

			google.maps.event.addListener(point.marker, 'click', function () {
				infowindow.setContent(this["title"]);
				infowindow.open(map, this);
			});

			waypoints.push(point);			
		});
		
			
		// Directions object
		origin = waypoints.shift();
		directions = new Directions(map, destination, origin, waypoints);
		


		directions.refresh();

		/*
		if(trip.legs.length != 0){
						
			var infowindow = new google.maps.InfoWindow({
			    content: "holding"
			});

			var passengers = [];
			for(var i = 0; i<destData.legs.length; i++){
				
				passengers[i]  =  new google.maps.Marker({
					map: map,
					position: new google.maps.LatLng(destData.legs[i].from_lat,destData.legs[i].from_lng),
					title: destData.legs[i]["name"]
				});

				google.maps.event.addListener(passengers[i], 'click', function () {
					infowindow.setContent(this["title"]);
					infowindow.open(map, this);
				});
			
			}
		}*/
		

	});
});

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