<?php

Class Passengers extends Resource {
	function set_params() {
		$this->params = array(
			'table' => 'passengers',
			'view' => 'passengers',
			'view_fields' => 'id, users, legs, confirmed_by_driver, confirmed_by_passenger',
			'put_fields' => 'id, users, legs, confirmed_by_driver, confirmed_by_passenger',
			'post_fields' =>	'users, legs, confirmed_by_driver, confirmed_by_passenger',
		);
	}

	function post($data) {
		if(!isset($data['users'])) {
			$data['users'] = 1; // logged in user
		}

		return parent::post($data);
	}

	function put($id, $data) {
		if(!isset($data['users'])) {
			$data['users'] = 1; // logged in user
		}

		return parent::put($id, $data);	
	}
}