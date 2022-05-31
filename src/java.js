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
  tempDisplayed.innerHTML = `${tempC}°C`;
  let currentWind = Math.round(response.data.wind.speed);
  let windDisplayed = document.querySelector("#wind");
  windDisplayed.innerHTML = `Wind: ${currentWind} km/h`;
  let currentHumidity = response.data.main.humidity;
  let humidityDisplayed = document.querySelector("#humidity");
  humidityDisplayed.innerHTML = `Humidity: ${currentHumidity} %`;
  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = response.data.weather[0].description;
}

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
