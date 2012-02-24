<?php
session_start();

// constants
const REQUEST_ERROR = 1;
const DB_ERROR = 2;
const EMPTY_SET = 3;
const ACCESS_RESTRICTED = 4;

// mysql connection
if(!mysql_connect("localhost", "trip_api", "ZuNWeuYTMe2ZNDdL")) {
  echo json_encode(error(DB_ERROR));
  die();  
}
mysql_select_db("trip_api");
/*
require_once('twitterAPI/config.php');

// Check if token is old
if (empty($_SESSION['access_token']) || empty($_SESSION['access_token']['oauth_token']) || empty($_SESSION['access_token']['oauth_token_secret'])) {
    echo json_encode(error(ACCESS_RESTRICTED));
}

$access_token = $_SESSION['access_token'];
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);
*/
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
      case ACCESS_RESTRICTED:
          header("HTTP/1.0 401 Unauthorized");
          return $return_data + array("error" => "ACCESS_RESTRICTED");
      default:
          header("HTTP/1.0 500 Internal server error");
          return $return_data + array("error" => "Unknown error");
 	}
 }