<?php

Class Passengers extends Resource {
	function set_params() {
		$this->params = array(
			'table' => 'passengers',
			'view' => 'passengers_view',
			'view_fields' => 'id, users, trips, confirmed_by_driver, confirmed_by_passenger, lng, lat, word, user_to_destination, user_id, name',				
			'put_fields' => 'id, users, trips, confirmed_by_driver, confirmed_by_passenger, lng, lat, word, user_to_destination',
			'post_fields' =>	'id, users, trips, confirmed_by_driver, confirmed_by_passenger, lng, lat, word, user_to_destination'
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
SELECT passengers.*, users.id AS user_id, users.name AS name FROM passengers JOIN users ON passengers.users = users.id
*/