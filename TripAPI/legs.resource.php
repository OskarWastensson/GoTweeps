<?php

Class Legs extends Resource {
	function set_params() {
		$this->params = array(
			'table' => 'legs',
			'view' => 'legs_view',
			'view_fields' => 'trips, id, sequence, from_lng, from_lat, to_lng, to_lat, leg_distance, user_to_destination, share_fee, pick_up_fee',
			'put_fields' => 'id, from_lng, from_lat, leg_distance, user_to_destination',
			'post_fields' => 'sequence, from_lng, from_lat, leg_distance, user_to_destination',
			'child_resources' => 'passengers' 
		);
	}
}

/* legs_view: 

"	SELECT 
		this_legs.*, 
		IF(ISNULL(next_legs.from_lng), trips.destination_lng, next_legs.from_lng) AS to_lng,
		IF(ISNULL(next_legs.from_lat), trips.destination_lat, next_legs.from_lat) AS to_lat,
		next_legs.user_to_destination AS distance_after_leg,
		this_legs.user_to_destination AS distance_before_leg,
		COUNT(DISTINCT passengers_users.id) AS number_of_members,
		trips.km_cost * 0.001 * IF(ISNULL(next_legs.user_to_destination), this_legs.user_to_destination, this_legs.user_to_destination -next_legs.user_to_destination) / COUNT(DISTINCT passengers_users.id) AS share_fee,
		trips.km_cost * 0.001 * (this_legs.leg_distance - IF(ISNULL(next_legs.user_to_destination), this_legs.user_to_destination, this_legs.user_to_destination - next_legs.user_to_destination)) AS pick_up_fee
	FROM 
		legs AS this_legs 
			LEFT JOIN legs AS next_legs
				ON next_legs.sequence - 1 = this_legs.sequence
			JOIN passengers 
				ON this_legs.id = passengers.legs
			JOIN users AS passengers_users
				ON passengers_users.id = passengers.users
			JOIN trips AS trips
				ON trips.id = this_legs.trips
	GROUP BY this_legs.id
	ORDER BY sequence ASC

	"*/