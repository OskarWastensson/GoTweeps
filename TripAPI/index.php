<?php

// constants
const REQUEST_ERROR = 1;
const DB_ERROR = 2;
const EMPTY_SET = 3;

// mysql connection
if(!mysql_connect("localhost", "trip_api", "ZuNWeuYTMe2ZNDdL")) {
	echo json_encode(error(DB_ERROR));
	die();	
}
mysql_select_db("trip_api");


// API 
require_once('api.class.php');
$api = new TripAPI();
echo json_encode($api->data);


// Just an error handling function
function error($no, $return_data = array()) {
    switch($no) {
      case EMPTY_SET: 
          return $return_data + array("error" => "EMPTY_SET");
      case REQUEST_ERROR: 
          header("HTTP/1.0 404 Not Found");
          return $return_data + array("error" => "REQUEST_ERROR");
      case DB_ERROR:
          header("HTTP/1.0 500 Internal server error");
          return $return_data + array("error" => "DB_ERROR");
      default:
          header("HTTP/1.0 500 Internal server error");
          return $return_data + array("error" => "Unknown error");
 	}
 }