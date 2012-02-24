<?php

Class Trips extends Resource {
	function set_params() {
		$this->params = array(
			'table' => 'trips',
			'view' => 'trips_view',
			'view_fields' => 'id, tag, destination_lng, destination_lat, eta, km_cost, message, users, owner, confirmed',
			'put_fields' => 'id, tag, destination_lng, destination_lat, eta, km_cost, message, users, confirmed',
			'post_fields' =>	'tag, destination_lng, destination_lat, eta, km_cost, message, users, confirmed' ,
			'child_resources' => 'legs'
		);
	}

	function post($data) {
		if(!isset($data['users'])) {
			$data['users'] = "1"; // logged in user
		}

		return parent::post($data);
	}

	function put($id, $data) {
		if(!isset($data['users'])) {
			$data['users'] = "1"; // logged in user
		}

		return parent::put($id, $data);	
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
	users.name AS owner,
	trips.confirmed AS confirmed
FROM trips 
	JOIN users ON users.id = trips.users 

*/