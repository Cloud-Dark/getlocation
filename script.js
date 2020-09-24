//This website is an https site:
// https://codepen.io/gobees/full/ALBZod/

//Things to do:
//Can
// google maps be used here instead.

$(document).ready(function() {
  var str;
  var imageUrl;
  var wuObject;
  var apiUrl;
  var apiUrlRoot = "https://api.wunderground.com/api/04294da54f0c4e2ea94da54f0cbe2e85/forecast/geolookup/conditions/q/";
  var textBox = "";
  var reverseStateCity = "";
  var stateCity = "";
  var splitResults = [];
  var myCity;
  var map;
  var yourLat = 0;
  var yourLong = 0;
  var geocoder;
  var fahrenBln = true;
  var tempF = 0;
  var tempC = 0;
  var rawYourLat = 50;
  var rawYourLong = 90;
  var oldLat;
  var oldLong;
  $("#convert").hide(); // hide the convert button until current weather is displayed
  $("#pic").hide(); // hide the weather pic icon
  $("#convert").attr("title", String.fromCharCode(176) + "F" + " to " + String.fromCharCode(176) + "C"); // put text on convert button
  $("#convert").html(String.fromCharCode(176) + "F to " + String.fromCharCode(176) + "C");

  function littleDelay() { // function built to work with setTimeout
    console.log("Please Wait");
  };
  if (textBox.length === 0) {
    // if textBox length is greater than 0, use the user supplied location, otherwise use
    // navigator to determine user's location...
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        rawYourLat = position.coords.latitude;
        rawYourLong = position.coords.longitude;
        console.log(rawYourLat, rawYourLong);

        debugger;
      }); // end of getCurrentPosition function
    }; // end of if statement
  }; // end of if textBox line
  //setTimeout(littleDelay,4000);
  function initMap() {
    // this function is required by the google maps api call.  Be careful about moving it in the js code.
    // it's very finicky.
    // setTimeout(littleDelay(),5000);
      map = new google.maps.Map(document.getElementById('gmap'), {
        center: {
            // these variables hold the unedited lat and long positions
            lat: rawYourLat,
            lng: rawYourLong,
        }, // end of 'center'
        zoom: 6
      }); // end of google maps map document line
    //setTimeout(console.log(rawYourLat, rawYourLong), 0);
    geocoder = new google.maps.Geocoder;
    // if the map has not been displayed, (google map) button
    // not clicked, then the map should display the location
    // the user entered in the input field.  The location
    // info, in this case, comes from the WU api.

    // if the google map button has been clicked, then the map should be displayed and the user's location (determined by geolocation) populates the
    // input field directly from the map function.
    //debugger;
    //if(!blnGMClicked) {
    geocode(geocoder, map); // google function that, in this case, reverse geolocates a set of coordinates to user readable location (like city, state).
    // }

    //setTimeout(console.log(rawYourLat, rawYourLong), 0);
    setTimeout(function() {Alert("Please Wait...")},1000);
    setTimeout( function () {
      map = new google.maps.Map(document.getElementById('gmap'), {
        center: {
            // these variables hold the unedited lat and long positions
            lat: rawYourLat,
            lng: rawYourLong,
        }, // end of 'center'
        zoom: 6
    });
    geocode(geocoder, map);
    },2000);
  };
  $("#seeMap").click(function() { // text is "google Map" on button below
    // see map puts the google map on the page if the user chooses to see the map and/or let the map reverse geocode the user's position.
    // sets the user's location
    //setTimeout(geocode(geocoder,map),0);
    initMap(); // google function
    geocode(geocoder, map); // passes user's location from the map to geocoder.  Geocoder translates a lat/long to a user readable location such as a city/state

  });
  // navigator determines lat/long of user's location.  it will pass this lat long to the map where the
  // map will reverse geocode that lat/long to a city state (hopefully)

  $("#theAction").click(function() { // this is the 'get the weather' button below
    // do some simple format testing of the user input
    oldLat=rawYourLat;
    oldLong=rawYourLong;
    blnNoMapDisplayed = true;
    var blnReadyForWeather = false;
    textBox = document.getElementById("getIt");
    console.log(textBox.value);
    var msg = "<mark>Please enter a city and state.  For example: Dallas, Tx</mark>";
    if (isNaN(textBox.value)) {
      // actions for true, it's not a number
      var pattern = /([a-zA-Z]{1,}, )([a-zA-Z]{2})/;
      str = textBox.value;
      var n = str.search(pattern);

      if (n < 0) {
        $("#where-am-i").html(msg);
      } else {
        blnReadyForWeather = true;
      };
    } else {
      // actions for false, it is a number
      $("#where-am-i").html(msg);
    };
    if (blnReadyForWeather) {

      // now format user input so that it is in the form needed
      // by the wx underground api


      formatCityState(str); // function just creates the rest of the weather underground api URL
      getWeather(); // uses weather underground api
      $("#pic").show(); // now show the current weather icon
      makeTitleCase(); // pretty up user input to be title case
    };
  });

  $("#convert").click(function() {
    // debugger;
    // convert just determines if the temp is in fahrenheit and converts to celsius or vice versa
    if (fahrenBln) {
      tempC = ((tempF - 32) / 180) * 100;
      tempC = tempC.toFixed(1);
      $("#convert").attr("title", String.fromCharCode(176) + "C" + " to " + String.fromCharCode(176) + "F");
      $("#convert").html(String.fromCharCode(176) + "C to " + String.fromCharCode(176) + "F");
      fahrenBln = false;
      $("#where-am-i").html("In " + myCity + ", the current temperature is " + tempC + " C");
    } else {
      tempF = (9 / 5) * tempC + 32;
      tempF = tempF.toFixed(1);
      $("#convert").attr("title", String.fromCharCode(176) + "F to " + String.fromCharCode(176) + "C");
      $("#convert").html(String.fromCharCode(176) + "F to " + String.fromCharCode(176) + "C");
      fahrenBln = true;
      $("#where-am-i").html("In " + myCity + ", the current temperature is " + tempF + " F");
    }
  });
  //
  //now get lat long info ready to send to
  // GM to return location info

  function geocode(geocoder, map) {
    var infowindow = new google.maps.InfoWindow;
    if (textBox.length === 0) {
      // if textBox length is greater than 0, use the user supplied location, otherwise use
      // navigator to determine user's location...
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          rawYourLat = position.coords.latitude;
          rawYourLong = position.coords.longitude;
        });
      };
    };
    var latlng = {
      lat: parseFloat(rawYourLat),
      lng: parseFloat(rawYourLong)
    };
    geocoder.geocode({
      'location': latlng
    }, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
          map.setZoom(6);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);
          $('#getIt').attr('value', results[1].formatted_address);
          formatCityState(results[1].formatted_address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  };

  function getWeather() {
    //tryagain:
    //console.log(apiUrl);
    $.ajax({
      url: apiUrl,
      datatype: "jsonp",
      success: function(wuData) {
        wuObject = wuData;
          rawYourLat = Number(wuData.current_observation.display_location.latitude);
          rawYourLong = Number(wuData.current_observation.display_location.longitude);
          imageUrl = wuData.current_observation.icon_url;
          $("#pic").attr("src", imageUrl);
          // $("#pic").src(imageUrl);
          console.log(("#pic").src);
        tempF = wuData.current_observation.temp_f;
        $("#where-am-i").html("In " + myCity + ", the current temperature is: " + tempF + " F.");
        $("#temp").html("The current temperature is " + tempF + " F");
        fahrenBln = true;
      }

    });


    $("#convert").show();

    initMap();
  }

  function makeTitleCase() {

    var arr = str.split(",");
    str = "";
    for (i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim();
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      if (i === 0) {
        arr[i] = arr[i] + ", ";
      };
      str = str + arr[i];
    };
    // debugger;
    document.getElementById("getIt").value = str;
    textBox.value = document.getElementById("getIt").value;
  };

  function formatCityState(city) {
    // city just grabs the results from the geocoder that is formatted in city, state, country format
    //city = results[1].formatted_address;
    // split results will allow us to parse the info from the results in order to properly
    // format the weather api url
    splitResults = city.split(",");
    for (i = 0; i < splitResults.length; i++) {
      splitResults[i] = splitResults[i].trim();
      console.log(splitResults[i]);
    };
    //debugger;
    var justState = splitResults[1];
    splitResults[1] = justState.slice(0, 2);
    reverseStateCity = splitResults[1] + "/" + splitResults[0] + ".json";
    myCity = splitResults[0];
    stateCity = reverseStateCity;
    apiUrl = apiUrlRoot + stateCity;
  };
});
