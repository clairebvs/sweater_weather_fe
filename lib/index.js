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
    .then(function(response) {
      console.log(response)
      return response.json();
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
    });
}
