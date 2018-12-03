/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// This file is in the entry point in your webpack config.

	var url = 'https://afternoon-anchorage-21038.herokuapp.com';

	var choosedLocation;

	var userLocation = document.querySelector('#userLocation');

	function openForm() {
	  document.getElementById("myForm").style.display = "block";
	}

	function closeForm() {
	  document.getElementById("myForm").style.display = "none";
	}

	$('#submit-location').on('click', function () {
	  choosedLocation = userLocation.value;
	  getForecastData();
	});

	var getForecastData = function getForecastData() {
	  fetch(url + '/api/v1/forecast?location=' + choosedLocation).then(function (response) {
	    return response.json();
	  }).then(function (data) {
	    return forecastData = new ForecastData(data);
	  }).then(setCurrentLocation).then(setCurrentForecast).then(setHourlyForecast).then(setDailyForecast);
	};

	var ForecastData = function () {
	  function ForecastData(data) {
	    _classCallCheck(this, ForecastData);

	    this.data = data;
	  }

	  _createClass(ForecastData, [{
	    key: 'currentLocation',
	    value: function currentLocation() {
	      return this.data['data']['id'];
	    }
	  }, {
	    key: 'currentForecast',
	    value: function currentForecast() {
	      return this.data['data']['attributes']['current_weather'];
	    }
	  }, {
	    key: 'hourlyForecast',
	    value: function hourlyForecast() {
	      return this.data['data']['attributes']['hourly_weather'];
	    }
	  }, {
	    key: 'dailyForecast',
	    value: function dailyForecast() {
	      return this.data['data']['attributes']['daily_weather'];
	    }
	  }]);

	  return ForecastData;
	}();

	var setCurrentLocation = function setCurrentLocation() {
	  $('#city-and-state').text(forecastData.currentLocation());
	};

	var setCurrentForecast = function setCurrentForecast() {
	  $('#actual-temp').text(Math.floor(forecastData.currentForecast()['temperature']) + '°');
	  $('#apparent-temperature').text(Math.floor(forecastData.currentForecast()['apparentTemperature']) + '°');
	  $('#humidity').text(forecastData.currentForecast()['humidity'] + '%');
	  $('#visibility').text(forecastData.currentForecast()['visibility'] + ' miles');
	  $('#uv-index').text(forecastData.currentForecast()['uvIndex']);
	  $('#actual-forecast').text(forecastData.currentForecast()['summary']);
	  $('#icon-comment').text(forecastData.currentForecast()['summary']);
	};

	var setHourlyForecast = function setHourlyForecast() {
	  $('#hourly-forecast').empty();
	  for (i = 0; i < 9; i++) {
	    var temperature = Math.floor(forecastData.hourlyForecast()[i]['temperature']);
	    var time = forecastData.hourlyForecast()[i]['time'];
	    $('#hourly-forecast').append('<div><p class=\'time\'>' + time + '</p><p class=\'temperature\'>' + temperature + '\xB0</p></div>');
	  };
	};

	var setDailyForecast = function setDailyForecast() {
	  $('#daily-forecast').empty();
	  for (i = 0; i < 5; i++) {
	    var time = forecastData.dailyForecast()[i]['time'];
	    var summary = forecastData.dailyForecast()[i]['summary'];
	    var precipitation = forecastData.dailyForecast()[i]['precipProbability'] * 100;
	    var high = Math.floor(forecastData.dailyForecast()[i]['temperatureHigh']);
	    var low = Math.floor(forecastData.dailyForecast()[i]['temperatureLow']);
	    $('#daily-forecast').append('\n      <div class=\'day-div\'>\n        <p class=\'day\'>' + time + '</p>\n        <p class=\'day-forecast\'>' + summary + '</p>\n        <p class=\'day-precipitation\'><img src="assets/rain-drop.jpeg" alt="Rain Drop" class=\'day-icon\'> ' + precipitation + '%</p>\n        <p class=\'day-high\'><img src="assets/arrow-up.png" alt="arrow Up" class=\'day-icon\'> ' + high + '\xB0</p>\n        <p class=\'day-low\'><img src="assets/arrow-down.png" alt="arrow Down" class=\'day-icon\'> ' + low + '\xB0</p>\n      </div>');
	  };
	};

/***/ })
/******/ ]);