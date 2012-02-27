<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Geocoding with GMap v3</title>
    <link type="text/css" rel="stylesheet" href="style.css" />
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js"></script>
    <script type="text/javascript" src="my_trips.js"></script>
  </head>
  <body>
    <div id="navBar">
      <ul>
        <li><a class="active" href="my_trips.php">Mina resor</a></li>
        <li><a href="gotweeps.php">Starta ny resa</a></li>
        <li><a href="index.php">Logga ut</a></li>
      </ul>
    </div>

    <div id="contentWrapper">

      <h1>Mina resor</h1>
      <h2>som förare</h2>
      <table id="driverTable">
        <th>Resor</th>
        <th>Datum</th>
        <th>Anmälda passagerare</th>
        <th>Intresseanmälan (från passagerare)</th>
      </table>
      <h2>som passagerare</h2>
      <table id="passTab">
        <th>Resor</th>
        <th>Datum</th>
        <th>Anmälda passagerare</th>
      </table>
      <h1>Din resehistorik</h1>
      <table id="tripHistory">
        <th>Resor</th>
        <th>Datum</th>
        <th>Anmälda passagerare</th>
        <th>Intresseanmälan (från passagerare)</th>
      </table>
    </div>


  </body>
</html>