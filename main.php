<?php
require_once('../twitterAPI/config.php');

if(isset($_SESSION['access_token'])) { 
	header('Location: meep.php');
}
?>
<!DOCTYPE html>
<html>
	<head>
		<title></title>
	</head>
	<body>
		<a href="redirect.php"><img src="images/lighter.png" alt="Sign in with Twitter"/></a>
	</body>
</html>