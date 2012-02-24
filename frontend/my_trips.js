$(document).ready(function(){

	$.getJSON('test.json', function(data){

		
		var tripEvent 	= data[0].tag,
			tripDate 	= data[0].eta,
			legs		= data.legs,
			passengers 	= legs[legs.length-1].passengers,
			confirmed 	= [],
			unconfirmed = [];


			for(i = 0; i < passengers.length; i++ ){
				var confirms = passengers[i].confirmed_by_driver;

				if(confirms == 0){
					unconfirmed.push(confirms);
				}else{
					confirmed.push(confirms);
				}
			};

		
	
			

	});


});