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
    .then(setDailyForecast)
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

  dailyForecast() {
    return this.data['data']['attributes']['daily_weather']
  }
}

const setCurrentLocation = () => {
 $('#city-and-state').text(forecastData.currentLocation());
}

const setCurrentForecast = () => {
  const icon = forecastData.currentForecast()['icon']
  $('#actual-temp').text(Math.floor(forecastData.currentForecast()['temperature']) + '°');
  $('.forecast-icon').attr('src', `assets/${icon}.png`);
  $('#apparent-temperature').text(Math.floor(forecastData.currentForecast()['apparentTemperature']) + '°')
  $('#humidity').text(forecastData.currentForecast()['humidity'] + '%')
  $('#visibility').text(forecastData.currentForecast()['visibility'] + ' miles')
  $('#uv-index').text(forecastData.currentForecast()['uvIndex'])
  $('#actual-forecast').text(forecastData.currentForecast()['summary'])
  $('#icon-comment').text(forecastData.currentForecast()['summary'])
}


const setHourlyForecast = () => {
  $('#hourly-forecast').empty()
  for(i = 0; i < 9; i++) {
    let temperature = Math.floor(forecastData.hourlyForecast()[i]['temperature'])
    let time = forecastData.hourlyForecast()[i]['time']
    $('#hourly-forecast').append(`<div><p class='time'>${time}</p><p class='temperature'>${temperature}°</p></div>`)
  };
}

const setDailyForecast = () => {
  $('#daily-forecast').empty()
  for( i = 0; i < 5; i++) {
    let time = forecastData.dailyForecast()[i]['time']
    let icon = forecastData.dailyForecast()[i]['icon']
    let summary = forecastData.dailyForecast()[i]['summary']
    let precipitation = (forecastData.dailyForecast()[i]['precipProbability'] * 100)
    let high = Math.floor(forecastData.dailyForecast()[i]['temperatureHigh'])
    let low = Math.floor(forecastData.dailyForecast()[i]['temperatureLow'])
    $('#daily-forecast').append(`
      <div class='day-div'>
        <p class='day'>${time}</p>
        <p class='day-forecast'><img src=assets/${icon}.png alt=${icon} class='day-icon'>  ${summary}</p>
        <p class='day-precipitation'><img src="assets/rain-drop.jpeg" alt="Rain Drop" class='day-icon'> ${precipitation}%</p>
        <p class='day-high'><img src="assets/arrow-up.png" alt="arrow Up" class='day-icon'> ${high}°</p>
        <p class='day-low'><img src="assets/arrow-down.png" alt="arrow Down" class='day-icon'> ${low}°</p>
      </div>`)
  };
}
