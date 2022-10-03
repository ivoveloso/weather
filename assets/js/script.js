let tfresp;
let city;
let toresp;
let lat;
let lon;
let icon;
let uviColour;

$("button").on("click", function (event) {
  event.preventDefault();
  city = $("input").val();
  if (city == "") {
    return
  } else {
  $('input').val('');
  $('#previous').append("<div class='button'>" + city + "</div>");
  getApi1();
  }
});



function getApi1() {

  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=d0b3d60ddebfa06a2470cd0db54f65d9';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      tfresp = [data];
      console.log(tfresp);
      lat = tfresp[0]['coord']['lat'];
      lon = tfresp[0]['coord']['lon'];
      getApi2();
    });
}

function getApi2() {

  var requestUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&appid=d0b3d60ddebfa06a2470cd0db54f65d9'

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      toresp = [data];
      console.log(tfresp);
      rendercity();
    });
}

function rendercity() {

  if (toresp[0]['current']['uvi'] < 3) {
    uviColour = 'lightgreen'
  } else if (toresp[0]['current']['uvi'] < 6) {
    uviColour = 'yellow'
  } else if (toresp[0]['current']['uvi'] < 8) {
    uviColour = 'orange'
  } else if (toresp[0]['current']['uvi'] < 11) {
    uviColour = 'red'
  } else {
    uviColour = 'purple'
  }

  $('#curcity').replaceWith("<div id='curcity'><h2>City: " + tfresp[0]['name'] + " (" + moment(tfresp[0]['dt'], 'X').format('L') + ")<img src='http://openweathermap.org/img/wn/" + tfresp[0]['weather'][0]['icon'] + ".png'></h2><p> Temperature: " + (parseInt(tfresp[0]['main']['temp']) - 273) +  "°C</p><p> Wind: " + tfresp[0]['wind']['speed'] + "m/s</p><p> Humidity: " + tfresp[0]['main']['humidity'] + "%</p><p> UV Index: <span style='background-color:" + uviColour + ";padding:0 10px'>" + toresp[0]['current']['uvi'] + "</span></p></div>");
  for (var i = 0; i < 5; i++) {
    
    if (toresp[0]['daily'][i]['uvi'] < 3) {
      uviColour = 'lightgreen'
    } else if (toresp[0]['daily'][i]['uvi'] < 6) {
      uviColour = 'yellow'
    } else if (toresp[0]['daily'][i]['uvi'] < 8) {
      uviColour = 'orange'
    } else if (toresp[0]['daily'][i]['uvi'] < 11) {
      uviColour = 'red'
    } else {
      uviColour = 'purple'
    }

    $('#forecast' + i).replaceWith("<div class='forecast' id='forecast" + i + "'><p>" + moment(toresp[0]['daily'][i]['dt'], 'X').format('L') + "</p><p><img src='http://openweathermap.org/img/wn/" + toresp[0]['daily'][i]['weather'][0]['icon'] + ".png'></p><p> Temperature: " + (parseInt(toresp[0]['daily'][i]['temp']['day']) - 273) + "°C</p><p> Wind: " + toresp[0]['daily'][i]['wind_speed'] + "m/s</p><p> Humidity: " + toresp[0]['daily'][i]['humidity'] + "%</p><p> UV Index: <span style='background-color:" + uviColour + ";padding:0 10px;color:black'>" + toresp[0]['daily'][i]['uvi'] + "</span></p></div>")
  }
console.log(city);
}