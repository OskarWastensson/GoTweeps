<?php
session_start();
require_once('twitterAPI/config.php');


// Check if token is old
if (isset($_REQUEST['oauth_token']) && $_SESSION['oauth_token'] !== $_REQUEST['oauth_token']) {
	$_SESSION['oauth_status'] = 'oldtoken';
	header('Location: logout.php');
}

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
$_SESSION['access_token'] = $connection->getAccessToken($_REQUEST['oauth_verifier']);
$access_token = $_SESSION['access_token'];

unset($_SESSION['oauth_token']);
unset($_SESSION['oauth_token_secret']);

// If HTTP response is 200 continue otherwise redirect to indexpage
if ($connection->http_code == 200) {
	$_SESSION['status'] = 'verified';

	// Check if user already registered and if not insert to db
	$query = "SELECT twitterid
			  FROM users 
			  WHERE twitterid = '{$access_token['user_id']}'
			  LIMIT 1";
	$result = mysql_query($query);
	if(mysql_num_rows($result) == 0) {
		$query = "INSERT INTO users (name, id)
			  VALUES ('{$access_token['screen_name']}', '{$access_token['user_id']}')";
		mysql_query($query);
	}
	header('Location: gotweeps.php');
} else {
	header('Location: logout.php');
}
?>