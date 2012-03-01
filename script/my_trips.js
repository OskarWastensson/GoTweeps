$(document).ready(function(){
	
	$.getJSON('../tripAPI/?/users/me/trips', function(data){
				
		for (var i = 0; i < data.length; i++) {
						
			var tripId = data[i]["id"];
			var passengers = data[i].passengers;
			var pending = 0;
			var confirmed = 0; 
			for (var j = 0; j < passengers.length; j++) {
				var confirmed_by_driver = passengers[j].confirmed_by_driver;
				confirmed_by_driver == "1" ? confirmed++ : pending++;
			}

			var tableData = {};
			tableData.driverImg = $("<img src='../images/carMini.png'>")
			tableData.destination = data[i].tag;
			tableData.eta = data[i].eta;
			tableData.confirmed = confirmed;
			tableData.pending = pending;
			tableData.tripId = tripId;
			
			var tr = createTableRow(tableData);  
			$("#driverTable").append(tr);
				
		}
	});

	function createTableRow(tableData) {
		var $tableRow = $("<tr/>").addClass('tr');
		$.each(tableData, function(key, value) {
			if(key !== "tripId"){
			$("<td/>").html(value)
					  .appendTo($tableRow);
			}
		});
		$tableRow.click(function(){

			window.location.href = ("my_map.php?id=" + tableData.tripId);
			
		})
		return $tableRow;
	}

});