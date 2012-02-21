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
}