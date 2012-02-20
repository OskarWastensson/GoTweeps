<?php

Class Trips extends Resource {
	function set_params() {
		$this->params = array(
			'table' => 'trips',
			'view' => 'trips_view',
			'view_fields' => 'id, tag, destination_lng, destination_lat, eta, km_cost, message, users, owner',
			'put_fields' => 'id, tag, destination_lng, destination_lat, eta, km_cost, message, users',
			'post_fields' =>	'tag, destination_lng, destination_lat, eta, km_cost, message, users' ,
			'child_resources' => 'legs'
		);
	}
}

/* trips_view:

SELECT 
	trips.id AS id, 
	trips.tag AS tag, 
	trips.destination_lng AS destination_lng, 
	trips.destination_lat AS destination_lat, 
	trips.eta AS eta, 
	trips.km_cost AS km_cost, 
	trips.message AS message, 
	trips.users AS users, 
	users.name AS owner 
FROM trips 
	JOIN users ON users.id = trips.users 

*/