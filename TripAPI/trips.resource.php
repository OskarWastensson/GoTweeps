<?php

Class Trips extends Resource {
	function set_params() {
		$this->params = array(
			'table' => 'trips',
			'view' => 'trips_view',
			'view_fields' => 'id, tag, destination_lng, destination_lat, destination_word, eta, km_cost, message, users, owner, confirmed, max_passengers',
			'put_fields' => 'id, tag, destination_lng, destination_lat, destination_word, eta, km_cost, message, users, confirmed, max_passengers',
			'post_fields' =>	'tag, destination_lng, destination_lat, destination_word, eta, km_cost, message, users, confirmed, max_passengers',
			'child_resources' => 'passengers'
		);
	}

	function post($data) {
		if(!isset($data['users'])) {
			$data['users'] = $_SESSION['access_token']['user_id']; // logged in user
		}

		return parent::post($data);
	}

	function put($id, $data) {
		if(!isset($data['users'])) {
			$data['users'] = $_SESSION['access_token']['user_id']; // logged in user
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
	trips.destination_word AS destination_word,
	trips.eta AS eta, 
	trips.km_cost AS km_cost, 
	trips.message AS message, 
	trips.max_passengers AS max_passengers,
	trips.users AS users, 
	users.name AS owner,
	trips.confirmed AS confirmed
FROM trips 
	JOIN users ON users.id = trips.users 

*/