<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Geocoding with GMap v3</title>
    <link type="text/css" rel="stylesheet" href="join.css" />
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
    <script type="text/javascript" src="http://code.google.com/apis/gears/gears_init.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js"></script>
    <script type="text/javascript" src="json.js"></script>
    <script type="text/javascript" src="join.js"></script>
  </head>
  <body>
    <form class='form'>
    
    </form>

    <div class='menu'>

      <form id='options'>
        <label for="address">Min position</label>
        <input id='address' name='location' type='text' />
        <input id="latitude" type="hidden"/>
        <input id="longitude" type="hidden"/>
        <h2>Event</h2>
        <p id="event"></p>
        <h2>Ankomst</h2>
        <p id="arrival"></p>
        <h2>Max antal medresenärer</h2>
        <p id="number"></p>
        <h2>Pris/km</h2>
        <p id="price"></p>
        <h2>Meddelande från förare</h2>
        <p id="message"></p>
        <input id="submit" type="submit" value="Jag vill åka med!">
      </form>
    </div>

    <div id="map_canvas"></div>
    <div id="directionsPanel"></div>
    <div id="total"></div>
  </body>
</html>