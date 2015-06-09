// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';
  console.log("loaded");
var ACCLat =  38.864293; // Arlington Career Center latitude
var ACCLon = -77.088364;
var directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
              "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
  document.getElementById('getData').onclick = function(){
    console.log("You clicked button");
   navigator.geolocation.getCurrentPosition(success, error, options);
  };

function success(pos) {
  var crd = pos.coords;
  var deg = Math.round(getBearingInDeg(ACCLat, ACCLon, crd.latitude, crd.longitude) * 100) / 100;
  document.getElementById('coords').innerHTML = "[" + crd.latitude + ", " + crd.longitude + "]";
  document.getElementById('distance').innerHTML = "You are " + Math.round(getMiles(crd.latitude, crd.longitude, ACCLat, ACCLon) * 100)/100 + " miles away!";
  document.getElementById('compass').innerHTML = directions[Math.round(deg/22.2)];
  document.getElementById('accuracy').innerHTML = "The accuracy of this measurement is " + crd.accuracy + "m";
//  document.getElementById('bearing').innerHTML = deg + "°";
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

    function toRad(deg) {
    return deg * (Math.PI/180.0);
  }

  function toDeg(rad) {
    return rad * (180.0/Math.PI);
  }

  function getMiles(lat1, lon1, lat2, lon2) {
    var R    = 6371;              // Radius of the earth in km
    var dLat = toRad(lat2-lat1);  // toRad below
    var dLon = toRad(lon2-lon1);
    var a = Math.sin(dLat/2)      * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2)      * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d * 0.621371;
  }
    function getBearingInDeg(lat1,lng1,lat2,lng2) {
    var dLon = toRad(lng2-lng1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    var rad  = Math.atan2(y, x);
    var brng = toDeg(rad);
    return (brng + 360) % 360;
  }
});
