$(document).ready(function(){
	$.getJSON('test.json', function(data){

		var destData = data["0"];

		var form = $("#options");
		//data from JSON
		$("#event").text(destData.tag);
		$("#arrival").text(destData.eta);
		$("#number").text(destData.number);
		$("#price").text(destData.kmCost);
		$("#message").text(destData.message);
		

		//destination location
		var destinationLat = destData.destination_lat;
		var destinationLng = destData.destination_lng;

		//Marker of event
		var eventPos = new google.maps.LatLng(destinationLat,destinationLng)
		destination = new google.maps.Marker({
		   	map: map,
		   	position: eventPos,
		});

		
		var driver = data.legs["0"];
		driver.from_lat

		new google.maps.Marker({
			map: map,
			position: new google.maps.LatLng(driver.from_lat, driver.from_lng)
		});


			data.legs.shift();

		if(!data.legs.length == 0){
			var passengerA = [];

			for(var i = 0; i<data.legs.length; i++){
				
				var passenger = new google.maps.Marker({
					map: map,
					position: new google.maps.LatLng(data.legs[i].from_lat,data.legs[i].from_lng),
					title: data.legs[i]["name"]
				});
				passengerA.push(passenger);
				

			}

			
				for (var i = 0; i < passengerA.length(); i++) {

					var infowindow = new google.maps.InfoWindow({
					    content: passengerA[i].testt
					});

					var marker = passengerA[i];
					google.maps.event.addListener(marker, 'click', function () {
						// where I have added .html to the marker object.
						console.log(infowindow);
						infowindow.open(map, this);
					});
				}
		}


	});
});