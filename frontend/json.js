$(document).ready(function(){
	$.getJSON('test.json', function(data){

		var destData = data["0"];

		var form = $("#options");
		//data from JSON
		$("#event").text(destData.tag);
		$("#arrival").text(destData.eta);
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

		if(data.legs.length != 0){
						
			var infowindow = new google.maps.InfoWindow({
			    content: "holding"
			});

			for(var i = 0; i<data.legs.length; i++){
				
				var passenger = new google.maps.Marker({
					map: map,
					position: new google.maps.LatLng(data.legs[i].from_lat,data.legs[i].from_lng),
					title: data.legs[i]["name"]
				});

				google.maps.event.addListener(passenger, 'click', function () {
					infowindow.setContent(this["title"]);
					infowindow.open(map, this);
				});
			
			}
		}

	});
});
