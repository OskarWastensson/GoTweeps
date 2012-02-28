<?php
session_start();
require_once('twitterAPI/config.php');

// Check if token is old
/* if (empty($_SESSION['access_token']) || empty($_SESSION['access_token']['oauth_token']) || empty($_SESSION['access_token']['oauth_token_secret'])) {
    header('Location:logout.php');
} */

// User OAuth
$access_token = $_SESSION['access_token'];
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);
// GoTweeps OAuth
$tweet = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, OAUTH_TOKEN, OAUTH_SECRET);

$trip_id = $_GET["trip"];

// Get trip information form db
$query = "SELECT id, users, tag, km_cost, eta, message
		  FROM trips
		  WHERE id = '{$trip_id}' AND confirmed = 0
		  LIMIT 1";
$result = mysql_query($query);
$trip = mysql_fetch_assoc($result);

// User should not confirm a trip that does not exist or has already been confirmed
/* if (!$trip['id']) {
	header("Location:gotweeps.php");
} */

$confirm = isset($_POST['confirm_trip']) ? $_POST['confirm_trip'] : '';
$message = '@' . $access_token['screen_name'] . ' just created a trip to somewhere. http://localhost/gotweeps/meep.php';

if ($confirm) {
/* 	$tweet->post('statuses/update', array('status' => $message)); */
	$query = "UPDATE trips
			  SET confirmed = 1
			  WHERE id = '{$trip['id']}'";			  
	mysql_query($query);

	header("Location:my_trips.php");	
}

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Confirm your trip</title>
		<link type="text/css" rel="stylesheet" href="css/my_trips.css" />
		<link type="text/css" rel="stylesheet" href="css/confirm.css" />
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js"></script>
	</head>
	<body>
		<div id="navBar">
			<ul>
				<li><a class="active" href="my_trips.php">Mina resor</a></li>
				<li><a href="gotweeps.php">Starta ny resa</a></li>
				<li><a href="logout.php">Logga ut</a></li>
			</ul>
		</div>	
		<div id="contentWrapper" class="confirm">
			<h1>Information om resan</h1>
			<?php
			echo '<p>Event: ' . $trip['tag'] . '</p>
			<p>Ber&auml;knad ankomstid: ' . $trip['eta'] . '</p>
			<p>Antal medresen&auml;rer: ' . $trip['users'] . '</p>
			<p>Pris/km: ' . $trip['km_cost'] . '</p>
			<p>Meddelande till medresen&auml;rer: ' . $trip['message'] . '</p>
			<h1>Skicka detta meddelande till twitter</h1>
			<form action="confirm.php?trip=' . $trip['id'] . '" method="post">
				<p>' . $message . '></p>
				<input type="submit" name="confirm_trip" id="confirm_trip" value="Confirm">
			</form>';
			?>
		</div>
	</body>
</html>
