<?php
  require_once('twitterAPI/config.php');

  if(isset($_SESSION['access_token'])) { 
    header('Location: gotweeps.php');
  }
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>@GoTweeps</title>
    <link type="text/css" rel="stylesheet" href="css/index.css" />
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js"></script>
  </head>
  <body>

    <div id="navBar">
      <div id="logo">
        <img src="images/logoMini.png">
      </div>
      <a id="loginImg" href="redirect.php"><img src="images/lighter.png" alt="Sign in with Twitter"/></a>
      <ul>
        <li><a href="gotweeps.php">Starta ny resa</a></li>
        <li><a href="my_trips.php">Mina resor</a></li>
        <li><a href="index.php">Logga ut</a></li>
      </ul>
    </div>
    
  </body>
</html>