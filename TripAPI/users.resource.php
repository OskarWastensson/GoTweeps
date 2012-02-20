<?php

Class Users extends Resource {
	function set_params() {
		$this->params = array(
			'table' => 'users',
			'view' => 'users',
			'view_fields' => 'id, twitterid, name',
			'put_fields' => 'id, twitterid, name',
			'post_fields' =>	'twitterid, name',
			'child_resources' => 'trips'
		);
	}
}