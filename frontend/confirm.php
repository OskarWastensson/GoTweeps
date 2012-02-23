<?php
session_start();
require_once('twitterAPI/config.php');

// Check if token is old
if (empty($_SESSION['access_token']) || empty($_SESSION['access_token']['oauth_token']) || empty($_SESSION['access_token']['oauth_token_secret'])) {
    header('Location:logout.php');
}

$access_token = $_SESSION['access_token'];
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);

/* // Get information needed for GoTweeps to make a tweet
$app_consumerKey    = '5Pu9zSOeZ2KxyRsmbTzw';
$app_consumerSecret = 'yHA8w5Blj1DurPvPgdOygBH7pG8GTJUJwQhhpcRuCG0';
$app_oAuthToken     = '491288200-xKEcialrDMZKD2iAd2mjnNKhCpkIo2GnoVOvJ3DY';
$app_oAuthSecret    = 'cAfcR90ncg4ENFPTqc9LFqJXxgquiFl7PvWv7nBg'; */

$tweet = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, OAUTH_TOKEN, OAUTH_SECRET);

$trip_id = $_GET["id"];

// Get trip information form db
$query = "SELECT id, users, tag, km_cost, eta, message
		  FROM trips
		  WHERE id = '{$trip_id}'
		  LIMIT 1";
$result = mysql_query($query);
$trip = mysql_fetch_assoc($result);

if (!$trip['id']) {
	
}

$confirm = isset($_POST['confirm_trip']) ? $_POST['confirm_trip'] : '';
$message = '@' . $access_token['screen_name'] . ' just created a trip to somewhere. http://localhost/gotweeps/meep.php';

if ($confirm) {
	$tweet->post('statuses/update', array('status' => $message)); 
}

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Confirm your trip</title>
		<link type="text/css" rel="stylesheet" href="frontend/style.css" />
		<link type="text/css" rel="stylesheet" href="confirm.css" />
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js"></script>
	</head>
	<body>
		<div id="confirmWrap">
			<h1>Information om din åktur</h1>
			<p>Max antal passagerare: <?php echo $trip['users']; ?></p>
			<p>Kommentar: <?php echo $trip['message']; ?></p>
			<h2>Skicka detta meddelande till twitter</h2>
			<form action="confirm.php?id=<?php echo $trip['id'] ?>" method="post">
				<p><?php echo $message ?></p>
				<input type="submit" name="confirm_trip" id="confirm_trip" value="Confirm">
			</form>
		</div>
	</body>
</html>
