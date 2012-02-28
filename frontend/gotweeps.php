<?php
session_start();
require_once('../twitterAPI/config.php');

// Check if token is old
if (empty($_SESSION['access_token']) || empty($_SESSION['access_token']['oauth_token']) || empty($_SESSION['access_token']['oauth_token_secret'])) {
    header('Location:logout.php');
} 

// $access_token['screen_name'];

$access_token = $_SESSION['access_token'];
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Geocoding with GMap v3</title>
    <link type="text/css" rel="stylesheet" href="css/style.css" />
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
    <script type="text/javascript" src="http://code.google.com/apis/gears/gears_init.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js"></script>
    <script type="text/javascript" src="script/script.js"></script>
    <script type="text/javascript" src="script/directions.js"></script>
    
  </head>
  <body>
    <div id="navBar">
      <div id="logo">
        <img src="../images/logoMini.png">
      </div>
      <form class='form'>
        <button type="button" id="myLoc"><img src="../images/location.png"></button>
        Åka från
        <input id='address1' class="address" name='location' type='text' />
        <input id="latitude1" type="hidden"/>
        <input id="longitude1" type="hidden"/>
        till
        <input id='address2' class="address" type='text' name='destination' />
        <input id="latitude2" type="hidden"/>
        <input id="longitude2" type="hidden"/>
        
      </form>
      <ul>
        <li><a href="my_trips.php">Mina resor</a></li>
        <li><a href="gotweeps.php">Starta ny resa</a></li>
        <li><a href="logout.php">Logga ut</a></li>
      </ul>
    </div>
    
    
    <span id="close">X</span>
    <div class='menu'>
      <form class='options' id='options'>
        
        <label for="tag">Event</label>
        <input type='text' name='tag' id="tag" />
        <label for="arrival">Beräknad ankomsttid</label>
        <input id='arrival' name='arrival' type='text' />
        <label for="number">Antal medresenärer</label>
        <input id="number" name="number" type="number" min="0" max ="100" step="1" value="0" />
        <label for="price">Pris/km</label>
        <input id="price" name='price' type='digits' />
        <label for="message">Meddelande till medresenärer</label>
        <textarea id="message" name='message' type='text'></textarea>
        <input id="submit" type="submit" value="Skicka" />
      </form>
    </div>

    <div id="map_canvas"></div>
    <div id="directionsPanel"></div>
    <div id="total"></div>
  </body>
</html>