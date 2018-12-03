// This file is in the entry point in your webpack config.

const url = 'https://afternoon-anchorage-21038.herokuapp.com'

var choosedLocation;

var userLocation = document.querySelector('#userLocation');

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

$('#submit-location').on('click', function () {
  choosedLocation = userLocation.value
  getForecastData()
})

const getForecastData = () => {
  fetch(`${url}/api/v1/forecast?location=${choosedLocation}`)
    .then(response => response.json())
    .then(data => forecastData = new ForecastData(data))
    .then(setCurrentLocation)
    .then(setCurrentForecast)
    .then(setHourlyForecast)
}

class ForecastData {
  constructor(data) {
    this.data = data
  }

  currentLocation() {
    return this.data['data']['id'];
  }

  currentForecast() {
    return this.data['data']['attributes']['current_weather']
  }

  hourlyForecast() {
    return this.data['data']['attributes']['hourly_weather']
  }
}

const setCurrentLocation = () => {
 $('#city-and-state').text(forecastData.currentLocation());
}

const setCurrentForecast = () => {
 $('#actual-temp').text(Math.floor(forecastData.currentForecast()['temperature']) + '°');
 $('#apparent-temperature').text(Math.floor(forecastData.currentForecast()['apparentTemperature']) + '°')
 $('#humidity').text(forecastData.currentForecast()['humidity'] + '%')
 $('#visibility').text(forecastData.currentForecast()['visibility'] + ' miles')
 $('#uv-index').text(forecastData.currentForecast()['uvIndex'])
 $('#actual-forecast').text(forecastData.currentForecast()['summary'])
 $('#icon-comment').text(forecastData.currentForecast()['summary'])
}

$('#hourly-forecast').empty()

const setHourlyForecast = () => {
  for(i = 0; i < 9; i++) {
    let temperature = Math.floor(forecastData.hourlyForecast()[i]['temperature'])
    let time = forecastData.hourlyForecast()[i]['time']
    $('#hourly-forecast').append(`<div><p class='time'>${time}</p><p class='temperature'>${temperature}°</p></div>`)
  };
}
