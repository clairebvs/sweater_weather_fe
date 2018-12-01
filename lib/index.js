// This file is in the entry point in your webpack config.
var choosedLocation;

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

var userLocation = document.querySelector('#userLocation');

$('#submit-location').on('click', function () {
  choosedLocation = userLocation.value

  var url = new URL('https://afternoon-anchorage-21038.herokuapp.com/api/v1/forecast')

  var params = {location: choosedLocation}

  url.search = new URLSearchParams(params)

  fetch(url)

    .then(function(response) {
      console.log(response)
      return response.json();
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
    });
})
