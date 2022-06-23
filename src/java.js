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
function showTemperature(response) {
  let tempC = Math.round(response.data.main.temp);
  let tempDisplayed = document.querySelector("#temp-displayed");

  let currentWind = Math.round(response.data.wind.speed);
  let windDisplayed = document.querySelector("#wind");
  let currentHumidity = response.data.main.humidity;
  let humidityDisplayed = document.querySelector("#humidity");
  let currentDescription = document.querySelector("#weather-description");
  let weatherIcon = document.querySelector("#weather-icon");

  console.log(response);
  tempDisplayed.innerHTML = `${tempC}°C`;
  currentDescription.innerHTML = response.data.weather[0].description;
  humidityDisplayed.innerHTML = `Humidity: ${currentHumidity} %`;
  windDisplayed.innerHTML = `Wind: ${currentWind} km/h`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
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
  currentTemp.innerHTML = `${currentTempC}°C`;
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
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class ="row">`;
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
    <div id="forecast-day">${day}</div>
    <img src="src/images/cloud.png" alt="" id="forecast-icon" />
    <div class="weather-forecast-temps">
    <span id="forecast-temp-max">35°</span> | 
    <span id="forecast-temp-min">20°</span>
    </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
