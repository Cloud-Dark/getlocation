// GPS
navigator.geolocation.getCurrentPosition(showLocation);

function showLocation(location){

  $('.lat').append(location.coords.latitude);
  $('.long').append(location.coords.longitude);
  $('.accuracy').append(location.coords.accuracy);
}
