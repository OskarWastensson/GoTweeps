<?php

Class Passengers extends Resource {
	function set_params() {
		$this->params = array(
			'table' => 'passengers',
			'view' => 'passengers_view',
			'view_fields' => 'id, users, trips, confirmed_by_driver, confirmed_by_passenger, lng, lat, word, user_to_destination, trip_id, passenger_name, driver_id, driver_name',				
			'put_fields' => 'id, users, trips, confirmed_by_driver, confirmed_by_passenger, lng, lat, word, user_to_destination',
			'post_fields' =>	'id, users, trips, confirmed_by_driver, confirmed_by_passenger, lng, lat, word, user_to_destination',
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

/*
SELECT 
  passengers.*,
  trips.tag, 
  trips.destination_lng, 
  trips.destination_lat, 
  trips.destination_word, 
  trips.eta, 
  trips.km_cost, 
  trips.message,  
  trips.confirmed, 
  trips.max_passengers, 
  trips.id as trip_id,
  users.name AS passenger_name,
  driver.id AS driver_id,
  driver.name AS driver_name
FROM passengers 
  JOIN users ON passengers.users = users.id
  JOIN trips ON passengers.trips = trips.id
  JOIN users AS driver ON trips.users = driver.id 
*/