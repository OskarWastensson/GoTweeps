<?php
session_start();
require_once('../twitterAPI/config.php');

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
$request_token = $connection->getRequestToken('http://localhost/gotweeps/callback.php');
$_SESSION['oauth_token'] = $request_token['oauth_token'];
$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];

if ($connection->http_code == 200) {
	$url = $connection->getAuthorizeURL($_SESSION['oauth_token']);
	header('Location: ' . $url); 
} else {
	echo 'Could not connect to Twitter.';
}


?>
