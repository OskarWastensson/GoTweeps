<?php
session_start();
require_once('twitterAPI/config.php');

// Check if token is old
if (empty($_SESSION['access_token']) || empty($_SESSION['access_token']['oauth_token']) || empty($_SESSION['access_token']['oauth_token_secret'])) {
    header('Location:logout.php');
} 

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>GoTweeps - Mina Resor</title>
    <link type="text/css" rel="stylesheet" href="css/my_trips.css" />
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js"></script>
    <script type="text/javascript" src="script/my_trips.js"></script>
  </head>
  <body>
    <div id="navBar">
      <div id="logo">
        <img src="images/logoMini.png">
      </div>
      <ul>
        <li><a href="gotweeps.php">Starta ny resa</a></li>
        <li><a class="active" href="my_trips.php">Mina resor</a></li>
        <li><a href="index.php">Logga ut</a></li>
      </ul>
    </div>
    <div id="contentWrapper">

      <h1>Mina resor</h1>
      <table id="driverTable">
        <th>Förare/passagerare</th>
        <th>Event</th>
        <th>Datum</th>
        <th>Anmälda passagerare</th>
        <th>Intresseanmälan <span>(från passagerare)</span></th>
       
         
        
      </table>

      <h1>Resehistorik</h1>
      <table id="tripHistory">
        <tr>
          <th>Förare/passagerare</th>
          <th>Event</th>
          <th>Datum</th>
          <th>Anmälda passagerare</th>
          <th>Intresseanmälan <span>(från passagerare)</span></th>
        </tr>
        <tr class="tr">
          <td><img src="images/walkMini.png"></td>
          <td><a href="my_map.php">Jensen</a></td>
          <td>28/6</td>
          <td>3</td>
          <td>8</td>
        </tr>
      </table>
    </div>


  </body>
</html>