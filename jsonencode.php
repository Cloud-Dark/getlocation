<!DOCTYPE html>
<html>
  <body>
    <p>klik tombol dibawah ini untuk mendapatkan lokasi anda</p>
    <p>pastikan anda sudah mengizinkan lokasi anda di lacak oleh browser anda</p>
    <button type="button" class="btn btn-primary" onclick="getLocation()">
      temukan lokasi saya
    </button>
    <p id="coordinate"></p>
    <pre id="json"></pre>
  </body>
</html>
<script type="text/javascript">
var x = document.getElementById("coordinate");
var y = document.getElementById("json");

function getLocation() {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  x.innerHTML = "Geolocation is not supported by this browser.";
}
}

function showPosition(position) {
x.innerHTML =
  "Latitude: " +
  position.coords.latitude +
  "<br>Longitude: " +
  position.coords.longitude;

//Create query for the API.
var latitude = "latitude=" + position.coords.latitude;
var longitude = "&longitude=" + position.coords.longitude;
var query = latitude + longitude + "&localityLanguage=en";

const Http = new XMLHttpRequest();

var bigdatacloud_api =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";

bigdatacloud_api += query;

Http.open("GET", bigdatacloud_api);
Http.send();

Http.onreadystatechange = e => {
  y.innerHTML += Http.responseText;
};
}

</script>
