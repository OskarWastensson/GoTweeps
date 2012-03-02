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
    <title>GoTweeps - Startsida</title>
    <link rel="stylesheet" type="text/css" href="animation/style.css">
    <link type="text/css" rel="stylesheet" href="css/index.css" />
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js"></script>
    <script type="text/javascript" src="animation/script.js"></script>
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

    <div id="container" class="item">

      <div id="birdLeft" class="item">
        <img src="animation/birdLeft.png">
      </div>

      <div id="birdRight" class="item">
        <img id="bR" src="animation/birdRight.png" class="item">
        <img id="wheels" src="animation/wheels.png" class="item">
      </div>

      <div id="textWrapper" class="item">
        <img id="text" src="animation/text2.png" class="item">
      </div>

      <div id="birdLeft2" class="item">
        <img class="item" src="animation/birdLeft.png">
      </div>

      <div id="birdLeftYellow" class="item">
        <img id="yellow" src="animation/yellow.png" class="item">
      </div>
    </div>
    <embed src="animation/gotweeps.mp3" width="0" height="0" autoplay="true" loop="false"></embed>
    
  </body>
</html>