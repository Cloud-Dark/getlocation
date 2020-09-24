<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - A Pen by Al</title>
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"/><link rel="stylesheet" href="./style.css">
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCG18tMlVvu5OXiNXHSwL9QzIuo5X7lFZw&callback=initMap"></script>
  <script src='https://code.jquery.com/jquery.js'></script><script  src="./script.js"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script><script  src="./geolocation.js"></script>
</head>
<body>
<!DOCTYPE html>

<head>
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />
  <meta name="viewport" content="initial-scale=1.0">
  <meta charset="utf-8">
  <style>
    html,
    body {
      height: 100%;
      margin: 0;
      padding: 10px;
    }

    #gmap {
      height: 50%;
      width: 30%;
      margin: auto;
    }
  </style>

</head>
<!-- Responsive Design, for container-fluid class -->

<body class="body-style">
  <center>
<div>
  <input id="getIt" type="text" name="Get weather conditions for:" placeholder="City, State" title="">
  <button class="btn-info" id="seeMap" onclick="getLocation()"><i>Dapatkan Lokasi Saya</i>  </button>
  <p id="demo"></p>
  <section>
  <ol class="location">
  	<dd>Latitude: </dd> <dt class="lat"></dt>
    <dd>Longitude: </dd> <dt class="long"></dt>
    <dd>Accuracy (meters):</dd> <dt class="accuracy"></dt>
  </ol>
  <div id="location-map"></div>
  </section>

</div>
  </center>
  <div id="gmap"></div>



</body>

</body>
</html>
