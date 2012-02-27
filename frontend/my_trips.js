$(document).ready(function(){

	$.getJSON('test.json', function(data){
				
		for (var i = 0; i < data.length; i++) {
						
			var passengers = data[i].passengers;
			var pending = 0;
			var confirmed = 0; 
			for (var j = 0; j < passengers.length; j++) {
				var confirmed_by_driver = passengers[j].confirmed_by_driver;
				confirmed_by_driver == "1" ? confirmed++ : pending++;
			}

			var tableData = {};
			tableData.destination = data[i].tag;
			tableData.eta = data[i].eta;
			tableData.confirmed = confirmed;
			tableData.pending = pending;
			
			var tr = createTableRow(tableData);  
			$("#driverTable").append(tr);
				
		}
	});

	function createTableRow(tableData) {
		var $tableRow = $("<tr/>");
		$.each(tableData, function(key, value) {
			$("<td/>").html(value)
					  .appendTo($tableRow);
		});
		return $tableRow;
	}

});