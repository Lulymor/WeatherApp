let today = new Date();

let currentHour = today.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMin = today.getMinutes();
if (currentMin < 10) {
  currentMin = `0${currentMin}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let currentDate = document.querySelector("#date-time");

currentDate.innerHTML = `${day} ${currentHour}:${currentMin}`;
///
function formatForecastDay(datestamp) {
  let date = new Date(datestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
///
function getForecast(coordinates) {
  let apiKey = "054e26e009134273f7b4b87685ec47df";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  celciusTemp = Math.round(response.data.main.temp);
  let tempDisplayed = document.querySelector("#temp-displayed");

  let currentWind = Math.round(response.data.wind.speed);
  let windDisplayed = document.querySelector("#wind");
  let currentHumidity = response.data.main.humidity;
  let humidityDisplayed = document.querySelector("#humidity");
  let currentDescription = document.querySelector("#weather-description");
  let weatherIcon = document.querySelector("#weather-icon");

  tempDisplayed.innerHTML = `${celciusTemp}`;
  currentDescription.innerHTML = response.data.weather[0].description;
  humidityDisplayed.innerHTML = `Humidity: ${currentHumidity} %`;
  windDisplayed.innerHTML = `Wind: ${currentWind} km/h`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
///

let cityDisplay = document.querySelector("#city-displayed");
let cityDisplayed = "New York";
let apiKey = "054e26e009134273f7b4b87685ec47df";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplayed}&units=metric&appid=${apiKey}`;

cityDisplay.innerHTML = cityDisplayed;
axios.get(apiUrl).then(showTemperature);
function city(event) {
  event.preventDefault();
  let cityDisplay = document.querySelector("#city-displayed");
  let cityInput = document.querySelector("#enter-city-input");
  let apiKey = "054e26e009134273f7b4b87685ec47df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;

  cityDisplay.innerHTML = cityInput.value;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", city);
///
function showTemp(response) {
  let currentTempC = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temp-displayed");
  currentTemp.innerHTML = `${currentTempC}`;
  let currentWind = Math.round(response.data.wind.speed);
  let windDisplayed = document.querySelector("#wind");
  windDisplayed.innerHTML = `Wind: ${currentWind} km/h`;
  let currentHumidity = response.data.main.humidity;
  let humidityDisplayed = document.querySelector("#humidity");
  humidityDisplayed.innerHTML = `Humidity: ${currentHumidity} %`;
  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = response.data.weather[0].description;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function showLocation(response) {
  let locationDisplayed = document.querySelector("#city-displayed");
  locationDisplayed.innerHTML = response.data[0].name;
}

function findLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "054e26e009134273f7b4b87685ec47df";
  let apiUrlLocation = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${apiKey}`;
  axios.get(apiUrlLocation).then(showLocation);
  let apiUrlTemp = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrlTemp).then(showTemp);
}

function callLocation() {
  navigator.geolocation.getCurrentPosition(findLocation);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", callLocation);
///
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class ="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
    <div id="forecast-day">${formatForecastDay(forecastDay.dt)}</div>
 
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="" id="forecast-icon" />
    <div class="weather-forecast-temps">
    <span id="forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span> | 
    <span id="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
    </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

///
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let Ftemp = (celciusTemp * 9) / 5 + 32;
  let temperature = document.querySelector("#temp-displayed");
  temperature.innerHTML = Math.round(Ftemp);
}

let celciusTemp = null;

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", displayFahrenheitTemp);

function displaycelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp-displayed");
  temperature.innerHTML = Math.round(celciusTemp);
}
let celsiustButton = document.querySelector("#celsius-button");
celsiustButton.addEventListener("click", displaycelsiusTemp);

///
