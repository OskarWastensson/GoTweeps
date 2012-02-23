<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Geocoding with GMap v3</title>
    <link type="text/css" rel="stylesheet" href="style.css" />
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
    <script type="text/javascript" src="http://code.google.com/apis/gears/gears_init.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js"></script>
    <script type="text/javascript" src="script.js"></script>
    <script type="text/javascript" src="directions.js"></script>
    
  </head>
  <body>
    <form class='form'>
      <p>Åka från
      <input id='address1' class="address" name='location' type='text' />
      <input type="button" id="myLoc">
      <input id="latitude1" type="hidden"/>
      <input id="longitude1" type="hidden"/>
      till
      <input id='address2' class="address" type='text' name='destination' />
      <input id="latitude2" type="hidden"/>
      <input id="longitude2" type="hidden"/>
      </p>
    </form>

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
        <input id="submit" type="submit" value="Skicka">
      </form>
    </div>

    <div id="map_canvas"></div>
    <div id="directionsPanel"></div>
    <div id="total"></div>
  </body>
</html>