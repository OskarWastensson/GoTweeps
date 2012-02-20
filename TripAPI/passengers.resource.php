<?php

Class Passengers extends Resource {
	function set_params() {
		$this->params = array(
			'table' => 'passengers',
			'view' => 'passengers',
			'view_fields' => 'users, legs',
			'put_fields' => 'id, users, legs',
			'post_fields' =>	'users, legs',
		);
	}
}