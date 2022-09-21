let tfresp;

function getApi() {

  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=New+York&APPID=d0b3d60ddebfa06a2470cd0db54f65d9';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      tfresp = [data];
      console.log(tfresp);
    });
}