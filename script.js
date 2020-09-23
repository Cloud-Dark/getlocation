var options = {
  // enableHighAccuracy can slower response times or increase power consumption
  enableHighAccuracy: true,
  // Maximum length of time (in milliseconds) the device is allowed to return a position
  timeout: 5000,
  // Maximum age in milliseconds of a possible cached position that is acceptable
  maximumAge: 1000 * 5 * 3
};

function startGeoLookup() {
  navigator.geolocation.getCurrentPosition(success, error, options);
   $('.overlay, .loader').fadeIn('fast');
}
startGeoLookup();

function success(pos) {
  $('.overlay, .loader').fadeOut('fast');
  var crd = pos.coords;
  var tme = pos.timestamp;
  var d = new Date(tme);
  var t = new Date(tme);

  // alert("Altitude: " + crd.altitude + " \nAltitudeAccuracy: " + crd.altitudeAccuracy);
  var roundAcc = Math.floor(crd.accuracy);
  document.getElementById('startLat').innerHTML = crd.latitude;
  document.getElementById('startLon').innerHTML = crd.longitude;
  if(!crd.altitude) {
    document.getElementById('altitude').innerHTML = "Not available on this device."
  }
  else {
    let altitudeInFeet = Math.ceil(crd.altitude * 3.28);
    document.getElementById('altitude').innerHTML = (altitudeInFeet + "'");
  }

  document.getElementById('accuracy').innerHTML = roundAcc + " Meters";
  document.getElementById('dateCode').innerHTML = d.toLocaleString().slice(0, 10);
  document.getElementById('timeCode').innerHTML = t.toLocaleString().slice(10, 25);

}

/* Error Codes: 1 PERMISSION_DENIED, 2 POSITION_UNAVAILABLE, 3 TIMEOUT */
function error(err) {
  var geoerror = (err.code == (1, 2, 3) ? "Error loading" : err.message);
  document.getElementById('errMsg').innerHTML = geoerror;
  $('.overlay, .loader').fadeOut('fast');
}
